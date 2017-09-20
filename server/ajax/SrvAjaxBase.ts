// #region Reference

/// <reference path="../ServerBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class SrvAjaxBase extends ServerBase
    {
        // #region Constantes

        public static get STR_RESULTADO_VAZIO(): string { return "_____null_____" };

        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

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

            objInterlocutor.intHttpPorta = !Utils.getBooStrVazia(window.location.port) ? Number(window.location.port) : 80;

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
            objAjaxSettings.xhr = (() => { return this.getXhrEnviarArquivo(objInterlocutor) });

            $.ajax(objAjaxSettings);
        }

        private getObjAjaxSettings(objInterlocutor: Interlocutor): JQueryAjaxSettings
        {
            var objAjaxSettingsResultado: JQueryAjaxSettings =
                {
                    crossDomain: true,
                    error: ((o, s, s2) => objInterlocutor.processarOnErro(s, s2)),
                    method: "POST",
                    success: ((o) => objInterlocutor.processarOnSucesso(o)),
                    url: ("http://" + this.url),
                    xhrFields: { withCredentials: true },
                }

            return objAjaxSettingsResultado;
        }

        private getXhrEnviarArquivo(objInterlocutor: Interlocutor): XMLHttpRequest
        {
            var xhrResultado = <XMLHttpRequest>$.ajaxSettings.xhr();

            xhrResultado.upload.onerror = (a => objInterlocutor.processarOnErro("Erro no upload", a.toString()));
            xhrResultado.upload.onprogress = (a => objInterlocutor.processarOnProgresso(a));

            return xhrResultado;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}