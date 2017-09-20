// #region Reference

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum OnTableMenuClickArg_EnmAcao
    {
        ADICIONAR,
        ALTERAR,
        APAGAR,
        MENU,
        NONE,
    }

    // #endregion Enumerados

    export class OnTableMenuClickArg
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _argOrigem: JQueryEventObject;
        private _enmTipo: OnTableMenuClickArg_EnmAcao = OnTableMenuClickArg_EnmAcao.NONE;
        private _tagTableRow: TableRow;

        public get argOrigem(): JQueryEventObject
        {
            return this._argOrigem;
        }

        public set argOrigem(argOrigem: JQueryEventObject)
        {
            this._argOrigem = argOrigem;
        }

        public get enmTipo(): OnTableMenuClickArg_EnmAcao
        {
            return this._enmTipo;
        }

        public set enmTipo(enmTipo: OnTableMenuClickArg_EnmAcao)
        {
            this._enmTipo = enmTipo;
        }

        public get tagTableRow(): TableRow
        {
            return this._tagTableRow;
        }

        public set tagTableRow(tagTableRow: TableRow)
        {
            this._tagTableRow = tagTableRow;
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