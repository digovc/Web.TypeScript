﻿/// <reference path="../../../../server/OnAjaxErroArg.ts"/>
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

    export class JnlCadastro extends JanelaHtml implements OnAjaxListener, OnDisposedListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrJnlCadastroFilho: Array<JnlCadastro>;
        private _cmpIntId: CampoNumerico;
        private _divComando: DivComando;
        private _frm: FormHtml;
        private _intRegistroId: number;
        private _jnlCadastroPai: JnlCadastro;
        private _pagPrincipal: PagPrincipal;
        private _srcJs: string;
        private _strTblNome: string;
        private _tabHtml: TabHtml;
        private _tblWeb: TabelaWeb;

        private get arrJnlCadastroFilho(): Array<JnlCadastro>
        {
            if (this._arrJnlCadastroFilho != null)
            {
                return this._arrJnlCadastroFilho;
            }

            this._arrJnlCadastroFilho = new Array<JnlCadastro>();

            return this._arrJnlCadastroFilho;
        }

        private get cmpIntId(): CampoNumerico
        {
            if (this._cmpIntId != null)
            {
                return this._cmpIntId;
            }

            this._cmpIntId = this.getCmpIntId();

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

        private get frm(): FormHtml
        {
            if (this._frm != null)
            {
                return this._frm;
            }

            this._frm = new FormHtml(this.strId + "_frm");

            return this._frm;
        }

        public get intRegistroId(): number
        {
            this._intRegistroId = this.getIntRegistroId();

            return this._intRegistroId;
        }

        protected get jnlCadastroPai(): JnlCadastro
        {
            return this._jnlCadastroPai;
        }

        protected set jnlCadastroPai(jnlCadastroPai: JnlCadastro)
        {
            if (this._jnlCadastroPai == jnlCadastroPai)
            {
                return;
            }

            this._jnlCadastroPai = jnlCadastroPai;

            this.atualizarJnlCadastroPai();
        }

        protected get pagPrincipal(): PagPrincipal
        {
            return this._pagPrincipal;
        }

        protected set pagPrincipal(pagPrincipal: PagPrincipal)
        {
            this._pagPrincipal = pagPrincipal;
        }

        private get srcJs(): string
        {
            if (this._srcJs != null)
            {
                return this._srcJs;
            }

            this._srcJs = this.getSrcJs();

            return this._srcJs;
        }

        private get strTblNome(): string
        {
            if (this._strTblNome != null)
            {
                return this._strTblNome;
            }

            this._strTblNome = this.getStrTblNome();

            return this._strTblNome;
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

            this.pagPrincipal.jnlCadastro = this;

            this.pagPrincipal.abrirCadastro(tblWebFilho);

            this.booAtivo = false;
        }

        private addJnlCadatroFilho(jnlCadastro: JnlCadastro): void
        {
            if (jnlCadastro == null)
            {
                return;
            }

            if (this.arrJnlCadastroFilho.indexOf(jnlCadastro) > -1)
            {
                return;
            }

            this.arrJnlCadastroFilho.push(jnlCadastro);
        }

        private atualizarJnlCadastroPai(): void
        {
            if (this.jnlCadastroPai == null)
            {
                return;
            }

            this.jnlCadastroPai.addJnlCadatroFilho(this);

            this.addEvtOnDisposedListener(this.jnlCadastroPai);
        }

        protected carregarDados(): void
        {
        }

        protected fechar(): void
        {
            super.fechar();

            this.fecharJnlCadastroPai();
            this.fecharPagPrincipal();
            this.fecharScriptJs();
        }

        private fecharCadastroFilho(jnlCadastroFilho: JnlCadastro): void
        {
            if (jnlCadastroFilho == null)
            {
                return;
            }

            if (this.arrJnlCadastroFilho.indexOf(jnlCadastroFilho) < 0)
            {
                return;
            }

            this.removerJnlCadatroFilho(jnlCadastroFilho);

            this.booAtivo = (this.arrJnlCadastroFilho.length == 0);
        }

        private fecharPagPrincipal(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            this.pagPrincipal.fecharCadastro(this);
        }

        private fecharJnlCadastroPai(): void
        {
            if (this.jnlCadastroPai == null)
            {
                return;
            }

            this.jnlCadastroPai.fecharCadastroFilho(this);
        }

        private fecharScriptJs(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            this.pagPrincipal.removerJs(this.srcJs);
        }

        private getCmpIntId(): CampoNumerico
        {
            return this.frm.getCmp("int_id");
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

        private getSrcJs(): string
        {
            if (this.pagPrincipal == null)
            {
                return null;
            }

            if (this.jq == null)
            {
                return null;
            }

            return this.jq.attr("src_js");
        }

        private getStrTblNome(): string
        {
            if (this.jq == null)
            {
                return null;
            }

            return this.jq.attr("tbl_web_nome");
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
            if (Utils.getBooStrVazia(this.strTblNome))
            {
                return null;
            }

            var tblWebResultado = new TabelaWeb(this.strTblNome);

            this.frm.carregarTblWeb(tblWebResultado);

            return tblWebResultado;
        }

        protected inicializar(): void
        {
            ServerHttp.i.atualizarCssMain();

            this.frm.iniciar();

            this.inicializarJnlCadastroPai();

            this.divComando.iniciar();
        }

        private inicializarJnlCadastroPai(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            if (this.pagPrincipal.jnlCadastro == null)
            {
                return;
            }

            this.jnlCadastroPai = this.pagPrincipal.jnlCadastro;
        }

        private removerJnlCadatroFilho(jnlCadastroFilho: JnlCadastro): void
        {
            if (jnlCadastroFilho == null)
            {
                return;
            }

            var intIndex: number = this.arrJnlCadastroFilho.indexOf(jnlCadastroFilho);

            if (intIndex < 0)
            {
                return;
            }

            this.arrJnlCadastroFilho.splice(intIndex, 1);
        }

        public salvar(): void
        {
            // #region Variáveis

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.carregarDados();

                if (!this.validarDados())
                {
                    return;
                }

                objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

                objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.SALVAR;
                objSolicitacaoAjaxDb.strData = JSON.stringify(this.tblWeb);

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

        private salvarSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
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

                if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
                {
                    return; // TODO: Verificar a necessidade de validar o porque do JSON voltar vazio.
                }

                tblWeb = new TabelaWeb(this.tblWeb.strNome);

                tblWeb.copiarDados(JSON.parse(objSolicitacaoAjaxDb.strData));

                this.salvarSucesso2(tblWeb);
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

        private salvarSucesso2(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (tblWeb.getBooCritica())
            {
                this.salvarSucesso2Critica(tblWeb);
                return;
            }

            this.salvarSucesso2Sucesso(tblWeb);
        }

        private salvarSucesso2Critica(tblWeb: TabelaWeb): void
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

            tblWeb.arrClnWeb.forEach((clnWeb) => { this.salvarSucesso2CriticaClnWeb(clnWeb); });
        }

        private salvarSucesso2CriticaClnWeb(clnWeb: ColunaWeb): void
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

            var cmp: CampoHtml = this.frm.getCmp(clnWeb.strNome);

            if (cmp == null)
            {
                return;
            }

            cmp.strCritica = clnWeb.strCritica;
        }

        private salvarSucesso2Sucesso(tblWeb: TabelaWeb): void
        {
            this.salvarSucesso2SucessoCmpIntId(tblWeb);
            this.salvarSucesso2SucessoTabHtml();

            window.alert("Registro salvo com sucesso."); // TODO: Substituir por uma notificação.
        }

        private salvarSucesso2SucessoCmpIntId(tblWeb: TabelaWeb): void
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

        private salvarSucesso2SucessoTabHtml(): void
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

        private validarDados(): boolean
        {
            if (this.tblWeb == null)
            {
                return false;
            }

            if (!this.frm.validarDados())
            {
                return false;
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
                this.salvarSucesso(arg.objSolicitacaoAjaxDb);
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

        public onDisposed(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (objSender instanceof JnlCadastro)
                {
                    this.fecharCadastroFilho(objSender);
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