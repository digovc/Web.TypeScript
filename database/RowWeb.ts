/// <reference path="../Objeto.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class RowWeb extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrStrValor: string[];
        private _objData: DataContainer;

        public get arrStrValor(): string[]
        {
            return this._arrStrValor;
        }

        public set arrStrValor(arrStrValor: string[])
        {
            this._arrStrValor = arrStrValor;
        }

        private get objData(): DataContainer
        {
            return this._objData;
        }

        private set objData(objData: DataContainer)
        {
            this._objData = objData;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(objData: DataContainer)
        {
            super();

            this.objData = objData;
        }

        // #endregion Construtores

        // #region Métodos

        public getDec(sqlClnNome: string): number
        {
            return Number(this.objData.getStr(sqlClnNome, this));
        }

        public getInt(sqlClnNome: string): number
        {
            return Math.round(this.objData.getDec(sqlClnNome, this));
        }

        public getStr(sqlClnNome: string): string
        {
            return this.objData.getStr(sqlClnNome, this);
        }

        protected validarJson(strPropriedade: string): boolean
        {
            if (!super.validarJson(strPropriedade))
            {
                return false;
            }

            if (strPropriedade == "_objData")
            {
                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}