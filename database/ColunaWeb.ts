/// <reference path="../OnValorAlteradoArg.ts"/>
/// <reference path="../OnValorAlteradoListener.ts"/>

module NetZ_Web_TypeScript
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intValor = parseInt(this.strValor);
            }
            catch (ex)
            {
                return 0;
            }
            finally
            {
            }
            // #endregion Ações

            return this._intValor;
        }

        public set intValor(intValor: number)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intValor = intValor;

                this.strValor = this._intValor.toString();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
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

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strNome = strNome;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Construtores

        // #region Métodos

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}