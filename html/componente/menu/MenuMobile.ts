/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="MenuMobileItem.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class MenuMobile extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMmi: Array<MenuMobileItem>;

        private get arrMmi(): Array<MenuMobileItem>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrMmi != null)
                {
                    return this._arrMmi;
                }

                this._arrMmi = new Array<MenuMobileItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrMmi;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrir(): void
        {
            this.mostrar(Tag_EnmAnimacaoTipo.FADE);
        }

        public addMniFilho(mmiFilho: MenuMobileItem): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (mmiFilho == null)
                {
                    return;
                }

                if (this.arrMmi.indexOf(mmiFilho) > -1)
                {
                    return;
                }

                this.arrMmi.push(mmiFilho);

                mmiFilho.mnm = this;

                mmiFilho.iniciar();
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

            this.inicializarItem();
        }

        protected abstract inicializarItem(): void;

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}