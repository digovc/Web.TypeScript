module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TemaDefault
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _corFundo: string;
        private _corMouseOver: string;

        public get corFundo(): string
        {
            if (this._corFundo != null)
            {
                return this._corFundo;
            }

            this._corFundo = this.getCorFundo();

            return this._corFundo;
        }

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

        protected getCorFundo(): string
        {
            return "#e3e3e3";
        }

        protected getCorMouseOver(): string
        {
            return "lightgray";
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}