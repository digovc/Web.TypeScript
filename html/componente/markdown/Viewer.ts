/// <reference path="../../../typedefinition/marked.d.ts" />
/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Viewer extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divConteudo: Div;
        private _divSumarioItem: SumarioItem;
        private _pagMarkdown: PagMarkdownBase;

        public get divConteudo(): Div
        {
            if (this._divConteudo != null)
            {
                return this._divConteudo;
            }

            this._divConteudo = new Div(this.strId + "_divConteudo");

            return this._divConteudo;
        }

        private get divSumarioItem(): SumarioItem
        {
            return this._divSumarioItem;
        }

        private set divSumarioItem(divSumarioItem: SumarioItem)
        {
            this._divSumarioItem = divSumarioItem;
        }

        private get pagMarkdown(): PagMarkdownBase
        {
            return this._pagMarkdown;
        }

        private set pagMarkdown(pagMarkdown: PagMarkdownBase)
        {
            this._pagMarkdown = pagMarkdown;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(pagMarkdown: PagMarkdownBase)
        {
            super(Viewer.name);

            this.pagMarkdown = pagMarkdown;
        }

        // #endregion Construtores

        // #region Métodos

        public abrirConteudo(divSumarioItem: SumarioItem): void
        {
            this.divSumarioItem = divSumarioItem;

            if (this.divSumarioItem == null)
            {
                return;
            }

            if (!Utils.getBooStrVazia(this.divSumarioItem.strMarkdownConteudo))
            {
                this.abrirConteudoSucesso(this.divSumarioItem.strMarkdownConteudo);
            }

            if (Utils.getBooStrVazia(this.divSumarioItem.urlMarkdown))
            {
                return;
            }

            this.divConteudo.booVisivel = false;

            $.get(this.divSumarioItem.urlMarkdown, ((objData) => { this.abrirConteudoSucesso(objData) }));
        }

        private abrirConteudoSucesso(strMarkdownConteudo: string): void
        {
            if (Utils.getBooStrVazia(strMarkdownConteudo))
            {
                return;
            }

            if (Utils.getBooStrVazia(this.divSumarioItem.strHtmlConteudo))
            {
                this.divSumarioItem.strHtmlConteudo = marked(strMarkdownConteudo);
            }

            if (Utils.getBooStrVazia(this.divSumarioItem.strMarkdownConteudo))
            {
                this.divSumarioItem.strMarkdownConteudo = strMarkdownConteudo;
            }

            this.divConteudo.strConteudo = this.divSumarioItem.strHtmlConteudo;

            this.prepararConteudo();

            this.divConteudo.mostrar();

            this.divSumarioItem.processarConteudo();
        }

        private prepararConteudo(): void
        {
            this.prepararConteudoImg();
        }

        private prepararConteudoImg(): void
        {
            var arrElmImg = this.divConteudo.jq[0].getElementsByTagName("img");

            for (var i = 0; i < arrElmImg.length; i++)
            {
                arrElmImg[i].src = (this.divSumarioItem.url + "/" + $(arrElmImg[i]).attr("src"));
            }
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.pagMarkdown.fecharSumario();
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