/// <reference path="../../../erro/Erro.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MainMenuItem extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divMmiPai: MainMenuItem;
        private _divMmnPai: MainMenu;
        private _lstDivMmiFilho: Array<MainMenuItem>;

        private get divMmiPai(): MainMenuItem
        {
            return this._divMmiPai;
        }

        private set divMmiPai(divMmiPai: MainMenuItem)
        {
            this._divMmiPai = divMmiPai;
        }

        public get divMmnPai(): MainMenu
        {
            return this._divMmnPai;
        }

        public set divMmnPai(divMmnPai: MainMenu)
        {
            this._divMmnPai = divMmnPai;
        }

        private get lstDivMmiFilho(): Array<MainMenuItem>
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

                divMmiFilho.divMmiPai = this;
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
                this.inicializarItem();
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

        protected inicializarItem(): void
        {
        }

        public mostrarEsconderItem(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.lstDivMmiFilho.length < 1)
                {
                    return;
                }

                this.lstDivMmiFilho.forEach((mmi) => (mmi != null) && mmi.mostrarEsconder(EnmAnimacaoTipo.SLIDE_VERTICAL));
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

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.onClick = (arg: any) => this.MainMenuItem_onClick(arg);
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

        private MainMenuItem_onClick(arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.mostrarEsconderItem();
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }
        // #endregion Eventos
    }
}