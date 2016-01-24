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
            this._strJqSelector = strJqSelector;
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

        // #endregion Eventos
    }
}