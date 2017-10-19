// #region Reference

/// <reference path="../../AppWebBase.ts"/>
/// <reference path="../../Objeto.ts"/>
/// <reference path="../../OnKeyUpListener.ts"/>
/// <reference path="../Div.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PaginaHtmlBase extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divNotificacao: Div;
        private _tagBody: Tag;

        public get divNotificacao(): Div
        {
            if (this._divNotificacao != null)
            {
                return this._divNotificacao;
            }

            this._divNotificacao = new Div("divNotificacao");

            return this._divNotificacao;
        }

        public get tagBody(): Tag
        {
            if (this._tagBody != null)
            {
                return this._tagBody;
            }

            this._tagBody = this.getTagBody();

            return this._tagBody;
        }

        // #endregion Atributos

        // #region Construtor

        // #endregion Construtor

        // #region Métodos

        public addJs(srcJs: string, fncOnLoad: ((o: HTMLScriptElement) => void) = null): void
        {
            if (Utils.getBooStrVazia(srcJs))
            {
                fncOnLoad(null);
                return;
            }

            if (this.validarJsCarregado(srcJs))
            {
                fncOnLoad(null);
                return;
            }

            var tagScript = document.createElement("script");

            tagScript.src = srcJs;
            tagScript.type = "text/javascript";

            if (fncOnLoad != null)
            {
                tagScript.onload = (() => fncOnLoad(tagScript));
            }

            document.head.appendChild(tagScript);
        }

        public atualizarCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        protected finalizar(): void
        {
        }

        protected getTagBody(): Tag
        {
            var tagBodyResultado = new Tag(null);

            tagBodyResultado.strSelector = "body";

            return tagBodyResultado;
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

        protected setEventos(): void
        {
        }

        public validarJsCarregado(srcJs: string): boolean
        {
            return ($("script[src^='" + srcJs + "']").length > 0);
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
                $(document).click((arg) => this.dispararEvtOnClickListener(arg));
            }

            this.arrEvtOnClickListener.push(evt);
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

            this.arrEvtOnClickListener.splice(this.arrEvtOnClickListener.indexOf(evtOnClickListener), 1);
        }

        private dispararEvtOnClickListener(arg: JQueryEventObject): void
        {
            if (this.arrEvtOnClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnClickListener.forEach(e => e.onClick(this, arg));
        }

        // #endregion Evento OnClickListener

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
                $(document).keydown((arg) => this.dispararEvtOnKeyDownListener(arg));
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
                this.tagBody.jq.keypress((arg) => this.dispararEvtOnKeyPressListener(arg));
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
                $(document).keyup((arg) => this.dispararEvtOnKeyUpListener(arg));
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

        // #endregion Eventos
    }
}