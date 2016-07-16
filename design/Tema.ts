module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Tema
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _corMouseOver: string;

        public get corMouseOver(): string
        {
            if (this._corMouseOver != null)
            {
                return this._corMouseOver;
            }

            this._corMouseOver = this.getCorMouseOver();

            return this._corMouseOver;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected getCorMouseOver(): string
        {
            return "lightgray";
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}