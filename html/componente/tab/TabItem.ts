/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="TabItemHead.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabItem extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtiva: boolean;
        private _tabHtml: TabHtml;
        private _tabItemHead: TabItemHead;
        private _tagGridHtml: GridHtml;
        private _tblWeb: TabelaWeb;
        private _tblWebPrincipal: TabelaWeb;

        public get booAtiva(): boolean
        {
            return this._booAtiva;
        }

        public set booAtiva(booAtiva: boolean)
        {
            if (this._booAtiva == booAtiva)
            {
                return;
            }

            this._booAtiva = booAtiva;

            this.atualizarBooAtiva();
        }

        public get tabHtml(): TabHtml
        {
            return this._tabHtml;
        }

        public set tabHtml(tabHtml: TabHtml)
        {
            this._tabHtml = tabHtml;
        }

        private get tabItemHead(): TabItemHead
        {
            if (this._tabItemHead != null)
            {
                return this._tabItemHead;
            }

            this._tabItemHead = this.getTabItemHead();

            return this._tabItemHead;
        }

        private get tagGridHtml(): GridHtml
        {
            return this._tagGridHtml;
        }

        private set tagGridHtml(tagGridHtml: GridHtml)
        {
            this._tagGridHtml = tagGridHtml;
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

        public get tblWebPrincipal(): TabelaWeb
        {
            if (this._tblWebPrincipal != null)
            {
                return this._tblWebPrincipal;
            }

            this._tblWebPrincipal = this.getTblWebPrincipal();

            return this._tblWebPrincipal;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirCadastro(booAlterar: boolean): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            if (this.tblWeb.intRegistroPaiId < 1)
            {
                return;
            }

            if (this.tabHtml == null)
            {
                return;
            }

            if (this.tabHtml.jnlCadastro == null)
            {
                return;
            }

            if (booAlterar && (this.tagGridHtml.getIntRowSelecionadaId() < 1))
            {
                window.alert("Selecione um registro para ser alterado.");
                return;
            }

            this.tblWeb.clnWebIntId.intValor = (booAlterar) ? this.tagGridHtml.getIntRowSelecionadaId() : 0;

            this.tabHtml.jnlCadastro.abrirCadastroFilho(this.tblWeb);
        }

        public apagar(): void
        {
            var intRegistroId = this.tagGridHtml.getIntRowSelecionadaId();

            // TODO: Validar se esta tabela permite a exclusão de registros.
            if (intRegistroId < 1)
            {
                window.alert("Selecione um registro antes.");
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            // TODO: Implementar.
        }

        public pesquisar(): void
        {
            if (!this.booAtiva)
            {
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            if (this.tblWeb.intRegistroPaiId < 1)
            {
                return;
            }

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

            this.jq.html(objSolicitacaoAjaxDb.strData);

            this.pesquisarSucessoGridHtml();
        }

        private pesquisarSucessoGridHtml(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.tagGridHtml = new GridHtml("tagGridHtml_" + this.tblWeb.strNome);

            this.tagGridHtml.iniciar();
        }

        public ativar(): void
        {
            if (this.tabHtml == null)
            {
                return;
            }

            this.tabHtml.ativar(this);
        }

        private atualizarBooAtiva(): void
        {
            this.tabItemHead.booAtiva = this.booAtiva;

            if (!this.booAtiva)
            {
                return;
            }

            this.tabHtml.tabItemAtiva = this;

            this.pesquisar();
        }

        private getTabItemHead(): TabItemHead
        {
            if (this.tabHtml == null)
            {
                return null;
            }

            var tabItemHeadResultado: TabItemHead = new TabItemHead(this.strId + "_tabItemHead");

            tabItemHeadResultado.tabItem = this;

            return tabItemHeadResultado;
        }

        private getTblWeb(): TabelaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            var strTblWebNome: string = this.jq.attr("tbl_web_nome");

            if (Utils.getBooStrVazia(strTblWebNome))
            {
                return null;
            }

            var tblWebResultado: TabelaWeb = new TabelaWeb(strTblWebNome);

            this.getTblWebTblPai(tblWebResultado);

            return tblWebResultado;
        }

        private getTblWebPrincipal(): TabelaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            var strTblWebNome: string = this.jq.attr("tbl_web_principal_nome");

            if (Utils.getBooStrVazia(strTblWebNome))
            {
                return null;
            }

            var tblWebResultado: TabelaWeb = new TabelaWeb(strTblWebNome);

            return tblWebResultado;
        }

        private getTblWebTblPai(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (this.tabHtml == null)
            {
                return;
            }

            if (this.tabHtml.jnlCadastro == null)
            {
                return;
            }

            tblWeb.intRegistroPaiId = this.tabHtml.jnlCadastro.intRegistroId;
            tblWeb.strTblPaiNome = this.tabHtml.jnlCadastro.tblWeb.strNome;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.tabItemHead.iniciar();
        }

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}