﻿// #region Reference

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ParValorNome
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _objValor: Object;
        private _strNome: string;

        public get objValor(): Object
        {
            return this._objValor;
        }

        public set objValor(objValor: Object)
        {
            this._objValor = objValor;
        }

        public get strNome(): string
        {
            return this._strNome;
        }

        public set strNome(strNome: string)
        {
            this._strNome = strNome;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(objValor: Object, strNome: string)
        {
            this.objValor = objValor;
            this.strNome = strNome;
        }

        // #endregion Construtor

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}