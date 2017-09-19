/// <reference path="../ComponenteHtmlBase.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuMobileItem extends ComponenteHtmlBase
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

        // #region Construtor

        constructor(strId: string, mnm: MenuMobileBase)
        {
            super(strId);

            this.mnm = mnm;
        }

        // #endregion Construtor

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}