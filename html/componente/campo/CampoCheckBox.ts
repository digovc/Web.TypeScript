module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoCheckBox extends CampoHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _ckb: CheckBox;

        private get ckb(): CheckBox
        {
            if (this._ckb != null)
            {
                return this._ckb;
            }

            this._ckb = new CheckBox(this.tagInput.strId);

            return this._ckb;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected inicializar(): void
        {
            super.inicializar();

            this.ckb.iniciar();

            this.mostrarDivTitulo(false);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}