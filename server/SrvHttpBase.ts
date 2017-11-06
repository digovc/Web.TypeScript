// #region Reference

/// <reference path="../html/Tag.ts"/>
/// <reference path="ServerBase.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class SrvHttpBase extends ServerBase
    {
        // #region Constantes

        private static get STR_GET_SCRIPT(): string { return "get-script" };

        public static get URL_DATA_BASE_FILE_DOWNLOAD(): string { return "data-base-file-download" };

        // #endregion Constantes

        // #region Atributos

        private _booResConsultaCarregado: boolean;

        private get booResConsultaCarregado(): boolean
        {
            return this._booResConsultaCarregado;
        }

        private set booResConsultaCarregado(booResConsultaCarregado: boolean)
        {
            this._booResConsultaCarregado = booResConsultaCarregado;
        }

        // #endregion Atributos

        // #region Construtor

        constructor()
        {
            super("Servidor HTTP");
        }

        // #endregion Construtor

        // #region Métodos

        public atualizarCssMain(fncComplete: Function = null): void
        {
            var tagLink = (document.getElementById("cssMain") as HTMLLinkElement);

            if (tagLink == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tagLink.href))
            {
                return;
            }

            if (fncComplete != null)
            {
                tagLink.onload = (() => fncComplete());
            }

            var strHref = (tagLink.href.indexOf("?") > -1) ? tagLink.href.split("?")[0] : tagLink.href;

            strHref = (strHref + "?" + Date.now());

            tagLink.href = strHref;
        }

        public carregarHtml(urlImport: string, tagPai: Tag, fncSucesso: Function): void
        {
            if (Utils.getBooStrVazia(urlImport))
            {
                return;
            }

            if (tagPai == null)
            {
                return;
            }

            if (tagPai.jq == null)
            {
                return;
            }

            $.get(urlImport, ((d) => this.carregarHtmlSucesso(d, tagPai, fncSucesso)));
        }

        private carregarHtmlSucesso(strHtml: any, tagPai: Tag, fncSucesso: Function): void
        {
            if (Utils.getBooStrVazia(strHtml))
            {
                return;
            }

            let arrElmHtml = $(strHtml);

            let arrElmJs = new Array<HTMLScriptElement>();
            let elmDivConteudo: HTMLDivElement;

            for (var i = 0; i < arrElmHtml.length; i++)
            {
                if (arrElmHtml[i].localName == "div")
                {
                    elmDivConteudo = (arrElmHtml[i] as HTMLDivElement);
                    continue;
                }

                if (arrElmHtml[i].localName == "script")
                {
                    arrElmJs.push(arrElmHtml[i] as HTMLScriptElement);
                    continue;
                }
            }

            if (elmDivConteudo == null)
            {
                return;
            }

            this.carregarHtmlSucessoJs(arrElmJs, 0, elmDivConteudo, fncSucesso);

            tagPai.jq.html(elmDivConteudo as any);
        }

        private carregarHtmlSucessoJs(arrElmJs: Array<HTMLScriptElement>, i: number, elmDivConteudo: HTMLDivElement, fncSucesso: Function): void
        {
            if (arrElmJs.length <= i)
            {
                if (fncSucesso != null)
                {
                    fncSucesso();
                }

                return;
            }

            if (!Utils.getBooStrVazia(arrElmJs[i].innerText))
            {
                document.head.appendChild(arrElmJs[i]);

                eval(arrElmJs[i].innerText);
            }

            var src = $(arrElmJs[i]).attr("src");

            if (Utils.getBooStrVazia(src))
            {
                this.carregarHtmlSucessoJs(arrElmJs, ++i, elmDivConteudo, fncSucesso);
                return;
            }

            this.carregarJs(src, (() => this.carregarHtmlSucessoJs(arrElmJs, ++i, elmDivConteudo, fncSucesso)));
        }

        public carregarJs(srcJs: string, fncOnLoad: ((o: HTMLScriptElement) => void) = null): void
        {
            if (Utils.getBooStrVazia(srcJs))
            {
                fncOnLoad(null);
                return;
            }

            if (this.validarJsCarregado(srcJs))
            {
                fncOnLoad(null);
                return;
            }

            var tagScript = document.createElement("script");

            tagScript.src = srcJs;
            tagScript.type = "text/javascript";

            if (fncOnLoad != null)
            {
                tagScript.onload = (() => fncOnLoad(tagScript));
            }

            document.head.appendChild(tagScript);
        }

        public carregarJq(strJqClass: string): void
        {
            if (Utils.getBooStrVazia(strJqClass))
            {
                return;
            }

            var urlJq = "/res?method=_get_script&class=_js_class".replace("_get_script", SrvHttpBase.STR_GET_SCRIPT);

            urlJq = urlJq.replace("_js_class", strJqClass);

            $.getScript(urlJq);
        }

        public download(url: string): void
        {
            window.open(url, "_blank");
        }

        public validarJsCarregado(srcJs: string): boolean
        {
            return ($("script[src^='" + srcJs + "']").length > 0);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}