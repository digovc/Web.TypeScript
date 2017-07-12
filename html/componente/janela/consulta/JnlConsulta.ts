/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../../Div.ts"/>
/// <reference path="../../../pagina/PagPrincipalBase.ts"/>
/// <reference path="../../table/TableHtml.ts"/>
/// <reference path="../../table/OnTableRowDoubleClickListener.ts"/>
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

    export class JnlConsulta extends JanelaHtml implements OnTableMenuClickListener, OnTableRowDoubleClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnFavorito: BtnFavorito;
        private _divTableConteudo: Div;
        private _jnlCadastro: JnlCadastro;
        private _pagPrincipal: PagPrincipalBase;
        private _pnlAcaoConsulta: PainelAcaoConsulta;
        private _pnlFiltro: PainelFiltro;
        private _tagTable: TableHtml;
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

        private get divTableConteudo(): Div
        {
            if (this._divTableConteudo != null)
            {
                return this._divTableConteudo;
            }

            this._divTableConteudo = new Div(this.strId + "__divTableConteudo");

            return this._divTableConteudo;
        }

        private get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        private get pagPrincipal(): PagPrincipalBase
        {
            return this._pagPrincipal;
        }

        private set pagPrincipal(pagPrincipal: PagPrincipalBase)
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

        private get tagTable(): TableHtml
        {
            return this._tagTable;
        }

        private set tagTable(tagTable: TableHtml)
        {
            if (this._tagTable == tagTable)
            {
                return;
            }

            this._tagTable = tagTable;

            this.setTagTable(tagTable);
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

        constructor(pagPrincipal: PagPrincipalBase)
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

            this.abrirCadastroTagTable(intRegistroId);
        }

        public abrirCadastroSelecionado(): void
        {
            if (this.tagTable == null)
            {
                return;
            }

            if (this.tagTable.rowSelecionada == null)
            {
                Notificacao.notificar("Selecione um registro primeiro.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            this.abrirCadastro(this.tagTable.rowSelecionada.intId);
        }

        private abrirCadastroTagTable(intRegistroId: number): void
        {
            if (this.tagTable == null)
            {
                return;
            }

            this.tagTable.selecinarTudo(false);
            this.tagTable.selecinar(intRegistroId, true);
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

        private alterar(row: TableRow): void
        {
            if (row == null)
            {
                return;
            }

            if (row.intId < 1)
            {
                return;
            }

            this.abrirCadastro(row.intId);
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

        private inicializarTagTable(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.tagTable = new TableHtml(this.jq.find("[clazz=" + TableHtml.name + "]")[0].id);

            this.tagTable.iniciar();

            this.tagTable.addEvtOnTableMenuClickListener(this);
            this.tagTable.addEvtOnTableRowDoubleClickListener(this);
        }

        public maximinizarTable(): void
        {
            if (this.divTableConteudo.jq.css("top") == "50")
            {
                return;
            }

            this.divTableConteudo.jq.animate({ top: 50 }, 350, "swing");

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

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_PESQUISAR_TABLE;

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

            this.divTableConteudo.jq.html(objInterlocutor.objData.toString());

            this.inicializarTagTable();

            this.maximinizarTable();
        }

        private pesquisarSucessoCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        private processarOnTableMenuClick(arg: OnTableMenuClickArg): void
        {
            switch (arg.enmTipo)
            {
                case OnTableMenuClickArg_EnmAcao.ADICIONAR:
                    this.abrirCadastro(0);
                    return;

                case OnTableMenuClickArg_EnmAcao.ALTERAR:
                    this.alterar(arg.tagTableRow);
                    return;

                case OnTableMenuClickArg_EnmAcao.MENU:
                    this.abrirMenu(arg.argOrigem);
                    return;
            }
        }

        public restaurarTable(): void
        {
            if (Utils.getBooStrVazia(this.divTableConteudo.jq.css("top")))
            {
                return;
            }

            this.divTableConteudo.jq.animate({ top: 140 }, 350, "swing");

            this.pnlFiltro.mostrarFiltro();
        }

        private setTagTable(tagTable: TableHtml): void
        {
            this.pnlAcaoConsulta.tagTable = tagTable;
        }

        // #endregion Métodos

        // #region Eventos

        public onTableMenuClick(objSender: Object, arg: OnTableMenuClickArg): void
        {
            try
            {
                if (objSender != this.tagTable)
                {
                    return;
                }

                if (arg == null)
                {
                    return;
                }

                this.processarOnTableMenuClick(arg);
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onTableRowDoubleClick(objSender: Object, tagTableRow: TableRow): void
        {
            try
            {
                this.alterar(tagTableRow);
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}