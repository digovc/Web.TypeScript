/// <reference path="../../../../server/OnAjaxErroArg.ts"/>
/// <reference path="../../../../server/OnAjaxListener.ts"/>
/// <reference path="../../../../server/OnAjaxSucessoArg.ts"/>
/// <reference path="../../../../server/ServerAjaxDb.ts"/>
/// <reference path="../../../../server/SolicitacaoAjaxDb.ts"/>
/// <reference path="../../campo/CampoAlfanumerico.ts"/>
/// <reference path="../../campo/CampoCheckBox.ts"/>
/// <reference path="../../campo/CampoHtml.ts"/>
/// <reference path="../../campo/CampoNumerico.ts"/>
/// <reference path="../../tab/TabHtml.ts"/>
/// <reference path="../JanelaHtml.ts"/>
/// <reference path="DivComando.ts"/>

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
        private _cmpIntId: CampoNumerico;
        private _divComando: DivComando;
        private _intRegistroId: number;
        private _pagPrincipal: PagPrincipal;
        private _tabHtml: TabHtml;
        private _tblWeb: TabelaWeb;

        private get arrCmp(): Array<CampoHtml>
        {
            if (this._arrCmp != null)
            {
                return this._arrCmp;
            }

            this._arrCmp = this.getArrCmp();

            return this._arrCmp;
        }

        private get cmpIntId(): CampoNumerico
        {
            if (this._cmpIntId != null)
            {
                return this._cmpIntId;
            }

            this._cmpIntId = this.getCmp("int_id");

            return this._cmpIntId;
        }

        private get divComando(): DivComando
        {
            if (this._divComando != null)
            {
                return this._divComando;
            }

            this._divComando = new DivComando((this.strId + "_divComando"), this);

            return this._divComando;
        }

        public get intRegistroId(): number
        {
            this._intRegistroId = this.getIntRegistroId();

            return this._intRegistroId;
        }

        private get pagPrincipal(): PagPrincipal
        {
            return this._pagPrincipal;
        }

        private set pagPrincipal(pagPrincipal: PagPrincipal)
        {
            this._pagPrincipal = pagPrincipal;

            this.atualizarPagPrincipal();
        }

        private get tabHtml(): TabHtml
        {
            if (this._tabHtml != null)
            {
                return this._tabHtml;
            }

            this._tabHtml = this.getTabHtml();

            return this._tabHtml;
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

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, pagPrincipal: PagPrincipal)
        {
            super(strId, pagPrincipal);

            this.pagPrincipal = pagPrincipal;
        }

        // #endregion Construtores

        // #region Métodos

        public abrirCadastroFilho(tblWebFilho: TabelaWeb): void
        {
            if (tblWebFilho == null)
            {
                return;
            }

            if (this.pagPrincipal == null)
            {
                return;
            }

            this.pagPrincipal.abrirCadastro(tblWebFilho);

            this.booAtivo = false;
        }

        private atualizarPagPrincipal(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            this.pagPrincipal.jnlCadastro = this;
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
                    this.getArrCmp2(arrCmpResultado, arrCmpJq[i]);
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

        private getArrCmp2(arrCmpResultado: Array<CampoHtml>, cmpJq: HTMLElement): void
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

                case "CampoCheckBox":
                    arrCmpResultado.push(new CampoCheckBox(cmpJq.id));
                    return;

                case "CampoComboBox":
                    arrCmpResultado.push(new CampoComboBox(cmpJq.id));
                    return;

                case "CampoNumerico":
                    arrCmpResultado.push(new CampoNumerico(cmpJq.id));
                    return;
            }
        }

        /**
         * Busca na lista de campos desta janela de cadastro o
         * campo que represente a coluna com o nome passado por parãmetro.
         * @param strClnNome Nome da coluna que o campo representa.
         */
        public getCmp(strClnNome: string): CampoHtml
        {
            if (Utils.getBooStrVazia(strClnNome))
            {
                return null;
            }

            if (this.arrCmp == null)
            {
                return null;
            }

            var cmpResultado: CampoHtml;

            this.arrCmp.some((cmp) =>
            {
                cmpResultado = this.getCmp2(strClnNome, cmp);

                return cmpResultado != null;
            });

            return cmpResultado;
        }

        private getCmp2(strClnNome: string, cmp: CampoHtml): CampoHtml
        {
            if (cmp == null)
            {
                return null;
            }

            if (cmp.cln == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(cmp.cln.strNome))
            {
                return null;
            }

            if (strClnNome.toLowerCase() != cmp.cln.strNome.toLowerCase())
            {
                return null;
            }

            return cmp;
        }

        private getIntRegistroId(): number
        {
            if (this.cmpIntId == null)
            {
                return 0;
            }

            if (this.cmpIntId.tagInput == null)
            {
                return 0;
            }

            return this.cmpIntId.tagInput.intValor;
        }

        private getTabHtml(): TabHtml
        {
            var strTabHtmlId: string = (this.strId + "_tabHtml");

            if (document.getElementById(strTabHtmlId) == null)
            {
                return null;
            }

            var tabHtmlResultado: TabHtml = new TabHtml(strTabHtmlId);

            tabHtmlResultado.jnlCadastro = this;

            return tabHtmlResultado;
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

        private getTblWebClnWeb(tblWeb: TabelaWeb): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { this.getTblWebClnWeb2(tblWeb, cmp); });
        }

        private getTblWebClnWeb2(tblWeb: TabelaWeb, cmp: CampoHtml): void
        {
            if (cmp == null)
            {
                return;
            }

            if (cmp.tagInput == null)
            {
                return;
            }

            if (cmp.tagInput.booVazio)
            {
                return;
            }

            tblWeb.addClnWeb(cmp.cln);
        }

        protected inicializar(): void
        {
            this.inicializarCampos();

            this.divComando.iniciar();
        }

        private inicializarCampos(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((value) => this.inicializarCampos2(value));
        }

        private inicializarCampos2(cmp: CampoHtml): void
        {
            if (cmp == null)
            {
                return;
            }

            cmp.iniciar();
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
                    return; // TODO: Verificar a necessidade de validar o porque do JSON voltar vazio.
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
            if (tblWeb == null)
            {
                return;
            }

            if (tblWeb.getBooCritica())
            {
                this.salvarResposta2Erro(tblWeb);
                return;
            }

            this.salvarResposta2Sucesso(tblWeb);
        }

        private salvarResposta2Erro(tblWeb: TabelaWeb): void
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

            tblWeb.arrClnWeb.forEach((clnWeb) => { this.salvarResposta2ErroClnWeb(clnWeb); });
        }

        private salvarResposta2ErroClnWeb(clnWeb: ColunaWeb): void
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

            var cmp: CampoHtml = this.getCmp(clnWeb.strNome);

            if (cmp == null)
            {
                return;
            }

            cmp.strCritica = clnWeb.strCritica;
        }

        private salvarResposta2Sucesso(tblWeb: TabelaWeb): void
        {
            this.salvarResposta2SucessoCmpIntId(tblWeb);
            this.salvarResposta2SucessoTabHtml();

            window.alert("Registro salvo com sucesso."); // TODO: Substituir por uma notificação.
        }

        private salvarResposta2SucessoCmpIntId(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (this.cmpIntId == null)
            {
                return;
            }

            this.cmpIntId.tagInput.intValor = tblWeb.intRegistroId;
        }

        private salvarResposta2SucessoTabHtml(): void
        {
            if (this.jq == null)
            {
                return;
            }

            if (this.tabHtml == null)
            {
                return;
            }

            this.jq.height((this.jq.height() + 250));

            this.tabHtml.iniciar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnCloseListener(this.pagPrincipal);
        }

        private validarDados(): boolean
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