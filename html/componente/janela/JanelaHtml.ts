/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../pagina/PaginaHtml.ts"/>
/// <reference path="../botao/mini/BotaoFecharMini.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JanelaHtml extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnFechar: BotaoFecharMini;
        private _pag: PaginaHtml;

        private get btnFechar(): BotaoFecharMini
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnFechar != null)
                {
                    return this._btnFechar;
                }

                this._btnFechar = new BotaoFecharMini(this.strId + "_btnFechar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnFechar;
        }

        protected get pag(): PaginaHtml
        {
            return this._pag;
        }

        protected set pag(pag: PaginaHtml)
        {
            this._pag = pag;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, pag: PaginaHtml)
        {
            super(strId);

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.pag = pag;
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

        private fechar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispararEvtOnCloseListener();
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

        protected setEventos(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.btnFechar.addEvtOnClickListener(this);
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

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.btnFechar:
                        this.fechar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #region Evento OnCloseListener

        private _arrEvtOnCloseListener: Array<OnCloseListener>;

        private get arrEvtOnCloseListener(): Array<OnCloseListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnCloseListener != null)
                {
                    return this._arrEvtOnCloseListener;
                }

                this._arrEvtOnCloseListener = new Array<OnCloseListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnCloseListener;
        }

        public addEvtOnCloseListener(evtOnCloseListener: OnCloseListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnCloseListener == null)
                {
                    return;
                }

                if (this.arrEvtOnCloseListener.indexOf(evtOnCloseListener) > 0)
                {
                    return;
                }

                this.arrEvtOnCloseListener.push(evtOnCloseListener);
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

        private dispararEvtOnCloseListener(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnCloseListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnCloseListener.forEach((value) => { value.onClose(this); });
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

        public removerEvtOnCloseListener(evtOnCloseListener: OnCloseListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnCloseListener == null)
                {
                    return;
                }

                if (this.arrEvtOnCloseListener.indexOf(evtOnCloseListener) == 0)
                {
                    return;
                }

                this.arrEvtOnCloseListener.splice(this.arrEvtOnCloseListener.indexOf(evtOnCloseListener));
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

        // #endregion Evento OnCloseListener

        // #endregion Eventos
    }
}