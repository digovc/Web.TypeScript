/// <reference path="../../ComboBox.ts"/>
/// <reference path="../../Input.ts"/>
/// <reference path="CampoHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoComboBox extends CampoHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _cmb: ComboBox;

        public get cmb(): ComboBox
        {
            if (this._cmb != null)
            {
                return this._cmb;
            }

            this._cmb = new ComboBox(this.tagInput.strId);

            return this._cmb;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public addOpcao(par: ParValorNome): void
        {
            this.cmb.addOpcao(par);
        }

        public carregarDados(tblWeb: TabelaWeb): void
        {
            this.cmb.carregarDados(tblWeb);
        }

        protected getTagInput(): Input
        {
            return new ComboBox(this.strId + "_tagInput");
        }

        public limparDados(): void
        {
            this.cmb.limparDados();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.mostrarEsconderDivTitulo(true);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}