/// <reference path="../../../Objeto.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PesquisaInterlocutor extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrFil: Array<FiltroWeb>;
        private _strTblNome: string;

        public get arrFil(): Array<FiltroWeb>
        {
            return this._arrFil;
        }

        public set arrFil(arrFil: Array<FiltroWeb>)
        {
            this._arrFil = arrFil;
        }

        public get strTblNome(): string
        {
            return this._strTblNome;
        }

        public set strTblNome(strTblNome: string)
        {
            this._strTblNome = strTblNome;
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