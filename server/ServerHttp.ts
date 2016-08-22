/// <reference path="../html/Tag.ts"/>
/// <reference path="ServerBase.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerHttp extends ServerBase
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

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public atualizarCssMain(): void
        {
            var tagLink = <HTMLLinkElement>document.getElementById("cssMain");

            if (tagLink == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tagLink.href))
            {
                return;
            }

            var strHref = (tagLink.href.indexOf("?") > -1) ? tagLink.href.split("?")[0] : tagLink.href;

            tagLink.href = (strHref + "?" + Date.now());
        }

        public carregarHtml(urlImport: string, tabContainer: Tag, fncComplete: any): void
        {
            if (Utils.getBooStrVazia(urlImport))
            {
                return;
            }

            if (tabContainer == null)
            {
                return;
            }

            if (tabContainer.jq == null)
            {
                return;
            }

            tabContainer.jq.load(urlImport, null, (() => { this.atualizarCssMain(); }));
        }

        public carregarJq(strJqClass: string): void
        {
            if (Utils.getBooStrVazia(strJqClass))
            {
                return;
            }

            var urlJq = "/res?method=_get_script&class=_js_class".replace("_get_script", ServerHttp.STR_GET_SCRIPT);

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