/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="TabItemHead.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabItem extends ComponenteHtml implements OnAjaxListener, OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtiva: boolean;
        private _tabHtml: TabHtml;
        private _tabItemHead: TabItemHead;
        private _tagGridHtml: GridHtml;
        private _tblWeb: TabelaWeb;

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

        private get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private abrirCadastro(): void
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

            this.tabHtml.jnlCadastro.abrirCadastroFilho(this.tblWeb);
        }

        private pesquisar(): void
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

            if (this.tagGridHtml != null)
            {
                return;
            }

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.PESQUISAR_GRID;
            objSolicitacaoAjaxDb.strData = JSON.stringify(this.tblWeb);

            objSolicitacaoAjaxDb.addEvtOnAjaxListener(this);

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

            this.inicializarGridHtml();
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
            if (this.tabItemHead != null)
            {
                this.tabItemHead.booAtiva = this.booAtiva;
            }

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

            if (Utils.getBooStrVazia(this.jq.attr("tbl_web_nome")))
            {
                return null;
            }

            var tblWebResultado: TabelaWeb = new TabelaWeb(this.jq.attr("tbl_web_nome"));

            this.getTblWebTblPai(tblWebResultado);

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

        private inicializarGridHtml(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.tagGridHtml = new GridHtml("tagGridHtml_" + this.tblWeb.strNome);

            this.tagGridHtml.iniciar();

            this.tagGridHtml.btnAdicionar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void
        {
        }

        public onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxErroArg): void
        {
        }

        public onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxSucessoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (arg == null)
                {
                    return;
                }

                if (arg.objSolicitacaoAjaxDb == null)
                {
                    return;
                }

                switch (arg.objSolicitacaoAjaxDb.enmMetodo)
                {
                    case SolicitacaoAjaxDb_EnmMetodo.PESQUISAR_GRID:
                        this.pesquisarSucesso(arg.objSolicitacaoAjaxDb);
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

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.abrirCadastro();
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