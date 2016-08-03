/// <reference path="../../ConstanteManager.ts"/>
/// <reference path="../Div.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ComponenteHtml extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strLayoutFixo: string;

        public get strLayoutFixo(): string
        {
            if (this._strLayoutFixo != null)
            {
                return this._strLayoutFixo;
            }

            this._strLayoutFixo = this.getStrLayoutFixo();

            return this._strLayoutFixo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private getStrLayoutFixo(): string
        {
            var strLayoutFixo = ConstanteManager.i.getStrConstante(this.strClassNome + "_layoutFixo");

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return null;
            }

            return this.montarLayoutFixo(strLayoutFixo);
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}