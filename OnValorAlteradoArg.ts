module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class OnValorAlteradoArg
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strValor: string;
        private _strValorAnterior: string;

        public get strValor(): string
        {
            return this._strValor;
        }

        public set strValor(strValor: string)
        {
            this._strValor = strValor;
        }

        public get strValorAnterior(): string
        {
            return this._strValorAnterior;
        }

        public set strValorAnterior(strValorAnterior: string)
        {
            this._strValorAnterior = strValorAnterior;
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