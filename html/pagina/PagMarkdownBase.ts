/// <reference path="../componente/markdown/Sumario.ts"/>
/// <reference path="../componente/markdown/Viewer.ts"/>
/// <reference path="../componente/mobile/ActionBar.ts"/>
/// <reference path="PagMobile.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagMarkdownBase extends PagMobile implements OnMenuClickListener
    {
        // #region Constantes

        public static get URL_MARKDOWN_FOLDER(): string { return "/url-md" };

        // #endregion Constantes

        // #region Atributos

        private _divSumario: Sumario;
        private _divViewer: Viewer;

        private _divActionBar: ActionBar;

        private get divActionBar(): ActionBar
        {
            if (this._divActionBar != null)
            {
                return this._divActionBar;
            }

            this._divActionBar = new ActionBar();

            return this._divActionBar;
        }

        private get divSumario(): Sumario
        {
            if (this._divSumario != null)
            {
                return this._divSumario;
            }

            this._divSumario = new Sumario(this);

            return this._divSumario;
        }

        public get divViewer(): Viewer
        {
            if (this._divViewer != null)
            {
                return this._divViewer;
            }

            this._divViewer = new Viewer(this);

            return this._divViewer;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirConteudo(divSumarioItem: SumarioItem): void
        {
            this.divViewer.abrirConteudo(divSumarioItem);
        }

        public fecharSumario(): void
        {
            this.divSumario.esconder();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.divActionBar.iniciar();
            this.divSumario.iniciar();
            this.divViewer.iniciar();

            this.inicializarUrl();
        }

        private inicializarUrl(): void
        {
            if (location.href.indexOf(PagMarkdownBase.URL_MARKDOWN_FOLDER) < 0)
            {
                this.inicializarUrlBranco();
                return;
            }

            var intIndex = location.href.indexOf(PagMarkdownBase.URL_MARKDOWN_FOLDER);

            var urlMarkdown = location.href.substring(intIndex + PagMarkdownBase.URL_MARKDOWN_FOLDER.length);

            this.divSumario.inicializarUrl(urlMarkdown);
        }

        private inicializarUrlBranco(): void
        {
            this.divSumario.inicializarUrlBranco();
        }

        protected setEventos(): void
        {
            super.setEventos();

            window.onpopstate = (() => { this.inicializarUrl() });

            this.divActionBar.addEvtOnMenuClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onMenuClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.divActionBar:
                        this.divSumario.mostrarEsconder();
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