/// <reference path="erro/Erro.ts"/>
/// <reference path="html/pagina/PaginaHtml.ts"/>
/// <reference path="html/pagina/PagPrincipal.ts"/>
/// <reference path="Objeto.ts"/>
/// <reference path="OnFocusChangeListener.ts"/>

module NetZ_Web_TypeScript
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

        private _arrTbl: Array<TabelaWeb>;
        private _booEmFoco: boolean = true;
        private _mnc: MenuContexto;
        private _objTema: Tema;
        private _pag: PaginaHtml;
        private _strSessionId: string;

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

        private get mnc(): MenuContexto
        {
            return this._mnc;
        }

        private set mnc(mnc: MenuContexto)
        {
            this._mnc = mnc;
        }

        public get objTema(): Tema
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

        public get strSessionId(): string
        {
            if (this._strSessionId != null)
            {
                return this._strSessionId;
            }

            this._strSessionId = this.getStrSessionId();

            return this._strSessionId;
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

        public abrirMenu(mnc: MenuContexto): void
        {
            if (mnc == null)
            {
                return;
            }

            if (this.mnc != null)
            {
                this.mnc.dispose();
            }

            this.mnc = mnc;
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
            this.dispararEvtOnFocusChangeListener();
        }

        public carregarTbl(strTblNome: string): void
        {
            if (Utils.getBooStrVazia(strTblNome))
            {
                return;
            }

            if (AppWeb.i.getTbl(strTblNome) != null)
            {
                return;
            }

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.CARREGAR_TBL_WEB;

            objSolicitacaoAjaxDb.addStr(strTblNome);
            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjax: SolicitacaoAjax) => { this.carregarTblSucesso(objSolicitacaoAjax); });

            ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
        }

        private carregarTblSucesso(objSolicitacaoAjax: SolicitacaoAjax): void
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

        protected getObjTema(): Tema
        {
            return new Tema();
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
        }

        protected montarLayout(): void
        {
        }

        protected setEventos(): void
        {
            window.onblur = (e: FocusEvent) => { this.booEmFoco = false; };
            window.onfocus = (e: FocusEvent) => { this.booEmFoco = true; };
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnFocusChangeListener

        private _arrEvtOnFocusChangeListener: Array<OnFocusChangeListener>;

        private get arrEvtOnFocusChangeListener(): Array<OnFocusChangeListener>
        {
            if (this._arrEvtOnFocusChangeListener != null)
            {
                return this._arrEvtOnFocusChangeListener;
            }

            this._arrEvtOnFocusChangeListener = new Array<OnFocusChangeListener>();

            return this._arrEvtOnFocusChangeListener;
        }

        public addEvtOnFocusChangeListener(evtOnFocusChangeListener: OnFocusChangeListener): void
        {
            if (evtOnFocusChangeListener == null)
            {
                return;
            }

            if (this.arrEvtOnFocusChangeListener.indexOf(evtOnFocusChangeListener) > -1)
            {
                return;
            }

            this.arrEvtOnFocusChangeListener.push(evtOnFocusChangeListener);
        }

        private dispararEvtOnFocusChangeListener(): void
        {
            if (this.arrEvtOnFocusChangeListener.length == 0)
            {
                return;
            }

            this.arrEvtOnFocusChangeListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onFocusChange(this, this.booEmFoco);
            });
        }

        public removerEvtOnFocusChangeListener(evtOnFocusChangeListener: OnFocusChangeListener): void
        {
            if (evtOnFocusChangeListener == null)
            {
                return;
            }

            if (this.arrEvtOnFocusChangeListener.indexOf(evtOnFocusChangeListener) == -1)
            {
                return;
            }

            this.arrEvtOnFocusChangeListener.splice(this.arrEvtOnFocusChangeListener.indexOf(evtOnFocusChangeListener));
        }

        // #endregion Evento OnFocusChangeListener

        // #endregion Eventos
    }
}