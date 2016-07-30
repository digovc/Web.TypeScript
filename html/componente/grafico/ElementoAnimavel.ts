module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ElementoAnimavel
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _cnvPai: Canvas;

        protected get cnvPai(): Canvas
        {
            return this._cnvPai;
        }

        protected set cnvPai(cnvPai: Canvas)
        {
            this._cnvPai = cnvPai;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(cnvPai: Canvas)
        {
            this.cnvPai = cnvPai;
        }

        // #endregion Construtores

        // #region Métodos

        public iniciar(): void
        {
            this.inicializar();
        }

        protected inicializar(): void
        {
        }

        public update(): void
        {
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}