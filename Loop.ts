/// <reference path="Objeto.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Loop extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _fltDuracao: number;
        private _fltTempoDecorrido: number;
        private _fltUltimoFrame: number;
        private _fncComplete: Function;
        private _fncTick: Function;

        private get fltDuracao(): number
        {
            return this._fltDuracao;
        }

        private set fltDuracao(fltDuracao: number)
        {
            this._fltDuracao = fltDuracao;
        }

        private get fltTempoDecorrido(): number
        {
            return this._fltTempoDecorrido;
        }

        private set fltTempoDecorrido(fltTempoDecorrido: number)
        {
            this._fltTempoDecorrido = fltTempoDecorrido;
        }

        private get fltUltimoFrame(): number
        {
            return this._fltUltimoFrame;
        }

        private set fltUltimoFrame(fltUltimoFrame: number)
        {
            this._fltUltimoFrame = fltUltimoFrame;
        }

        private get fncComplete(): Function
        {
            return this._fncComplete;
        }

        private set fncComplete(fncComplete: Function)
        {
            this._fncComplete = fncComplete;
        }

        private get fncTick(): Function
        {
            return this._fncTick;
        }

        private set fncTick(fncTick: Function)
        {
            this._fncTick = fncTick;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(fncTick: Function, fltDuracao: number = 250, fncComplete: Function = null)
        {
            super();

            this.fltDuracao = fltDuracao;
            this.fncComplete = fncComplete;
            this.fncTick = fncTick;
        }

        // #endregion Construtores

        // #region Métodos

        private destruir(): void
        {
            this.fncTick(1);

            if (this.fncComplete == null)
            {
                return;
            }

            this.fncComplete(this);
        }

        private inicializar(): void
        {
            this.fltTempoDecorrido = 0;
            this.fltUltimoFrame = Date.now();

            window.requestAnimationFrame(() => this.loop());
        }

        public iniciar(): void
        {
            this.inicializar();
        }

        private loop(): void
        {
            this.fltTempoDecorrido += (Date.now() - this.fltUltimoFrame);

            this.fltUltimoFrame = Date.now();

            if (this.fltTempoDecorrido >= this.fltDuracao)
            {
                this.destruir();
                return;
            }

            var fltLoop = (this.fltTempoDecorrido / this.fltDuracao);

            this.fncTick(fltLoop);

            window.requestAnimationFrame(() => this.loop());
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}