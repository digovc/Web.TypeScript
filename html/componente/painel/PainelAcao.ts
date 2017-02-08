/// <reference path="../../Div.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelAcao extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAcaoPrincipal: BotaoCircular;

        protected get btnAcaoPrincipal(): BotaoCircular
        {
            if (this._btnAcaoPrincipal != null)
            {
                return this._btnAcaoPrincipal;
            }

            this._btnAcaoPrincipal = new BotaoCircular("btnAcaoPrincipal");

            return this._btnAcaoPrincipal;
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