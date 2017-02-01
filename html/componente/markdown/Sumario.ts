/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="SumarioItem.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Sumario extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrDivItem: Array<SumarioItem>;
        private _divConteudo: Div;
        private _divItemSelecionado: SumarioItem;
        private _pagMarkdown: PagMarkdownBase;

        private get arrDivItem(): Array<SumarioItem>
        {
            if (this._arrDivItem != null)
            {
                return this._arrDivItem;
            }

            this._arrDivItem = this.getArrDivItem();

            return this._arrDivItem;
        }

        private get divConteudo(): Div
        {
            if (this._divConteudo != null)
            {
                return this._divConteudo;
            }

            this._divConteudo = new Div(this.strId + "_divConteudo");

            return this._divConteudo;
        }

        private get divItemSelecionado(): SumarioItem
        {
            return this._divItemSelecionado;
        }

        private set divItemSelecionado(divItemSelecionado: SumarioItem)
        {
            this._divItemSelecionado = divItemSelecionado;
        }

        public get pagMarkdown(): PagMarkdownBase
        {
            return this._pagMarkdown;
        }

        public set pagMarkdown(pagMarkdown: PagMarkdownBase)
        {
            this._pagMarkdown = pagMarkdown;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(pagMarkdown: PagMarkdownBase)
        {
            super(Sumario.name);

            this.pagMarkdown = pagMarkdown;
        }

        // #endregion Construtores

        // #region Métodos

        public abrirConteudo(divSumarioItem: SumarioItem): void
        {
            if (divSumarioItem == null)
            {
                return;
            }

            if (divSumarioItem == this.divItemSelecionado)
            {
                return;
            }

            if (this.pagMarkdown == null)
            {
                return;
            }

            if (this.divItemSelecionado != null)
            {
                this.divItemSelecionado.divIndice.esconder();
            }

            this.divItemSelecionado = divSumarioItem;

            this.pagMarkdown.abrirConteudo(divSumarioItem);
        }

        private getArrDivItem(): Array<SumarioItem>
        {
            var arrDivItemResultado = new Array<SumarioItem>();

            var arrElm = this.divConteudo.jq[0].childNodes;

            if (arrElm == null)
            {
                return;
            }

            for (var i = 0; i < arrElm.length; i++)
            {
                this.getArrDivItem2(arrDivItemResultado, this.divConteudo.jq[0].childNodes[i]);
            }

            return arrDivItemResultado;
        }

        private getArrDivItem2(arrDivItem: Array<SumarioItem>, elm: Node): void
        {
            if (elm == null)
            {
                return;
            }

            if (elm.attributes == null)
            {
                return;
            }

            var attClazz = elm.attributes.getNamedItem("clazz");

            if (attClazz == null)
            {
                return;
            }

            if (attClazz.value != SumarioItem.name)
            {
                return;
            }

            var attId = elm.attributes.getNamedItem("id");

            if (attId == null)
            {
                return;
            }

            var divItem = new SumarioItem(attId.value);

            arrDivItem.push(divItem);

            divItem.divSumario = this;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.arrDivItem.forEach((divItem) => { divItem.iniciar() });
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}