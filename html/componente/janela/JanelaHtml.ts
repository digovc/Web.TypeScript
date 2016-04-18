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

        private _booAtivo: boolean = true;
        private _divBtnFechar: Div;
        private _divInativa: Div;
        private _pag: PaginaHtml;

        public get booAtivo(): boolean
        {
            return this._booAtivo;
        }

        public set booAtivo(booAtivo: boolean)
        {
            if (this._booAtivo == booAtivo)
            {
                return;
            }

            this._booAtivo = booAtivo;

            this.atualizarBooAtivo();
        }

        private get divBtnFechar(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divBtnFechar != null)
                {
                    return this._divBtnFechar;
                }

                this._divBtnFechar = new BotaoFecharMini(this.strId + "_divBtnFechar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divBtnFechar;
        }

        protected get pag(): PaginaHtml
        {
            return this._pag;
        }

        protected set pag(pag: PaginaHtml)
        {
            this._pag = pag;
        }

        private get divInativa(): Div
        {
            if (this._divInativa != null)
            {
                return this._divInativa;
            }

            this._divInativa = new Div(this.strId + "_divInativa");

            return this._divInativa;
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

        private atualizarBooAtivo(): void
        {
            this.divInativa.jq.css("display", !this.booAtivo ? "block" : null);
        }

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
                this.divBtnFechar.addEvtOnClickListener(this);
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
                    case this.divBtnFechar:
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