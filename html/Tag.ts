/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../OnDoubleClickListener.ts"/>
/// <reference path="../OnKeyDownListener.ts"/>
/// <reference path="../OnKeyPressListener.ts"/>
/// <reference path="../OnMouseDownListener.ts"/>
/// <reference path="../OnMouseLeaveListener.ts"/>
/// <reference path="../OnMouseOverListener.ts"/>

module NetZ_Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados

    export enum Tag_EnmAnimacaoTipo
    {
        FADE,
        SLIDE_HORIZONTAL,
        SLIDE_VERTICAL,
    }

    // #endregion Enumerados

    export class Tag extends Objeto
    {
        // #region Constantes

        public static get INT_MOUSE_BUTTON_LEFT(): number { return 0 };
        public static get INT_MOUSE_BUTTON_MIDDLE(): number { return 1 };
        public static get INT_MOUSE_BUTTON_RIGHT(): number { return 2 };

        // #endregion Constantes

        // #region Atributos

        private _booVisivel: boolean;
        private _intClickTimer: number = -1;
        private _jq: any;
        private _strConteudo: string;
        private _strId: string;
        private _strJqSelector: string = null;
        private _strPlaceholder: string;
        private _strTitle: string;

        public get booVisivel(): boolean
        {
            this._booVisivel = this.jq.is(":visible");

            return this._booVisivel;
        }

        public set booVisivel(booVisivel: boolean)
        {
            this._booVisivel = booVisivel;

            this._booVisivel ? this.mostrar() : this.esconder();
        }

        private get intClickTimer(): number
        {
            return this._intClickTimer;
        }

        private set intClickTimer(intClickTimer: number)
        {
            this._intClickTimer = intClickTimer;
        }

        public get strConteudo(): string
        {
            this._strConteudo = this.jq.html();

            return this._strConteudo;
        }

        public set strConteudo(strConteudo: string)
        {
            this._strConteudo = strConteudo;

            this.jq.html(this._strConteudo);
        }

        public get jq(): JQuery
        {
            if (this._jq != null)
            {
                return this._jq;
            }

            this._jq = $(this.strJqSelector);

            return this._jq;
        }

        public set jq(jq: JQuery)
        {
            this._jq = jq;
        }

        public get strJqSelector(): string
        {
            if (!Utils.getBooStrVazia(this._strJqSelector))
            {
                return this._strJqSelector;
            }

            this._strJqSelector = this.getStrJqSelector();

            return this._strJqSelector;
        }

        public set strJqSelector(strJqSelector: string)
        {
            this._strJqSelector = strJqSelector;

            this.atualizarStrJqSelector();
        }

        public get strId(): string
        {
            return this._strId;
        }

        public set strId(strId: string)
        {
            this._strId = strId;
        }

        public get strPlaceholder(): string
        {
            this._strPlaceholder = this.jq.attr("placeholder");

            return this._strPlaceholder;
        }

        public set strPlaceholder(strPlaceholder: string)
        {
            this._strPlaceholder = strPlaceholder;

            this.atualizarStrPlaceholder();
        }

        public get strTitle(): string
        {
            if (!Utils.getBooStrVazia(this._strTitle))
            {
                return this._strTitle;
            }

            this._strTitle = this.jq.attr("title");

            return this._strTitle;
        }

        public set strTitle(strTitle: string)
        {
            this._strTitle = strTitle;

            this.atualizarStrTitle();
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string)
        {
            super();

            this.strId = strId;
        }

        // #endregion Construtores

        // #region Métodos

        public addStrConteudo(strConteudo: string): void
        {
            this.jq.append(strConteudo);
        }

        private atualizarStrJqSelector(): void
        {
            this.jq = null;
        }

        protected atualizarStrPlaceholder(): void
        {
            if (!Utils.getBooStrVazia(this.strPlaceholder))
            {
                this.jq.attr("placeholder", this.strPlaceholder);
            }
            else
            {
                this.jq.removeAttr("placeholder");
            }
        }

        private atualizarStrTitle(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.jq.attr("title", this.strTitle);
        }

        public dispose(): void
        {
            super.dispose()

            this.jq.remove();
        }

        public esconder(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE): void
        {
            this.jq.stop();

            switch (enmAnimacaoTipo)
            {
                case Tag_EnmAnimacaoTipo.SLIDE_VERTICAL:
                    this.jq.slideUp();
                    return;

                case Tag_EnmAnimacaoTipo.SLIDE_HORIZONTAL:
                    this.jq.hide(); // TODO: Implementar.
                    return;

                default:
                    this.jq.fadeOut();
                    return;
            }
        }

        protected finalizar(): void
        {
        }

        protected getStrAttValor(strAttNome: string): string
        {
            if (Utils.getBooStrVazia(strAttNome))
            {
                return null;
            }

            if (this.jq == null)
            {
                return null;
            }

            return this.jq.attr(strAttNome);
        }

        private getStrJqSelector(): string
        {
            var strJqSelector = "#_tag_id";

            strJqSelector = strJqSelector.replace("_tag_id", this.strId);

            return strJqSelector;
        }

        protected inicializar(): void
        {
        }

        public iniciar(): void
        {
            this.inicializar();
            this.montarLayout();
            this.setEventos();
            this.finalizar();
        }

        protected limparMemoria(): void
        {
            super.limparMemoria();

            if (this.jq == null)
            {
                return;
            }

            this.jq.remove();
        }

        protected montarLayout(): void
        {
        }

        public mostrar(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE)
        {
            this.jq.stop();

            switch (enmAnimacaoTipo)
            {
                case Tag_EnmAnimacaoTipo.SLIDE_VERTICAL:
                    this.jq.slideDown();
                    return;

                case Tag_EnmAnimacaoTipo.SLIDE_HORIZONTAL:
                    this.jq.show(); // TODO: Implementar.
                    return;

                default:
                    this.jq.fadeIn();
                    return;
            }
        }

        public mostrarEsconder(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE): void
        {
            (this.booVisivel) ? this.esconder(enmAnimacaoTipo) : this.mostrar(enmAnimacaoTipo);
        }

        public receberFoco(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.jq.focus();
        }

        protected setEventos(): void
        {
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnClickListener

        private _arrEvtOnClickListener: Array<OnClickListener>;

        private get arrEvtOnClickListener(): Array<OnClickListener>
        {
            if (this._arrEvtOnClickListener != null)
            {
                return this._arrEvtOnClickListener;
            }

            this._arrEvtOnClickListener = new Array<OnClickListener>();

            return this._arrEvtOnClickListener;
        }

        public addEvtOnClickListener(evtOnClickListener: OnClickListener): void
        {
            if (evtOnClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnClickListener.indexOf(evtOnClickListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnClickListener.length == 0)
            {
                this.jq.click((arg) => { this.dispararEvtOnClickListener(arg) });
            }

            this.arrEvtOnClickListener.push(evtOnClickListener);
        }

        public removeEvtOnClickListener(evtOnClickListener: OnClickListener): void
        {
            if (evtOnClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnClickListener.indexOf(evtOnClickListener) == -1)
            {
                return;
            }

            this.arrEvtOnClickListener.splice(this.arrEvtOnClickListener.indexOf(evtOnClickListener));
        }

        private dispararEvtOnClickListener(arg: JQueryEventObject): void
        {
            this.intClickTimer = -1;

            if (this.arrEvtOnClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnClickListener.forEach((evt) => { evt.onClick(this, arg); });
        }

        // #endregion Evento OnClickListener

        // #region Evento OnClickRightListener

        private _arrEvtOnClickRightListener: Array<OnClickRightListener>;

        private get arrEvtOnClickRightListener(): Array<OnClickRightListener>
        {
            if (this._arrEvtOnClickRightListener != null)
            {
                return this._arrEvtOnClickRightListener;
            }

            this._arrEvtOnClickRightListener = new Array<OnClickRightListener>();

            return this._arrEvtOnClickRightListener;
        }

        public addEvtOnClickRightListener(evtOnClickRightListener: OnClickRightListener): void
        {
            if (evtOnClickRightListener == null)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.indexOf(evtOnClickRightListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.length == 0)
            {
                this.jq.bind('contextmenu', (() => { return false; }));

                this.jq.mouseup((arg) => { this.dispararEvtOnClickRightListener(arg) });
            }

            this.arrEvtOnClickRightListener.push(evtOnClickRightListener);
        }

        private dispararEvtOnClickRightListener(arg: JQueryMouseEventObject): void
        {
            if (arg == null)
            {
                return;
            }

            if (arg.button != Tag.INT_MOUSE_BUTTON_RIGHT)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.length == 0)
            {
                return;
            }

            this.arrEvtOnClickRightListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onClickRight(this, arg);
            });
        }

        public removerEvtOnClickRightListener(evtOnClickRightListener: OnClickRightListener): void
        {
            if (evtOnClickRightListener == null)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.indexOf(evtOnClickRightListener) == -1)
            {
                return;
            }

            this.arrEvtOnClickRightListener.splice(this.arrEvtOnClickRightListener.indexOf(evtOnClickRightListener));
        }

        // #endregion Evento OnClickRightListener

        // #region Evento OnDoubleClickListener

        private _arrEvtOnDoubleClickListener: Array<OnDoubleClickListener>;

        private get arrEvtOnDoubleClickListener(): Array<OnDoubleClickListener>
        {
            if (this._arrEvtOnDoubleClickListener != null)
            {
                return this._arrEvtOnDoubleClickListener;
            }

            this._arrEvtOnDoubleClickListener = new Array<OnDoubleClickListener>();

            return this._arrEvtOnDoubleClickListener;
        }

        public addEvtOnDoubleClickListener(evtOnDoubleClickListener: OnDoubleClickListener): void
        {
            if (evtOnDoubleClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnDoubleClickListener.indexOf(evtOnDoubleClickListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnClickListener.length == 0)
            {
                this.jq.dblclick((arg) => this.dispararEvtOnDoubleClickListener(arg));
            }

            this.arrEvtOnDoubleClickListener.push(evtOnDoubleClickListener);
        }

        private dispararEvtOnDoubleClickListener(arg: JQueryEventObject): void
        {
            if (this.arrEvtOnDoubleClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnDoubleClickListener.forEach((evt) => { evt.onDoubleClick(this, arg); });
        }

        public removerEvtOnDoubleClickListener(evtOnDoubleClickListener: OnDoubleClickListener): void
        {
            if (evtOnDoubleClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnDoubleClickListener.indexOf(evtOnDoubleClickListener) == -1)
            {
                return;
            }

            this.arrEvtOnDoubleClickListener.splice(this.arrEvtOnDoubleClickListener.indexOf(evtOnDoubleClickListener));
        }

        // #endregion Evento OnDoubleClickListener

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

            if (this.arrEvtOnFocusInListener.length == 0)
            {
                this.jq.focusin((arg) => this.dispararEvtOnFocusInListener(arg));
            }

            this.arrEvtOnFocusInListener.push(evtOnFocusInListener);
        }

        private dispararEvtOnFocusInListener(arg: JQueryEventObject): void
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

            this.arrEvtOnFocusInListener.splice(this.arrEvtOnFocusInListener.indexOf(evtOnFocusInListener));
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

            if (this.arrEvtOnFocusOutListener.length == 0)
            {
                this.jq.focusout((arg) => this.dispararEvtOnFocusOutListener(arg));
            }

            this.arrEvtOnFocusOutListener.push(evtOnFocusOutListener);
        }

        private dispararEvtOnFocusOutListener(arg: JQueryEventObject): void
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

            this.arrEvtOnFocusOutListener.splice(this.arrEvtOnFocusOutListener.indexOf(evtOnFocusOutListener));
        }

        // #endregion Evento OnFocusOutListener

        // #region Evento OnKeyDownListener

        private _arrEvtOnKeyDownListener: Array<OnKeyDownListener>;

        private get arrEvtOnKeyDownListener(): Array<OnKeyDownListener>
        {
            if (this._arrEvtOnKeyDownListener != null)
            {
                return this._arrEvtOnKeyDownListener;
            }

            this._arrEvtOnKeyDownListener = new Array<OnKeyDownListener>();

            return this._arrEvtOnKeyDownListener;
        }

        public addEvtOnKeyDownListener(evtOnKeyDownListener: OnKeyDownListener): void
        {
            if (evtOnKeyDownListener == null)
            {
                return;
            }

            if (this.arrEvtOnKeyDownListener.indexOf(evtOnKeyDownListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnKeyDownListener.length == 0)
            {
                this.jq.keydown((arg) => this.dispararEvtOnKeyDownListener(arg));
            }

            this.arrEvtOnKeyDownListener.push(evtOnKeyDownListener);
        }

        private dispararEvtOnKeyDownListener(arg: JQueryKeyEventObject): void
        {
            if (this.arrEvtOnKeyDownListener.length == 0)
            {
                return;
            }

            this.arrEvtOnKeyDownListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onKeyDown(this, arg);
            });
        }

        public removerEvtOnKeyDownListener(evtOnKeyDownListener: OnKeyDownListener): void
        {
            if (evtOnKeyDownListener == null)
            {
                return;
            }

            if (this.arrEvtOnKeyDownListener.indexOf(evtOnKeyDownListener) == -1)
            {
                return;
            }

            this.arrEvtOnKeyDownListener.splice(this.arrEvtOnKeyDownListener.indexOf(evtOnKeyDownListener));
        }

        // #endregion Evento OnKeyDownListener

        // #region Evento OnKeyPressListener

        private _arrEvtOnKeyPressListener: Array<OnKeyPressListener>;

        private get arrEvtOnKeyPressListener(): Array<OnKeyPressListener>
        {
            if (this._arrEvtOnKeyPressListener != null)
            {
                return this._arrEvtOnKeyPressListener;
            }

            this._arrEvtOnKeyPressListener = new Array<OnKeyPressListener>();

            return this._arrEvtOnKeyPressListener;
        }

        public addEvtOnKeyPressListener(evtOnKeyPressListener: OnKeyPressListener): void
        {
            if (evtOnKeyPressListener == null)
            {
                return;
            }

            if (this.arrEvtOnKeyPressListener.indexOf(evtOnKeyPressListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnKeyPressListener.length == 0)
            {
                this.jq.keypress((arg) => this.dispararEvtOnKeyPressListener(arg));
            }

            this.arrEvtOnKeyPressListener.push(evtOnKeyPressListener);
        }

        private dispararEvtOnKeyPressListener(arg: JQueryKeyEventObject): void
        {
            if (this.arrEvtOnKeyPressListener.length == 0)
            {
                return;
            }

            this.arrEvtOnKeyPressListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onKeyPress(this, arg);
            });
        }

        public removerEvtOnKeyPressListener(evtOnKeyPressListener: OnKeyPressListener): void
        {
            if (evtOnKeyPressListener == null)
            {
                return;
            }

            if (this.arrEvtOnKeyPressListener.indexOf(evtOnKeyPressListener) == -1)
            {
                return;
            }

            this.arrEvtOnKeyPressListener.splice(this.arrEvtOnKeyPressListener.indexOf(evtOnKeyPressListener));
        }

        // #endregion Evento OnKeyPressListener

        // #region Evento OnMouseDownListener

        private _arrEvtOnMouseDownListener: Array<OnMouseDownListener>;

        private get arrEvtOnMouseDownListener(): Array<OnMouseDownListener>
        {
            if (this._arrEvtOnMouseDownListener != null)
            {
                return this._arrEvtOnMouseDownListener;
            }

            this._arrEvtOnMouseDownListener = new Array<OnMouseDownListener>();

            return this._arrEvtOnMouseDownListener;
        }

        public addEvtOnMouseDownListener(evtOnMouseDownListener: OnMouseDownListener): void
        {
            if (evtOnMouseDownListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseDownListener.indexOf(evtOnMouseDownListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseDownListener.length == 0)
            {
                this.jq.mousedown((arg) => { this.dispararEvtOnMouseDownListener(arg); });
            }

            this.arrEvtOnMouseDownListener.push(evtOnMouseDownListener);
        }

        private dispararEvtOnMouseDownListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseDownListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseDownListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onMouseDown(this, arg);
            });
        }

        public removerEvtOnMouseDownListener(evtOnMouseDownListener: OnMouseDownListener): void
        {
            if (evtOnMouseDownListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseDownListener.indexOf(evtOnMouseDownListener) == -1)
            {
                return;
            }

            this.arrEvtOnMouseDownListener.splice(this.arrEvtOnMouseDownListener.indexOf(evtOnMouseDownListener));
        }

        // #endregion Evento OnMouseDownListener

        // #region Evento OnMouseLeaveListener

        private _arrEvtOnMouseLeaveListener: Array<OnMouseLeaveListener>;

        private get arrEvtOnMouseLeaveListener(): Array<OnMouseLeaveListener>
        {
            if (this._arrEvtOnMouseLeaveListener != null)
            {
                return this._arrEvtOnMouseLeaveListener;
            }

            this._arrEvtOnMouseLeaveListener = new Array<OnMouseLeaveListener>();

            return this._arrEvtOnMouseLeaveListener;
        }

        public addEvtOnMouseLeaveListener(evtOnMouseLeaveListener: OnMouseLeaveListener): void
        {
            if (evtOnMouseLeaveListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseLeaveListener.indexOf(evtOnMouseLeaveListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseLeaveListener.length == 0)
            {
                this.jq.mouseleave((arg) => this.dispararEvtOnMouseLeaveListener(arg));
            }

            this.arrEvtOnMouseLeaveListener.push(evtOnMouseLeaveListener);
        }

        private dispararEvtOnMouseLeaveListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseLeaveListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseLeaveListener.forEach((evt) => { evt.onMouseLeave(this, arg); });
        }

        public removerEvtOnMouseLeaveListener(evtOnMouseLeaveListener: OnMouseLeaveListener): void
        {
            if (evtOnMouseLeaveListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseLeaveListener.indexOf(evtOnMouseLeaveListener) == -1)
            {
                return;
            }

            this.arrEvtOnMouseLeaveListener.splice(this.arrEvtOnMouseLeaveListener.indexOf(evtOnMouseLeaveListener));
        }

        // #endregion Evento OnMouseLeaveListener

        // #region Evento OnMouseMoveListener

        private _arrEvtOnMouseMoveListener: Array<OnMouseMoveListener>;

        private get arrEvtOnMouseMoveListener(): Array<OnMouseMoveListener>
        {
            if (this._arrEvtOnMouseMoveListener != null)
            {
                return this._arrEvtOnMouseMoveListener;
            }

            this._arrEvtOnMouseMoveListener = new Array<OnMouseMoveListener>();

            return this._arrEvtOnMouseMoveListener;
        }

        public addEvtOnMouseMoveListener(evtOnMouseMoveListener: OnMouseMoveListener): void
        {
            if (evtOnMouseMoveListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseMoveListener.indexOf(evtOnMouseMoveListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseMoveListener.length == 0)
            {
                this.jq.mousemove((arg) => { this.dispararEvtOnMouseMoveListener(arg); });
            }

            this.arrEvtOnMouseMoveListener.push(evtOnMouseMoveListener);
        }

        private dispararEvtOnMouseMoveListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseMoveListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseMoveListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onMouseMove(this, arg);
            });
        }

        public removerEvtOnMouseMoveListener(evtOnMouseMoveListener: OnMouseMoveListener): void
        {
            if (evtOnMouseMoveListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseMoveListener.indexOf(evtOnMouseMoveListener) == -1)
            {
                return;
            }

            this.arrEvtOnMouseMoveListener.splice(this.arrEvtOnMouseMoveListener.indexOf(evtOnMouseMoveListener));
        }

        // #endregion Evento OnMouseMoveListener

        // #region Evento OnMouseOverListener

        private _arrEvtOnMouseOverListener: Array<OnMouseOverListener>;

        private get arrEvtOnMouseOverListener(): Array<OnMouseOverListener>
        {
            if (this._arrEvtOnMouseOverListener != null)
            {
                return this._arrEvtOnMouseOverListener;
            }

            this._arrEvtOnMouseOverListener = new Array<OnMouseOverListener>();

            return this._arrEvtOnMouseOverListener;
        }

        public addEvtOnMouseOverListener(evtOnMouseOverListener: OnMouseOverListener): void
        {
            if (evtOnMouseOverListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseOverListener.indexOf(evtOnMouseOverListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseOverListener.length == 0)
            {
                this.jq.mouseover((arg) => this.dispararEvtOnMouseOverListener(arg));
            }

            this.arrEvtOnMouseOverListener.push(evtOnMouseOverListener);
        }

        private dispararEvtOnMouseOverListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseOverListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseOverListener.forEach((evt) => { evt.onMouseOver(this, arg); });
        }

        public removerEvtOnMouseOverListener(evtOnMouseOverListener: OnMouseOverListener): void
        {
            if (evtOnMouseOverListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseOverListener.indexOf(evtOnMouseOverListener) == -1)
            {
                return;
            }

            this.arrEvtOnMouseOverListener.splice(this.arrEvtOnMouseOverListener.indexOf(evtOnMouseOverListener));
        }

        // #endregion Evento OnMouseOverListener

        // #region Evento OnMouseUpListener

        private _arrEvtOnMouseUpListener: Array<OnMouseUpListener>;

        private get arrEvtOnMouseUpListener(): Array<OnMouseUpListener>
        {
            if (this._arrEvtOnMouseUpListener != null)
            {
                return this._arrEvtOnMouseUpListener;
            }

            this._arrEvtOnMouseUpListener = new Array<OnMouseUpListener>();

            return this._arrEvtOnMouseUpListener;
        }

        public addEvtOnMouseUpListener(evtOnMouseUpListener: OnMouseUpListener): void
        {
            if (evtOnMouseUpListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseUpListener.indexOf(evtOnMouseUpListener) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseUpListener.length == 0)
            {
                this.jq.mouseup((arg) => { this.dispararEvtOnMouseUpListener(arg); });
            }

            this.arrEvtOnMouseUpListener.push(evtOnMouseUpListener);
        }

        private dispararEvtOnMouseUpListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseUpListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseUpListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onMouseUp(this, arg);
            });
        }

        public removerEvtOnMouseUpListener(evtOnMouseUpListener: OnMouseUpListener): void
        {
            if (evtOnMouseUpListener == null)
            {
                return;
            }

            if (this.arrEvtOnMouseUpListener.indexOf(evtOnMouseUpListener) == -1)
            {
                return;
            }

            this.arrEvtOnMouseUpListener.splice(this.arrEvtOnMouseUpListener.indexOf(evtOnMouseUpListener));
        }

        // #endregion Evento OnMouseUpListener

        // #endregion Eventos
    }
}