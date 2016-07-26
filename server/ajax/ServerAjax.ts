/// <reference path="../ServerBase.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerAjax extends ServerBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public enviar(objinterlocutorAjax: InterlocutorAjax): void
        {
            if (objinterlocutorAjax == null)
            {
                return;
            }

            if (!objinterlocutorAjax.validarDados())
            {
                return;
            }

            $.ajaxSettings.crossDomain = true;
            $.ajaxSettings.data = objinterlocutorAjax.toJson();
            $.ajaxSettings.dataType = "json";
            $.ajaxSettings.method = "POST";
            $.ajaxSettings.url = this.url;
            $.ajaxSettings.xhrFields = { "withCredentials": true };

            //$.ajaxSettings.beforeSend = ((objJqXhr: JQueryXHR, cnf: JQueryAjaxSettings) => { objSolicitacaoAjax.ajaxAntesEnviar(); });
            $.ajaxSettings.error = ((objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objinterlocutorAjax.ajaxErro(strTextStatus, strErrorThrown); });
            $.ajaxSettings.success = ((anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objinterlocutorAjax.ajaxSucesso(anyData); });

            $.ajax($.ajaxSettings);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}