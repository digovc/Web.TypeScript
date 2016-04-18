/// <reference path="../../../../server/OnAjaxListener.ts"/>
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

    export class JnlConsulta extends JanelaHtml implements OnAjaxListener, OnRowDoubleClickListener
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

        private get divGrid(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divGrid != null)
                {
                    return this._divGrid;
                }

                this._divGrid = new Div(this.strId + "_divGrid");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._pnlAcaoConsulta != null)
                {
                    return this._pnlAcaoConsulta;
                }

                this._pnlAcaoConsulta = new PainelAcaoConsulta(this);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._pnlAcaoConsulta;
        }

        private get pnlFiltro(): PainelFiltro
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._pnlFiltro != null)
                {
                    return this._pnlFiltro;
                }

                this._pnlFiltro = new PainelFiltro(this);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._pnlFiltro;
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tblWeb != null)
                {
                    return this._tblWeb;
                }

                this._tblWeb = this.getTblWeb();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(pagPrincipal: PagPrincipal)
        {
            super("jnlConsulta", pagPrincipal);

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.pagPrincipal = pagPrincipal;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Construtores

        // #region Métodos

        public abrirCadastro(intRegistroId: number): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tblWeb == null)
                {
                    return;
                }

                this.tblWeb.intRegistroId = intRegistroId;

                this.pagPrincipal.abrirCadastro(this.tblWeb);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public abrirFiltroCadastro(): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(this.tblWeb.strNome))
                {
                    return;
                }

                this.pagPrincipal.abrirFiltroCadastro(0);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private adicionarResposta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private alterar(tagGridRow: GridRow): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected getTagBody(): Tag
        {
            // #region Variáveis

            var tagBodyResultado: Tag;

            // #endregion Variáveis

            // #region Ações
            try
            {
                tagBodyResultado = new Tag("body_consulta");

                return tagBodyResultado;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
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

            // TODO: Carregar os filtros para a pesquisa.

            return new TabelaWeb(this.jq.attr("tbl_web_nome"));
        }

        protected inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.pnlAcaoConsulta.iniciar();
                this.pnlFiltro.iniciar();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private inicializarGridHtml(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.tagGridHtml = new GridHtml("tagGridHtml_consulta");

                this.tagGridHtml.iniciar();

                this.tagGridHtml.addEvtOnRowDoubleClickListener(this);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public pesquisar(): void
        {
            // #region Variáveis

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

                objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.PESQUISAR;
                objSolicitacaoAjaxDb.jsn = JSON.stringify(this.tblWeb);

                objSolicitacaoAjaxDb.addEvtOnAjaxListener(this);

                ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private pesquisarResposta(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            // #region Variáveis

            var tblWeb: TabelaWeb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (objSolicitacaoAjaxDb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.jsn))
                {
                    return;
                }

                tblWeb = new TabelaWeb(this.tblWeb.strNome);

                tblWeb.carregarDados(JSON.parse(objSolicitacaoAjaxDb.jsn));

                this.pesquisarResposta2(tblWeb);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private pesquisarResposta2(tblWeb: TabelaWeb): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(tblWeb.tag))
                {
                    return;
                }

                ServerHttp.i.atualizarCssMain();

                this.divGrid.jq.html(tblWeb.tag);

                this.inicializarGridHtml();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Métodos

        // #region Eventos

        public onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
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

        public onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxErroArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
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
                    case SolicitacaoAjaxDb_EnmMetodo.PESQUISAR:
                        this.pesquisarResposta(arg.objSolicitacaoAjaxDb);
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