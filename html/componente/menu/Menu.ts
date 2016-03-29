/// <reference path="../../pagina/PagPrincipal.ts"/>
/// <reference path="../../pagina/PagPrincipal.ts"/>
/// <reference path="../../../OnEnterListener.ts"/>
/// <reference path="../../../OnLeaveListener.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../pagina/PaginaHtml.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class Menu extends ComponenteHtml implements OnEnterListener, OnLeaveListener, OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMniFilho: Array<MenuItem>;
        private _divGaveta: Div;
        private _pagPrincipal: PagPrincipal;
        private _txtPesquisa: Input;

        protected get arrMniFilho(): Array<MenuItem>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrMniFilho != null)
                {
                    return this._arrMniFilho;
                }

                this._arrMniFilho = new Array<MenuItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrMniFilho;
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

        public get pagPrincipal(): PagPrincipal
        {
            return this._pagPrincipal;
        }

        public set pagPrincipal(pagPrincipal: PagPrincipal)
        {
            this._pagPrincipal = pagPrincipal;
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

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (tblWeb == null)
                {
                    return;
                }

                if (this.pagPrincipal == null)
                {
                    return;
                }

                this.pagPrincipal.abrirConsulta(tblWeb);
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

        public addMniFilho(mniFilho: MenuItem): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (mniFilho == null)
                {
                    return;
                }

                if (this.arrMniFilho.indexOf(mniFilho) > -1)
                {
                    return;
                }

                this.arrMniFilho.push(mniFilho);

                mniFilho.mnuPai = this;

                mniFilho.iniciar();
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
                if (this.arrMniFilho == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(strPesquisa))
                {
                    this.arrMniFilho.forEach((mni) => { mni.limparPesquisa() });
                    return;
                }

                this.arrMniFilho.forEach((mni) => { mni.pesquisar(strPesquisa) });
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
                this.txtPesquisa.addEvtOnLeaveListener(this); // TODO: Analisar uma melhor forma para fechar a gaveta do menu.
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