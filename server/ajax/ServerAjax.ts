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

        public enviar(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (!objInterlocutor.validarDados())
            {
                return;
            }

            var objAjaxSettings = this.getObjAjaxSettings(objInterlocutor);

            objAjaxSettings.data = objInterlocutor.toJson();
            objAjaxSettings.dataType = "json";

            $.ajax(objAjaxSettings);
        }

        public enviarArquivo(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            var objAjaxSettings = this.getObjAjaxSettings(objInterlocutor);

            objAjaxSettings.url = (this.url + "/?upload-file");
            objAjaxSettings.contentType = false;
            objAjaxSettings.data = objInterlocutor.objData;
            objAjaxSettings.processData = false;
            objAjaxSettings.xhr = (() => { return this.getXhrEnviarArquivo(objInterlocutor); });

            $.ajax(objAjaxSettings);
        }

        private getObjAjaxSettings(objInterlocutor: Interlocutor): JQueryAjaxSettings
        {
            var objAjaxSettingsResultado: JQueryAjaxSettings = {
                crossDomain: true,
                error: ((objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objInterlocutor.processarOnErro(strTextStatus, strErrorThrown); }),
                method: "POST",
                success: ((anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objInterlocutor.processarOnSucesso(anyData); }),
                url: this.url,
                xhrFields: { withCredentials: true },
            }

            return objAjaxSettingsResultado;
        }

        private getXhrEnviarArquivo(objInterlocutor: Interlocutor): XMLHttpRequest
        {
            var xhrResultado = <XMLHttpRequest>$.ajaxSettings.xhr();

            xhrResultado.upload.onerror = ((arg: Event) => { objInterlocutor.processarOnErro("Erro no upload", arg.toString()); });
            xhrResultado.upload.onprogress = ((arg: ProgressEvent) => { objInterlocutor.processarOnProgresso(arg); });

            return xhrResultado;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}