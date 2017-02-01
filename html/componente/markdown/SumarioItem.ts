/// <reference path="../../../erro/Erro.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="IndiceItem.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class SumarioItem extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrDivItem: Array<SumarioItem>;
        private _divConteudo: Div;
        private _divIndice: Div;
        private _divSumario: Sumario;
        private _divSumarioItemPai: SumarioItem;
        private _divTitulo: Div;
        private _strHtmlConteudo: string;
        private _strMarkdownConteudo: string;
        private _url: string;
        private _urlMarkdown: string;

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

        private get divIndice(): Div
        {
            if (this._divIndice != null)
            {
                return this._divIndice;
            }

            this._divIndice = new Div(this.strId + "_divIndice");

            return this._divIndice;
        }

        public get divSumario(): Sumario
        {
            return this._divSumario;
        }

        public set divSumario(divSumario: Sumario)
        {
            this._divSumario = divSumario;
        }

        public get divSumarioItemPai(): SumarioItem
        {
            return this._divSumarioItemPai;
        }

        public set divSumarioItemPai(divSumarioItemPai: SumarioItem)
        {
            this._divSumarioItemPai = divSumarioItemPai;
        }

        private get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        public get strHtmlConteudo(): string
        {
            return this._strHtmlConteudo;
        }

        public set strHtmlConteudo(strHtmlConteudo: string)
        {
            this._strHtmlConteudo = strHtmlConteudo;
        }

        public get strMarkdownConteudo(): string
        {
            return this._strMarkdownConteudo;
        }

        public set strMarkdownConteudo(strMarkdownConteudo: string)
        {
            this._strMarkdownConteudo = strMarkdownConteudo;
        }

        public get url(): string
        {
            if (this._url != null)
            {
                return this._url;
            }

            this._url = this.getUrl();

            return this._url;
        }

        public get urlMarkdown(): string
        {
            if (this._urlMarkdown != null)
            {
                return this._urlMarkdown;
            }

            this._urlMarkdown = this.getStrAttValor("url-markdown");

            return this._urlMarkdown;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        private abrirConteudo(): void
        {
            this.divConteudo.mostrarEsconder();

            this.divSumario.abrirConteudo(this);
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

            divItem.divSumario = this.divSumario;
            divItem.divSumarioItemPai = this;
        }

        private getUrl(): string
        {
            if (Utils.getBooStrVazia(this.urlMarkdown))
            {
                return null;
            }

            if (this.urlMarkdown.indexOf("/") < 0)
            {
                return null;
            }

            return this.urlMarkdown.substring(0, this.urlMarkdown.lastIndexOf("/"));
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.arrDivItem.forEach((divItem) => { divItem.iniciar() });
        }

        public processarConteudo(): void
        {
            this.processarConteudoHistorico();
            this.processarConteudoIndice();
        }

        private processarConteudoHistorico(): void
        {
            var url = (location.protocol + '//' + location.host + location.pathname + "?url=" + this.urlMarkdown);

            window.history.pushState(null, this.divTitulo.strConteudo, url);

            document.title = this.divTitulo.strConteudo;
        }

        private processarConteudoIndice(): void
        {
            if (this.divIndice.jq[0].childElementCount > 0)
            {
                return;
            }

            var arrElmHead = this.divSumario.pagMarkdown.divViewer.divConteudo.jq[0].getElementsByTagName("h2");

            if (arrElmHead == null)
            {
                return;
            }

            for (var i = 0; i < arrElmHead.length; i++)
            {
                this.divIndice.jq.append(new IndiceItem(arrElmHead[i]).strLayoutFixo);
            }
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.divTitulo.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.divTitulo:
                        this.abrirConteudo();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}