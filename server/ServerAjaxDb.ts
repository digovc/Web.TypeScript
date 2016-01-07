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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (ServerAjaxDb._i != null)
                {
                    return ServerAjaxDb._i;
                }

                ServerAjaxDb._i = new ServerAjaxDb();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return ServerAjaxDb._i;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public enviar(objSolicitacao: SolicitacaoAjax): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (objSolicitacao == null)
                {
                    return;
                }

                if (!objSolicitacao.validarDadosEnvio())
                {
                    return;
                }

                $.ajaxSettings.crossDomain = true;
                $.ajaxSettings.data = objSolicitacao.toJson();
                $.ajaxSettings.dataType = "JSON";
                $.ajaxSettings.method = "POST";
                $.ajaxSettings.url = this.url;
                $.ajaxSettings.xhrFields = { "withCredentials": true };

                $.ajaxSettings.beforeSend = (objJqXhr: JQueryXHR, cnf: JQueryAjaxSettings) => { objSolicitacao.ajaxAntesEnviar() };
                $.ajaxSettings.error = (objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objSolicitacao.ajaxErro(strTextStatus, strErrorThrown) };
                $.ajaxSettings.success = (anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objSolicitacao.ajaxSucesso(anyData) };

                $.ajax($.ajaxSettings);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.intPort = 8081;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}