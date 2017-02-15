/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuMobileItem extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _mnm: MenuMobileBase;

        private get mnm(): MenuMobileBase
        {
            return this._mnm;
        }

        private set mnm(mnm: MenuMobileBase)
        {
            this._mnm = mnm;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, mnm: MenuMobileBase)
        {
            super(strId);

            this.mnm = mnm;
        }

        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}