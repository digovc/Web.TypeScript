/// <reference path="erro/Erro.ts"/>
/// <reference path="html/PaginaHtml.ts"/>
/// <reference path="Objeto.ts"/>
/// <reference path="OnStartListener.ts"/>

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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (AppWeb.i != null)
                {
                    return;
                }

                AppWeb._i = appWeb;
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

        private _booEmFoco: boolean = true;
        private _pag: PaginaHtml;
        private _strSessionId: string;

        public get booEmFoco(): boolean
        {
            return this._booEmFoco;
        }

        public set booEmFoco(booEmFoco: boolean)
        {
            this._booEmFoco = booEmFoco;
        }

        public get pag(): PaginaHtml
        {
            return this._pag;
        }

        public set pag(pag: PaginaHtml)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (pag == null)
                {
                    return;
                }

                if (this._pag != null)
                {
                    return;
                }

                this._pag = pag;

                this.iniciar();
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

        public get strSessionId(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._strSessionId != null)
                {
                    return this._strSessionId;
                }

                this._strSessionId = this.getStrSessionId();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strSessionId;
        }

        // #endregion Atributos

        // #region Construtores

        constructor()
        {
            super();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                AppWeb.i = this;
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

        private getStrCookieValue(strCookieNome: string): string
        {
            // #region Variáveis

            var objRegExp: RegExp;
            var objRegExpExecArray: RegExpExecArray;
            var strResultado: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(strCookieNome))
                {
                    return null;
                }

                objRegExp = new RegExp(name + "=([^;]+)");

                objRegExpExecArray = objRegExp.exec(document.cookie);

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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private getStrSessionId(): string
        {
            return this.getStrCookieValue(AppWeb.STR_COOKIE_SESSAO_ID_NOME);
        }

        public imprimir(pag: string): void
        {
            // #region Variáveis

            var objWindow: any;

            // #endregion Variáveis

            // #region Ações
            try
            {
                objWindow = window.open('', 'my div', 'height=400,width=600');

                objWindow.document.write(pag);
                objWindow.print();
                objWindow.close();
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

        protected inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispararEvtOnStartListener();
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

        protected setEventos(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                window.onfocus = (e: FocusEvent) => this.AppWeb_onFocus(e);
                window.onblur = (e: FocusEvent) => this.AppWeb_onBlur(e);
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

        private AppWeb_onBlur(e: FocusEvent): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.booEmFoco = false;
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

        private AppWeb_onFocus(e: FocusEvent): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.booEmFoco = true;
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

        // #region Evento OnStartListener

        private _arrEvtOnStartListener: Array<OnStartListener>;

        private get arrEvtOnStartListener(): Array<OnStartListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnStartListener != null)
                {
                    return this._arrEvtOnStartListener;
                }

                this._arrEvtOnStartListener = new Array<OnStartListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnStartListener;
        }

        public addEvtOnStartListener(evtOnStartListener: OnStartListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnStartListener == null)
                {
                    return;
                }

                if (this.arrEvtOnStartListener.indexOf(evtOnStartListener) > 0)
                {
                    return;
                }

                this.arrEvtOnStartListener.push(evtOnStartListener);
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

        public removeEvtOnStartListener(evtOnStartListener: OnStartListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnStartListener == null)
                {
                    return;
                }

                if (this.arrEvtOnStartListener.indexOf(evtOnStartListener) == 0)
                {
                    return;
                }

                this.arrEvtOnStartListener.splice(this.arrEvtOnStartListener.indexOf(evtOnStartListener));
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

        private dispararEvtOnStartListener(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnStartListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnStartListener.forEach((value) => { value.onStart(); });
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

        // #endregion Evento OnStartListener

        // #endregion Eventos
    }
}