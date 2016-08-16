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

        public static get STR_RESULTADO_VAZIO(): string { return "_____null_____" };

        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public enviar(objinterlocutor: Interlocutor): void
        {
            if (objinterlocutor == null)
            {
                return;
            }

            if (!objinterlocutor.validarDados())
            {
                return;
            }

            $.ajaxSettings.crossDomain = true;
            $.ajaxSettings.data = objinterlocutor.toJson();
            $.ajaxSettings.dataType = "json";
            $.ajaxSettings.method = "POST";
            $.ajaxSettings.url = this.url;
            $.ajaxSettings.xhrFields = { "withCredentials": true };

            //$.ajaxSettings.beforeSend = ((objJqXhr: JQueryXHR, cnf: JQueryAjaxSettings) => { objSolicitacaoAjax.ajaxAntesEnviar(); });
            $.ajaxSettings.error = ((objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objinterlocutor.processarOnAjaxErro(strTextStatus, strErrorThrown); });
            $.ajaxSettings.success = ((anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objinterlocutor.processarOnAjaxSucesso(anyData); });

            $.ajax($.ajaxSettings);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}