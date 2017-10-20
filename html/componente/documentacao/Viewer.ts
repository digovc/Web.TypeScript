// #region Reference

/// <reference path="../../../typedefinition/marked.d.ts" />
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="../markdown/DivMarkdown.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Viewer extends ComponenteHtmlBase implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divMarkdown: DivMarkdown;
        private _divSumarioItem: SumarioItem;
        private _pagMarkdown: PagDocumentacaoBase;

        public get divMarkdown(): DivMarkdown
        {
            if (this._divMarkdown != null)
            {
                return this._divMarkdown;
            }

            this._divMarkdown = new DivMarkdown(this.strId + "_divMarkdown");

            return this._divMarkdown;
        }

        private get divSumarioItem(): SumarioItem
        {
            return this._divSumarioItem;
        }

        private set divSumarioItem(divSumarioItem: SumarioItem)
        {
            this._divSumarioItem = divSumarioItem;
        }

        private get pagMarkdown(): PagDocumentacaoBase
        {
            return this._pagMarkdown;
        }

        private set pagMarkdown(pagMarkdown: PagDocumentacaoBase)
        {
            this._pagMarkdown = pagMarkdown;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(pagMarkdown: PagDocumentacaoBase)
        {
            super(Viewer.name);

            this.pagMarkdown = pagMarkdown;
        }

        // #endregion Construtor

        // #region Métodos

        public abrirConteudo(divSumarioItem: SumarioItem): void
        {
            this.divSumarioItem = divSumarioItem;

            if (this.divSumarioItem == null)
            {
                return;
            }

            this.divMarkdown.abrirConteudo(this.divSumarioItem.urlMarkdown);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}