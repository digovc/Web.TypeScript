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
        private _arrSqlClnNome: string[];

        public get arrRow(): Array<RowWeb>
        {
            return this._arrRow;
        }

        public set arrRow(arrRow: Array<RowWeb>)
        {
            this._arrRow = arrRow;
        }

        public get arrSqlClnNome(): string[]
        {
            return this._arrSqlClnNome;
        }

        public set arrSqlClnNome(arrsqlClnNome: string[])
        {
            this._arrSqlClnNome = arrsqlClnNome;
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

        public getDec(sqlClnNome: string, row: RowWeb): number
        {
            return Number(this.getStr(sqlClnNome, row));
        }

        public getInt(sqlClnNome: string, row: RowWeb): number
        {
            return Math.round(this.getDec(sqlClnNome, row));
        }

        public getStr(sqlClnNome: string, row: RowWeb): string
        {
            if (this.arrSqlClnNome == null)
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

            if (Utils.getBooStrVazia(sqlClnNome))
            {
                return null;
            }

            var intClnIndex = this.arrSqlClnNome.indexOf(sqlClnNome);

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