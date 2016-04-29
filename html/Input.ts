/// <reference path="../OnEnterListener.ts"/>
/// <reference path="../OnLeaveListener.ts"/>
/// <reference path="../OnValorAlteradoListener.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Input extends Tag implements OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booDisabled: boolean;
        private _booValor: boolean;
        private _booVazio: boolean;
        private _decValor: number;
        private _dttValor: Date;
        private _intValor: number;
        private _strValor: string;
        private _strValorAnterior: string;
        private _strValorInicial: string;

        public get booDisabled(): boolean
        {
            this._booDisabled = this.getBooDisabled();

            return this._booDisabled;
        }

        public set booDisabled(booDisabled: boolean)
        {
            this._booDisabled = booDisabled;

            this.atualizarBooDisabled();
        }

        public get booValor(): boolean
        {
            this._booValor = Utils.strToBoo(this.strValor);

            return this._booValor;
        }

        public set booValor(booValor: boolean)
        {
            this._booValor = booValor;

            this.strValor = this._booValor ? "true" : "false";
        }

        public get booVazio(): boolean
        {
            this._booVazio = this.getBooVazio();

            return this._booVazio;
        }

        public get dttValor(): Date
        {
            // TODO: Converter strValor para dttValor.

            return this._dttValor;
        }

        public set dttValor(dttValor: Date)
        {
            this._dttValor = dttValor;

            // TODO: Converter dttValor para strValor.
        }

        public get decValor(): number
        {
            if (Utils.getBooStrVazia(this.strValor))
            {
                return 0;
            }

            this._decValor = parseFloat(this.strValor);

            return this._decValor;
        }

        public set decValor(decValor: number)
        {
            this._decValor = decValor;

            try
            {
                this.strValor = this._decValor.toString();
            }
            catch (ex)
            {
                this.strValor = null;
            }
        }

        public get intValor(): number
        {
            this._intValor = Math.round(this.decValor);

            return this._intValor;
        }

        public set intValor(intValor: number)
        {
            this._intValor = intValor;

            this.decValor = this._intValor;
        }

        public get strValor(): string
        {
            return this._strValor;
        }

        public set strValor(strValor: string)
        {
            if (this._strValor == strValor)
            {
                return;
            }

            this.strValorAnterior = this._strValor;

            this._strValor = strValor;

            this.atualizarStrValor();
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

        private atualizarBooDisabled(): void
        {
            if (this.jq)
            {
                return;
            }

            if (this.booDisabled)
            {
                this.jq.attr("disabled", "true");
            }
            else
            {
                this.jq.removeAttr("disabled");
            }
        }

        private atualizarStrValor(): void
        {
            if (this.jq.val() != this.strValor)
            {
                this.jq.val(this.strValor);
            }

            this.dispararEvtOnValorAlteradoListener();
        }

        private getBooDisabled(): boolean
        {
            if (this.jq == null)
            {
                return false;
            }

            return (Utils.getBooStrVazia(this.jq.attr("disabled")));
        }

        private getBooVazio(): boolean
        {
            return Utils.getBooStrVazia(this.strValor);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarStrValor();
        }

        private inicializarStrValor(): void
        {
            this.strValor = this.jq.val();
            this.strValorInicial = this.strValor;
        }

        public selecionarTudo(): void
        {
            if (Utils.getBooStrVazia(this.strValor))
            {
                return;
            }

            this.jq.select();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnValorAlteradoListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.strValor == this.jq.val())
                {
                    return;
                }

                this.strValor = this.jq.val();
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

                if (this.arrEvtOnEnterListener.indexOf(evtOnEnterListener) > -1)
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

                if (this.arrEvtOnEnterListener.indexOf(evtOnEnterListener) == -1)
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

                this.arrEvtOnEnterListener.forEach((evt) => { evt.onEnter(this); });
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

                if (this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener) > -1)
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

                if (this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener) == -1)
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

                this.arrEvtOnLeaveListener.forEach((evt) => { evt.onLeave(this); });
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

                if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) > -1)
                {
                    return;
                }

                if (this.arrEvtOnValorAlteradoListener.length == 0)
                {
                    this.jq.change((arg) => { this.strValor = this.jq.val(); });
                    this.jq.keydown((arg) => { this.strValor = this.jq.val(); });
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

                if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) == -1)
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

                if (this.strValor == this.strValorAnterior)
                {
                    return;
                }

                arg = new OnValorAlteradoArg();

                arg.strValor = this.strValor;
                arg.strValorAnterior = this.strValorAnterior;

                this.arrEvtOnValorAlteradoListener.forEach((evt) => { evt.onValorAlterado(this, arg); });
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