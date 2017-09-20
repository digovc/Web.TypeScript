// #region Reference

/// <reference path="DivGridColunaBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridColunaLinha extends DivGridColunaBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divGridLinha: DivGridLinha;

        private get divGridLinha(): DivGridLinha
        {
            return this._divGridLinha;
        }

        private set divGridLinha(divGridLinha: DivGridLinha)
        {
            this._divGridLinha = divGridLinha;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(divGridLinha: DivGridLinha)
        {
            super();

            this.divGridLinha = divGridLinha;
        }

        // #endregion Construtor

        // #region Métodos

        public montarLayoutColuna(cln: ColunaWeb): void
        {
            this.cln = cln;

            if (this.cln == null)
            {
                return;
            }

            if (this.divGridLinha == null)
            {
                return;
            }

            if (this.divGridLinha.intRegistroIndex < 0)
            {
                return;
            }

            if (this.divGridLinha.divGridConteudo == null)
            {
                return;
            }

            if (this.divGridLinha.divGridConteudo.divGrid == null)
            {
                return;
            }

            if (this.divGridLinha.divGridConteudo.divGrid.objDataContainer == null)
            {
                return;
            }

            if (this.divGridLinha.divGridConteudo.divGrid.objDataContainer.arrRow == null)
            {
                return;
            }

            if (this.divGridLinha.divGridConteudo.divGrid.objDataContainer.arrRow.length <= this.divGridLinha.intRegistroIndex)
            {
                return;
            }

            var row = this.divGridLinha.divGridConteudo.divGrid.objDataContainer.arrRow[this.divGridLinha.intRegistroIndex];

            this.strConteudo = this.divGridLinha.divGridConteudo.divGrid.objDataContainer.getStr(this.cln.sqlNome, row);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}