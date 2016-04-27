/// <reference path="../../painel/PainelHtml.ts"/>
/// <reference path="FrmFiltro.ts"/>
/// <reference path="FrmFiltroConteudo.ts"/>
/// <reference path="JnlConsulta.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelFiltro extends PainelHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _frmFiltro: FrmFiltro;
        private _frmFiltroConteudo: FrmFiltroConteudo;
        private _jnlConsulta: JnlConsulta;
        private _pnlCondicao: PainelHtml;

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

        // #endregion Atributos

        // #region Construtores

        constructor(jnlConsulta: JnlConsulta)
        {
            super("pnlFiltro");

            this.jnlConsulta = jnlConsulta;
        }

        // #endregion Construtores

        // #region Métodos

        public atualizarFrmFiltroConteudo(strFrmFiltroConteudo: string): void
        {
            if (Utils.getBooStrVazia(strFrmFiltroConteudo))
            {
                return;
            }

            this.pnlCondicao.jq.html(strFrmFiltroConteudo);

            this.inicializarFrmFiltroConteudo();
        }

        public atualizarLstFiltro(tblWeb: TabelaWeb): void
        {
            this.frmFiltroConteudo.atualizarLstFiltro(tblWeb);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.frmFiltro.iniciar();
        }

        private inicializarFrmFiltroConteudo(): void
        {
            this.frmFiltroConteudo = new FrmFiltroConteudo();

            this.frmFiltroConteudo.iniciar();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}