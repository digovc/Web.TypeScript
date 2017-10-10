// #region Reference

/// <reference path="Objeto.ts"/>

// #endregion Reference

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
        private _fncComplete: ((o: Loop) => void);
        private _fncTick: ((f: number) => void);

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

        private get fncComplete(): ((o: Loop) => void)
        {
            return this._fncComplete;
        }

        private set fncComplete(fncComplete: ((o: Loop) => void))
        {
            this._fncComplete = fncComplete;
        }

        private get fncTick(): ((f: number) => void)
        {
            return this._fncTick;
        }

        private set fncTick(fncTick: ((f: number) => void))
        {
            this._fncTick = fncTick;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(fncTick: ((f: number) => void), fltDuracao: number = 250, fncComplete: ((o: Loop) => void) = null)
        {
            super();

            this.fltDuracao = fltDuracao;
            this.fncComplete = fncComplete;
            this.fncTick = fncTick;
        }

        // #endregion Construtor

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

            var f = (this.fltTempoDecorrido / this.fltDuracao);

            this.fncTick(f);

            window.requestAnimationFrame(() => this.loop());
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}