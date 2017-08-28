/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridRodape extends ComponenteHtml
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

            this.strId = (divGridConsulta.strId + "_" + DivGridRodape.name);

            this.divGridConsulta = divGridConsulta;
        }

        // #endregion Construtor

        // #region Métodos

        public montarLayoutTabela(tbl: TabelaWeb): void
        {
            if (tbl == null)
            {
                return;
            }

            if (tbl.arrCln == null)
            {
                return;
            }

            if (tbl.arrCln.length < 1)
            {
                return;
            }

            tbl.arrCln.forEach(c => this.montarLayoutTabelaColuna(c));
        }

        private montarLayoutTabelaColuna(cln: ColunaWeb): void
        {
            if (cln == null)
            {
                return;
            }


        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}