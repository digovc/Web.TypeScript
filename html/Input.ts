/// <reference path="../OnEnterListener.ts"/>
/// <reference path="../OnValorAlteradoListener.ts"/>
/// <reference path="OnLeaveListener.ts"/>
/// <reference path="Tag.ts"/>

module Web
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
        private _fltValor: number;
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

            this.setBooDisabled(this._booDisabled);
        }

        public get booValor(): boolean
        {
            this._booValor = Utils.getBoo(this.strValor);

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
            this._decValor = this.decValor;

            return this._decValor;
        }

        public set decValor(decValor: number)
        {
            this._decValor = decValor;

            this.fltValor = this._decValor;
        }

        public get fltValor(): number
        {
            if (Utils.getBooStrVazia(this.strValor))
            {
                return 0;
            }

            this._fltValor = parseFloat(this.strValor);

            return this._fltValor;
        }

        public set fltValor(fltValor: number)
        {
            this._fltValor = fltValor;

            try
            {
                this.strValor = this._fltValor.toString();
            }
            catch (ex)
            {
                this.strValor = null;
            }
        }

        public get intValor(): number
        {
            this._intValor = Math.round(this.fltValor);

            return this._intValor;
        }

        public set intValor(intValor: number)
        {
            this._intValor = intValor;

            this.fltValor = Math.round(this._intValor);
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

            this.setStrValor(this._strValor);
        }

        public get strValorAnterior(): string
        {
            return this._strValorAnterior;
        }

        public set strValorAnterior(strValorAnterior: string)
        {
            this._strValorAnterior = strValorAnterior;
        }

        protected get strValorInicial(): string
        {
            return this._strValorInicial;
        }

        protected set strValorInicial(strValorInicial: string)
        {
            this._strValorInicial = strValorInicial;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

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

        protected inicializarStrValor(): void
        {
            this.strValor = this.jq.val();
            this.strValorInicial = this.strValor;
        }

        public reverterValor(): void
        {
            this._strValor = this._strValorInicial;

            this.jq.val(this._strValorInicial);
        }

        public selecionarTudo(): void
        {
            if (Utils.getBooStrVazia(this.strValor))
            {
                return;
            }

            this.jq.select();
        }

        private setBooDisabled(booDisabled: boolean): void
        {
            if (booDisabled)
            {
                this.jq.attr("disabled", "true");
                return;
            }

            this.jq.removeAttr("disabled");
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnValorAlteradoListener(this);
        }

        protected setStrValor(strValor: string): void
        {
            if (this.jq.val() != strValor)
            {
                this.jq.val(strValor);
            }

            this.dispararEvtOnValorAlteradoListener(strValor);
        }

        // #endregion Métodos

        // #region Eventos

        public onValorAlterado(objSender: Objeto, arg: OnValorAlteradoArg): void
        {
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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #region Evento OnEnterListener

        private _arrEvtOnEnterListener: Array<OnEnterListener>;

        private get arrEvtOnEnterListener(): Array<OnEnterListener>
        {
            if (this._arrEvtOnEnterListener != null)
            {
                return this._arrEvtOnEnterListener;
            }

            this._arrEvtOnEnterListener = new Array<OnEnterListener>();

            return this._arrEvtOnEnterListener;
        }

        public addEvtOnEnterListener(evt: OnEnterListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnEnterListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnEnterListener.length == 0)
            {
                this.jq.focusin(() => this.dispararEvtOnEnterListener());
            }

            this.arrEvtOnEnterListener.push(evt);
        }

        public removeEvtOnEnterListener(evtOnEnterListener: OnEnterListener): void
        {
            if (evtOnEnterListener == null)
            {
                return;
            }

            if (this.arrEvtOnEnterListener.indexOf(evtOnEnterListener) == -1)
            {
                return;
            }

            this.arrEvtOnEnterListener.splice(this.arrEvtOnEnterListener.indexOf(evtOnEnterListener), 1);
        }

        private dispararEvtOnEnterListener(): void
        {
            if (this.arrEvtOnEnterListener.length == 0)
            {
                return;
            }

            this.arrEvtOnEnterListener.forEach(e => e.onEnter(this));
        }

        // #endregion Evento OnEnterListener

        // #region Evento OnLeaveListener

        private _arrEvtOnLeaveListener: Array<OnLeaveListener>;

        private get arrEvtOnLeaveListener(): Array<OnLeaveListener>
        {
            if (this._arrEvtOnLeaveListener != null)
            {
                return this._arrEvtOnLeaveListener;
            }

            this._arrEvtOnLeaveListener = new Array<OnLeaveListener>();

            return this._arrEvtOnLeaveListener;
        }

        public addEvtOnLeaveListener(evt: OnLeaveListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnLeaveListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnLeaveListener.length == 0)
            {
                this.jq.focusout((arg) => this.dispararEvtOnLeaveListener(arg));
            }

            this.arrEvtOnLeaveListener.push(evt);
        }

        public removeEvtOnLeaveListener(evtOnLeaveListener: OnLeaveListener): void
        {
            if (evtOnLeaveListener == null)
            {
                return;
            }

            if (this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener) == -1)
            {
                return;
            }

            this.arrEvtOnLeaveListener.splice(this.arrEvtOnLeaveListener.indexOf(evtOnLeaveListener), 1);
        }

        private dispararEvtOnLeaveListener(arg: JQueryEventObject): void
        {
            if (this.arrEvtOnLeaveListener.length == 0)
            {
                return;
            }

            this.arrEvtOnLeaveListener.forEach(e => e.onLeave(this));
        }

        // #endregion Evento OnLeaveListener

        // #region Evento OnValorAlteradoListener

        private _arrEvtOnValorAlteradoListener: Array<OnValorAlteradoListener>;

        private get arrEvtOnValorAlteradoListener(): Array<OnValorAlteradoListener>
        {
            if (this._arrEvtOnValorAlteradoListener != null)
            {
                return this._arrEvtOnValorAlteradoListener;
            }

            this._arrEvtOnValorAlteradoListener = new Array<OnValorAlteradoListener>();

            return this._arrEvtOnValorAlteradoListener;
        }

        public addEvtOnValorAlteradoListener(evt: OnValorAlteradoListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnValorAlteradoListener.indexOf(evt) > -1)
            {
                return;
            }

            if (this.arrEvtOnValorAlteradoListener.length == 0)
            {
                this.jq.change(a => this.strValor = this.jq.val());
                this.jq.keyup(a => this.strValor = this.jq.val());
            }

            this.arrEvtOnValorAlteradoListener.push(evt);
        }

        public removeEvtOnValorAlteradoListener(evtOnValorAlteradoListener: OnValorAlteradoListener): void
        {
            if (evtOnValorAlteradoListener == null)
            {
                return;
            }

            if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) == -1)
            {
                return;
            }

            this.arrEvtOnValorAlteradoListener.splice(this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener), 1);
        }

        private dispararEvtOnValorAlteradoListener(strValor: string): void
        {
            if (this.arrEvtOnValorAlteradoListener.length == 0)
            {
                return;
            }

            if (strValor == this.strValorAnterior)
            {
                return;
            }

            var arg = new OnValorAlteradoArg();

            arg.strValor = strValor;
            arg.strValorAnterior = this.strValorAnterior;

            this.arrEvtOnValorAlteradoListener.forEach(e => e.onValorAlterado(this, arg));
        }

        // #endregion Evento OnValorAlteradoListener

        // #endregion Eventos
    }
}