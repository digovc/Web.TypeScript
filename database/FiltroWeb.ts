/// <reference path="../Objeto.ts"/>
/// <reference path="ColunaWeb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum FiltroWeb_EnmOperador
    {
        DIFERENTE = 0,
        IGUAL = 1,
        IGUAL_CONSULTA = 10,
        LIKE = 2,
        LIKE_PREFIXO = 7,
        LIKE_SUFIXO = 8,
        MAIOR = 3,
        MAIOR_IGUAL = 4,
        MENOR = 5,
        MENOR_IGUAL = 6,
    }

    // #endregion Enumerados

    export class FiltroWeb extends Objeto
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _clnWeb: ColunaWeb;
        private _enmOperador: FiltroWeb_EnmOperador = FiltroWeb_EnmOperador.IGUAL;
        private _objValor: Object;

        private get clnWeb(): ColunaWeb
        {
            return this._clnWeb;
        }

        private set clnWeb(clnWeb: ColunaWeb)
        {
            this._clnWeb = clnWeb;
        }

        public get enmOperador(): FiltroWeb_EnmOperador
        {
            return this._enmOperador;
        }

        public set enmOperador(enmOperador: FiltroWeb_EnmOperador)
        {
            this._enmOperador = enmOperador;
        }

        private get objValor(): Object
        {
            return this._objValor;
        }

        private set objValor(strValor: Object)
        {
            this._objValor = strValor;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(clnWeb: ColunaWeb, objValor: Object)
        {
            super();

            this.clnWeb = clnWeb;
            this.objValor = objValor;
        }

        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}