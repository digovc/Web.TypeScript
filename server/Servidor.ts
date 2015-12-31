﻿module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Servidor extends Objeto
    {
        // #region Constantes

        private static get URL_AJAX(): string { return "/ajax-server" };

        // #endregion Constantes

        // #region Atributos

        protected static _i: Servidor;

        public static get i(): Servidor
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Servidor._i != null)
                {
                    return Servidor._i;
                }

                Servidor._i = new Servidor();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return Servidor._i;
        }

        // #endregion Atributos

        // #region Construtores

        constructor()
        {
            super();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializar();
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

                $.ajaxSettings.data = JSON.stringify(objSolicitacao);
                $.ajaxSettings.dataType = "JSON";
                $.ajaxSettings.error = (objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objSolicitacao.ajaxErro(strTextStatus, strErrorThrown) };
                $.ajaxSettings.success = (anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objSolicitacao.ajaxSucesso(anyData) };
                $.ajaxSettings.beforeSend = (objJqXhr: JQueryXHR, cnf: JQueryAjaxSettings) => { objSolicitacao.ajaxAntesEnviar() };

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

        private inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializarAjaxConfig();
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

        private inicializarAjaxConfig(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                $.ajaxSettings.url = Servidor.URL_AJAX;
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

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}