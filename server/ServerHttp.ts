/// <reference path="../html/Tag.ts"/>
/// <reference path="ServerBase.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ServerHttp extends ServerBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: ServerHttp;

        public static get i(): ServerHttp
        {
            if (ServerHttp._i != null)
            {
                return ServerHttp._i;
            }

            ServerHttp._i = new ServerHttp();

            return ServerHttp._i;
        }

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

            var urlJq = "/res?method=getScript&class=_js_class";

            urlJq = urlJq.replace("_js_class", strJqClass);

            $.getScript(urlJq);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}