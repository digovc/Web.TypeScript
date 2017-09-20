// #region Reference

/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="coluna/DivGridColunaLinha.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivGridLinha extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrDivGridColunaLinha: Array<DivGridColunaLinha>;
        private _divGridConteudo: DivGridConteudo;
        private _intRegistroIndex: number;

        private get arrDivGridColunaLinha(): Array<DivGridColunaLinha>
        {
            if (this._arrDivGridColunaLinha != null)
            {
                return this._arrDivGridColunaLinha;
            }

            this._arrDivGridColunaLinha = new Array<DivGridColunaLinha>();

            return this._arrDivGridColunaLinha;
        }

        public get divGridConteudo(): DivGridConteudo
        {
            return this._divGridConteudo;
        }

        public set divGridConteudo(divGridConteudo: DivGridConteudo)
        {
            this._divGridConteudo = divGridConteudo;
        }

        public get intRegistroIndex(): number
        {
            return this._intRegistroIndex;
        }

        public set intRegistroIndex(intRegistroIndex: number)
        {
            this._intRegistroIndex = intRegistroIndex;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(divGridConteudo: DivGridConteudo)
        {
            super(null);

            this.divGridConteudo = divGridConteudo;
            this.strId = (DivGridLinha.name + "_" + this.intObjetoId);
        }

        // #endregion Construtor

        // #region Métodos

        private limparLayout(): void
        {
            this.arrDivGridColunaLinha.forEach(d => d.dispose());

            this.arrDivGridColunaLinha.splice(0, this.arrDivGridColunaLinha.length);

            this.strConteudo = null;
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_div_id", this.strId);

            return strLayoutFixo;
        }

        public montarLayoutTabela(tbl: TabelaWeb, intRegistroIndex: number): void
        {
            this.limparLayout();

            this.intRegistroIndex = intRegistroIndex;

            tbl.arrCln.forEach(c => this.montarLayoutTabelaColuna(c));
        }

        private montarLayoutTabelaColuna(cln: ColunaWeb): void
        {
            if (cln == null)
            {
                return;
            }

            var divGridColunaLinha = new DivGridColunaLinha(this);

            this.addHtml(divGridColunaLinha.strLayoutFixo);

            divGridColunaLinha.iniciar();

            divGridColunaLinha.montarLayoutColuna(cln);

            this.arrDivGridColunaLinha.push(divGridColunaLinha);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}