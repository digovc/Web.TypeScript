module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Constante
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strNome: string;
        private _strValor: string;

        public get strNome(): string
        {
            return this._strNome;
        }

        public set strNome(strNome: string)
        {
            this._strNome = strNome;
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

        constructor(strNome: string, strValor: string)
        {
            this.strNome = strNome;
            this.strValor = strValor;
        }

        // #endregion Construtor

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}