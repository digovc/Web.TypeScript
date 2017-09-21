// #region Reference

/// <reference path="../../componente/documentacao/ActionBarDocumentacao.ts"/>
/// <reference path="../../componente/markdown/Sumario.ts"/>
/// <reference path="../../componente/markdown/Viewer.ts"/>
/// <reference path="../PagMobile.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagDocumentacaoBase extends PagMobile implements OnMenuClickListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _divActionBarDocumentacao: ActionBarDocumentacao;
        private _divSumario: Sumario;
        private _divViewer: Viewer;

        public get divActionBarDocumentacao(): ActionBarDocumentacao
        {
            if (this._divActionBarDocumentacao != null)
            {
                return this._divActionBarDocumentacao;
            }

            this._divActionBarDocumentacao = new ActionBarDocumentacao();

            return this._divActionBarDocumentacao;
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

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public abrirConteudo(divSumarioItem: SumarioItem): void
        {
            this.divViewer.abrirConteudo(divSumarioItem);
        }

        private cancelarInscricao(): void
        {
            if (Utils.getBooStrVazia(location.search))
            {
                return;
            }

            if (location.search.indexOf("acao=desinscrever") < 0)
            {
                return;
            }

            var strEmail = location.search.substring(location.search.indexOf("email=") + 6);

            if (Utils.getBooStrVazia(strEmail))
            {
                return;
            }

            if (!Utils.validarEmail(strEmail))
            {
                return;
            }

            var objEmailRegistro = new EmailRegistroDominio();

            objEmailRegistro.dirDocumentacao = this.divSumario.dirDocumentacao;
            objEmailRegistro.strEmail = strEmail;

            SrvAjaxDocumentacao.i.cancelarInscricao(objEmailRegistro);
        }

        public fecharSumario(): void
        {
            this.divSumario.esconder();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.divActionBarDocumentacao.iniciar();
            this.divSumario.iniciar();
            this.divViewer.iniciar();

            this.inicializarUrl();

            this.cancelarInscricao();
        }

        private inicializarUrl(): void
        {
            if (!Utils.getBooStrVazia(location.search))
            {
                return;
            }

            if (location.href.indexOf(SrvAjaxDocumentacao.URL_MARKDOWN_FOLDER) < 0)
            {
                this.inicializarUrlBranco();
                return;
            }

            var intIndex = location.href.indexOf(SrvAjaxDocumentacao.URL_MARKDOWN_FOLDER);

            var urlMarkdown = location.href.substring(intIndex + SrvAjaxDocumentacao.URL_MARKDOWN_FOLDER.length);

            this.divSumario.inicializarUrl(urlMarkdown);
        }

        private inicializarUrlBranco(): void
        {
            this.divSumario.inicializarUrlBranco();
        }

        protected setEventos(): void
        {
            super.setEventos();

            window.onpopstate = (() => this.inicializarUrl());

            this.divActionBarDocumentacao.addEvtOnMenuClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onMenuClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.divActionBarDocumentacao:
                        this.divSumario.booVisivel = !this.divSumario.booVisivel;
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