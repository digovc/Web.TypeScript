// #region Reference

/// <reference path="../ComponenteHtmlBase.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivMarkdown extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public abrirConteudo(urlMarkdown: string): void
        {
            if (Utils.getBooStrVazia(urlMarkdown))
            {
                return;
            }

            this.booVisivel = false;

            $.get(urlMarkdown, (o => this.abrirConteudoSucesso(o)));
        }

        private abrirConteudoSucesso(strMarkdownConteudo: string): void
        {
            if (Utils.getBooStrVazia(strMarkdownConteudo))
            {
                return;
            }

            this.prepararConteudo(strMarkdownConteudo);

            this.anm.aparecer();
        }

        public prepararConteudo(strMarkdownConteudo: string = null): void
        {
            if (!Utils.getBooStrVazia(strMarkdownConteudo))
            {
                this.strConteudo = marked(strMarkdownConteudo);
            }
            else if (Utils.getBooStrVazia(this.strConteudo))
            {
                return;
            }
            else
            {
                this.strConteudo = marked(this.strConteudo);
            }

            this.prepararConteudoImg();
        }

        private prepararConteudoImg(): void
        {
            var arrElmImg = this.jq[0].getElementsByTagName("img");

            for (var i = 0; i < arrElmImg.length; i++)
            {
                arrElmImg[i].src = ("/" + $(arrElmImg[i]).attr("src"));
            }
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}