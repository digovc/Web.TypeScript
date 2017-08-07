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

        private _divGrid: DivGridBase;

        private get divGrid(): DivGridBase
        {
            return this._divGrid;
        }

        private set divGrid(divGridConsulta: DivGridBase)
        {
            this._divGrid = divGridConsulta;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(divGrid: DivGridBase)
        {
            super(null);

            this.strId = (divGrid.strId + "_" + DivGridCabecalho.name);

            this.divGrid = divGrid;
        }

        // #endregion Construtor

        // #region Métodos

        protected montarLayout(): void
        {
            super.montarLayout();

            if (this.divGrid == null)
            {
                return;
            }

            if (this.divGrid.objDataContainer == null)
            {
                return;
            }

            if (this.divGrid.objDataContainer.arrSqlColunaNome == null)
            {
                return;
            }

            this.divGrid.objDataContainer.arrSqlColunaNome.forEach((s) => { this.montarLayoutItem(s) });
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_div_grid_cabecalho_id", this.strId);

            return strLayoutFixo;
        }

        private montarLayoutItem(sqlColunaNome: string): void
        {
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}