// #region Reference

/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="DivGridLinha.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridConteudo extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrDivGridLinha: Array<DivGridLinha>;
        private _divGridConsulta: DivGridBase;

        private get arrDivGridLinha(): Array<DivGridLinha>
        {
            if (this._arrDivGridLinha != null)
            {
                return this._arrDivGridLinha;
            }

            this._arrDivGridLinha = new Array<DivGridLinha>();

            return this._arrDivGridLinha;
        }

        public get divGrid(): DivGridBase
        {
            return this._divGridConsulta;
        }

        public set divGrid(divGrid: DivGridBase)
        {
            this._divGridConsulta = divGrid;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(divGridConsulta: DivGridBase)
        {
            super(null);

            this.strId = (divGridConsulta.strId + "_" + DivGridConteudo.name);

            this.divGrid = divGridConsulta;
        }

        // #endregion Construtor

        // #region Métodos

        private limparLayout(): void
        {
            this.arrDivGridLinha.forEach(d => d.dispose());

            this.arrDivGridLinha.splice(0, this.arrDivGridLinha.length);

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

            if (tbl.arrCln.length < 1)
            {
                return;
            }

            if (this.divGrid.objDataContainer == null)
            {
                return;
            }

            if (this.divGrid.objDataContainer.arrRow == null)
            {
                return;
            }

            if (this.divGrid.objDataContainer.arrRow.length < 1)
            {
                return;
            }

            var intRegistroIndex = (this.divGrid.intIndex * this.divGrid.intRegistroQuantidadeMaxima);

            if (this.divGrid.objDataContainer.arrRow.length < intRegistroIndex)
            {
                return;
            }

            for (var i = 0; (i < this.divGrid.intRegistroQuantidadeMaxima) && (this.divGrid.objDataContainer.arrRow.length > intRegistroIndex); i++ , intRegistroIndex++)
            {
                this.montarLayoutTabelaItem(tbl, intRegistroIndex);
            }
        }

        private montarLayoutTabelaItem(tbl: TabelaWeb, intRegistroIndex: number): void
        {
            var divGridLinha = new DivGridLinha(this);

            this.addHtml(divGridLinha.strLayoutFixo);

            divGridLinha.iniciar();

            divGridLinha.montarLayoutTabela(tbl, intRegistroIndex);

            this.arrDivGridLinha.push(divGridLinha);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}