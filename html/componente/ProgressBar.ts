// #region Reference

/// <reference path="ComponenteHtmlBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ProgressBar extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divProgresso: Div;
        private _intProgresso: number;
        private _intProgressoMaximo: number = 100;

        private get divProgresso(): Div
        {
            if (this._divProgresso != null)
            {
                return this._divProgresso;
            }

            this._divProgresso = new Div(this.strId + "_divProgresso");

            return this._divProgresso;
        }

        public get intProgresso(): number
        {
            return this._intProgresso;
        }

        public set intProgresso(intProgresso: number)
        {
            if (this._intProgresso == intProgresso)
            {
                return;
            }

            this._intProgresso = intProgresso;

            this.setIntProgresso(this._intProgresso);
        }

        public get intProgressoMaximo(): number
        {
            return this._intProgressoMaximo;
        }

        public set intProgressoMaximo(intProgressoMaximo: number)
        {
            this._intProgressoMaximo = intProgressoMaximo;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private setIntProgresso(intProgresso: number): void
        {
            var intPercentual = ((intProgresso / this.intProgressoMaximo) * 100);

            if (intPercentual > 100)
            {
                intPercentual = 100;
            }

            if (intPercentual < 0)
            {
                intPercentual = 0;
            }

            this.divProgresso.jq.css("width", "_percentual%".replace("_percentual", intPercentual.toString()));
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}