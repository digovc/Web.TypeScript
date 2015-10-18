/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="MainMenuItem.ts"/>

module NetZ.Web.TypeScript.html.componente.menu
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class MainMenu extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _lstDivMainMenuItem: Array<MainMenuItem>;

        protected get lstDivMainMenuItem(): Array<MainMenuItem>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._lstDivMainMenuItem != null)
                {
                    return this._lstDivMainMenuItem;
                }

                this._lstDivMainMenuItem = new Array<MainMenuItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._lstDivMainMenuItem;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addItem(divMmi: MainMenuItem): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (divMmi == null)
                {
                    return;
                }

                if (this.lstDivMainMenuItem.indexOf(divMmi) > -1)
                {
                    return;
                }

                this.lstDivMainMenuItem.push(divMmi);

                divMmi.inicializar();
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

        public inicializar(): void
        {
            super.inicializar();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializarItem()
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

        protected abstract inicializarItem(): void;

        protected montarLayout(): void
        {
            super.montarLayout();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.esconder();
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