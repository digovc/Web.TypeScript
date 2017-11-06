// #region Reference

/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../../../OnKeyDownListener.ts"/>
/// <reference path="../../painel/PainelHtml.ts"/>
/// <reference path="FrmFiltro.ts"/>
/// <reference path="FrmFiltroConteudo.ts"/>
/// <reference path="JnlConsulta.ts"/>

// #endregion Reference

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelFiltro extends PainelHtml implements OnClickListener, OnKeyDownListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divBarra: Div;
        private _frmFiltro: FrmFiltro;
        private _frmFiltroConteudo: FrmFiltroConteudo;
        private _jnlConsulta: JnlConsulta;
        private _pnlCondicao: PainelHtml;
        private _pnlSelecao: PainelHtml;

        private get divBarra(): Div
        {
            if (this._divBarra != null)
            {
                return this._divBarra;
            }

            this._divBarra = new Div(this.strId + "_divBarra");

            return this._divBarra;
        }

        private get frmFiltro(): FrmFiltro
        {
            if (this._frmFiltro != null)
            {
                return this._frmFiltro;
            }

            this._frmFiltro = new FrmFiltro(this);

            return this._frmFiltro;
        }

        private get frmFiltroConteudo(): FrmFiltroConteudo
        {
            return this._frmFiltroConteudo;
        }

        private set frmFiltroConteudo(frmFiltroConteudo: FrmFiltroConteudo)
        {
            this._frmFiltroConteudo = frmFiltroConteudo;
        }

        public get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        public set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        private get pnlCondicao(): PainelHtml
        {
            if (this._pnlCondicao != null)
            {
                return this._pnlCondicao;
            }

            this._pnlCondicao = new PainelHtml(this.strId + "_pnlCondicao");

            return this._pnlCondicao;
        }

        private get pnlSelecao(): PainelHtml
        {
            if (this._pnlSelecao != null)
            {
                return this._pnlSelecao;
            }

            this._pnlSelecao = new PainelHtml(this.strId + "_pnlSelecao");

            return this._pnlSelecao;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(jnlConsulta: JnlConsulta)
        {
            super("pnlFiltro");

            this.jnlConsulta = jnlConsulta;
        }

        // #endregion Construtor

        // #region Métodos

        public atualizarFrmFiltroConteudo(strFrmFiltroConteudo: string): void
        {
            this.pnlCondicao.jq.html(strFrmFiltroConteudo);

            if (Utils.getBooStrVazia(strFrmFiltroConteudo))
            {
                return;
            }

            this.inicializarFrmFiltroConteudo();
        }

        public atualizarArrFiltro(tblWeb: TabelaWeb): void
        {
            if (this.frmFiltroConteudo == null)
            {
                return;
            }

            this.frmFiltroConteudo.atualizarArrFiltro(tblWeb);
        }

        private divBarraOnClick(): void
        {
            if (this.jnlConsulta == null)
            {
                return;
            }

            if (this.pnlCondicao.booVisivel)
            {
                this.jnlConsulta.maximinizarTable();
                return;
            }

            this.jnlConsulta.restaurarTable();
        }

        public esconderFiltro(): void
        {
            if (!this.pnlCondicao.booVisivel)
            {
                return;
            }

            this.pnlCondicao.anm.sumir();
            this.pnlSelecao.anm.sumir();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.frmFiltro.iniciar();
        }

        private inicializarFrmFiltroConteudo(): void
        {
            this.frmFiltroConteudo = new FrmFiltroConteudo(this);

            this.frmFiltroConteudo.iniciar();
        }

        public mostrarFiltro(): void
        {
            if (this.pnlCondicao.booVisivel)
            {
                return;
            }

            this.pnlCondicao.anm.aparecer();
            this.pnlSelecao.anm.aparecer();

            if (this.frmFiltro == null)
            {
                return;
            }

            this.frmFiltro.receberFoco();
        }

        private pagOnKeyDown(arg: JQueryKeyEventObject): void
        {
            if (this.jnlConsulta == null)
            {
                return;
            }

            if (arg.keyCode == Keys.DOWN_ARROW && arg.ctrlKey)
            {
                this.jnlConsulta.restaurarTable();

                arg.preventDefault()

                return;
            }

            if (arg.keyCode == Keys.UP_ARROW && arg.ctrlKey)
            {
                this.jnlConsulta.maximinizarTable();

                arg.preventDefault()

                return;
            }
        }

        public pesquisar(): void
        {
            if (this.jnlConsulta == null)
            {
                return;
            }

            this.jnlConsulta.pesquisar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            AppWebBase.i.pag.addEvtOnKeyDownListener(this);
            this.divBarra.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.divBarra:
                        this.divBarraOnClick();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onKeyDown(objSender: Objeto, arg: JQueryKeyEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case AppWebBase.i.pag:
                        this.pagOnKeyDown(arg);
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