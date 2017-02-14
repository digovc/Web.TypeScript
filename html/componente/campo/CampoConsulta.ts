/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Keys.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnFocusInListener.ts"/>
/// <reference path="../../../OnKeyDownListener.ts"/>
/// <reference path="../menu/contexto/MenuContexto.ts"/>
/// <reference path="CampoComboBox.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoConsulta extends CampoComboBox implements OnClickListener, OnKeyDownListener
    {
        // #region Constantes

        private static get SRC_IMAGEM_ACAO_LIMPAR(): string { return "url('/res/media/png/btn_limpar_25x25.png')" };

        // #endregion Constantes

        // #region Atributos

        private _btnAcao: BotaoMini;
        private _clnWebFiltro: ColunaWeb;
        private _strTblWebRefNome: string;
        private _tblWebRef: TabelaWeb;
        private _txtIntId: Input;
        private _txtPesquisa: Input;

        private get btnAcao(): BotaoMini
        {
            if (this._btnAcao != null)
            {
                return this._btnAcao;
            }

            this._btnAcao = new BotaoMini(this.strId + "_btnAcao");

            return this._btnAcao;
        }

        private get clnWebFiltro(): ColunaWeb
        {
            return this._clnWebFiltro;
        }

        private set clnWebFiltro(clnWebFiltro: ColunaWeb)
        {
            if (this._clnWebFiltro == clnWebFiltro)
            {
                return;
            }

            this._clnWebFiltro = clnWebFiltro;

            this.setClnWebFiltro(this._clnWebFiltro);
        }

        private get strTblWebRefNome(): string
        {
            if (this._strTblWebRefNome != null)
            {
                return this._strTblWebRefNome;
            }

            this._strTblWebRefNome = this.getStrAttValor("tbl_web_ref_nome");

            return this._strTblWebRefNome;
        }

        private get tblWebRef(): TabelaWeb
        {
            if (this._tblWebRef != null)
            {
                return this._tblWebRef;
            }

            this._tblWebRef = this.getTblWebRef();

            return this._tblWebRef;
        }

        private get txtIntId(): Input
        {
            if (this._txtIntId != null)
            {
                return this._txtIntId;
            }

            this._txtIntId = new Input(this.strId + "_txtIntId");

            return this._txtIntId;
        }

        private get txtPesquisa(): Input
        {
            if (this._txtPesquisa != null)
            {
                return this._txtPesquisa;
            }

            this._txtPesquisa = new Input(this.strId + "_txtPesquisa");

            return this._txtPesquisa;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private abrirOpcao(arg: JQueryEventObject): void
        {
            var mnc = new MenuContexto();

            if (this.txtPesquisa.booVisivel)
            {
                mnc.addOpcao("Pesquisar", ((mci: MenuContextoItem, arg2: JQueryEventObject) => { this.pesquisar(); }));
                mnc.addOpcao("Pesquisar por", ((mci: MenuContextoItem, arg2: JQueryEventObject) => { this.abrirOpcaoPesquisarPor(mci, arg); }));
            }
            else
            {
                mnc.addOpcao("Limpar", ((mci: MenuContextoItem, arg: JQueryEventObject) => { this.limparDados(); }));
            }

            mnc.abrirMenu(arg);
        }

        private abrirOpcaoPesquisarPor(mci: MenuContextoItem, arg: JQueryEventObject): void
        {
            if (this.tblWebRef == null)
            {
                return;
            }

            var mnc = new MenuContexto();

            this.tblWebRef.arrClnWeb.forEach((clnWeb) => { this.abrirOpcaoPesquisarPorCln(mnc, clnWeb); });

            mnc.abrirMenu(arg);
        }

        private abrirOpcaoPesquisarPorCln(mnc: MenuContexto, clnWeb: ColunaWeb): void
        {
            if (clnWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(clnWeb.strNomeExibicao))
            {
                return;
            }

            mnc.addOpcao(clnWeb.strNomeExibicao, (() => { this.selecionarColunaPesquisa(clnWeb); }));
        }

        protected setBooEmFoco(): void
        {
            super.setBooEmFoco();

            this.btnAcao.jq.css("border-bottom-width", (this.booEmFoco ? "2px" : Utils.STR_VAZIA));
            this.btnAcao.jq.css("border-color", (this.booEmFoco ? AppWebBase.i.objTema.corTema : Utils.STR_VAZIA));
            this.btnAcao.jq.css("height", (this.booEmFoco ? 26 : 25));

            this.cmb.jq.css("height", (this.booEmFoco ? 23 : 22));

            this.txtIntId.jq.css("border-bottom-width", (this.booEmFoco ? "2px" : Utils.STR_VAZIA));
            this.txtIntId.jq.css("border-color", (this.booEmFoco ? AppWebBase.i.objTema.corTema : Utils.STR_VAZIA));

            this.txtPesquisa.jq.css("border-bottom-color", (this.booEmFoco ? AppWebBase.i.objTema.corTema : Utils.STR_VAZIA));
            this.txtPesquisa.jq.css("border-bottom-width", (this.booEmFoco ? "2px" : Utils.STR_VAZIA));

            if (!Utils.getBooStrVazia(this.strCritica))
            {
                this.btnAcao.jq.css("border-color", "#f8b2b2");
                this.txtIntId.jq.css("border-color", "#f8b2b2");
                this.txtPesquisa.jq.css("border-color", "#f8b2b2");
            }
        }

        protected setStrCritica(strCritica: string): void
        {
            super.setStrCritica(strCritica);

            if (Utils.getBooStrVazia(strCritica))
            {
                this.btnAcao.jq.css("border-color", (this.booEmFoco ? AppWebBase.i.objTema.corTema : Utils.STR_VAZIA));
                this.txtIntId.jq.css("border-color", (this.booEmFoco ? AppWebBase.i.objTema.corTema : Utils.STR_VAZIA));
                this.txtPesquisa.jq.css("border-color", (this.booEmFoco ? AppWebBase.i.objTema.corTema : Utils.STR_VAZIA));
                return;
            }

            this.btnAcao.jq.css("border-color", "#f8b2b2");
            this.txtIntId.jq.css("border-color", "#f8b2b2");
            this.txtPesquisa.jq.css("border-color", "#f8b2b2");
        }

        protected atualizarStrValor(): void
        {
            super.atualizarStrValor();

            this.atualizarStrValorTxtIntId();
        }

        private atualizarStrValorTxtIntId(): void
        {
            if (this.tagInput.intValor < 1)
            {
                this.txtIntId.strValor = null;
                return;
            }

            this.txtIntId.intValor = this.tagInput.intValor;
        }

        private getTblWebRef(): TabelaWeb
        {
            if (Utils.getBooStrVazia(this.strTblWebRefNome))
            {
                return null;
            }

            return AppWebBase.i.getTbl(this.strTblWebRefNome);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.txtPesquisa.iniciar();

            this.inicializarTblWebRef();

            this.inicializarIntValor();
        }

        private inicializarIntValor(): void
        {
            if (this.tagInput.intValor < 1)
            {
                return;
            }

            this.txtPesquisa.jq.hide();

            this.cmb.mostrar();

            this.btnAcao.jq.css("background-image", CampoConsulta.SRC_IMAGEM_ACAO_LIMPAR);
        }

        private inicializarTblWebRef(): void
        {
            AppWebBase.i.carregarTbl(this.strTblWebRefNome);
        }

        public limparDados(): void
        {
            if (!this.tagInput.booVisivel)
            {
                return;
            }

            super.limparDados();

            this.btnAcao.jq.css("background-image", Utils.STR_VAZIA);
            this.txtIntId.strValor = null;
            this.txtPesquisa.strValor = null;

            this.cmb.jq.hide();

            this.txtPesquisa.mostrar();

            this.txtPesquisa.receberFoco();
        }

        private pesquisar(): void
        {
            if (this.tagInput.booVisivel)
            {
                return;
            }

            if (this.tblWebRef == null)
            {
                return;
            }

            if (this.clnWebFiltro == null)
            {
                this.clnWebFiltro = this.tblWebRef.clnWebNome;
            }

            this.tblWebRef.limparFiltro();

            var fil = new FiltroWeb(this.clnWebFiltro, this.txtPesquisa.strValor);

            fil.enmOperador = FiltroWeb_EnmOperador.LIKE;

            this.tblWebRef.addFil(fil);

            this.cmb.carregarDados(this.tblWebRef);

            this.txtPesquisa.jq.hide();

            this.btnAcao.jq.css("background-image", CampoConsulta.SRC_IMAGEM_ACAO_LIMPAR);
            this.txtPesquisa.strValor = null;

            this.cmb.mostrar();

            window.setTimeout((() => { this.cmb.receberFoco(); }), 10);
        }

        private processarBtnAcaoClick(): void
        {
            if (this.tagInput.booVisivel)
            {
                this.limparDados();
                return;
            }

            this.pesquisar();
        }

        public receberFoco(): void
        {
            //super.receberFoco();

            if (this.txtPesquisa.booVisivel)
            {
                this.txtPesquisa.jq.focus();
                return;
            }

            this.cmb.jq.focus();
        }

        private selecionarColunaPesquisa(clnWeb: ColunaWeb): void
        {
            if (clnWeb == null)
            {
                return;
            }

            this.clnWebFiltro = clnWeb;
        }

        private setClnWebFiltro(clnWebFiltro: ColunaWeb): void
        {
            if (clnWebFiltro == null)
            {
                clnWebFiltro = this.tblWebRef.clnWebNome;
                return;
            }

            var strTitulo = "_campo_nome (_cln_web_ref_nome)";

            strTitulo = strTitulo.replace("_campo_nome", this.getStrAttValor("cln_ref_nome_exibicao"));
            strTitulo = strTitulo.replace("_cln_web_ref_nome", clnWebFiltro.strNomeExibicao);

            this.divTitulo.strConteudo = strTitulo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnKeyDownListener(this);

            this.btnAcao.addEvtOnClickListener(this);

            this.txtPesquisa.addEvtOnFocusInListener(this);
            this.txtPesquisa.addEvtOnFocusOutListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnAcao:
                        this.processarBtnAcaoClick();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onFocusIn(objSender: Object): void
        {
            super.onFocusIn(objSender);

            try
            {
                switch (objSender)
                {
                    case this.txtPesquisa:
                        this.booEmFoco = true;
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onFocusOut(objSender: Object): void
        {
            super.onFocusOut(objSender);

            try
            {
                switch (objSender)
                {
                    case this.txtPesquisa:
                        this.booEmFoco = false;
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onKeyDown(objSender: Object, arg: JQueryKeyEventObject): void
        {
            try
            {
                switch (arg.keyCode)
                {
                    case Keys.BACKSPACE:
                        this.limparDados();
                        return;

                    case Keys.ENTER:
                        this.pesquisar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}