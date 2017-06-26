/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../../Div.ts"/>
/// <reference path="../../../pagina/PagPrincipal.ts"/>
/// <reference path="../../grid/GridHtml.ts"/>
/// <reference path="../../grid/OnRowDoubleClickListener.ts"/>
/// <reference path="../JanelaHtml.ts"/>
/// <reference path="BtnFavorito.ts"/>
/// <reference path="PainelAcaoConsulta.ts"/>
/// <reference path="PainelFiltro.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlConsulta extends JanelaHtml implements OnGridMenuClickListener, OnRowDoubleClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnFavorito: BtnFavorito;
        private _divGrid: Div;
        private _jnlCadastro: JnlCadastro;
        private _pagPrincipal: PagPrincipal;
        private _pnlAcaoConsulta: PainelAcaoConsulta;
        private _pnlFiltro: PainelFiltro;
        private _tagGridHtml: GridHtml;
        private _tblWeb: TabelaWeb;
        private _viwAtual: TabelaWeb;

        private get btnFavorito(): BtnFavorito
        {
            if (this._btnFavorito != null)
            {
                return this._btnFavorito;
            }

            this._btnFavorito = new BtnFavorito(this);

            return this._btnFavorito;
        }

        private get divGrid(): Div
        {
            if (this._divGrid != null)
            {
                return this._divGrid;
            }

            this._divGrid = new Div(this.strId + "_divGrid");

            return this._divGrid;
        }

        private get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        private get pagPrincipal(): PagPrincipal
        {
            return this._pagPrincipal;
        }

        private set pagPrincipal(pagPrincipal: PagPrincipal)
        {
            this._pagPrincipal = pagPrincipal;
        }

        private set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
        }

        private get pnlAcaoConsulta(): PainelAcaoConsulta
        {
            if (this._pnlAcaoConsulta != null)
            {
                return this._pnlAcaoConsulta;
            }

            this._pnlAcaoConsulta = new PainelAcaoConsulta(this);

            return this._pnlAcaoConsulta;
        }

        private get pnlFiltro(): PainelFiltro
        {
            if (this._pnlFiltro != null)
            {
                return this._pnlFiltro;
            }

            this._pnlFiltro = new PainelFiltro(this);

            return this._pnlFiltro;
        }

        private get tagGridHtml(): GridHtml
        {
            return this._tagGridHtml;
        }

        private set tagGridHtml(tagGridHtml: GridHtml)
        {
            if (this._tagGridHtml == tagGridHtml)
            {
                return;
            }

            this._tagGridHtml = tagGridHtml;

            this.setTagGridHtml(tagGridHtml);
        }

        public get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        public get viwAtual(): TabelaWeb
        {
            if (this._viwAtual != null)
            {
                return this._viwAtual;
            }

            this._viwAtual = this.getViwAtual();

            return this._viwAtual;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(pagPrincipal: PagPrincipal)
        {
            super(JnlConsulta.name, pagPrincipal);

            this.pagPrincipal = pagPrincipal;
        }

        // #endregion Construtor

        // #region Métodos

        public abrirCadastro(intRegistroId: number): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.tblWeb.clnIntId.intValor = intRegistroId;

            this.pagPrincipal.abrirCadastro(this.tblWeb);

            this.abrirCadastroTagGridHtml(intRegistroId);
        }

        public abrirCadastroSelecionado(): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            if (this.tagGridHtml.rowSelecionada == null)
            {
                Notificacao.notificar("Selecione um registro primeiro.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            this.abrirCadastro(this.tagGridHtml.rowSelecionada.intId);
        }

        private abrirCadastroTagGridHtml(intRegistroId: number): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            this.tagGridHtml.selecinarTudo(false);
            this.tagGridHtml.selecinar(intRegistroId, true);
        }

        public abrirFiltroCadastro(intFiltroId: number): void
        {
            if (this.viwAtual == null)
            {
                return;
            }

            this.pagPrincipal.abrirFiltroCadastro(intFiltroId);
        }

        private abrirMenu(arg: JQueryEventObject): void
        {
            // TODO: Implementar.
        }

        private alterar(tagGridRow: GridRow): void
        {
            if (tagGridRow == null)
            {
                return;
            }

            if (tagGridRow.intId < 1)
            {
                return;
            }

            this.abrirCadastro(tagGridRow.intId);
        }

        protected fechar(): void
        {
            super.fechar();

            this.pagPrincipal.jnlConsulta = null;
        }

        private getViwAtual(): TabelaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            return new TabelaWeb(this.jq.attr("viw_web_nome"));
        }

        private getTblWeb(): TabelaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.jq.attr("tbl_web_nome")))
            {
                return null;
            }

            return new TabelaWeb(this.jq.attr("tbl_web_nome"));
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.booPermitirMover = false;

            this.inicializarCssMain();

            this.btnFavorito.iniciar();
            this.pnlAcaoConsulta.iniciar();
            this.pnlFiltro.iniciar();

            this.inicializarHistorico();
        }

        private inicializarCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        private inicializarHistorico(): void
        {
            if (AppWebBase.i == null)
            {
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.tblWeb.strNomeExibicao))
            {
                return;
            }

            var objHistorico = new Historico();

            objHistorico.addParametro("consulta", this.tblWeb.strNome);
            objHistorico.strTitulo = this.tblWeb.strNomeExibicao;

            AppWebBase.i.atualizarHistorico(objHistorico);
        }

        protected inicializarPosicao(): void
        {
            //super.inicializarPosicao();
        }

        private inicializartagGridHtml(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.tagGridHtml = new GridHtml(this.jq.find("[clazz=GridHtml]")[0].id);

            this.tagGridHtml.iniciar();

            this.tagGridHtml.addEvtOnGridMenuClickListener(this);
            this.tagGridHtml.addEvtOnRowDoubleClickListener(this);
        }

        public maximinizarGrid(): void
        {
            if (this.divGrid.jq.css("top") == "50")
            {
                return;
            }

            this.divGrid.jq.animate({ top: 50 }, 350, "swing");
            this.pnlFiltro.esconderFiltro();
        }

        public pesquisar(): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
            }

            this.pnlFiltro.atualizarArrFiltro(this.tblWeb);

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_PESQUISAR_GRID;

            objInterlocutor.addJsn(this.tblWeb);

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.pesquisarSucesso(o));

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private pesquisarSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            if (objInterlocutor.objData == SrvAjaxBase.STR_RESULTADO_VAZIO)
            {
                Notificacao.notificar("Nenhum registro foi encontrado.", Notificacao_EnmTipo.INFO);
                return;
            }

            this.pesquisarSucessoCssMain();

            this.divGrid.jq.html(objInterlocutor.objData.toString());

            this.inicializartagGridHtml();

            this.maximinizarGrid();
        }

        private pesquisarSucessoCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        private processarOnGridMenuClick(arg: OnGridMenuClickArg): void
        {
            switch (arg.enmTipo)
            {
                case OnGridMenuClickArg_EnmAcao.ADICIONAR:
                    this.abrirCadastro(0);
                    return;

                case OnGridMenuClickArg_EnmAcao.ALTERAR:
                    this.alterar(arg.tagGridRow);
                    return;

                case OnGridMenuClickArg_EnmAcao.MENU:
                    this.abrirMenu(arg.argOrigem);
                    return;
            }
        }

        public restaurarGrid(): void
        {
            if (Utils.getBooStrVazia(this.divGrid.jq.css("top")))
            {
                return;
            }

            this.divGrid.jq.animate({ top: 140 }, 350, "swing");
            this.pnlFiltro.mostrarFiltro();
        }

        private setTagGridHtml(tagGridHtml: GridHtml): void
        {
            this.pnlAcaoConsulta.tagGridHtml = tagGridHtml;
        }

        // #endregion Métodos

        // #region Eventos

        public onGridMenuClick(objSender: Object, arg: OnGridMenuClickArg): void
        {
            try
            {
                if (objSender != this.tagGridHtml)
                {
                    return;
                }

                if (arg == null)
                {
                    return;
                }

                this.processarOnGridMenuClick(arg);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onRowDoubleClick(objSender: Object, tagGridRow: GridRow): void
        {
            try
            {
                this.alterar(tagGridRow);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}