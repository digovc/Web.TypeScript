// #region Reference

/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="coluna/DivGridColunaCabecalho.ts"/>

// #endregion Reference

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridCabecalho extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrDivGridColunaCabecalho: Array<DivGridColunaCabecalho>;
        private _divGrid: DivGridBase;

        private get arrDivGridColunaCabecalho(): Array<DivGridColunaCabecalho>
        {
            if (this._arrDivGridColunaCabecalho != null)
            {
                return this._arrDivGridColunaCabecalho;
            }

            this._arrDivGridColunaCabecalho = new Array<DivGridColunaCabecalho>();

            return this._arrDivGridColunaCabecalho;
        }

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

        private limparLayout(): void
        {
            this.arrDivGridColunaCabecalho.forEach(d => d.dispose());

            this.arrDivGridColunaCabecalho.splice(0, this.arrDivGridColunaCabecalho.length);

            this.strConteudo = null;
        }

        public montarLayoutTabela(tbl: TabelaWeb): void
        {
            this.limparLayout();

            if (tbl == null)
            {
                return;
            }

            if (tbl.arrCln == null)
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

            if (Utils.getBooStrVazia(cln.strNomeExibicao))
            {
                return;
            }

            var divGridColunaCabecalho = new DivGridColunaCabecalho();

            this.addHtml(divGridColunaCabecalho.strLayoutFixo);

            divGridColunaCabecalho.iniciar();

            divGridColunaCabecalho.montarLayoutColuna(cln);

            this.arrDivGridColunaCabecalho.push(divGridColunaCabecalho);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}