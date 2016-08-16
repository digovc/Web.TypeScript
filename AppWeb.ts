/// <reference path="design/TemaDefault.ts"/>
/// <reference path="erro/Erro.ts"/>
/// <reference path="Historico.ts"/>
/// <reference path="html/componente/Mensagem.ts"/>
/// <reference path="html/componente/Notificacao.ts"/>
/// <reference path="html/pagina/PaginaHtml.ts"/>
/// <reference path="html/pagina/PagPrincipal.ts"/>
/// <reference path="Objeto.ts"/>
/// <reference path="OnFocusChangeListener.ts"/>
/// <reference path="OnFocusInListener.ts"/>
/// <reference path="OnFocusOutListener.ts"/>
/// <reference path="server/ajax/ServerAjaxDb.ts"/>
/// <reference path="server/Interlocutor.ts"/>

module NetZ_Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class AppWeb extends Objeto
    {
        // #region Constantes

        private static get STR_COOKIE_SESSAO_ID_NOME(): string { return "sessao_id" };

        // #endregion Constantes

        // #region Atributos

        protected static _i: AppWeb;

        public static get i(): AppWeb
        {
            return AppWeb._i;
        }

        public static set i(appWeb: AppWeb)
        {
            if (AppWeb.i != null)
            {
                return;
            }

            AppWeb._i = appWeb;
        }

        private _arrSrv: Array<ServerBase>;
        private _arrTbl: Array<TabelaWeb>;
        private _booEmFoco: boolean = true;
        private _dttLoad: Date = new Date();
        private _msg: Mensagem;
        private _objTema: TemaDefault;
        private _pag: PaginaHtml;
        private _srvAjaxDb: ServerAjaxDb;
        private _strSessionId: string;
        private _tagFocoExclusivo: ComponenteHtml;

        private get arrSrv(): Array<ServerBase>
        {
            if (this._arrSrv != null)
            {
                return this._arrSrv;
            }

            this._arrSrv = this.getArrSrv();

            return this._arrSrv;
        }

        private get arrTbl(): Array<TabelaWeb>
        {
            if (this._arrTbl != null)
            {
                return this._arrTbl;
            }

            this._arrTbl = new Array<TabelaWeb>();

            return this._arrTbl;
        }

        public get booEmFoco(): boolean
        {
            return this._booEmFoco;
        }

        public set booEmFoco(booEmFoco: boolean)
        {
            if (this._booEmFoco == booEmFoco)
            {
                return;
            }

            this._booEmFoco = booEmFoco;

            this.atualizarBooEmFoco();
        }

        public get dttLoad(): Date
        {
            return this._dttLoad;
        }

        private get msg(): Mensagem
        {
            return this._msg;
        }

        private set msg(msg: Mensagem)
        {
            this._msg = msg;
        }

        public get objTema(): TemaDefault
        {
            if (this._objTema != null)
            {
                return this._objTema;
            }

            this._objTema = this.getObjTema();

            return this._objTema;
        }

        public get pag(): PaginaHtml
        {
            return this._pag;
        }

        public set pag(pag: PaginaHtml)
        {
            this._pag = pag;
        }

        public get srvAjaxDb(): ServerAjaxDb
        {
            if (this._srvAjaxDb != null)
            {
                return this._srvAjaxDb;
            }

            this._srvAjaxDb = this.getSrvAjaxDb();

            return this._srvAjaxDb;
        }

        public get strSessionId(): string
        {
            if (this._strSessionId != null)
            {
                return this._strSessionId;
            }

            this._strSessionId = this.getStrSessionId();

            return this._strSessionId;
        }

        private get tagFocoExclusivo(): ComponenteHtml
        {
            return this._tagFocoExclusivo;
        }

        private set tagFocoExclusivo(tagFocoExclusivo: ComponenteHtml)
        {
            this._tagFocoExclusivo = tagFocoExclusivo;
        }

        // #endregion Atributos

        // #region Construtores

        constructor()
        {
            super();

            AppWeb.i = this;
        }

        // #endregion Construtores

        // #region Métodos

        public abrirTagFocoExclusivo(tagFocoExclusivo: ComponenteHtml): void
        {
            if (tagFocoExclusivo == null)
            {
                return;
            }

            if (this.tagFocoExclusivo == tagFocoExclusivo)
            {
                return;
            }

            if (this.tagFocoExclusivo != null)
            {
                this.tagFocoExclusivo.dispose();
            }

            this.tagFocoExclusivo = tagFocoExclusivo;
        }

        private addArrTbl(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return null;
            }

            if (this.arrTbl.indexOf(tblWeb) > -1)
            {
                return;
            }

            this.arrTbl.push(tblWeb);
        }

        private atualizarBooEmFoco(): void
        {
            if (this.booEmFoco)
            {
                this.dispararEvtOnFocusInListener();
            }
            else
            {
                this.dispararEvtOnFocusOutListener();
            }
        }

        public atualizarHistorico(objHistorico: Historico): void
        {
            if (objHistorico == null)
            {
                return;
            }

            // TODO: Parei aqui.

            window.history.pushState(null, objHistorico.strTitulo, objHistorico.strParametro);
        }

        public carregarTbl(strTblNome: string): void
        {
            if (this.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (Utils.getBooStrVazia(strTblNome))
            {
                return;
            }

            if (AppWeb.i.getTbl(strTblNome) != null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_CARREGAR_TBL_WEB;

            objInterlocutor.addStr(strTblNome);
            objInterlocutor.addFncSucesso((objSolicitacaoAjax: Interlocutor) => { this.carregarTblSucesso(objSolicitacaoAjax); });

            this.srvAjaxDb.enviar(objInterlocutor);
        }

        private carregarTblSucesso(objSolicitacaoAjax: Interlocutor): void
        {
            if (objSolicitacaoAjax == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjax.strData))
            {
                return;
            }

            var tblWeb = new TabelaWeb(null);

            tblWeb.copiarDados(JSON.parse(objSolicitacaoAjax.strData));

            this.addArrTbl(tblWeb);
        }

        private getArrSrv(): Array<ServerBase>
        {
            var arrSrvResultado = new Array<ServerBase>();

            this.inicializarArrSrv(arrSrvResultado);

            return arrSrvResultado;
        }

        protected getObjTema(): TemaDefault
        {
            return new TemaDefault();
        }

        protected abstract getSrvAjaxDb(): ServerAjaxDb;

        private getStrCookieValue(strCookieNome: string): string
        {
            if (Utils.getBooStrVazia(strCookieNome))
            {
                return null;
            }

            var objRegExp = new RegExp(name + "=([^;]+)");

            var objRegExpExecArray = objRegExp.exec(document.cookie);

            if (objRegExpExecArray == null)
            {
                return null;
            }

            if (objRegExpExecArray.length < 1)
            {
                return null;
            }

            return objRegExpExecArray[1];
        }

        private getStrSessionId(): string
        {
            return this.getStrCookieValue(AppWeb.STR_COOKIE_SESSAO_ID_NOME);
        }

        public getTbl(strTblNome: string): TabelaWeb
        {
            if (Utils.getBooStrVazia(strTblNome))
            {
                return null;
            }

            for (var i = 0; i < this.arrTbl.length; i++)
            {
                var tblWeb = this.arrTbl[i];

                if (tblWeb == null)
                {
                    continue;
                }

                if (strTblNome.toLowerCase() != tblWeb.strNome.toLowerCase())
                {
                    continue;
                }

                return tblWeb;
            }

            return null;
        }

        public imprimir(pag: string): void
        {
            var objWindow = window.open('', 'my div', 'height=400,width=600');

            objWindow.document.write(pag);
            objWindow.print();
            objWindow.close();
        }

        public iniciar(): void
        {
            this.inicializar();
            this.montarLayout();
            this.setEventos();
        }

        protected inicializar(): void
        {
            this.inicializarArrSrv2();
        }

        protected abstract inicializarArrSrv(arrSrv: Array<ServerBase>): void;

        private inicializarArrSrv2(): void
        {
            this.arrSrv.forEach((srv: ServerBase) => { srv.iniciar(); });
        }

        protected montarLayout(): void
        {
        }

        protected setEventos(): void
        {
            window.onblur = ((arg: FocusEvent) => { this.booEmFoco = false; });
            window.onfocus = ((arg: FocusEvent) => { this.booEmFoco = true; });
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnFocusInListener

        private _arrEvtOnFocusInListener: Array<OnFocusInListener>;

        private get arrEvtOnFocusInListener(): Array<OnFocusInListener>
        {
            if (this._arrEvtOnFocusInListener != null)
            {
                return this._arrEvtOnFocusInListener;
            }

            this._arrEvtOnFocusInListener = new Array<OnFocusInListener>();

            return this._arrEvtOnFocusInListener;
        }

        public addEvtOnFocusInListener(evtOnFocusInListener: OnFocusInListener): void
        {
            if (evtOnFocusInListener == null)
            {
                return;
            }

            if (this.arrEvtOnFocusInListener.indexOf(evtOnFocusInListener) > -1)
            {
                return;
            }

            this.arrEvtOnFocusInListener.push(evtOnFocusInListener);
        }

        private dispararEvtOnFocusInListener(): void
        {
            if (this.arrEvtOnFocusInListener.length == 0)
            {
                return;
            }

            this.arrEvtOnFocusInListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onFocusIn(this);
            });
        }

        public removerEvtOnFocusInListener(evtOnFocusInListener: OnFocusInListener): void
        {
            if (evtOnFocusInListener == null)
            {
                return;
            }

            if (this.arrEvtOnFocusInListener.indexOf(evtOnFocusInListener) == -1)
            {
                return;
            }

            this.arrEvtOnFocusInListener.splice(this.arrEvtOnFocusInListener.indexOf(evtOnFocusInListener), 1);
        }

        // #endregion Evento OnFocusInListener

        // #region Evento OnFocusOutListener

        private _arrEvtOnFocusOutListener: Array<OnFocusOutListener>;

        private get arrEvtOnFocusOutListener(): Array<OnFocusOutListener>
        {
            if (this._arrEvtOnFocusOutListener != null)
            {
                return this._arrEvtOnFocusOutListener;
            }

            this._arrEvtOnFocusOutListener = new Array<OnFocusOutListener>();

            return this._arrEvtOnFocusOutListener;
        }

        public addEvtOnFocusOutListener(evtOnFocusOutListener: OnFocusOutListener): void
        {
            if (evtOnFocusOutListener == null)
            {
                return;
            }

            if (this.arrEvtOnFocusOutListener.indexOf(evtOnFocusOutListener) > -1)
            {
                return;
            }

            this.arrEvtOnFocusOutListener.push(evtOnFocusOutListener);
        }

        private dispararEvtOnFocusOutListener(): void
        {
            if (this.arrEvtOnFocusOutListener.length == 0)
            {
                return;
            }

            this.arrEvtOnFocusOutListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onFocusOut(this);
            });
        }

        public removerEvtOnFocusOutListener(evtOnFocusOutListener: OnFocusOutListener): void
        {
            if (evtOnFocusOutListener == null)
            {
                return;
            }

            if (this.arrEvtOnFocusOutListener.indexOf(evtOnFocusOutListener) == -1)
            {
                return;
            }

            this.arrEvtOnFocusOutListener.splice(this.arrEvtOnFocusOutListener.indexOf(evtOnFocusOutListener), 1);
        }

        // #endregion Evento OnFocusOutListener

        // #endregion Eventos
    }
}