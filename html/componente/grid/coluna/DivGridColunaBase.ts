/// <reference path="../../../../../Web.TypeScript/html/componente/ComponenteHtmlBase.ts"/>

module Web
{
    // #region Importações

    import ComponenteHtmlBase = Web.ComponenteHtmlBase;

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class DivGridColunaBase extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _cln: ColunaWeb;

        protected get cln(): ColunaWeb
        {
            return this._cln;
        }

        protected set cln(cln: ColunaWeb)
        {
            this._cln = cln;
        }

        // #endregion Atributos

        // #region Construtor

        constructor()
        {
            super(null);

            this.strId = (this.constructor.name + "_" + this.intObjetoId);
        }

        // #endregion Construtor

        // #region Métodos

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_div_id", this.strId);

            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}