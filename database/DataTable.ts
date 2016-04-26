/// <reference path="../Objeto.ts"/>
/// <reference path="DataRow.ts"/>
/// <reference path="TabelaWeb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DataTable extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrRow: DataRow;
        private _tblWeb: TabelaWeb;

        private get arrRow(): DataRow
        {
            if (this._arrRow != null)
            {
                return this._arrRow;
            }

            this._arrRow = new DataRow();

            return this._arrRow;
        }

        public get tblWeb(): TabelaWeb
        {
            return this._tblWeb;
        }

        public set tblWeb(tblWeb: TabelaWeb)
        {
            this._tblWeb = tblWeb;
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