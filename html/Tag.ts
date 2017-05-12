/// <reference path="../Objeto.ts"/>
/// <reference path="../OnDoubleClickListener.ts"/>
/// <reference path="../OnKeyDownListener.ts"/>
/// <reference path="../OnKeyPressListener.ts"/>
/// <reference path="../OnMouseDownListener.ts"/>
/// <reference path="../OnMouseLeaveListener.ts"/>
/// <reference path="../OnMouseOverListener.ts"/>
/// <reference path="../typedefinition/jquery.d.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados

    export enum Tag_EnmAnimacaoTipo
    {
        FADE,
        IMEDIATAMENTE,
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
        private _strPlaceholder: string;
        private _strSelector: string = null;
        private _strTitle: string;

        public get booVisivel(): boolean
        {
            this._booVisivel = this.jq.is(":visible");

            return this._booVisivel;
        }

        public set booVisivel(booVisivel: boolean)
        {
            this._booVisivel = booVisivel;

            this.setBooVisivel(this._booVisivel);
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

            this._jq = $(this.strSelector);

            return this._jq;
        }

        public set jq(jq: JQuery)
        {
            this._jq = jq;
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

            this.setStrPlaceholder(this._strPlaceholder);
        }

        public get strSelector(): string
        {
            if (this._strSelector != null)
            {
                return this._strSelector;
            }

            this._strSelector = this.getStrSelector();

            return this._strSelector;
        }

        public set strSelector(strJqSelector: string)
        {
            if (this._strSelector == strJqSelector)
            {
                return;
            }

            this._strSelector = strJqSelector;

            this.setStrJqSelector(this._strSelector);
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

            this.setStrTitle(this._strTitle);
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

        public dispose(): void
        {
            super.dispose()

            if (this.jq == null)
            {
                return;
            }

            this.jq.remove();
        }

        public esconder(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE): void
        {
            this.jq.stop();

            switch (enmAnimacaoTipo)
            {
                case Tag_EnmAnimacaoTipo.IMEDIATAMENTE:
                    this.jq.css("display", "none");
                    return;

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

        protected getBooAttValor(strAttNome: string): boolean
        {
            return Utils.getBoo(this.getStrAttValor(strAttNome));
        }

        protected getIntAttValor(strAttNome: string): number
        {
            return Number(this.getStrAttValor(strAttNome));
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

        private getStrSelector(): string
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

        protected montarLayout(): void
        {
        }

        public mostrar(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE)
        {
            this.jq.stop();

            switch (enmAnimacaoTipo)
            {
                case Tag_EnmAnimacaoTipo.IMEDIATAMENTE:
                    this.jq.css("display", "block");
                    return;

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

        public perderFoco(): void
        {
        }

        public receberFoco(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.jq.focus();
        }

        private setBooVisivel(booVisivel: boolean): void
        {
            if (booVisivel)
            {
                this.mostrar(Tag_EnmAnimacaoTipo.IMEDIATAMENTE);
            }
            else
            {
                this.esconder(Tag_EnmAnimacaoTipo.IMEDIATAMENTE);
            }
        }

        protected setEventos(): void
        {
        }

        protected setStrPlaceholder(strPlaceholder: string): void
        {
            if (!Utils.getBooStrVazia(strPlaceholder))
            {
                this.jq.attr("placeholder", strPlaceholder);
                return;
            }

            this.jq.removeAttr("placeholder");
        }

        private setStrJqSelector(strJqSelector: string): void
        {
            this.jq = null;
        }

        private setStrTitle(strTitle: string): void
        {
            if (this.jq == null)
            {
                return;
            }

            if (!Utils.getBooStrVazia(strTitle))
            {
                this.jq.attr("title", strTitle);
                return;
            }

            this.jq.removeAttr("title");
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

        public addEvtOnClickListener(evt: OnClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnClickListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnClickListener.length == 0)
            {
                this.jq.click((arg) => { this.dispararEvtOnClickListener(arg) });
            }

            this.arrEvtOnClickListener.push(evt);
        }

        public removeEvtOnClickListener(evt: OnClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnClickListener.splice(this.arrEvtOnClickListener.indexOf(evt), 1);
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

        public addEvtOnClickRightListener(evt: OnClickRightListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.length == 0)
            {
                this.jq.bind("contextmenu", ((arg: JQueryMouseEventObject) => { return false; }));

                this.jq.mousedown((arg) =>
                {
                    arg.stopPropagation();
                    arg.preventDefault();

                    this.dispararEvtOnClickRightListener(arg);

                    return false;
                });
            }

            this.arrEvtOnClickRightListener.push(evt);
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

        public removerEvtOnClickRightListener(evt: OnClickRightListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnClickRightListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnClickRightListener.splice(this.arrEvtOnClickRightListener.indexOf(evt), 1);
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

        public addEvtOnDoubleClickListener(evt: OnDoubleClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnDoubleClickListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnClickListener.length == 0)
            {
                this.jq.dblclick((arg) => this.dispararEvtOnDoubleClickListener(arg));
            }

            this.arrEvtOnDoubleClickListener.push(evt);
        }

        private dispararEvtOnDoubleClickListener(arg: JQueryEventObject): void
        {
            if (this.arrEvtOnDoubleClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnDoubleClickListener.forEach((evt) => { evt.onDoubleClick(this, arg); });
        }

        public removerEvtOnDoubleClickListener(evt: OnDoubleClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnDoubleClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnDoubleClickListener.splice(this.arrEvtOnDoubleClickListener.indexOf(evt), 1);
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

            if (this.arrEvtOnFocusInListener.length == 0)
            {
                this.jq.focusin((arg) => this.dispararEvtOnFocusInListener(arg));
            }

            this.arrEvtOnFocusInListener.push(evt);
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

            if (this.arrEvtOnFocusOutListener.length == 0)
            {
                this.jq.focusout((arg) => this.dispararEvtOnFocusOutListener(arg));
            }

            this.arrEvtOnFocusOutListener.push(evt);
        }

        public dispararEvtOnFocusOutListener(arg: JQueryEventObject): void
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

        public addEvtOnKeyDownListener(evt: OnKeyDownListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnKeyDownListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnKeyDownListener.length == 0)
            {
                this.jq.keydown((arg) => this.dispararEvtOnKeyDownListener(arg));
            }

            this.arrEvtOnKeyDownListener.push(evt);
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

        public removerEvtOnKeyDownListener(evt: OnKeyDownListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnKeyDownListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnKeyDownListener.splice(this.arrEvtOnKeyDownListener.indexOf(evt), 1);
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

        public addEvtOnKeyPressListener(evt: OnKeyPressListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnKeyPressListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnKeyPressListener.length == 0)
            {
                this.jq.keypress((arg) => this.dispararEvtOnKeyPressListener(arg));
            }

            this.arrEvtOnKeyPressListener.push(evt);
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

        public removerEvtOnKeyPressListener(evt: OnKeyPressListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnKeyPressListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnKeyPressListener.splice(this.arrEvtOnKeyPressListener.indexOf(evt), 1);
        }

        // #endregion Evento OnKeyPressListener

        // #region Evento OnKeyUpListener

        private _arrEvtOnKeyUpListener: Array<OnKeyUpListener>;

        private get arrEvtOnKeyUpListener(): Array<OnKeyUpListener>
        {
            if (this._arrEvtOnKeyUpListener != null)
            {
                return this._arrEvtOnKeyUpListener;
            }

            this._arrEvtOnKeyUpListener = new Array<OnKeyUpListener>();

            return this._arrEvtOnKeyUpListener;
        }

        public addEvtOnKeyUpListener(evt: OnKeyUpListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnKeyUpListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnKeyUpListener.length == 0)
            {
                this.jq.keyup((arg) => this.dispararEvtOnKeyUpListener(arg));
            }

            this.arrEvtOnKeyUpListener.push(evt);
        }

        private dispararEvtOnKeyUpListener(arg: JQueryKeyEventObject): void
        {
            if (this.arrEvtOnKeyUpListener.length == 0)
            {
                return;
            }

            this.arrEvtOnKeyUpListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onKeyUp(this, arg);
            });
        }

        public removerEvtOnKeyUpListener(evt: OnKeyUpListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnKeyUpListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnKeyUpListener.splice(this.arrEvtOnKeyUpListener.indexOf(evt), 1);
        }

        // #endregion Evento OnKeyUpListener

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

        public addEvtOnMouseDownListener(evt: OnMouseDownListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseDownListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseDownListener.length == 0)
            {
                this.jq.mousedown((arg) => { this.dispararEvtOnMouseDownListener(arg); });
            }

            this.arrEvtOnMouseDownListener.push(evt);
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

        public removerEvtOnMouseDownListener(evt: OnMouseDownListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseDownListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnMouseDownListener.splice(this.arrEvtOnMouseDownListener.indexOf(evt), 1);
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

        public addEvtOnMouseLeaveListener(evt: OnMouseLeaveListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseLeaveListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseLeaveListener.length == 0)
            {
                this.jq.mouseleave((arg) => this.dispararEvtOnMouseLeaveListener(arg));
            }

            this.arrEvtOnMouseLeaveListener.push(evt);
        }

        private dispararEvtOnMouseLeaveListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseLeaveListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseLeaveListener.forEach((evt) => { evt.onMouseLeave(this, arg); });
        }

        public removerEvtOnMouseLeaveListener(evt: OnMouseLeaveListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseLeaveListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnMouseLeaveListener.splice(this.arrEvtOnMouseLeaveListener.indexOf(evt), 1);
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

        public addEvtOnMouseMoveListener(evt: OnMouseMoveListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseMoveListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseMoveListener.length == 0)
            {
                this.jq.mousemove((arg) => { this.dispararEvtOnMouseMoveListener(arg); });
            }

            this.arrEvtOnMouseMoveListener.push(evt);
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

        public removerEvtOnMouseMoveListener(evt: OnMouseMoveListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseMoveListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnMouseMoveListener.splice(this.arrEvtOnMouseMoveListener.indexOf(evt), 1);
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

        public addEvtOnMouseOverListener(evt: OnMouseOverListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseOverListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseOverListener.length == 0)
            {
                this.jq.mouseover((arg) => this.dispararEvtOnMouseOverListener(arg));
            }

            this.arrEvtOnMouseOverListener.push(evt);
        }

        private dispararEvtOnMouseOverListener(arg: JQueryMouseEventObject): void
        {
            if (this.arrEvtOnMouseOverListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMouseOverListener.forEach((evt) => { evt.onMouseOver(this, arg); });
        }

        public removerEvtOnMouseOverListener(evt: OnMouseOverListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseOverListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnMouseOverListener.splice(this.arrEvtOnMouseOverListener.indexOf(evt), 1);
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

        public addEvtOnMouseUpListener(evt: OnMouseUpListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseUpListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnMouseUpListener.length == 0)
            {
                this.jq.mouseup((arg) => { this.dispararEvtOnMouseUpListener(arg); });
            }

            this.arrEvtOnMouseUpListener.push(evt);
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

        public removerEvtOnMouseUpListener(evt: OnMouseUpListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMouseUpListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnMouseUpListener.splice(this.arrEvtOnMouseUpListener.indexOf(evt), 1);
        }

        // #endregion Evento OnMouseUpListener

        // #endregion Eventos
    }
}