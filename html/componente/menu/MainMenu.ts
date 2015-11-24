/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="MainMenuItem.ts"/>

module NetZ_Web_TypeScript
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

        private _lstDivMmiFilho: Array<MainMenuItem>;

        protected get lstDivMmiFilho(): Array<MainMenuItem>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._lstDivMmiFilho != null)
                {
                    return this._lstDivMmiFilho;
                }

                this._lstDivMmiFilho = new Array<MainMenuItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._lstDivMmiFilho;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addDivMmiFilho(divMmiFilho: MainMenuItem): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (divMmiFilho == null)
                {
                    return;
                }

                if (this.lstDivMmiFilho.indexOf(divMmiFilho) > -1)
                {
                    return;
                }

                this.lstDivMmiFilho.push(divMmiFilho);

                divMmiFilho.divMmnPai = this;
                divMmiFilho.inicializar();
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