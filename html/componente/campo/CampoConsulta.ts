/// <reference path="../../../AppWeb.ts"/>
/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Keys.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnFocusInListener.ts"/>
/// <reference path="../../../OnKeyDownListener.ts"/>
/// <reference path="../menu/contexto/MenuContexto.ts"/>
/// <reference path="CampoComboBox.ts"/>

module NetZ_Web
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

            this.atualizarClnWebFiltro();
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

        protected atualizarBooEmFoco(): void
        {
            super.atualizarBooEmFoco();

            this.txtPesquisa.jq.css("border-bottom-width", this.booEmFoco ? "2px" : Utils.STR_VAZIA);
        }

        private atualizarClnWebFiltro(): void
        {
            if (this.clnWebFiltro == null)
            {
                this.clnWebFiltro = this.tblWebRef.clnWebNome;
                return;
            }

            var strTitulo = "_campo_nome (_cln_web_ref_nome)";

            strTitulo = strTitulo.replace("_campo_nome", this.getStrAttValor("cln_ref_nome_exibicao"));
            strTitulo = strTitulo.replace("_cln_web_ref_nome", this.clnWebFiltro.strNomeExibicao);

            this.divTitulo.strConteudo = strTitulo;
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

            return AppWeb.i.getTbl(this.strTblWebRefNome);
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
        }

        private inicializarTblWebRef(): void
        {
            AppWeb.i.carregarTbl(this.strTblWebRefNome);
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
            finally
            {
            }
            // #endregion Ações
        }

        public onFocusIn(objSender: Object): void
        {
            super.onFocusIn(objSender);

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
            finally
            {
            }
            // #endregion Ações
        }

        public onFocusOut(objSender: Object): void
        {
            super.onFocusOut(objSender);

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}