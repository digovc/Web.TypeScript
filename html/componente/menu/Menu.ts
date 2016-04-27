/// <reference path="../../../OnEnterListener.ts"/>
/// <reference path="../../../OnKeyDownListener.ts"/>
/// <reference path="../../../OnLeaveListener.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../pagina/PaginaHtml.ts"/>
/// <reference path="../../pagina/PagPrincipal.ts"/>
/// <reference path="../../pagina/PagPrincipal.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="MenuItem.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class Menu extends ComponenteHtml implements OnEnterListener, OnLeaveListener, OnKeyDownListener, OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMni: Array<MenuItem>;
        private _divGaveta: Div;
        private _pagPrincipal: PagPrincipal;
        private _txtPesquisa: Input;

        protected get arrMni(): Array<MenuItem>
        {
            if (this._arrMni != null)
            {
                return this._arrMni;
            }

            this._arrMni = new Array<MenuItem>();

            return this._arrMni;
        }

        private get divGaveta(): Div
        {
            if (this._divGaveta != null)
            {
                return this._divGaveta;
            }

            this._divGaveta = new Div("divGaveta");

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
            if (this._txtPesquisa != null)
            {
                return this._txtPesquisa;
            }

            this._txtPesquisa = new Input("txtPesquisa");

            return this._txtPesquisa;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        public abrirConsulta(tblWeb: TabelaWeb): void
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

        private abrirConsultaPrimeira(): void
        {
            for (var i = 0; i < this.arrMni.length; i++)
            {
                if (this.arrMni[i].abrirConsultaPrimeira())
                {
                    return;
                }
            }
        }

        public addMniFilho(mni: MenuItem): void
        {
            if (mni == null)
            {
                return;
            }

            if (this.arrMni.indexOf(mni) > -1)
            {
                return;
            }

            this.arrMni.push(mni);

            mni.mnuPai = this;

            mni.iniciar();
        }

        protected finalizar(): void
        {
            super.finalizar();

            this.txtPesquisa.receberFoco();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.txtPesquisa.iniciar();

            this.inicializarItem();
        }

        protected abstract inicializarItem(): void;

        private pesquisar(strPesquisa: string): void
        {
            if (this.arrMni == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(strPesquisa))
            {
                this.arrMni.forEach((mni) => { mni.limparPesquisa() });
                return;
            }

            this.arrMni.forEach((mni) => { mni.pesquisar(strPesquisa) });
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.txtPesquisa.addEvtOnEnterListener(this);
            this.txtPesquisa.addEvtOnKeyDownListener(this);
            this.txtPesquisa.addEvtOnLeaveListener(this);
            this.txtPesquisa.addEvtOnValorAlteradoListener(this);
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

        public onKeyDown(objSender: Object, arg: JQueryKeyEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (arg.keyCode != Keys.ENTER)
                {
                    return;
                }

                switch (objSender)
                {
                    case this.txtPesquisa:
                        this.abrirConsultaPrimeira();
                        return;
                }
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