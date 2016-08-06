/// <reference path="../../../Div.ts"/>
/// <reference path="../../../pagina/PagPrincipal.ts"/>
/// <reference path="../../grid/GridHtml.ts"/>
/// <reference path="../../grid/OnRowDoubleClickListener.ts"/>
/// <reference path="../JanelaHtml.ts"/>
/// <reference path="PainelAcaoConsulta.ts"/>
/// <reference path="PainelFiltro.ts"/>

module NetZ_Web
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

            this.tblWeb.clnWebIntId.intValor = intRegistroId;

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
                new Notificacao("Selecione um registro primeiro.").abrirNotificacao();
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

        private atualizarTagGridHtml(): void
        {
            this.pnlAcaoConsulta.tagGridHtml = this.tagGridHtml;
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

            ServerHttp.i.atualizarCssMain();

            this.pnlAcaoConsulta.iniciar();
            this.pnlFiltro.iniciar();
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

            this.divGrid.jq.animate({ top: 50 });
            this.pnlFiltro.esconderFiltro();
        }

        public pesquisar(): void
        {
            if (AppWeb.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            this.pnlFiltro.atualizarArrFiltro(this.tblWeb);

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_PESQUISAR_GRID;
            objInterlocutor.strData = JSON.stringify(this.tblWeb);

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.pesquisarSucesso(objInterlocutor); });

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private pesquisarSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objInterlocutor.strData))
            {
                return;
            }

            ServerHttp.i.atualizarCssMain();

            this.divGrid.jq.html(objInterlocutor.strData);

            this.inicializartagGridHtml();

            this.maximinizarGrid();
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

            this.divGrid.jq.animate({ top: 140 });
            this.pnlFiltro.mostrarFiltro();
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