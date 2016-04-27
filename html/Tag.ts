/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../OnDoubleClickListener.ts"/>
/// <reference path="../OnKeyDownListener.ts"/>
/// <reference path="../OnKeyPressListener.ts"/>
/// <reference path="../OnMouseLeaveListener.ts"/>
/// <reference path="../OnMouseOverListener.ts"/>

module NetZ_Web_TypeScript
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
        // #endregion Constantes

        // #region Atributos

        private _booVisivel: boolean;
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

            this.jq.attr("placeholder", this._strPlaceholder);
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

        private atualizarStrTitle(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.jq.attr("title", this.strTitle);
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnClickListener != null)
                {
                    return this._arrEvtOnClickListener;
                }

                this._arrEvtOnClickListener = new Array<OnClickListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnClickListener;
        }

        public addEvtOnClickListener(evtOnClickListener: OnClickListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
                    this.jq.click((arg) => this.dispararEvtOnClickListener(arg));
                }

                this.arrEvtOnClickListener.push(evtOnClickListener);
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

        public removeEvtOnClickListener(evtOnClickListener: OnClickListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private dispararEvtOnClickListener(e: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnClickListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnClickListener.forEach((evt) => { evt.onClick(this, e); });
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

        // #endregion Evento OnClickListener

        // #region Evento OnDoubleClickListener

        private _arrEvtOnDoubleClickListener: Array<OnDoubleClickListener>;

        private get arrEvtOnDoubleClickListener(): Array<OnDoubleClickListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnDoubleClickListener != null)
                {
                    return this._arrEvtOnDoubleClickListener;
                }

                this._arrEvtOnDoubleClickListener = new Array<OnDoubleClickListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnDoubleClickListener;
        }

        public addEvtOnDoubleClickListener(evtOnDoubleClickListener: OnDoubleClickListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private dispararEvtOnDoubleClickListener(arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnDoubleClickListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnDoubleClickListener.forEach((evt) => { evt.onDoubleClick(this, arg); });
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

        public removerEvtOnDoubleClickListener(evtOnDoubleClickListener: OnDoubleClickListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Evento OnDoubleClickListener

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

        // #region Evento OnMouseLeaveListener

        private _arrEvtOnMouseLeaveListener: Array<OnMouseLeaveListener>;

        private get arrEvtOnMouseLeaveListener(): Array<OnMouseLeaveListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnMouseLeaveListener != null)
                {
                    return this._arrEvtOnMouseLeaveListener;
                }

                this._arrEvtOnMouseLeaveListener = new Array<OnMouseLeaveListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnMouseLeaveListener;
        }

        public addEvtOnMouseLeaveListener(evtOnMouseLeaveListener: OnMouseLeaveListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private dispararEvtOnMouseLeaveListener(arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnMouseLeaveListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnMouseLeaveListener.forEach((evt) => { evt.onMouseLeave(this, arg); });
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

        public removerEvtOnMouseLeaveListener(evtOnMouseLeaveListener: OnMouseLeaveListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Evento OnMouseLeaveListener

        // #region Evento OnMouseOverListener

        private _arrEvtOnMouseOverListener: Array<OnMouseOverListener>;

        private get arrEvtOnMouseOverListener(): Array<OnMouseOverListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnMouseOverListener != null)
                {
                    return this._arrEvtOnMouseOverListener;
                }

                this._arrEvtOnMouseOverListener = new Array<OnMouseOverListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnMouseOverListener;
        }

        public addEvtOnMouseOverListener(evtOnMouseOverListener: OnMouseOverListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private dispararEvtOnMouseOverListener(arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnMouseOverListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnMouseOverListener.forEach((evt) => { evt.onMouseOver(this, arg); });
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

        public removerEvtOnMouseOverListener(evtOnMouseOverListener: OnMouseOverListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Evento OnMouseOverListener

        // #endregion Eventos
    }
}