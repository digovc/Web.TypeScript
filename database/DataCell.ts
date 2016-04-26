/// <reference path="../Objeto.ts"/>
/// <reference path="ColunaWeb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DataCell extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _clnWeb: ColunaWeb;

        private get clnWeb(): ColunaWeb
        {
            return this._clnWeb;
        }

        private set clnWeb(clnWeb: ColunaWeb)
        {
            this._clnWeb = clnWeb;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}