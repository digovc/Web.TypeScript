/// <reference path="../../LayoutFixoManager.ts"/>
/// <reference path="../Div.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ComponenteHtml extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strLayoutFixo: string;

        protected get strLayoutFixo(): string
        {
            if (this._strLayoutFixo != null)
            {
                return this._strLayoutFixo;
            }

            this._strLayoutFixo = LayoutFixoManager.i.getStrLayoutFixo(this.strClassNome);

            return this._strLayoutFixo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected montarLayoutFixo(): void
        {
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}