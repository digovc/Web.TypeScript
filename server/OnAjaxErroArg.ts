module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class OnAjaxErroArg
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strErrorThrown: string;
        private _strTextStatus: string;

        public get strErrorThrown(): string
        {
            return this._strErrorThrown;
        }

        public set strErrorThrown(strErrorThrown: string)
        {
            this._strErrorThrown = strErrorThrown;
        }

        public get strTextStatus(): string
        {
            return this._strTextStatus;
        }

        public set strTextStatus(strTextStatus: string)
        {
            this._strTextStatus = strTextStatus;
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