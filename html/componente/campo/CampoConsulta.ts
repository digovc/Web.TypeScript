﻿/// <reference path="../../../AppWeb.ts"/>
/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Keys.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnFocusInListener.ts"/>
/// <reference path="../../../OnKeyDownListener.ts"/>
/// <reference path="../menu/contexto/MenuContexto.ts"/>
/// <reference path="CampoComboBox.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoConsulta extends CampoComboBox implements OnClickListener, OnKeyDownListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnMenu: BotaoCircular;
        private _clnWebFiltro: ColunaWeb;
        private _strTblWebRefNome: string;
        private _tblWebRef: TabelaWeb;
        private _txtPesquisa: Input;

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

        private get btnMenu(): BotaoCircular
        {
            if (this._btnMenu != null)
            {
                return this._btnMenu;
            }

            this._btnMenu = new BotaoCircular(this.strId + "_btnMenu");

            return this._btnMenu;
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

        protected atualizarBooEmFoco(): void
        {
            super.atualizarBooEmFoco();

            this.btnMenu.booVisivel = this.booEmFoco;
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
            super.limparDados();

            this.txtPesquisa.strValor = null;

            this.cmb.jq.hide();

            this.txtPesquisa.mostrar();

            this.txtPesquisa.receberFoco();
        }

        private pesquisar(): void
        {
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

            this.txtPesquisa.strValor = null;

            this.cmb.mostrar();
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

            this.btnMenu.addEvtOnClickListener(this);

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
                    case this.btnMenu:
                        this.abrirOpcao(arg)
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
                    case Keys.DELETE:
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