/// <reference path="../../../persistencia/TabelaWeb.ts"/>
/// <reference path="../../../server/OnAjaxErroArg.ts"/>
/// <reference path="../../../server/OnAjaxListener.ts"/>
/// <reference path="../../../server/OnAjaxSucessoArg.ts"/>
/// <reference path="../../../server/ServerAjaxDb.ts"/>
/// <reference path="../../../server/SolicitacaoAjaxDb.ts"/>
/// <reference path="../campo/CampoAlfanumerico.ts"/>
/// <reference path="../campo/CampoHtml.ts"/>
/// <reference path="../campo/CampoNumerico.ts"/>
/// <reference path="../form/DivComando.ts"/>
/// <reference path="JanelaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlCadastro extends JanelaHtml implements OnAjaxListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrCmp: Array<CampoHtml>;
        private _divComando: DivComando;
        private _tblWeb: TabelaWeb;

        private get arrCmp(): Array<CampoHtml>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrCmp != null)
                {
                    return this._arrCmp;
                }

                this._arrCmp = this.getArrCmp();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrCmp;
        }

        private get divComando(): DivComando
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divComando != null)
                {
                    return this._divComando;
                }

                this._divComando = new DivComando("DivComando", this);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divComando;
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

        protected fechar(): void
        {
            super.fechar();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                // TODO: Fechar o cadastro.
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

        private getArrCmp(): Array<CampoHtml>
        {
            // #region Variáveis

            var arrCmpJq: any;
            var arrCmpResultado: Array<CampoHtml>;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return;
                }

                arrCmpResultado = new Array<CampoHtml>();

                arrCmpJq = this.jq.find("[clazz*=Campo]");

                if (arrCmpJq == null)
                {
                    return;
                }

                for (var i = 0; i < arrCmpJq.length; i++)
                {
                    this.getArrCmpItem(arrCmpResultado, arrCmpJq[i]);
                }

                return arrCmpResultado;
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

        private getArrCmpItem(arrCmpResultado: Array<CampoHtml>, cmpJq: HTMLElement): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (cmpJq == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(cmpJq.id))
                {
                    return;
                }

                switch ($(cmpJq).attr("clazz"))
                {
                    case "CampoAlfanumerico":
                        arrCmpResultado.push(new CampoAlfanumerico(cmpJq.id));
                        return;

                    case "CampoNumerico":
                        arrCmpResultado.push(new CampoNumerico(cmpJq.id));
                        return;
                }
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
            // #region Variáveis

            var tblWebResultado: TabelaWeb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return null;
                }

                if (Utils.getBooStrVazia(this.jq.attr("tbl_web_nome")))
                {
                    return null;
                }

                tblWebResultado = new TabelaWeb(this.jq.attr("tbl_web_nome"));

                this.getTblWebClnWeb(tblWebResultado);

                return tblWebResultado;
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

        private getTblWebClnWeb(tbl: TabelaWeb): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrCmp == null)
                {
                    return;
                }

                this.arrCmp.forEach((value) => { tbl.addClnWeb(value.cln) });
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

        protected inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializarCampos();
                this.divComando.iniciar();
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

        private inicializarCampos(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrCmp == null)
                {
                    return;
                }

                this.arrCmp.forEach((value) => this.inicializarCampos2(value));
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

        private inicializarCampos2(cmp: CampoHtml): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (cmp == null)
                {
                    return;
                }

                cmp.iniciar();
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

        public salvar(): void
        {
            // #region Variáveis

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!this.validarDados())
                {
                    return;
                }

                objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

                objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.SALVAR;
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

        private salvarResposta(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
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

                this.salvarResposta2(tblWeb);
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

        private salvarResposta2(tblWeb: TabelaWeb): void
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

                if (tblWeb.getBooCritica())
                {
                    this.salvarRespostaErro(tblWeb);
                    return;
                }

                if (this.tblWeb == null)
                {
                    return;
                }
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

        private salvarRespostaErro(tblWeb: TabelaWeb): void
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

                if (!Utils.getBooStrVazia(tblWeb.strCritica))
                {
                    // TOD: Criar mecanismo de mensagens para o usuário e substituir esta função de "alert".
                    window.alert(tblWeb.strCritica);
                }

                if (tblWeb.arrClnWeb == null)
                {
                    return;
                }

                for (var i = 0; i < tblWeb.arrClnWeb.length; i++)
                {
                    this.salvarRespostaErroClnWeb(tblWeb.arrClnWeb[i]);
                }
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

        private salvarRespostaErroClnWeb(clnWeb: ColunaWeb): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (clnWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(clnWeb.strNome))
                {
                    return;
                }

                if (Utils.getBooStrVazia(clnWeb.strCritica))
                {
                    return;
                }

                if (this.arrCmp == null)
                {
                    return;
                }

                this.arrCmp.forEach((cmp) => this.salvarRespostaErroClnWeb2(clnWeb, cmp));
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

        private salvarRespostaErroClnWeb2(clnWeb: ColunaWeb, cmp: CampoHtml): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (cmp == null)
                {
                    return;
                }

                if (cmp.cln == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(cmp.cln.strNome))
                {
                    return;
                }

                if (clnWeb.strNome.toLowerCase() != cmp.cln.strNome.toLowerCase())
                {
                    return;
                }

                cmp.strCritica = clnWeb.strCritica;
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

        private validarDados(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tblWeb == null)
                {
                    return false;
                }

                if (this.arrCmp == null)
                {
                    return false;
                }

                for (var i = 0; i < this.arrCmp.length; i++)
                {
                    if (!this.arrCmp[i].validarDados())
                    {
                        return false;
                    }
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return true;
        }

        // #endregion Métodos

        // #region Eventos

        public onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxSucessoArg): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.salvarResposta(arg.objSolicitacaoAjaxDb);
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
        }

        public onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void
        {
        }

        // #endregion Eventos
    }
}