/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../painel/PainelAcao.ts"/>
/// <reference path="../../table/OnTableRowClickListener.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelAcaoConsulta extends PainelAcao implements OnClickListener, OnTableRowClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAdicionar: BotaoCircular;
        private _btnAlterar: BotaoCircular;
        private _jnlConsulta: JnlConsulta;
        private _tagGridHtml: TableHtml = null;

        private get btnAdicionar(): BotaoCircular
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoCircular(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        private get btnAlterar(): BotaoCircular
        {
            if (this._btnAlterar != null)
            {
                return this._btnAlterar;
            }

            this._btnAlterar = new BotaoCircular(this.strId + "_btnAlterar");

            return this._btnAlterar;
        }

        private get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        private set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        public get tagGridHtml(): TableHtml
        {
            return this._tagGridHtml;
        }

        public set tagGridHtml(tagGridHtml: TableHtml)
        {
            if (this._tagGridHtml == tagGridHtml)
            {
                return;
            }

            this._tagGridHtml = tagGridHtml;

            this.setTagGridHtml(this._tagGridHtml);
        }

        // #endregion Atributos

        // #region Construtor

        constructor(jnlConsulta: JnlConsulta)
        {
            super("pnlAcaoConsulta");

            this.jnlConsulta = jnlConsulta;
        }

        // #endregion Construtor

        // #region Métodos

        private atualizarBtnAlterarBooVisivel(): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            this.btnAlterar.booVisivel = (this.tagGridHtml.intRowSelecionadaQtd < 2);
        }

        protected finalizar(): void
        {
            super.finalizar();

            window.setTimeout(() => { this.mostrar(Tag_EnmAnimacaoTipo.SLIDE_VERTICAL); }, 400);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnAdicionar.iniciar();
            this.btnAlterar.iniciar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnAcaoPrincipal.addEvtOnClickListener(this);
            this.btnAdicionar.addEvtOnClickListener(this);
            this.btnAlterar.addEvtOnClickListener(this);
        }

        private setTagGridHtml(tagGridHtml: TableHtml): void
        {
            if (tagGridHtml == null)
            {
                return;
            }

            tagGridHtml.addEvtOnRowClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnAcaoPrincipal:
                        this.jnlConsulta.pesquisar();
                        return;

                    case this.btnAdicionar:
                        this.jnlConsulta.abrirCadastro(0);
                        return;

                    case this.btnAlterar:
                        this.jnlConsulta.abrirCadastroSelecionado();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onTableRowClick(objSender: Object, row: TableRow): void
        {
            try
            {
                this.atualizarBtnAlterarBooVisivel()
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}