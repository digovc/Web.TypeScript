/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Canvas extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booPararAnimacao: boolean;
        private _ctx2D: CanvasRenderingContext2D;
        private _dttFrameUltimo: Date;
        private _decDelta: number;
        private _intFps: number;
        private _intFrameQuantidade: number;
        private _intSegundoFps: number;

        private get booPararAnimacao(): boolean
        {
            return this._booPararAnimacao;
        }

        private set booPararAnimacao(booPararAnimacao: boolean)
        {
            this._booPararAnimacao = booPararAnimacao;
        }

        public get ctx2D(): CanvasRenderingContext2D
        {
            if (this._ctx2D != null)
            {
                return this._ctx2D;
            }

            this._ctx2D = this.getCtx2D();

            return this._ctx2D;
        }

        private get dttFrameUltimo(): Date
        {
            return this._dttFrameUltimo;
        }

        private set dttFrameUltimo(dttFrameUltimo: Date)
        {
            this._dttFrameUltimo = dttFrameUltimo;
        }

        public get decDelta(): number
        {
            return this._decDelta;
        }

        public set decDelta(decDelta: number)
        {
            this._decDelta = decDelta;
        }

        private get intFps(): number
        {
            return this._intFps;
        }

        private set intFps(intFps: number)
        {
            this._intFps = intFps;
        }

        private get intFrameQuantidade(): number
        {
            return this._intFrameQuantidade;
        }

        private set intFrameQuantidade(intFrameQuantidade: number)
        {
            this._intFrameQuantidade = intFrameQuantidade;
        }

        private get intSegundoFps(): number
        {
            return this._intSegundoFps;
        }

        private set intSegundoFps(intSegundoFps: number)
        {
            this._intSegundoFps = intSegundoFps;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public animar(): void
        {
            this.booPararAnimacao = false;

            if (this.ctx2D == null)
            {
                return;
            }

            window.requestAnimationFrame(() => this.loop());
        }

        private calcularDecDelta(): void
        {
            if (this.dttFrameUltimo == null)
            {
                this.dttFrameUltimo = new Date();
            }

            this.decDelta = ((Date.now() - this.dttFrameUltimo.getTime()) / 1000);

            this.dttFrameUltimo.setTime(Date.now());
        }

        private calcularIntFps(): void
        {
            this.intFrameQuantidade++;

            var dttNow = new Date();

            if (this.intSegundoFps == dttNow.getSeconds())
            {
                return;
            }

            this.intSegundoFps = dttNow.getSeconds();

            this.intFps = this.intFrameQuantidade;

            this.intFrameQuantidade = 0;
        }

        private getCtx2D(): CanvasRenderingContext2D
        {
            if (Utils.getBooStrVazia(this.strId))
            {
                return null;
            }

            var tagCanvas = (document.getElementById(this.strId) as HTMLCanvasElement);

            if (tagCanvas == null)
            {
                return null;
            }

            return tagCanvas.getContext("2d");
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.ctx2D.canvas.height = window.innerHeight;
            this.ctx2D.canvas.width = window.innerWidth;
        }

        private loop(): void
        {
            this.calcularIntFps();
            this.calcularDecDelta();

            this.ctx2D.clearRect(0, 0, this.jq.width(), this.jq.height());

            this.update();

            if (this.booPararAnimacao)
            {
                return;
            }

            this.animar();
        }

        public pararAnimacao(): void
        {
            this.booPararAnimacao = true;
        }

        protected update(): void
        {
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}