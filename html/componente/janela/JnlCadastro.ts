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
        private _tbl: TabelaWeb;

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

        private get tbl(): TabelaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tbl != null)
                {
                    return this._tbl;
                }

                this._tbl = this.getTbl();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tbl;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

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

        private getTbl(): TabelaWeb
        {
            // #region Variáveis

            var tblResultado: TabelaWeb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                tblResultado = new TabelaWeb(this.jq.attr("tbl"));

                this.getTblItem(tblResultado);

                return tblResultado;
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

        private getTblItem(tbl: TabelaWeb): void
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

                this.arrCmp.forEach((value) => { tbl.addCln(value.cln) });
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

                this.arrCmp.forEach((value) => this.inicializarCamposItem(value));
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

        private inicializarCamposItem(cmp: CampoHtml): void
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

                objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.SALVAR_REGISTRO;
                objSolicitacaoAjaxDb.objJsonEnvio = this.getTbl();

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

        private validarDados(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.getTbl() == null)
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

        public onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, e: OnAjaxSucessoArg): void
        {
            if (e == null)
            {
                return;
            }

            if (e.anyData == null)
            {
                return;
            }

            window.alert(e.anyData);
        }

        public onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, e: OnAjaxErroArg): void
        {
        }

        public onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void
        {
        }

        // #endregion Eventos
    }
}