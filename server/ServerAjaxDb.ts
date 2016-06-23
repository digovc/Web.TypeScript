/// <reference path="ServerAjax.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    import ServerAjax = NetZ_Web_TypeScript.ServerAjax;

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ServerAjaxDb extends ServerAjax
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: ServerAjaxDb;

        public static get i(): ServerAjaxDb
        {
            if (ServerAjaxDb._i != null)
            {
                return ServerAjaxDb._i;
            }

            ServerAjaxDb._i = new ServerAjaxDb();

            return ServerAjaxDb._i;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public enviar(objSolicitacaoAjax: SolicitacaoAjax): void
        {
            if (objSolicitacaoAjax == null)
            {
                return;
            }

            if (!objSolicitacaoAjax.validarDados())
            {
                return;
            }

            $.ajaxSettings.crossDomain = true;
            $.ajaxSettings.data = objSolicitacaoAjax.toJson();
            $.ajaxSettings.dataType = "json";
            $.ajaxSettings.method = "POST";
            $.ajaxSettings.url = this.url;
            $.ajaxSettings.xhrFields = { "withCredentials": true };

            //$.ajaxSettings.beforeSend = ((objJqXhr: JQueryXHR, cnf: JQueryAjaxSettings) => { objSolicitacaoAjax.ajaxAntesEnviar(); });
            $.ajaxSettings.error = ((objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objSolicitacaoAjax.ajaxErro(strTextStatus, strErrorThrown); });
            $.ajaxSettings.success = ((anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objSolicitacaoAjax.ajaxSucesso(anyData); });

            $.ajax($.ajaxSettings);
        }

        protected getIntPort(): number
        {
            return 8081;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}