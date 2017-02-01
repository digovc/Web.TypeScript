/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class IndiceItem extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _elmH1: HTMLHeadElement;

        private get elmH1(): HTMLHeadElement
        {
            return this._elmH1;
        }

        private set elmH1(elmH1: HTMLHeadElement)
        {
            this._elmH1 = elmH1;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(elmH1: HTMLHeadElement)
        {
            super(null);

            this.elmH1 = elmH1;
        }

        // #endregion Construtores

        // #region Métodos

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_conteudo", this.elmH1.textContent);

            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}