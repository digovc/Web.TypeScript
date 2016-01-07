﻿/// <reference path="SolicitacaoAjax.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum SolicitacaoAjaxDb_EnmMetodo
    {
        NONE,
        SALVAR_REGISTRO,
    }

    // #endregion Enumerados

    export class SolicitacaoAjaxDb extends SolicitacaoAjax
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _enmMetodo: SolicitacaoAjaxDb_EnmMetodo = SolicitacaoAjaxDb_EnmMetodo.NONE;

        public get enmMetodo(): SolicitacaoAjaxDb_EnmMetodo
        {
            return this._enmMetodo;
        }

        public set enmMetodo(enmMetodo: SolicitacaoAjaxDb_EnmMetodo)
        {
            this._enmMetodo = enmMetodo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public validarDadosEnvio(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!super.validarDadosEnvio())
                {
                    return false;
                }

                if (SolicitacaoAjaxDb_EnmMetodo.NONE == this.enmMetodo)
                {
                    return false;
                }

                if (this.objJsonEnvio == null)
                {
                    return false;
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}