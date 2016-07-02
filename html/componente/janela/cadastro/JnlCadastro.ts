/// <reference path="../../../../server/ServerAjaxDb.ts"/>
/// <reference path="../../../../server/SolicitacaoAjaxDb.ts"/>
/// <reference path="../../campo/CampoAlfanumerico.ts"/>
/// <reference path="../../campo/CampoCheckBox.ts"/>
/// <reference path="../../campo/CampoHtml.ts"/>
/// <reference path="../../campo/CampoNumerico.ts"/>
/// <reference path="../../tab/TabHtml.ts"/>
/// <reference path="../JanelaHtml.ts"/>
/// <reference path="DivComando.ts"/>
/// <reference path="OnSalvarArg.ts"/>
/// <reference path="OnSalvarListener.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlCadastro extends JanelaHtml implements OnDisposedListener
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
        private _tabItem: TabItem;
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

            this._frm = this.getFrm();

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
            if (this._pagPrincipal != null)
            {
                return this._pagPrincipal;
            }

            this._pagPrincipal = this.getPagPrincipal();

            return this._pagPrincipal;
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

        private get tabItem(): TabItem
        {
            if (this._tabItem != null)
            {
                return this._tabItem;
            }

            this._tabItem = this.getTabItem();

            return this._tabItem;
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

        constructor()
        {
            super(null, AppWeb.i.pag);

            this.strId = this.strClassNome;
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

        private abrirTabHtml(): void
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

            var intTop = Number(this.jq.css("top").replace("px", Utils.STR_VAZIA));

            this.jq.css("top", (intTop - 100));

            this.tabHtml.iniciar();
        }

        private addJnlCadatroFilho(jnlCadastroFilho: JnlCadastro): void
        {
            if (jnlCadastroFilho == null)
            {
                return;
            }

            if (this.arrJnlCadastroFilho.indexOf(jnlCadastroFilho) > -1)
            {
                return;
            }

            this.arrJnlCadastroFilho.push(jnlCadastroFilho);
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
            return this.frm.getCmpClnWebStrNome("int_id");
        }

        private getFrm(): FormHtml
        {
            var frmResultado = new FormHtml(this.strId + "_frm");

            frmResultado.tblWeb = this.tblWeb;

            return frmResultado;
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

        private getPagPrincipal(): PagPrincipal
        {
            if (AppWeb.i.pag == null)
            {
                return null;
            }

            if (!(AppWeb.i.pag instanceof PagPrincipal))
            {
                return null;
            }

            return (<PagPrincipal>AppWeb.i.pag);
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

        private getTabItem(): TabItem
        {
            if (this.jnlCadastroPai == null)
            {
                return;
            }

            if (this.jnlCadastroPai.tabHtml == null)
            {
                return;
            }

            return this.jnlCadastroPai.tabHtml.getTabItem(this.tblWeb);
        }

        private getTblWeb(): TabelaWeb
        {
            if (Utils.getBooStrVazia(this.strTblNome))
            {
                return null;
            }

            var tblWebResultado = new TabelaWeb(this.strTblNome);

            return tblWebResultado;
        }

        protected inicializar(): void
        {
            super.inicializar();

            ServerHttp.i.atualizarCssMain();

            this.frm.iniciar();

            this.inicializarJnlCadastroPai();

            this.divComando.iniciar();

            this.inicializarTabHtml();
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

        private inicializarTabHtml(): void
        {
            if (this.intRegistroId < 1)
            {
                return;
            }

            this.abrirTabHtml();
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
            this.carregarDados();

            if (!this.validarDados())
            {
                return;
            }

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.SALVAR;

            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjaxDb: SolicitacaoAjaxDb) => { this.salvarSucesso(objSolicitacaoAjaxDb); });
            objSolicitacaoAjaxDb.addJsn(this.tblWeb);

            ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
        }

        private salvarSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return; // TODO: Verificar a necessidade de validar o porque do JSON voltar vazio.
            }

            var tblWeb = new TabelaWeb(this.tblWeb.strNome);

            tblWeb.copiarDados(JSON.parse(objSolicitacaoAjaxDb.strData));

            this.salvarSucesso2(tblWeb);
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

            var cmp: CampoHtml = this.frm.getCmpClnWebStrNome(clnWeb.strNome);

            if (cmp == null)
            {
                return;
            }

            cmp.strCritica = clnWeb.strCritica;
        }

        private salvarSucesso2Sucesso(tblWeb: TabelaWeb): void
        {
            this.salvarSucesso2SucessoCmpIntId(tblWeb);

            this.abrirTabHtml();

            this.salvarSucesso2SucessoTabItem();

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

            if (this.cmpIntId.clnWeb == null)
            {
                return;
            }

            this.cmpIntId.tagInput.intValor = tblWeb.getClnWeb(this.cmpIntId.clnWeb.strNome).intValor;
        }

        private salvarSucesso2SucessoTabItem(): void
        {
            if (this.tabItem == null)
            {
                return;
            }

            this.tabItem.pesquisar();
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

        // #region Evento OnSalvarListener

        private _arrEvtOnSalvarListener: Array<OnSalvarListener>;

        private get arrEvtOnSalvarListener(): Array<OnSalvarListener>
        {
            if (this._arrEvtOnSalvarListener != null)
            {
                return this._arrEvtOnSalvarListener;
            }

            this._arrEvtOnSalvarListener = new Array<OnSalvarListener>();

            return this._arrEvtOnSalvarListener;
        }

        public addEvtOnSalvarListener(evtOnSalvarListener: OnSalvarListener): void
        {
            if (evtOnSalvarListener == null)
            {
                return;
            }

            if (this.arrEvtOnSalvarListener.indexOf(evtOnSalvarListener) > -1)
            {
                return;
            }

            this.arrEvtOnSalvarListener.push(evtOnSalvarListener);
        }

        private dispararEvtOnSalvarListener(): void
        {
            if (this.arrEvtOnSalvarListener.length == 0)
            {
                return;
            }

            this.arrEvtOnSalvarListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                var arg = new OnSalvarArg();

                arg.tblWeb = this.tblWeb;

                evt.onSalvar(this, arg);
            });
        }

        public removerEvtOnSalvarListener(evtOnSalvarListener: OnSalvarListener): void
        {
            if (evtOnSalvarListener == null)
            {
                return;
            }

            if (this.arrEvtOnSalvarListener.indexOf(evtOnSalvarListener) == -1)
            {
                return;
            }

            this.arrEvtOnSalvarListener.splice(this.arrEvtOnSalvarListener.indexOf(evtOnSalvarListener));
        }

        // #endregion Evento OnSalvarListener

        // #endregion Eventos
    }
}