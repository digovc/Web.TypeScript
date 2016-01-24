/// <reference path="../../componente/grid/GridHtml.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../PaginaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PagConsulta extends PaginaHtml implements OnClickListener, OnAjaxListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: PagConsulta;

        public static get i(): PagConsulta
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (PagConsulta._i != null)
                {
                    return PagConsulta._i;
                }

                PagConsulta._i = new PagConsulta();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return PagConsulta._i;
        }

        private _btnAcao: BotaoAcao;
        private _divGrid: Div;
        private _tagGridHtml: GridHtml;
        private _tblWeb: TabelaWeb;

        private get btnAcao(): BotaoAcao
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnAcao != null)
                {
                    return this._btnAcao;
                }

                this._btnAcao = new BotaoAcao("btnAcao");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnAcao;
        }

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

                this._divGrid = new Div("divGrid");
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
        // #endregion Construtores

        // #region Métodos

        private getTblWeb(): TabelaWeb
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tagBody == null)
                {
                    return null;
                }

                if (this.tagBody.jq == null)
                {
                    return null;
                }

                if (Utils.getBooStrVazia(this.tagBody.jq.attr("tblWebNome")))
                {
                    return null;
                }

                // TODO: Carregar os filtros para a pesquisa.

                return new TabelaWeb(this.tagBody.jq.attr("tblWebNome"));
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

        private pesquisar(): void
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

                if (Utils.getBooStrVazia(tblWeb.tagGrid))
                {
                    return;
                }

                this.divGrid.jq.html(tblWeb.tagGrid);

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

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.btnAcao.addEvtOnClickListener(this);
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
                this.pesquisarResposta(arg.objSolicitacaoAjaxDb);
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
                switch (objSender)
                {
                    case this.btnAcao:
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

    // #region Inicialização

    $(document).ready(() => { PagConsulta.i.iniciar(); });

    // #endregion Inicialização
}