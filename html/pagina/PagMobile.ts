/// <reference path="../componente/ActionBar.ts"/>
/// <reference path="PaginaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PagMobile extends PaginaHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divActionBar: ActionBar;

        private get divActionBar(): ActionBar
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divActionBar != null)
                {
                    return this._divActionBar;
                }

                this._divActionBar = new ActionBar("divActionBar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divActionBar;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public onActionBarMenuClick()
        {
        }

        public onActionBarVoltarClick()
        {
        }

        public onActionBarTituloClick()
        {
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.divActionBar.pagMobile = this;

            this.divActionBar.iniciar();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}