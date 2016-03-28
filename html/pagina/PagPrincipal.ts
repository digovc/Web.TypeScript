/// <reference path="../../OnCloseListener.ts"/>
/// <reference path="../../persistencia/TabelaWeb.ts"/>
/// <reference path="../../server/ServerHttp.ts"/>
/// <reference path="../componente/janela/cadastro/JnlCadastro.ts"/>
/// <reference path="../componente/janela/consulta/JnlConsulta.ts"/>
/// <reference path="../Div.ts"/>
/// <reference path="PaginaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagPrincipal extends PaginaHtml implements OnAjaxListener, OnCloseListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divCadastro: Div;
        private _divConsulta: Div;
        private _jnlCadastro: JnlCadastro;
        private _jnlConsulta: JnlConsulta;

        private get divCadastro(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divCadastro != null)
                {
                    return this._divCadastro;
                }

                this._divCadastro = new Div("divCadastro");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divCadastro;
        }

        private get divConsulta(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divConsulta != null)
                {
                    return this._divConsulta;
                }

                this._divConsulta = new Div("divConsulta");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divConsulta;
        }

        public get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        public set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
        }

        private get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        private set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirCadastro(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

            // #endregion Variáveis

            // #region Ações
            try
            {

                if (tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(tblWeb.strNome))
                {
                    return;
                }

                this.divCadastro.esconder();

                objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

                objSolicitacaoAjaxDb.addEvtOnAjaxListener(this);

                objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.ABRIR_CADASTRO;
                objSolicitacaoAjaxDb.jsn = JSON.stringify(tblWeb);

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

        private abrirCadastroResposta(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
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

                tblWeb = new TabelaWeb(null);

                tblWeb.carregarDados(JSON.parse(objSolicitacaoAjaxDb.jsn));

                this.abrirCadastroResposta2(tblWeb);
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

        private abrirCadastroResposta2(tblWeb: TabelaWeb): void
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

                this.divCadastro.jq.html(tblWeb.tag);

                this.inicializarCadastro();
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

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(tblWeb.strNome))
                {
                    return;
                }

                this.divConsulta.esconder();

                objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

                objSolicitacaoAjaxDb.addEvtOnAjaxListener(this);

                objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.ABRIR_CONSULTA;
                objSolicitacaoAjaxDb.jsn = JSON.stringify(tblWeb);

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

        private abrirConsultaResposta(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
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

                tblWeb = new TabelaWeb(null);

                tblWeb.carregarDados(JSON.parse(objSolicitacaoAjaxDb.jsn));

                this.abrirConsultaResposta2(tblWeb);
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

        private abrirConsultaResposta2(tblWeb: TabelaWeb): void
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

                this.divConsulta.jq.html(tblWeb.tag);

                this.inicializarConsulta();
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

        public abrirFiltroCadastro(intFiltroId: number): void
        {
            // #region Variáveis

            var tblWebFiltro: TabelaWeb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                tblWebFiltro = new TabelaWeb("tbl_filtro");

                tblWebFiltro.intRegistroId = intFiltroId;

                this.abrirCadastro(tblWebFiltro);
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

        private carregarJsCadastro(): void
        {
            // #region Variáveis

            var srcJqCadastro: string;
            var tagScriptCadastro: HTMLScriptElement;

            // #endregion Variáveis

            // #region Ações
            try
            {
                srcJqCadastro = this.divCadastro.jq.children().attr("js_src");

                if (Utils.getBooStrVazia(srcJqCadastro))
                {
                    return;
                }

                tagScriptCadastro = document.createElement("script");

                tagScriptCadastro.src = srcJqCadastro;
                tagScriptCadastro.type = "text/javascript";

                document.head.appendChild(tagScriptCadastro);
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

        private fecharCadastro(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.esconder();
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

        private fecharConsulta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divConsulta.esconder();
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

        private inicializarCadastro(): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.mostrar();

                this.carregarJsCadastro();
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

        private inicializarConsulta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divConsulta.mostrar();

                this.jnlConsulta = new JnlConsulta(this);

                this.jnlConsulta.addEvtOnCloseListener(this);

                this.jnlConsulta.iniciar();
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

        private inicializarFiltroCadastro(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.mostrar();
                this.carregarJsCadastro();
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
                switch ((<SolicitacaoAjaxDb>objSolicitacaoAjaxSender).enmMetodo)
                {
                    case SolicitacaoAjaxDb_EnmMetodo.ABRIR_CADASTRO:
                        this.abrirCadastroResposta(arg.objSolicitacaoAjaxDb);
                        return;

                    case SolicitacaoAjaxDb_EnmMetodo.ABRIR_CONSULTA:
                        this.abrirConsultaResposta(arg.objSolicitacaoAjaxDb);
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

        public onClose(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.jnlCadastro:
                        this.fecharCadastro();
                        return

                    case this.jnlConsulta:
                        this.fecharConsulta();
                        return
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