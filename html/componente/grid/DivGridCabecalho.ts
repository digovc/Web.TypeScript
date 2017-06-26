/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridCabecalho extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divGridConsulta: DivGridBase;

        private get divGridConsulta(): DivGridBase
        {
            return this._divGridConsulta;
        }

        private set divGridConsulta(divGridConsulta: DivGridBase)
        {
            this._divGridConsulta = divGridConsulta;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(divGridConsulta: DivGridBase)
        {
            super(null);

            this.strId = (divGridConsulta.strId + "_" + DivGridCabecalho.name);

            this.divGridConsulta = divGridConsulta;
        }

        // #endregion Construtor

        // #region Métodos

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_div_grid_cabecalho_id", this.strId);

            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}