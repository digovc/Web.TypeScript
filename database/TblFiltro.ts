/// <reference path="ColunaWeb.ts"/>
/// <reference path="TabelaWeb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TblFiltro extends TabelaWeb
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: TblFiltro;

        public static get i(): TblFiltro
        {
            if (TblFiltro._i != null)
            {
                return TblFiltro._i;
            }

            TblFiltro._i = new TblFiltro("tbl_filtro");

            return TblFiltro._i;
        }

        private _clnStrTabelaNome: ColunaWeb;

        public get clnStrTabelaNome(): ColunaWeb
        {
            if (this._clnStrTabelaNome != null)
            {
                return this._clnStrTabelaNome;
            }

            this._clnStrTabelaNome = this.getClnWeb("str_tabela_nome");

            return this._clnStrTabelaNome;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}