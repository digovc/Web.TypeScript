/// <reference path="../../campo/CampoAlfanumerico.ts"/>
/// <reference path="../../campo/CampoCheckBox.ts"/>
/// <reference path="../../campo/CampoHtml.ts"/>
/// <reference path="../../campo/CampoNumerico.ts"/>
/// <reference path="../../tab/TabHtml.ts"/>
/// <reference path="../JanelaHtml.ts"/>
/// <reference path="DivComando.ts"/>
/// <reference path="OnSalvarArg.ts"/>
/// <reference path="OnSalvarListener.ts"/>

module Web
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
        private _frm: FormHtml;
        private _intRegistroId: number;
        private _jnlCadastroPai: JnlCadastro;
        private _pagPrincipal: PagPrincipal;
        private _srcJs: string;
        private _strTblNome: string;
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

            this.setJnlCadastroPai(this._jnlCadastroPai);
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

        // #region Construtor

        constructor()
        {
            super(null, AppWebBase.i.pag);

            this.strId = this.strClassNome;
        }

        // #endregion Construtor

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

            // TODO: Verificar se vai colocar a tela pai desativada ao abrir uma janela filho.
            //this.booAtivo = false;
        }

        public abrirJnlTag(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            if (this.intRegistroId < 1)
            {
                Notificacao.notificar("Salve o registro antes.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            this.tblWeb.clnIntId.intValor = this.intRegistroId;

            this.pagPrincipal.abrirJnlTag(this.tblWeb);
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

        private setJnlCadastroPai(jnlCadastroPai: JnlCadastro): void
        {
            if (jnlCadastroPai == null)
            {
                return;
            }

            jnlCadastroPai.addJnlCadatroFilho(this);

            this.addEvtOnDisposedListener(jnlCadastroPai);
        }

        protected carregarDados(): void
        {
            this.carregarDadosTblWeb();
        }

        private carregarDadosTblWeb(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            if (this.jnlCadastroPai == null)
            {
                return;
            }

            if (this.jnlCadastroPai.tblWeb == null)
            {
                return;
            }

            this.tblWeb.intRegistroPaiId = this.jnlCadastroPai.intRegistroId;
            this.tblWeb.strTblPaiNome = this.jnlCadastroPai.tblWeb.strNome;
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

        protected getCmp<T>(sqlClnNome: string): T
        {
            if (Utils.getBooStrVazia(sqlClnNome))
            {
                return null;
            }

            return this.frm.getCmpPorClnWebSqlNome<T>(sqlClnNome);
        }

        private getCmpIntId(): CampoNumerico
        {
            return this.getCmp<CampoNumerico>(this.tblWeb.clnIntId.strNome);
        }

        private getFrm(): FormHtml
        {
            var frmResultado = new FormHtml(this.strId + "_frm");

            frmResultado.jnlCadastro = this;

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
            if (AppWebBase.i.pag == null)
            {
                return null;
            }

            if (!(AppWebBase.i.pag instanceof PagPrincipal))
            {
                return null;
            }

            return (<PagPrincipal>AppWebBase.i.pag);
        }

        private getSrcJs(): string
        {
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

        private getTabItem(): TabItem
        {
            if (this.jnlCadastroPai == null)
            {
                return;
            }

            return this.jnlCadastroPai.getTabItem2(this.tblWeb);
        }

        private getTabItem2(tblWeb: TabelaWeb): TabItem
        {
            if (this.frm == null)
            {
                return null;
            }

            return this.frm.getTabItem(tblWeb);
        }

        private getTblWeb(): TabelaWeb
        {
            if (Utils.getBooStrVazia(this.strTblNome))
            {
                return null;
            }

            var tblWebResultado = new TabelaWeb(this.strTblNome);

            tblWebResultado.booPermitirAlterar = this.getBooAttValor("permitir_alterar");

            return tblWebResultado;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarCssMain();

            this.frm.iniciar();

            this.inicializarJnlCadastroPai();
        }

        private inicializarCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        private inicializarJnlCadastroPai(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            if (this.pagPrincipal.jnlCadastro == null)
            {
                this.pagPrincipal.jnlCadastro = this;
                return;
            }

            this.jnlCadastroPai = this.pagPrincipal.jnlCadastro;
        }

        protected inicializarPosicao(): void
        {
            super.inicializarPosicao();

            this.mostrar();
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
            if (AppWebBase.i.srvAjaxDb == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
            }

            this.carregarDados();

            if (!this.validarDados())
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_SALVAR;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.salvarSucesso(objInterlocutor); });

            objInterlocutor.addJsn(this.tblWeb);

            AppWebBase.i.srvAjaxDb.enviar(objInterlocutor);

            this.dispararEvtOnSalvarListener();
        }

        private salvarSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return; // TODO: Verificar a necessidade de validar o porque do JSON voltar vazio.
            }

            var tblWeb = new TabelaWeb(this.tblWeb.strNome);

            tblWeb.copiarDados(JSON.parse(objInterlocutor.objData.toString()));

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
                Mensagem.mostrar("Erro", tblWeb.strCritica, Mensagem_EnmTipo.NEGATIVA);
            }

            if (tblWeb.arrCln == null)
            {
                return;
            }

            tblWeb.arrCln.forEach((clnWeb) => { this.salvarSucesso2CriticaClnWeb(clnWeb); });
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

            var cmp = this.frm.getCmpPorClnWebSqlNome<CampoHtml>(clnWeb.strNome);

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

            Notificacao.notificar("Registro salvo com sucesso.");
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

            this.cmpIntId.tagInput.intValor = tblWeb.getCln(this.cmpIntId.clnWeb.strNome).intValor;
        }

        private salvarSucesso2SucessoTabHtml(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.pesquisarTabItemPrincipal();

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

            if (!this.tblWeb.booPermitirAlterar && (this.intRegistroId > 0))
            {
                Notificacao.notificar("Alterações não são permitidas.", Notificacao_EnmTipo.NEGATIVA);
                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos

        public onDisposed(objSender: Object): void
        {
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

        public addEvtOnSalvarListener(evt: OnSalvarListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnSalvarListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnSalvarListener.push(evt);
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

        public removerEvtOnSalvarListener(evt: OnSalvarListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnSalvarListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnSalvarListener.splice(this.arrEvtOnSalvarListener.indexOf(evt), 1);
        }

        // #endregion Evento OnSalvarListener

        // #endregion Eventos
    }
}