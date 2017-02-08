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

        private _elmHead: HTMLHeadingElement;

        private get elmHead(): HTMLHeadingElement
        {
            return this._elmHead;
        }

        private set elmHead(elmHead: HTMLHeadingElement)
        {
            this._elmHead = elmHead;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(elmHead: HTMLHeadingElement)
        {
            super(null);

            this.elmHead = elmHead;
        }

        // #endregion Construtores

        // #region Métodos

        protected inicializar(): void
        {
            super.inicializar();
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_conteudo", this.elmHead.textContent);
            strLayoutFixo = strLayoutFixo.replace("_link", ("#" + this.elmHead.id));

            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}