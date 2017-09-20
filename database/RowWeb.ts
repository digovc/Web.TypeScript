// #region Reference

/// <reference path="../Objeto.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

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

        // #region Construtor

        constructor(objData: DataContainer)
        {
            super();

            this.objData = objData;
        }

        // #endregion Construtor

        // #region Métodos

        public getDec(sqlColunaNome: string): number
        {
            return Number(this.objData.getStr(sqlColunaNome, this));
        }

        public getInt(sqlColunaNome: string): number
        {
            return Math.round(this.objData.getDec(sqlColunaNome, this));
        }

        public getStr(sqlColunaNome: string): string
        {
            return this.objData.getStr(sqlColunaNome, this);
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