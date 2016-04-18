/// <reference path="../../ComboBox.ts"/>
/// <reference path="../../Input.ts"/>
/// <reference path="CampoHtml.ts"/>

module NetZ_Web_TypeScript
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
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected getTagInput(): Input
        {
            return new ComboBox(this.strId + "_tagInput");
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.mostrarDivTitulo(true);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}