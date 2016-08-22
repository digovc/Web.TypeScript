/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="TabItemHead.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabItem extends ComponenteHtml implements OnGridMenuClickListener, OnRowClickListener
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

            if (this.tabHtml == null)
            {
                return;
            }

            if (this.tabHtml.frm == null)
            {
                return;
            }

            if (this.tabHtml.frm.jnlCadastro == null)
            {
                return;
            }

            if (this.tabHtml.frm.jnlCadastro.intRegistroId < 1)
            {
                return;
            }

            this.tblWeb.intRegistroPaiId = this.tabHtml.frm.jnlCadastro.intRegistroId;

            if (booAlterar && (this.tagGridHtml.getIntRowSelecionadaId() < 1))
            {
                Notificacao.notificar("Selecione um registro primeiro.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            this.tblWeb.clnWebIntId.intValor = (booAlterar) ? this.tagGridHtml.getIntRowSelecionadaId() : 0;

            this.tabHtml.frm.abrirCadastroFilho(this.tblWeb);
        }

        private abrirMenu(arg: JQueryEventObject): void
        {
        }

        public apagar(): void
        {
            var intRegistroId = this.tagGridHtml.getIntRowSelecionadaId();

            // TODO: Validar se esta tabela permite a exclusão de registros.
            if (intRegistroId < 1)
            {
                Notificacao.notificar("Selecione um registro primeiro.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            // TODO: Implementar.
        }

        public ativar(): void
        {
            if (this.tabHtml == null)
            {
                return;
            }

            this.tabHtml.ativar(this);

            this.ativarTabHtmlBtnAlterar();
        }

        private ativarTabHtmlBtnAlterar(): void
        {
            this.tabHtml.btnAlterar.esconder();

            if (this.tagGridHtml == null)
            {
                return;
            }

            if (this.tagGridHtml.intRowSelecionadaQtd < 1)
            {
                return;
            }

            this.tabHtml.btnAlterar.mostrar();
        }

        private atualizarBooAtiva(): void
        {
            this.tabItemHead.booSelecionado = this.booAtiva;

            if (!this.booAtiva)
            {
                this.booVisivel = false;
                return;
            }

            this.tabHtml.tabItemAtiva = this;

            this.pesquisar();
            this.mostrar();
        }

        public pesquisar(): void
        {
            if (AppWeb.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

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

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_PESQUISAR_GRID;
            objInterlocutor.objData = JSON.stringify(this.tblWeb);

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.pesquisarSucesso(objInterlocutor); });

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
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

            if (objInterlocutor.objData == ServerAjax.STR_RESULTADO_VAZIO)
            {
                return;
            }

            this.pesquisarSucessoCssMain();

            this.jq.html(objInterlocutor.objData.toString());

            this.pesquisarSucessoGridHtml();
        }

        private pesquisarSucessoCssMain(): void
        {
            if (AppWeb.i.srvHttp == null)
            {
                return;
            }

            AppWeb.i.srvHttp.atualizarCssMain();
        }

        private pesquisarSucessoGridHtml(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.tagGridHtml = new GridHtml("tagGridHtml_" + this.tblWeb.strNome);

            this.tagGridHtml.iniciar();

            this.tagGridHtml.addEvtOnGridMenuClickListener(this);
            this.tagGridHtml.addEvtOnRowClickListener(this);
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

            if (this.tabHtml.frm == null)
            {
                return;
            }

            if (this.tabHtml.frm.jnlCadastro == null)
            {
                return;
            }

            tblWeb.intRegistroPaiId = this.tabHtml.frm.jnlCadastro.intRegistroId;
            tblWeb.strTblPaiNome = this.tabHtml.frm.jnlCadastro.tblWeb.strNome;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.tabItemHead.iniciar();
        }

        private processarOnGridMenuClick(arg: OnGridMenuClickArg): void
        {
            switch (arg.enmTipo)
            {
                case OnGridMenuClickArg_EnmAcao.ADICIONAR:
                    this.abrirCadastro(false);
                    return;

                case OnGridMenuClickArg_EnmAcao.ALTERAR:
                    this.abrirCadastro(true);
                    return;

                case OnGridMenuClickArg_EnmAcao.MENU:
                    this.abrirMenu(arg.argOrigem);
                    return;
            }
        }

        private processarOnRowClick(): void
        {
            if (this.tabHtml == null)
            {
                return;
            }

            if (this.tagGridHtml == null)
            {
                return;
            }

            if (this.tagGridHtml.intRowSelecionadaQtd < 1)
            {
                return;
            }

            this.tabHtml.btnAlterar.mostrar();
        }

        // #endregion Métodos

        // #region Eventos

        public onGridMenuClick(objSender: Object, arg: OnGridMenuClickArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
            finally
            {
            }
            // #endregion Ações
        }

        public onRowClick(objSender: Object, tagGridRow: GridRow): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.tagGridHtml:
                        this.processarOnRowClick();
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