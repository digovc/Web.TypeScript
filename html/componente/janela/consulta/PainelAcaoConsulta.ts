/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../botao/mini/BotaoAdicionarMini.ts"/>
/// <reference path="../../botao/mini/BotaoAdicionarMini.ts"/>
/// <reference path="../../botao/mini/BotaoAlterarMini.ts"/>
/// <reference path="../../grid/OnRowClickListener.ts"/>
/// <reference path="../../painel/PainelAcao.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelAcaoConsulta extends PainelAcao implements OnClickListener, OnRowClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAdicionar: BotaoAdicionarMini;
        private _btnAlterar: BotaoAlterarMini;
        private _jnlConsulta: JnlConsulta;
        private _tagGridHtml: GridHtml = null;

        private get btnAdicionar(): BotaoAdicionarMini
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoAdicionarMini("btnAdicionar");

            return this._btnAdicionar;
        }

        private get btnAlterar(): BotaoAlterarMini
        {
            if (this._btnAlterar != null)
            {
                return this._btnAlterar;
            }

            this._btnAlterar = new BotaoAlterarMini("btnAlterar");

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

        public get tagGridHtml(): GridHtml
        {
            return this._tagGridHtml;
        }

        public set tagGridHtml(tagGridHtml: GridHtml)
        {
            if (this._tagGridHtml == tagGridHtml)
            {
                return;
            }

            this._tagGridHtml = tagGridHtml;

            this.atualizarTagGridHtml();
        }

        // #endregion Atributos

        // #region Construtores

        constructor(jnlConsulta: JnlConsulta)
        {
            super("jnlConsulta_pnlAcaoConsulta");

            this.jnlConsulta = jnlConsulta;
        }

        // #endregion Construtores

        // #region Métodos

        private atualizarBtnAlterarBooVisivel(): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            this.btnAlterar.booVisivel = (this.tagGridHtml.intRowSelecionadaQtd < 2);
        }

        private atualizarTagGridHtml(): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            this.tagGridHtml.addEvtOnRowClickListener(this);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnAcaoPrincipal.addEvtOnClickListener(this);
            this.btnAdicionar.addEvtOnClickListener(this);
            this.btnAlterar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
            finally
            {
            }
            // #endregion Ações
        }

        public onRowClick(objSender: Object, tagGridRow: GridRow): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.atualizarBtnAlterarBooVisivel()
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}