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

    export class DivGridColunaCabecalho extends DivGridColunaBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public montarLayoutColuna(cln: ColunaWeb): void
        {
            if (cln == null)
            {
                return;
            }

            this.cln = cln;

            this.strConteudo = this.cln.strNomeExibicao;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}