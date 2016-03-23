/// <reference path="../OnEnterListener.ts"/>
/// <reference path="../OnLeaveListener.ts"/>
/// <reference path="../OnValorAlteradoListener.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Input extends Tag
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booValor: boolean;
        private _decValor: number;
        private _dttValor: Date;
        private _intValor: number;
        private _strValor: string;
        private _strValorAnterior: string;
        private _strValorInicial: string;

        public get booValor(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booValor = Utils.strToBoo(this.strValor);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._booValor;
        }

        public set booValor(booValor: boolean)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booValor = booValor;

                this.strValor = this._booValor ? "true" : "false";
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

        public get dttValor(): Date
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                // TODO: Converter strValor para dttValor.
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._dttValor;
        }

        public set dttValor(dttValor: Date)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._dttValor = dttValor;

                // TODO: Converter dttValor para strValor.
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

        public get decValor(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._decValor = parseFloat(this.strValor);
            }
            catch (ex)
            {
                return 0;
            }
            finally
            {
            }
            // #endregion Ações

            return this._decValor;
        }

        public set decValor(decValor: number)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._decValor = decValor;

                this.strValor = this._decValor.toString();
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

        public get intValor(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intValor = parseInt(this.strValor);
            }
            catch (ex)
            {
                return 0;
            }
            finally
            {
            }
            // #endregion Ações

            return this._intValor;
        }

        public set intValor(intValor: number)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intValor = intValor;

                this.strValor = this._intValor.toString();
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

        public get strValor(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strValor = this.getStrValor();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strValor;
        }

        public set strValor(strValor: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strValorAnterior = this._strValor;

                this._strValor = strValor;

                this.atualizarStrValor();
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

        public get strValorAnterior(): string
        {
            return this._strValorAnterior;
        }

        public set strValorAnterior(strValorAnterior: string)
        {
            this._strValorAnterior = strValorAnterior;
        }

        private get strValorInicial(): string
        {
            return this._strValorInicial;
        }

        private set strValorInicial(strValorInicial: string)
        {
            this._strValorInicial = strValorInicial;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private atualizarStrValor(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.strValor != this.jq.val())
                {
                    this.jq.val(this.strValor);
                }

                if (this.strValor == this.strValorAnterior)
                {
                    return;
                }

                this.dispararEvtOnValorAlteradoListener();
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

        private getStrValor(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return null;
                }

                return this.jq.val();
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
            super.inicializar();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strValorInicial = this.strValor;
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

        private onKeyUp(arg: JQueryKeyEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strValor = this.jq.val();
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

        private Input_keyUp(arg: JQueryKeyEventObject)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.onKeyUp(arg);
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

        // #region Evento OnEnterListener

        private _arrEvtOnEnterListener: Array<OnEnterListener>;

        private get arrEvtOnEnterListener(): Array<OnEnterListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnEnterListener != null)
                {
                    return this._arrEvtOnEnterListener;
                }

                this._arrEvtOnEnterListener = new Array<OnEnterListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnEnterListener;
        }

        public addEvtOnEnterListener(evtOnEnterListener: OnEnterListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnEnterListener == null)
                {
                    return;
                }

                if (this.arrEvtOnEnterListener.indexOf(evtOnEnterListener) > 0)
                {
                    return;
                }

                if (this.arrEvtOnEnterListener.length == 0)
                {
                    this.jq.focusin(() => this.dispararEvtOnEnterListener());
                }

                this.arrEvtOnEnterListener.push(evtOnEnterListener);
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

        public removeEvtOnEnterListener(evtOnEnterListener: OnEnterListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnEnterListener == null)
                {
                    return;
                }

                if (this.arrEvtOnEnterListener.indexOf(evtOnEnterListener) == 0)
                {
                    return;
                }

                this.arrEvtOnEnterListener.splice(this.arrEvtOnEnterListener.indexOf(evtOnEnterListener));
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

        private dispararEvtOnEnterListener(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnEnterListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnEnterListener.forEach((value) => { value.onEnter(this); });
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

        // #endregion Evento OnEnterListener

        // #region Evento OnLeaveListener

        private _arrEvtOnLeaveListener: Array<OnLeaveListener>;

        private get arrEvtOnLeaveListener(): Array<OnLeaveListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnLeaveListener != null)
                {
                    return this._arrEvtOnLeaveListener;
                }

                this._arrEvtOnLeaveListener = new Array<OnLeaveListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnLeaveListener;
        }

        public addEvtOnLeaveListener(evtOnLeaveListener: OnLeaveListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnLeaveListener == null)
                {
                    return;
                }

                if (this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener) > 0)
                {
                    return;
                }

                if (this.arrEvtOnLeaveListener.length == 0)
                {
                    this.jq.focusout((arg) => this.dispararEvtOnLeaveListener(arg));
                }

                this.arrEvtOnLeaveListener.push(evtOnLeaveListener);
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

        public removeEvtOnLeaveListener(evtOnLeaveListener: OnLeaveListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnLeaveListener == null)
                {
                    return;
                }

                if (this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener) == 0)
                {
                    return;
                }

                this.arrEvtOnLeaveListener.splice(this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener));
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

        private dispararEvtOnLeaveListener(arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnLeaveListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnLeaveListener.forEach((value) => { value.onLeave(this); });
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

        // #endregion Evento OnLeaveListener

        // #region Evento OnValorAlteradoListener

        private _arrEvtOnValorAlteradoListener: Array<OnValorAlteradoListener>;

        private get arrEvtOnValorAlteradoListener(): Array<OnValorAlteradoListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnValorAlteradoListener != null)
                {
                    return this._arrEvtOnValorAlteradoListener;
                }

                this._arrEvtOnValorAlteradoListener = new Array<OnValorAlteradoListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnValorAlteradoListener;
        }

        public addEvtOnValorAlteradoListener(evtOnValorAlteradoListener: OnValorAlteradoListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnValorAlteradoListener == null)
                {
                    return;
                }

                if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) > 0)
                {
                    return;
                }

                if (this.arrEvtOnValorAlteradoListener.length == 0)
                {
                    this.jq.keyup((arg) => this.Input_keyUp(arg));
                }

                this.arrEvtOnValorAlteradoListener.push(evtOnValorAlteradoListener);
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

        public removeEvtOnValorAlteradoListener(evtOnValorAlteradoListener: OnValorAlteradoListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnValorAlteradoListener == null)
                {
                    return;
                }

                if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) == 0)
                {
                    return;
                }

                this.arrEvtOnValorAlteradoListener.splice(this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener));
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

        private dispararEvtOnValorAlteradoListener(): void
        {
            // #region Variáveis

            var arg: OnValorAlteradoArg;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnValorAlteradoListener.length == 0)
                {
                    return;
                }

                arg = new OnValorAlteradoArg();

                arg.strValor = this.strValor;
                arg.strValorAnterior = this.strValorAnterior;

                this.arrEvtOnValorAlteradoListener.forEach((value) => { value.onValorAlterado(this, arg); });
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

        // #endregion Evento OnValorAlteradoListener

        // #endregion Eventos
    }
}