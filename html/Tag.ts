/// <reference path="../OnDoubleClickListener.ts"/>
/// <reference path="../OnMouseOverListener.ts"/>
/// <reference path="../OnMouseLeaveListener.ts"/>
/// <reference path="../lib/jquery.d.ts"/>

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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booVisivel = this.jq.is(":visible");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._booVisivel;
        }

        public set booVisivel(booVisivel: boolean)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booVisivel = booVisivel;

                this._booVisivel ? this.mostrar() : this.esconder();
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

        public get strConteudo(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strConteudo = this.jq.html();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strConteudo;
        }

        public set strConteudo(strConteudo: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strConteudo = strConteudo;

                this.jq.html(this._strConteudo);
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

        public get jq(): JQuery
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._jq != null)
                {
                    return this._jq;
                }

                this._jq = $(this.strJqSelector);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._jq;
        }

        public set jq(jq: JQuery)
        {
            this._jq = jq;
        }

        public get strJqSelector(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!Utils.getBooStrVazia(this._strJqSelector))
                {
                    return this._strJqSelector;
                }

                this._strJqSelector = this.getStrJqSelector();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strJqSelector;
        }

        public set strJqSelector(strJqSelector: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strJqSelector = strJqSelector;

                this.atualizarStrJqSelector();
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strPlaceholder = this.jq.attr("placeholder");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strPlaceholder;
        }

        public set strPlaceholder(strPlaceholder: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strPlaceholder = strPlaceholder;

                this.jq.attr("placeholder", this._strPlaceholder);
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

        public get strTitle(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strTitle = this.jq.attr("title");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strTitle;
        }

        public set strTitle(strTitle: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strTitle = strTitle;

                this.atualizarStrTitle();
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

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string)
        {
            super();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strId = strId;
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

        // #endregion Construtores

        // #region Métodos

        public addStrConteudo(strConteudo: string): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.append(strConteudo);
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

        private atualizarStrJqSelector(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq = null;
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

        private atualizarStrTitle(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return;
                }

                this.jq.attr("title", this.strTitle);
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

        public esconder(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private getStrJqSelector(): string
        {
            // #region Variáveis

            var strJqSelector: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                strJqSelector = "#_tag_id";

                strJqSelector = strJqSelector.replace("_tag_id", this.strId);

                return strJqSelector;
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

        protected inicializar(): void
        {
        }

        public iniciar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializar();
                this.montarLayout();
                this.setEventos();
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

        protected montarLayout(): void
        {
        }

        public mostrar(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public mostrarEsconder(enmAnimacaoTipo: Tag_EnmAnimacaoTipo = Tag_EnmAnimacaoTipo.FADE): void
        {
            (this.booVisivel) ? this.esconder(enmAnimacaoTipo) : this.mostrar(enmAnimacaoTipo);
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

                if (this.arrEvtOnClickListener.indexOf(evtOnClickListener) > 0)
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

                if (this.arrEvtOnClickListener.indexOf(evtOnClickListener) == 0)
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

                this.arrEvtOnClickListener.forEach((value) => { value.onClick(this, e); });
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

                if (this.arrEvtOnDoubleClickListener.indexOf(evtOnDoubleClickListener) > 0)
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

                this.arrEvtOnDoubleClickListener.forEach((value) => { value.onDoubleClick(this, arg); });
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

                if (this.arrEvtOnDoubleClickListener.indexOf(evtOnDoubleClickListener) == 0)
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

                if (this.arrEvtOnMouseLeaveListener.indexOf(evtOnMouseLeaveListener) > 0)
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

                this.arrEvtOnMouseLeaveListener.forEach((value) => { value.onMouseLeave(this, arg); });
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

                if (this.arrEvtOnMouseLeaveListener.indexOf(evtOnMouseLeaveListener) == 0)
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

                if (this.arrEvtOnMouseOverListener.indexOf(evtOnMouseOverListener) > 0)
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

                this.arrEvtOnMouseOverListener.forEach((value) => { value.onMouseOver(this, arg); });
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

                if (this.arrEvtOnMouseOverListener.indexOf(evtOnMouseOverListener) == 0)
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