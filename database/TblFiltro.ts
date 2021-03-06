﻿// #region Reference

/// <reference path="ColunaWeb.ts"/>
/// <reference path="TabelaWeb.ts"/>

// #endregion Reference

module Web
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

            TblFiltro._i = new TblFiltro();

            return TblFiltro._i;
        }

        private _clnStrTabelaNome: ColunaWeb;

        public get clnStrTabelaNome(): ColunaWeb
        {
            if (this._clnStrTabelaNome != null)
            {
                return this._clnStrTabelaNome;
            }

            this._clnStrTabelaNome = this.getCln("str_tabela_nome");

            return this._clnStrTabelaNome;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}