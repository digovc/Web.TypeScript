/// <reference path="SolicitacaoAjax.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    // #endregion Enumerados

    export class SolicitacaoAjaxDb extends SolicitacaoAjax
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _strMetodo: string;

        public get strMetodo(): string
        {
            return this._strMetodo;
        }

        public set strMetodo(strMetodo: string)
        {
            this._strMetodo = strMetodo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public validarDados(): boolean
        {
            if (!super.validarDados())
            {
                return false;
            }

            if (Utils.getBooStrVazia(this.strMetodo))
            {
                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}