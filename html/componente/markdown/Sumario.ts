/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="EmailRegistro.ts"/>
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
        private _dirDocumentacao: string;
        private _divConteudo: Div;
        private _divEmailRegistro: EmailRegistro;
        private _divItemSelecionado: SumarioItem;
        private _pagDoc: PagDocumentacaoBase;

        private get arrDivItem(): Array<SumarioItem>
        {
            if (this._arrDivItem != null)
            {
                return this._arrDivItem;
            }

            this._arrDivItem = this.getArrDivItem();

            return this._arrDivItem;
        }

        public get dirDocumentacao(): string
        {
            if (this._dirDocumentacao != null)
            {
                return this._dirDocumentacao;
            }

            this._dirDocumentacao = this.getStrAttValor("dir-documentacao");

            return this._dirDocumentacao;
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

        private get divEmailRegistro(): EmailRegistro
        {
            if (this._divEmailRegistro != null)
            {
                return this._divEmailRegistro;
            }

            this._divEmailRegistro = new EmailRegistro(this);

            return this._divEmailRegistro;
        }

        private get divItemSelecionado(): SumarioItem
        {
            return this._divItemSelecionado;
        }

        private set divItemSelecionado(divItemSelecionado: SumarioItem)
        {
            this._divItemSelecionado = divItemSelecionado;
        }

        public get pagDoc(): PagDocumentacaoBase
        {
            return this._pagDoc;
        }

        public set pagDoc(pagDoc: PagDocumentacaoBase)
        {
            this._pagDoc = pagDoc;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(pagMarkdown: PagDocumentacaoBase)
        {
            super(Sumario.name);

            this.pagDoc = pagMarkdown;
        }

        // #endregion Construtor

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

            if (this.pagDoc == null)
            {
                return;
            }

            if (this.divItemSelecionado != null)
            {
                this.divItemSelecionado.divIndice.esconder();
            }

            this.divItemSelecionado = divSumarioItem;

            this.pagDoc.abrirConteudo(divSumarioItem);
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

            this.divEmailRegistro.iniciar();

            this.arrDivItem.forEach(d => d.iniciar());
        }

        public inicializarUrl(urlMarkdown: string): void
        {
            for (var i = 0; i < this.arrDivItem.length; i++)
            {
                if (this.arrDivItem[i].inicializarUrl(urlMarkdown))
                {
                    return;
                }
            }
        }

        public inicializarUrlBranco(): void
        {
            if (this.arrDivItem == null)
            {
                return;
            }

            if (this.arrDivItem.length < 1)
            {
                return;
            }

            this.arrDivItem[0].abrirConteudo();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}