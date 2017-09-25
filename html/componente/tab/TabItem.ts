// #region Reference

/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="TabItemHead.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabItem extends ComponenteHtmlBase implements OnTableMenuClickListener, OnTableRowClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtiva: boolean;
        private _tabHtml: TabHtml;
        private _tabItemHead: TabItemHead;
        private _tagTable: TableHtml;
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

            this.setBooAtiva(this._booAtiva);
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

        private get tagTable(): TableHtml
        {
            return this._tagTable;
        }

        private set tagTable(tagTable: TableHtml)
        {
            this._tagTable = tagTable;
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

        // #region Construtor
        // #endregion Construtor

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

            if (booAlterar && (this.tagTable.getIntRowSelecionadaId() < 1))
            {
                Notificacao.notificar("Selecione um registro primeiro.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            this.tblWeb.clnIntId.intValor = (booAlterar) ? this.tagTable.getIntRowSelecionadaId() : 0;

            this.tabHtml.frm.abrirCadastroFilho(this.tblWeb);
        }

        private abrirMenu(arg: JQueryEventObject): void
        {
        }

        public apagar(): void
        {
            var intRegistroId = this.tagTable.getIntRowSelecionadaId();

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

            if (this.tagTable == null)
            {
                return;
            }

            if (this.tagTable.intRowSelecionadaQtd < 1)
            {
                return;
            }

            this.tabHtml.btnAlterar.anm.fadeIn();
        }

        public pesquisar(): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
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

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_PESQUISAR_TABLE;
            objInterlocutor.objData = JSON.stringify(this.tblWeb);

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
                return;
            }

            this.pesquisarSucessoCssMain();

            this.jq.html(objInterlocutor.objData.toString());

            this.pesquisarSucessoTable();
        }

        private pesquisarSucessoCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        private pesquisarSucessoTable(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.tagTable = new TableHtml("tagTableHtml_" + this.tblWeb.strNome);

            this.tagTable.iniciar();

            this.tagTable.addEvtOnTableMenuClickListener(this);
            this.tagTable.addEvtOnTableRowClickListener(this);
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

        private processarOnTableMenuClick(arg: OnTableMenuClickArg): void
        {
            switch (arg.enmTipo)
            {
                case OnTableMenuClickArg_EnmAcao.ADICIONAR:
                    this.abrirCadastro(false);
                    return;

                case OnTableMenuClickArg_EnmAcao.ALTERAR:
                    this.abrirCadastro(true);
                    return;

                case OnTableMenuClickArg_EnmAcao.MENU:
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

            if (this.tagTable == null)
            {
                return;
            }

            if (this.tagTable.intRowSelecionadaQtd < 1)
            {
                return;
            }

            this.tabHtml.btnAlterar.anm.fadeIn();
        }

        private setBooAtiva(booAtiva: boolean): void
        {
            this.tabItemHead.booSelecionado = booAtiva;

            if (!booAtiva)
            {
                this.booVisivel = false;
                return;
            }

            this.tabHtml.tabItemAtiva = this;

            this.pesquisar();
            this.anm.fadeIn();
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

        public onTableRowClick(objSender: Object, tagTableRow: TableRow): void
        {
            try
            {
                switch (objSender)
                {
                    case this.tagTable:
                        this.processarOnRowClick();
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