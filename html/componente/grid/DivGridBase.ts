/// <reference path="../../../database/DataContainer.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="DivGridCabecalho.ts"/>
/// <reference path="DivGridConteudo.ts"/>
/// <reference path="DivGridRodape.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class DivGridBase extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divGridCabecalho: DivGridCabecalho;
        private _divGridConteudo: DivGridConteudo;
        private _divGridRodape: DivGridRodape;
        private _intIndex: number = 0;
        private _intRegistroQuantidadeMaxima: number = 25;
        private _objDataContainer: DataContainer;

        protected get divGridCabecalho(): DivGridCabecalho
        {
            if (this._divGridCabecalho != null)
            {
                return this._divGridCabecalho;
            }

            this._divGridCabecalho = new DivGridCabecalho(this);

            return this._divGridCabecalho;
        }

        protected get divGridConteudo(): DivGridConteudo
        {
            if (this._divGridConteudo != null)
            {
                return this._divGridConteudo;
            }

            this._divGridConteudo = new DivGridConteudo(this);

            return this._divGridConteudo;
        }

        protected get divGridRodape(): DivGridRodape
        {
            if (this._divGridRodape != null)
            {
                return this._divGridRodape;
            }

            this._divGridRodape = new DivGridRodape(this);

            return this._divGridRodape;
        }

        public get intIndex(): number
        {
            return this._intIndex;
        }

        public set intIndex(intIndex: number)
        {
            this._intIndex = intIndex;
        }

        public get intRegistroQuantidadeMaxima(): number
        {
            return this._intRegistroQuantidadeMaxima;
        }

        public set intRegistroQuantidadeMaxima(intRegistroQuantidadeMaxima: number)
        {
            this._intRegistroQuantidadeMaxima = intRegistroQuantidadeMaxima;
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

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = Utils.replaceAll(strLayoutFixo, "_div_grid_id", this.strId);

            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}