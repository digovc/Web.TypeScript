/// <reference path="../Objeto.ts"/>
/// <reference path="../OnValorAlteradoArg.ts"/>
/// <reference path="../OnValorAlteradoListener.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ColunaWeb extends Objeto
    {
        // #region Constantes

        public static get STR_VALOR_NULL(): string { return "<<<null>>>" };

        // #endregion Constantes

        // #region Atributos

        private _booNome: boolean;
        private _intValor: number;
        private _strCritica: string;
        private _strValor: string;

        public get booNome(): boolean
        {
            return this._booNome;
        }

        public set booNome(booNome: boolean)
        {
            this._booNome = booNome;
        }

        public get intValor(): number
        {
            try
            {
                this._intValor = parseInt(this.strValor);
            }
            catch (ex)
            {
                return 0;
            }

            return this._intValor;
        }

        public set intValor(intValor: number)
        {
            this._intValor = intValor;

            this.strValor = this._intValor.toString();
        }

        public get strCritica(): string
        {
            return this._strCritica;
        }

        public set strCritica(strCritica: string)
        {
            this._strCritica = strCritica;
        }

        public get strValor(): string
        {
            return this._strValor;
        }

        public set strValor(strValor: string)
        {
            this._strValor = strValor;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strNome: string)
        {
            super();

            this.strNome = strNome;
        }

        // #endregion Construtores

        // #region Métodos

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}