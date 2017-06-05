/// <reference path="../Objeto.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DataRowWeb extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrStrValor: string[];

        public get arrStrValor(): string[]
        {
            return this._arrStrValor;
        }

        public set arrStrValor(arrStrValor: string[])
        {
            this._arrStrValor = arrStrValor;
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