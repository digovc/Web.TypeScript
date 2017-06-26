/// <reference path="../../../database/DataContainer.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="DivGridCabecalho.ts"/>
/// <reference path="DivGridConteudo.ts"/>
/// <reference path="DivGridRodape.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class DivGridBase extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divGridCabecalho: DivGridCabecalho;
        private _divGridConteudo: DivGridConteudo;
        private _divGridRodape: DivGridRodape;
        private _objDataContainer: DataContainer;

        private get divGridCabecalho(): DivGridCabecalho
        {
            if (this._divGridCabecalho != null)
            {
                return this._divGridCabecalho;
            }

            this._divGridCabecalho = new DivGridCabecalho(this);

            return this._divGridCabecalho;
        }

        private get divGridConteudo(): DivGridConteudo
        {
            if (this._divGridConteudo != null)
            {
                return this._divGridConteudo;
            }

            this._divGridConteudo = new DivGridConteudo(this);

            return this._divGridConteudo;
        }

        private get divGridRodape(): DivGridRodape
        {
            if (this._divGridRodape != null)
            {
                return this._divGridRodape;
            }

            this._divGridRodape = new DivGridRodape(this);

            return this._divGridRodape;
        }

        public get objDataContainer(): DataContainer
        {
            return this._objDataContainer;
        }

        public set objDataContainer(objDataContainer: DataContainer)
        {
            this._objDataContainer = objDataContainer;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected montarLayout(): void
        {
            super.montarLayout();

            if (this.objDataContainer == null)
            {
                return;
            }

            if (this.objDataContainer.arrRow == null)
            {
                return;
            }

            if (this.objDataContainer.arrRow.length < 1)
            {
                return;
            }

            // TODO: Parei aqui.

            this.jq.append(this.divGridCabecalho.strLayoutFixo);
            this.jq.append(this.divGridConteudo.strLayoutFixo);
            this.jq.append(this.divGridRodape.strLayoutFixo);

            this.divGridCabecalho.iniciar();
            this.divGridConteudo.iniciar();
            this.divGridRodape.iniciar();

            this.mostrar();
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_div_grid_consulta_id", this.strId);

            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}