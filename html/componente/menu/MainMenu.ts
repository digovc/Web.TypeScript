/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../../OnLeaveListener.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="../../../OnEnterListener.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class MainMenu extends ComponenteHtml implements OnEnterListener, OnLeaveListener, OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMmiFilho: Array<MainMenuItem>;
        private _divGaveta: Div;
        private _txtPesquisa: Input;

        protected get arrMmiFilho(): Array<MainMenuItem>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrMmiFilho != null)
                {
                    return this._arrMmiFilho;
                }

                this._arrMmiFilho = new Array<MainMenuItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrMmiFilho;
        }

        private get divGaveta(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divGaveta != null)
                {
                    return this._divGaveta;
                }

                this._divGaveta = new Div("divGaveta");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divGaveta;
        }

        private get txtPesquisa(): Input
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._txtPesquisa != null)
                {
                    return this._txtPesquisa;
                }

                this._txtPesquisa = new Input("txtPesquisa");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._txtPesquisa;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addMmiFilho(mmiFilho: MainMenuItem): void
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

                if (this.arrMmiFilho.indexOf(mmiFilho) > -1)
                {
                    return;
                }

                this.arrMmiFilho.push(mmiFilho);

                mmiFilho.mmnPai = this;
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

        private pesquisar(strPesquisa: string): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrMmiFilho == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(strPesquisa))
                {

                    this.arrMmiFilho.forEach((mni) => { mni.limparPesquisa() });
                    return;
                }

                this.arrMmiFilho.forEach((mni) => { mni.pesquisar(strPesquisa) });
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
                this.txtPesquisa.addEvtOnEnterListener(this);
                //this.txtPesquisa.addEvtOnLeaveListener(this);
                this.txtPesquisa.addEvtOnValorAlteradoListener(this);
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

        public onEnter(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divGaveta.mostrar();
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

        public onLeave(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divGaveta.esconder();
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

        public onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.pesquisar(arg.strValor);
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