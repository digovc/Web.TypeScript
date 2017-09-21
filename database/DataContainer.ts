// #region Reference

/// <reference path="../Objeto.ts"/>
/// <reference path="RowWeb.ts"/>

// #endregion Reference

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
        private _arrSqlColunaNome: string[];
        private _strTabelaNome: string;

        public get arrRow(): Array<RowWeb>
        {
            return this._arrRow;
        }

        public set arrRow(arrRow: Array<RowWeb>)
        {
            this._arrRow = arrRow;
        }

        public get arrSqlColunaNome(): string[]
        {
            return this._arrSqlColunaNome;
        }

        public set arrSqlColunaNome(arrSqlColunaNome: string[])
        {
            this._arrSqlColunaNome = arrSqlColunaNome;
        }

        public get strTabelaNome(): string
        {
            return this._strTabelaNome;
        }

        public set strTabelaNome(strTabelaNome: string)
        {
            this._strTabelaNome = strTabelaNome;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public copiarDados(obj: any): void
        {
            super.copiarDados(obj);

            this.copiarDadosArrRow(obj)
            this.copiarDadosarrSqlColunaNome(obj)
        }

        private copiarDadosArrRow(jsnDataContainer: DataContainer): void
        {
            if (jsnDataContainer._arrRow == null)
            {
                return;
            }

            if (jsnDataContainer._arrRow.length < 1)
            {
                return;
            }

            this.arrRow = new Array<RowWeb>();

            for (var i = 0; i < jsnDataContainer._arrRow.length; i++)
            {
                this.arrRow.push(new RowWeb(this));

                this.arrRow[i].copiarDados(jsnDataContainer._arrRow[i]);
            }
        }

        private copiarDadosarrSqlColunaNome(jsnDataContainer: DataContainer): void
        {
            if (jsnDataContainer._arrSqlColunaNome == null)
            {
                return;
            }

            if (jsnDataContainer._arrSqlColunaNome.length < 1)
            {
                return;
            }

            this.arrSqlColunaNome = new Array<string>();

            for (var i = 0; i < jsnDataContainer._arrSqlColunaNome.length; i++)
            {
                this.arrSqlColunaNome.push(jsnDataContainer._arrSqlColunaNome[i]);
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
            if (this.arrSqlColunaNome == null)
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

            var intClnIndex = this.arrSqlColunaNome.indexOf(sqlColunaNome);

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