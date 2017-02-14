﻿/// <reference path="design/TemaDefault.ts"/>
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
/// <reference path="server/ajax/SrvAjaxDbeBase.ts"/>
/// <reference path="server/Interlocutor.ts"/>
/// <reference path="server/ServerBase.ts"/>
/// <reference path="server/SrvHttpBase.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class AppWebBase extends Objeto
    {
        // #region Constantes

        private static get STR_COOKIE_SESSAO_ID_NOME(): string { return "sessao_id" };

        // #endregion Constantes

        // #region Atributos

        protected static _i: AppWebBase;

        public static get i(): AppWebBase
        {
            return AppWebBase._i;
        }

        public static set i(appWeb: AppWebBase)
        {
            if (AppWebBase.i != null)
            {
                return;
            }

            AppWebBase._i = appWeb;
        }

        private _arrSrv: Array<ServerBase>;
        private _arrTbl: Array<TabelaWeb>;
        private _booEmFoco: boolean = true;
        private _dttLoad: Date = new Date();
        private _msg: Mensagem;
        private _objTema: TemaDefault;
        private _pag: PaginaHtml;
        private _srvAjaxDb: SrvAjaxDbeBase;
        private _srvHttp: SrvHttpBase;
        private _strSessaoId: string;
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

            this.setBooEmFoco(this._booEmFoco);
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

        public get srvAjaxDb(): SrvAjaxDbeBase
        {
            if (this._srvAjaxDb != null)
            {
                return this._srvAjaxDb;
            }

            this._srvAjaxDb = this.getSrvAjaxDbe();

            return this._srvAjaxDb;
        }

        public get srvHttp(): SrvHttpBase
        {
            if (this._srvHttp != null)
            {
                return this._srvHttp;
            }

            this._srvHttp = this.getSrvHttp();

            return this._srvHttp;
        }

        public get strSessaoId(): string
        {
            if (this._strSessaoId != null)
            {
                return this._strSessaoId;
            }

            this._strSessaoId = this.getStrSessaoId();

            return this._strSessaoId;
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

            AppWebBase.i = this;
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

        public atualizarHistorico(objHistorico: Historico): void
        {
            if (objHistorico == null)
            {
                return;
            }

            // TODO: Dar seguimento na implementação da navegação através do histórico.
            window.history.pushState(null, objHistorico.strTitulo, objHistorico.strParametro);
        }

        public carregarTbl(strTblNome: string): void
        {
            if (this.srvAjaxDb == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
            }

            if (Utils.getBooStrVazia(strTblNome))
            {
                return;
            }

            if (AppWebBase.i.getTbl(strTblNome) != null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_CARREGAR_TBL_WEB;

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

            if (objSolicitacaoAjax.objData == null)
            {
                return;
            }

            var tblWeb = new TabelaWeb(null);

            tblWeb.copiarDados(JSON.parse(objSolicitacaoAjax.objData.toString()));

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

        protected getSrvAjaxDbe(): SrvAjaxDbeBase
        {
            return null;
        }

        protected getSrvHttp(): SrvHttpBase
        {
            return null;
        }

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

        private getStrSessaoId(): string
        {
            return this.getStrCookieValue(AppWebBase.STR_COOKIE_SESSAO_ID_NOME);
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

        protected inicializarArrSrv(arrSrv: Array<ServerBase>): void
        {
        }

        private inicializarArrSrv2(): void
        {
            this.arrSrv.forEach((srv: ServerBase) => { srv.iniciar(); });
        }

        protected montarLayout(): void
        {
        }

        private setBooEmFoco(booEmFoco: boolean): void
        {
            if (booEmFoco)
            {
                this.dispararEvtOnFocusInListener();
            }
            else
            {
                this.dispararEvtOnFocusOutListener();
            }
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

        public addEvtOnFocusInListener(evt: OnFocusInListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnFocusInListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnFocusInListener.push(evt);
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

        public removerEvtOnFocusInListener(evt: OnFocusInListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnFocusInListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnFocusInListener.splice(this.arrEvtOnFocusInListener.indexOf(evt), 1);
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

        public addEvtOnFocusOutListener(evt: OnFocusOutListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnFocusOutListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnFocusOutListener.push(evt);
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

        public removerEvtOnFocusOutListener(evt: OnFocusOutListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnFocusOutListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnFocusOutListener.splice(this.arrEvtOnFocusOutListener.indexOf(evt), 1);
        }

        // #endregion Evento OnFocusOutListener

        // #endregion Eventos
    }
}