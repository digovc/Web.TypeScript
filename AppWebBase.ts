﻿// #region Reference

/// <reference path="database/TabelaWeb.ts"/>
/// <reference path="design/TemaDefault.ts"/>
/// <reference path="erro/Erro.ts"/>
/// <reference path="Historico.ts"/>
/// <reference path="html/componente/Mensagem.ts"/>
/// <reference path="html/componente/Notificacao.ts"/>
/// <reference path="html/pagina/PaginaHtmlBase.ts"/>
/// <reference path="html/pagina/PagPrincipalBase.ts"/>
/// <reference path="Objeto.ts"/>
/// <reference path="OnFocusInListener.ts"/>
/// <reference path="OnFocusOutListener.ts"/>
/// <reference path="server/ajax/Dbe/SrvAjaxDbeBase.ts"/>
/// <reference path="server/Interlocutor.ts"/>
/// <reference path="server/ServerBase.ts"/>
/// <reference path="server/SrvHttpBase.ts"/>
/// <reference path="typedefinition/jquery.d.ts"/>

// #endregion Reference

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class AppWebBase extends Objeto
    {
        // #region Constantes

        public static get DIR_CSS(): string { return (AppWebBase.DIR_RESOURCE + "css/") };
        public static get DIR_HTML(): string { return (AppWebBase.DIR_RESOURCE + "html/") };
        public static get DIR_HTML_PAGINA(): string { return (AppWebBase.DIR_HTML + "pagina/") };
        public static get DIR_JS(): string { return (AppWebBase.DIR_RESOURCE + "js/") };
        public static get DIR_JS_LIB(): string { return (AppWebBase.DIR_RESOURCE + "js/lib/") };
        public static get DIR_JS_WEB(): string { return (AppWebBase.DIR_JS + "web/") };
        public static get DIR_JSON_CONFIG(): string { return "JSON Config/" };
        public static get DIR_MEDIA_GIF(): string { return (AppWebBase.DIR_RESOURCE + "media/gif/") };
        public static get DIR_MEDIA_JPG(): string { return (AppWebBase.DIR_RESOURCE + "media/jpg/") };
        public static get DIR_MEDIA_PNG(): string { return (AppWebBase.DIR_RESOURCE + "media/png/") };
        public static get DIR_MEDIA_SVG(): string { return (AppWebBase.DIR_RESOURCE + "media/svg/") };
        public static get DIR_RESOURCE(): string { return "/res/" };

        public static get STR_COOKIE_SESSAO_NOME(): string { return "sessao" };

        private static get STR_CONSTANTE_DESENVOLVIMENTO(): string { return "STR_CONSTANTE_DESENVOLVIMENTO" };
        private static get STR_CONSTANTE_NAMESPACE_PROJETO(): string { return "STR_CONSTANTE_NAMESPACE_PROJETO" };

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
        private _booDesenvolvimento: boolean;
        private _booEmFoco: boolean = true;
        private _dttLoad: Date = new Date();
        private _objTema: TemaDefault;
        private _pag: PaginaHtmlBase;
        private _srvAjaxDbe: SrvAjaxDbeBase;
        private _srvHttp: SrvHttpBase;
        private _strNamespace: string;
        private _strSessao: string;
        private _tagFoco: ComponenteHtmlBase;

        private get arrSrv(): Array<ServerBase>
        {
            if (this._arrSrv != null)
            {
                return this._arrSrv;
            }

            this._arrSrv = this.getArrSrv();

            return this._arrSrv;
        }

        public get booDesenvolvimento(): boolean
        {
            if (this._booDesenvolvimento != null)
            {
                return this._booDesenvolvimento;
            }

            this._booDesenvolvimento = ConstanteManager.i.getBooConstante(AppWebBase.STR_CONSTANTE_DESENVOLVIMENTO);

            return this._booDesenvolvimento;
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

        public get objTema(): TemaDefault
        {
            if (this._objTema != null)
            {
                return this._objTema;
            }

            this._objTema = this.getObjTema();

            return this._objTema;
        }

        public get pag(): PaginaHtmlBase
        {
            return this._pag;
        }

        public set pag(pag: PaginaHtmlBase)
        {
            this._pag = pag;
        }

        public get srvAjaxDbe(): SrvAjaxDbeBase
        {
            if (this._srvAjaxDbe != null)
            {
                return this._srvAjaxDbe;
            }

            this._srvAjaxDbe = this.getSrvAjaxDbe();

            return this._srvAjaxDbe;
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

        public get strNamespace(): string
        {
            if (this._strNamespace != null)
            {
                return this._strNamespace;
            }

            this._strNamespace = ConstanteManager.i.getStrConstante(AppWebBase.STR_CONSTANTE_NAMESPACE_PROJETO);

            return this._strNamespace;
        }

        public get strSessao(): string
        {
            if (this._strSessao != null)
            {
                return this._strSessao;
            }

            this._strSessao = this.getStrCookieValue(AppWebBase.STR_COOKIE_SESSAO_NOME);

            return this._strSessao;
        }

        public set strSessao(strSessao: string)
        {
            this._strSessao = strSessao;
        }

        public get tagFoco(): ComponenteHtmlBase
        {
            return this._tagFoco;
        }

        public set tagFoco(tagFoco: ComponenteHtmlBase)
        {
            if (this._tagFoco == tagFoco)
            {
                return;
            }

            if (this._tagFoco != null)
            {
                this._tagFoco.dispararEvtOnFocusOutListener(null);
            }

            this._tagFoco = tagFoco;
        }

        // #endregion Atributos

        // #region Construtor

        constructor()
        {
            super();

            AppWebBase.i = this;
        }

        // #endregion Construtor

        // #region Métodos

        public addCookie(strNome: string, strValor: string): void
        {
            if (Utils.getBooStrVazia(strNome))
            {
                return;
            }

            if (Utils.getBooStrVazia(strValor))
            {
                return;
            }

            // TODO: Implementar data e hora de validade.

            var strCookie = "_cookie_name=_cookie_value; domain=_cookie_domain; path=_cookie_path";

            strCookie = strCookie.replace("_cookie_name", strNome);
            strCookie = strCookie.replace("_cookie_value", strValor);
            strCookie = strCookie.replace("_cookie_domain", window.location.host);
            strCookie = strCookie.replace("_cookie_path", "/");

            document.cookie = strCookie;
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

        protected finalizar(): void
        {
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

        public imprimir(pag: string): void
        {
            var objWindow = window.open("", "my div", "height=400,width=600");

            objWindow.document.write(pag);

            objWindow.print();

            objWindow.close();
        }

        public iniciar(pag: PaginaHtmlBase): void
        {
            this.pag = pag;

            this.inicializar();

            this.montarLayout();

            this.setEventos();

            this.finalizar();
        }

        protected inicializar(): void
        {
            this.arrSrv.forEach(srv => srv.iniciar());
        }

        protected inicializarArrSrv(arrSrv: Array<ServerBase>): void
        {
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
            window.onblur = (() => this.booEmFoco = false);
            window.onfocus = (() => this.booEmFoco = true);
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