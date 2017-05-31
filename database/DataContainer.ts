/// <reference path="DataRow.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DataContainer
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrObjRow: DataRow[];
        private _arrStrClnNome: string[];

        public get arrObjRow(): DataRow[]
        {
            return this._arrObjRow;
        }

        public set arrObjRow(arrObjRow: DataRow[])
        {
            this._arrObjRow = arrObjRow;
        }

        public get arrStrClnNome(): string[]
        {
            return this._arrStrClnNome;
        }

        public set arrStrClnNome(arrStrClnNome: string[])
        {
            this._arrStrClnNome = arrStrClnNome;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private getDec(strClnNome: string, objItem: DataRow): number
        {
            var strValor = this.getStr(strClnNome, objItem);

            if (Utils.getBooStrVazia(strValor))
            {
                return 0;
            }

            return Number(strValor);
        }

        public getInt(strClnNome: string, objRow: DataRow): number
        {
            return Math.round(this.getDec(strClnNome, objRow));
        }

        public getStr(strClnNome: string, objRow: DataRow): string
        {
            if (this.arrStrClnNome == null)
            {
                return;
            }

            if (this.arrObjRow == null)
            {
                return;
            }

            if (this.arrObjRow.indexOf(objRow) < 0)
            {
                return null;
            }

            if (Utils.getBooStrVazia(strClnNome))
            {
                return null;
            }

            var intClnIndex = this.arrStrClnNome.indexOf(strClnNome);

            if (intClnIndex < 0)
            {
                return null;
            }

            if (objRow.arrStrValor == null)
            {
                return null;
            }

            if (objRow.arrStrValor.length <= intClnIndex)
            {
                return null;
            }

            return objRow.arrStrValor[intClnIndex];
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}