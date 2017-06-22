/// <reference path="../Objeto.ts"/>
/// <reference path="RowWeb.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DataContainer extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrRow: Array<RowWeb>;
        private _arrsqlColunaNome: string[];

        public get arrRow(): Array<RowWeb>
        {
            return this._arrRow;
        }

        public set arrRow(arrRow: Array<RowWeb>)
        {
            this._arrRow = arrRow;
        }

        public get arrsqlColunaNome(): string[]
        {
            return this._arrsqlColunaNome;
        }

        public set arrsqlColunaNome(arrsqlColunaNome: string[])
        {
            this._arrsqlColunaNome = arrsqlColunaNome;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public copiarDados(obj: any): void
        {
            super.copiarDados(obj);

            if ((obj as DataContainer)._arrRow == null)
            {
                return;
            }

            if ((obj as DataContainer)._arrRow.length < 1)
            {
                return;
            }

            this.arrRow = new Array<RowWeb>();

            for (var i = 0; i < (obj as DataContainer)._arrRow.length; i++)
            {
                this.arrRow.push(new RowWeb(this));

                this.arrRow[i].copiarDados((obj as DataContainer)._arrRow[i]);
            }
        }

        public getBooVazio(): boolean
        {
            return (this.arrRow == null) || (this.arrRow.length == 0);
        }

        public getDec(sqlColunaNome: string, row: RowWeb): number
        {
            return Number(this.getStr(sqlColunaNome, row));
        }

        public getInt(sqlColunaNome: string, row: RowWeb): number
        {
            return Math.round(this.getDec(sqlColunaNome, row));
        }

        public getStr(sqlColunaNome: string, row: RowWeb): string
        {
            if (this.arrsqlColunaNome == null)
            {
                return;
            }

            if (this.arrRow == null)
            {
                return;
            }

            if (this.arrRow.indexOf(row) < 0)
            {
                return null;
            }

            if (Utils.getBooStrVazia(sqlColunaNome))
            {
                return null;
            }

            var intClnIndex = this.arrsqlColunaNome.indexOf(sqlColunaNome);

            if (intClnIndex < 0)
            {
                return null;
            }

            if (row.arrStrValor == null)
            {
                return null;
            }

            if (row.arrStrValor.length <= intClnIndex)
            {
                return null;
            }

            return row.arrStrValor[intClnIndex];
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}