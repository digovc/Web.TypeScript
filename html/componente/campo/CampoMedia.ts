/// <reference path="CampoHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class CampoMedia extends CampoHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divContent: Div;

        protected get divContent(): Div
        {
            if (this._divContent != null)
            {
                return this._divContent;
            }

            this._divContent = new Div(this.strId + "_divContent");

            return this._divContent;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

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