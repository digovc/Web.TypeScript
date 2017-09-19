/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnEnterListener.ts"/>
/// <reference path="../../../OnKeyDownListener.ts"/>
/// <reference path="../../../OnKeyUpListener.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../pagina/PaginaHtmlBase.ts"/>
/// <reference path="../../pagina/PagPrincipalBase.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="MenuItem.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class Menu extends ComponenteHtmlBase implements OnClickListener, OnEnterListener, OnKeyUpListener, OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMni: Array<MenuItem>;
        private _arrMniFilhoVisivel: Array<MenuItem>;
        private _divGaveta: Div;
        private _mniSelecionado: MenuItem;
        private _pagPrincipal: PagPrincipalBase;
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

        private get arrMniFilhoVisivel(): Array<MenuItem>
        {
            if (this._arrMniFilhoVisivel != null)
            {
                return this._arrMniFilhoVisivel;
            }

            this._arrMniFilhoVisivel = this.getArrMniFilhoVisivel();

            return this._arrMniFilhoVisivel;
        }

        private set arrMniFilhoVisivel(arrMniFilhoVisivel: Array<MenuItem>)
        {
            this._arrMniFilhoVisivel = arrMniFilhoVisivel;
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

        public get mniSelecionado(): MenuItem
        {
            return this._mniSelecionado;
        }

        public set mniSelecionado(mniSelecionado: MenuItem)
        {
            if (this._mniSelecionado == mniSelecionado)
            {
                return;
            }

            if (this._mniSelecionado != null)
            {
                this._mniSelecionado.booSelecionado = false;
            }

            this._mniSelecionado = mniSelecionado;

            this.setMniSelecionado(this._mniSelecionado);
        }

        public get pagPrincipal(): PagPrincipalBase
        {
            return this._pagPrincipal;
        }

        public set pagPrincipal(pagPrincipal: PagPrincipalBase)
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

        // #region Construtor

        // #endregion Construtor

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

            this.divGaveta.esconder();

            window.setTimeout((() => this.fecharGrupos()), 200);
            window.setTimeout((() => this.txtPesquisa.strValor = null), 200);
        }

        private abrirConsultaPrimeira(): void
        {
            if (this.arrMniFilhoVisivel == null)
            {
                return;
            }

            if (this.arrMniFilhoVisivel.length < 1)
            {
                return;
            }

            this.arrMniFilhoVisivel[0].booSelecionado = true;
            this.arrMniFilhoVisivel[0].abrirConsulta();
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

        public fecharGrupos(): void
        {
            if (this.arrMni == null)
            {
                return;
            }

            this.arrMni.forEach(m => m.esconderDivItemConteudo());
        }

        protected finalizar(): void
        {
            super.finalizar();

            this.txtPesquisa.receberFoco();
        }

        private getArrMniFilhoVisivel(): Array<MenuItem>
        {
            var arrMniFilhoVisivelResultado = new Array<MenuItem>();

            for (var i = 0; i < this.arrMni.length; i++)
            {
                var mni = this.arrMni[i];

                this.getArrMniFilhoVisivelItem(arrMniFilhoVisivelResultado, mni);
            }

            return arrMniFilhoVisivelResultado;
        }

        private getArrMniFilhoVisivelItem(arrMniFilho: Array<MenuItem>, mni: MenuItem): Array<MenuItem>
        {
            if (mni == null)
            {
                return;
            }

            if (this != mni.mnuPai)
            {
                return;
            }

            if (!mni.booVisivel)
            {
                return;
            }

            mni.arrMniFilhoVisivel = null;

            if (mni.arrMniFilhoVisivel == null)
            {
                return;
            }

            for (var i = 0; i < mni.arrMniFilhoVisivel.length; i++)
            {
                var mniFilho = mni.arrMniFilhoVisivel[i];

                arrMniFilho.push(mniFilho);
            }

            return arrMniFilho;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.txtPesquisa.iniciar();

            this.inicializarItem();
        }

        protected abstract inicializarItem(): void;

        private limparArrMniFilhoVisivel(): void
        {
            this.arrMniFilhoVisivel = null;

            if (this.arrMni.length < 1)
            {
                return;
            }

            this.arrMni.forEach(m => m.arrMniFilhoVisivel = null);
        }

        protected pesquisar(strPesquisa: string): void
        {
            if (this.arrMni == null)
            {
                return;
            }

            this.arrMniFilhoVisivel = null;

            if (Utils.getBooStrVazia(strPesquisa))
            {
                this.arrMni.forEach(m => m.limparPesquisa());
                return;
            }

            this.arrMni.forEach(m => m.pesquisar(strPesquisa));
        }

        public processarPagPrincipalOnClick(arg: JQueryEventObject): void
        {
            this.divGaveta.esconder();
        }

        private processarPagPrincipalOnKeyUp(arg: JQueryKeyEventObject): void
        {
            if (arg.keyCode != Keys.M)
            {
                return;
            }

            if (!arg.ctrlKey)
            {
                return;
            }

            this.txtPesquisa.receberFoco();
            this.txtPesquisa.selecionarTudo();
        }

        private processarTxtPesquisaOnKeyUp(arg: JQueryKeyEventObject): void
        {
            this.processarTxtPesquisaOnKeyUpEnter(arg);
            this.processarTxtPesquisaOnKeyUpSeta(arg);
        }

        private processarTxtPesquisaOnKeyUpEnter(arg: JQueryKeyEventObject): void
        {
            if (arg.keyCode != Keys.ENTER)
            {
                return;
            }

            this.abrirConsultaPrimeira();
        }

        private processarTxtPesquisaOnKeyUpSeta(arg: JQueryKeyEventObject): void
        {
            switch (arg.keyCode)
            {
                case Keys.DOWN_ARROW:
                    this.selecionarPrimeiro();
                    return;

                case Keys.UP_ARROW:
                    this.selecionarUltimo();
                    return;
            }
        }

        public selecionarAnterior(): void
        {
            if (this.mniSelecionado == null)
            {
                return;
            }

            if (this.arrMniFilhoVisivel == null)
            {
                return;
            }

            var intIndex = this.arrMniFilhoVisivel.indexOf(this.mniSelecionado);

            if (intIndex < 0)
            {
                return;
            }

            if (intIndex == 0)
            {
                this.arrMniFilhoVisivel[this.arrMniFilhoVisivel.length - 1].booSelecionado = true;
                return;
            }

            this.arrMniFilhoVisivel[intIndex - 1].booSelecionado = true;
        }

        private selecionarPrimeiro(): void
        {
            this.limparArrMniFilhoVisivel();

            if (this.arrMniFilhoVisivel == null)
            {
                return;
            }

            if (this.arrMniFilhoVisivel.length < 1)
            {
                return;
            }

            this.arrMniFilhoVisivel[0].booSelecionado = true;
        }

        public selecionarProximo(): void
        {
            if (this.mniSelecionado == null)
            {
                return;
            }

            if (this.arrMniFilhoVisivel == null)
            {
                return;
            }

            var intIndex = this.arrMniFilhoVisivel.indexOf(this.mniSelecionado);

            if (intIndex < 0)
            {
                return;
            }

            if (intIndex == (this.arrMniFilhoVisivel.length - 1))
            {
                this.arrMniFilhoVisivel[0].booSelecionado = true;
                return;
            }

            this.arrMniFilhoVisivel[intIndex + 1].booSelecionado = true;
        }

        private selecionarUltimo(): void
        {
            this.limparArrMniFilhoVisivel();

            if (this.arrMniFilhoVisivel == null)
            {
                return;
            }

            if (this.arrMniFilhoVisivel.length < 1)
            {
                return;
            }

            this.arrMniFilhoVisivel[this.arrMniFilhoVisivel.length - 1].booSelecionado = true;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.divGaveta.addEvtOnClickListener(this);

            this.txtPesquisa.addEvtOnClickListener(this);
            this.txtPesquisa.addEvtOnEnterListener(this);
            this.txtPesquisa.addEvtOnKeyUpListener(this);
            this.txtPesquisa.addEvtOnValorAlteradoListener(this);

            this.setEventosGlobal();
        }

        private setEventosGlobal(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            this.pagPrincipal.addEvtOnClickListener(this);
            this.pagPrincipal.addEvtOnKeyUpListener(this);
        }

        private setMniSelecionado(mniSelecionado: MenuItem): void
        {
            if (mniSelecionado != null)
            {
                mniSelecionado.booSelecionado = true;
            }
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.divGaveta:
                        arg.stopPropagation();
                        return;

                    case this.pagPrincipal:
                        this.processarPagPrincipalOnClick(arg);
                        return;

                    case this.txtPesquisa:
                        arg.stopPropagation();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onEnter(tagSender: Tag): void
        {
            try
            {
                this.divGaveta.mostrar();
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onKeyUp(objSender: Objeto, arg: JQueryKeyEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.pagPrincipal:
                        this.processarPagPrincipalOnKeyUp(arg);
                        return;

                    case this.txtPesquisa:
                        this.processarTxtPesquisaOnKeyUp(arg);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onValorAlterado(objSender: Objeto, arg: OnValorAlteradoArg): void
        {
            try
            {
                switch (objSender)
                {
                    case this.txtPesquisa:
                        this.pesquisar(arg.strValor);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}