// #region Reference

/// <reference path="../html/Tag.ts"/>
/// <reference path="ServerBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

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

        public carregarHtml(urlImport: string, tagPai: Tag, fncComplete: any): void
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

            tagPai.jq.load(urlImport, undefined, (() => this.atualizarCssMain(fncComplete)));
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

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}