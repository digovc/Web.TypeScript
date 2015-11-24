/// <reference path="erro/Erro.ts"/>
/// <reference path="html/componente/Mensagem.ts"/>
/// <reference path="html/PaginaHtml.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="Objeto.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class AppWeb extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booEmFoco: boolean = true;
        private _pag: PaginaHtml;
        private _strSessionId: string;
        protected static _i: AppWeb;

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

                this.inicializar();
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
            return this._strSessionId;
        }

        public set strSessionId(strSessionId: string)
        {
            this._strSessionId = strSessionId;
        }

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

        public inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.setEventos();

                this.inicializarPag();
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

        private inicializarPag(): void
        {
            (this.pag != null) && this.pag.inicializar();
        }

        protected setEventos(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                window.onfocus = this.AppWeb_onFocus;
                window.onblur = this.AppWeb_onBlur;
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

        private AppWeb_onBlur(evt: Event): void
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

        private AppWeb_onFocus(evt: Event): void
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

        // #endregion Eventos
    }
}