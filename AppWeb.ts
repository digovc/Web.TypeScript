﻿// #region Módulos externos
// #endregion Módulos externos

// #region Importações

import Erro = NetZ.Web.TypeScript.erro.Erro;
import Mensagem = NetZ.Web.TypeScript.html.componente.Mensagem;
import PaletaCor = NetZ.Web.TypeScript.design.PaletaCor;

// #endregion Importações

module NetZ.Web.TypeScript
{
    // #region Enumerados
    // #endregion Enumerados

    export class AppWeb extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrObjPaletaCor: PaletaCor[];
        private _booEmFoco: boolean = true;
        private _intPaletaCorSelecionada: number;
        private _strSessionId: string;
        private static _i: AppWeb;

        private get arrObjPaletaCor(): PaletaCor[]
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrObjPaletaCor != null)
                {
                    return this._arrObjPaletaCor;
                }

                this._arrObjPaletaCor = [];
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrObjPaletaCor;
        }

        public get booEmFoco(): boolean
        {
            return this._booEmFoco;
        }

        public set booEmFoco(booEmFoco: boolean)
        {
            this._booEmFoco = booEmFoco;
        }

        public get intPaletaCorSelecionada(): number
        {
            return this._intPaletaCorSelecionada;
        }

        public set intPaletaCorSelecionada(intPaletaCorSelecionada: number)
        {
            this._intPaletaCorSelecionada = intPaletaCorSelecionada;
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (AppWeb._i != null)
                {
                    return AppWeb._i;
                }

                AppWeb._i = new AppWeb();
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return AppWeb._i;
        }

        // #endregion Atributos

        // #region Construtores

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
            catch (e)
            {
                throw e;
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
                this.montarLayout();
                this.setEventos();
            }
            catch (e)
            {
                throw e;
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
                $(window).focus(this.evtFocus);
                $(window).blur(this.evtBlur);

                window.onfocus = this.evtFocus;
                window.onblur = this.evtBlur;
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Métodos

        // #region Eventos

        private evtBlur(evt): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.booEmFoco = false;
            }
            catch (e)
            {
                new Erro("Erro desconhecido.", e);
            }
            finally
            {
            }
            // #endregion Ações
        }

        private evtFocus(evt): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.booEmFoco = true;
            }
            catch (e)
            {
                new Erro("Erro desconhecido.", e);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}