// #region Módulos externos

/// <reference path="design/PaletaCor.ts"/>
/// <reference path="erro/Erro.ts"/>
/// <reference path="html/componente/Mensagem.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="Objeto.ts"/>

// #endregion Módulos externos

module NetZ.Web.TypeScript
{
    // #region Importações

    import Erro = NetZ.Web.TypeScript.erro.Erro;
    import Mensagem = NetZ.Web.TypeScript.html.componente.Mensagem;
    import PaletaCor = NetZ.Web.TypeScript.design.PaletaCor;

    // #endregion Importações

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
        protected static _i: AppWeb;

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
            catch (ex)
            {
                throw ex;
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
            catch (ex)
            {
                throw ex;
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

        private evtBlur(evt: Event): void
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

        private evtFocus(evt: Event): void
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