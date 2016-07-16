/// <reference path="../../Objeto.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PaginaHtml extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _tagBody: Tag;

        protected get tagBody(): Tag
        {
            if (this._tagBody != null)
            {
                return this._tagBody;
            }

            this._tagBody = this.getTagBody();

            return this._tagBody;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        public atualizarCssMain(): void
        {
            ServerHttp.i.atualizarCssMain();
        }

        protected finalizar(): void
        {
        }

        protected getTagBody(): Tag
        {
            var tagBodyResultado = new Tag(null);

            tagBodyResultado.strJqSelector = "body";

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

        protected validarJsCarregado(srcJq: string): boolean
        {
            return ($("script[src='" + srcJq + "']").length > 0);
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
                    $(document).click((arg) => this.dispararEvtOnClickListener(arg));
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

        private dispararEvtOnClickListener(arg: JQueryEventObject): void
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

                this.arrEvtOnClickListener.forEach((evt) => { evt.onClick(this, arg); });
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
                $(document).keydown((arg) => this.dispararEvtOnKeyDownListener(arg));
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

        // #endregion Eventos
    }
}