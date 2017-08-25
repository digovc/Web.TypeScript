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
        private _sqlTabelaNome: string;

        public get arrFil(): Array<FiltroWeb>
        {
            return this._arrFil;
        }

        public set arrFil(arrFil: Array<FiltroWeb>)
        {
            this._arrFil = arrFil;
        }

        public get sqlTabelaNome(): string
        {
            return this._sqlTabelaNome;
        }

        public set sqlTabelaNome(sqlTabelaNome: string)
        {
            this._sqlTabelaNome = sqlTabelaNome;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}