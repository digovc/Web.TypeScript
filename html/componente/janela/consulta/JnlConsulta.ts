/// <reference path="../../../Div.ts"/>
/// <reference path="../../../pagina/PagPrincipal.ts"/>
/// <reference path="../../grid/GridHtml.ts"/>
/// <reference path="../../grid/OnRowDoubleClickListener.ts"/>
/// <reference path="../JanelaHtml.ts"/>
/// <reference path="PainelAcaoConsulta.ts"/>
/// <reference path="PainelFiltro.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlConsulta extends JanelaHtml implements OnRowDoubleClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divGrid: Div;
        private _jnlCadastro: JnlCadastro;
        private _pagPrincipal: PagPrincipal;
        private _pnlAcaoConsulta: PainelAcaoConsulta;
        private _pnlFiltro: PainelFiltro;
        private _tagGridHtml: GridHtml;
        private _tblWeb: TabelaWeb;
        private _viwAtual: TabelaWeb;

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

            this.atualizarTagGridHtml();
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

        // #region Construtores

        constructor(pagPrincipal: PagPrincipal)
        {
            super("jnlConsulta", pagPrincipal);

            this.pagPrincipal = pagPrincipal;
        }

        // #endregion Construtores

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
                window.alert("Selecione um registro primeiro.");
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

        public abrirFiltroCadastro(): void
        {
            if (this.viwAtual == null)
            {
                return;
            }

            this.pagPrincipal.abrirFiltroCadastro(0);
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

        private atualizarTagGridHtml(): void
        {
            this.pnlAcaoConsulta.tagGridHtml = this.tagGridHtml;
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

            ServerHttp.i.atualizarCssMain();

            this.pnlAcaoConsulta.iniciar();
            this.pnlFiltro.iniciar();
        }

        private inicializarGridHtml(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.tagGridHtml = new GridHtml(this.jq.find("[clazz=GridHtml]")[0].id);

            this.tagGridHtml.iniciar();

            this.tagGridHtml.addEvtOnRowDoubleClickListener(this);
        }

        public maximinizarGrid(): void
        {
            if (this.divGrid.jq.css("top") == "40")
            {
                return;
            }

            this.divGrid.jq.animate({ top: 40 });
            this.pnlFiltro.esconderFiltro();
        }

        public pesquisar(): void
        {
            this.pnlFiltro.atualizarLstFiltro(this.tblWeb);

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.PESQUISAR_GRID;
            objSolicitacaoAjaxDb.strData = JSON.stringify(this.tblWeb);

            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjaxDb: SolicitacaoAjaxDb) => { this.pesquisarSucesso(objSolicitacaoAjaxDb); });

            ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
        }

        private pesquisarSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return;
            }

            ServerHttp.i.atualizarCssMain();

            this.divGrid.jq.html(objSolicitacaoAjaxDb.strData);

            this.inicializarGridHtml();

            this.maximinizarGrid();
        }

        public restaurarGrid(): void
        {
            if (Utils.getBooStrVazia(this.divGrid.jq.css("top")))
            {
                return;
            }

            this.divGrid.jq.animate({ top: 130 });
            this.pnlFiltro.mostrarFiltro();
        }

        // #endregion Métodos

        // #region Eventos

        public onRowDoubleClick(objSender: Object, tagGridRow: GridRow): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.alterar(tagGridRow);
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

    // #region Inicialização

    // #endregion Inicialização
}