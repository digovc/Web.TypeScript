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
        private _sqlNome: string;
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

        public get sqlNome(): string
        {
            return this._sqlNome;
        }

        public set sqlNome(sqlNome: string)
        {
            this._sqlNome = sqlNome;
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

        // #region Construtor

        constructor(sqlNome: string)
        {
            super();

            this.strNome = sqlNome;
            this.sqlNome = sqlNome;
        }

        // #endregion Construtor

        // #region Métodos

        public limparDados(): void
        {
            this.strValor = null;
        }

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}