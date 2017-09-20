// #region Reference

/// <reference path="DivGridBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridConsulta extends DivGridBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _sqlTabelaNome: string;
        private _tbl: TabelaWeb;

        private get sqlTabelaNome(): string
        {
            return this._sqlTabelaNome;
        }

        private set sqlTabelaNome(sqlTabelaNome: string)
        {
            this._sqlTabelaNome = sqlTabelaNome;
        }

        private get tbl(): TabelaWeb
        {
            return this._tbl;
        }

        private set tbl(tbl: TabelaWeb)
        {
            this._tbl = tbl;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(strId: string, sqlTabelaNome: string)
        {
            super(strId);

            this.sqlTabelaNome = sqlTabelaNome;
        }

        // #endregion Construtor

        // #region Métodos

        private carregarTabela(): void
        {
            if (Utils.getBooStrVazia(this.sqlTabelaNome))
            {
                return;
            }

            if (AppWebBase.i.srvAjaxDbe == null)
            {
                return;
            }

            AppWebBase.i.srvAjaxDbe.carregarTabela(this.sqlTabelaNome, ((t) => this.carregarTabelaSucesso(t)));
        }

        private carregarTabelaSucesso(tbl: TabelaWeb): void
        {
            if (tbl == null)
            {
                return;
            }

            this.tbl = tbl;

            this.montarLayout2();
        }

        protected montarLayout(): void
        {
            super.montarLayout();

            this.intIndex = 0;

            if (this.tbl == null)
            {
                this.carregarTabela();
                return;
            }

            this.montarLayout2();
        }

        private montarLayout2(): void
        {
            this.divGridCabecalho.iniciar();
            this.divGridConteudo.iniciar();
            this.divGridRodape.iniciar();

            this.divGridCabecalho.montarLayoutTabela(this.tbl);
            this.divGridConteudo.montarLayoutTabela(this.tbl);
            this.divGridRodape.montarLayoutTabela(this.tbl);

            this.mostrar(undefined, (() => this.jq.css("display", "inline-grid")));
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}