module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum OnGridMenuClickArg_EnmAcao
    {
        ADICIONAR,
        ALTERAR,
        APAGAR,
        MENU,
        NONE,
    }

    // #endregion Enumerados

    export class OnGridMenuClickArg
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _argOrigem: JQueryEventObject;
        private _enmTipo: OnGridMenuClickArg_EnmAcao = OnGridMenuClickArg_EnmAcao.NONE;
        private _tagGridRow: GridRow;

        public get argOrigem(): JQueryEventObject
        {
            return this._argOrigem;
        }

        public set argOrigem(argOrigem: JQueryEventObject)
        {
            this._argOrigem = argOrigem;
        }

        public get enmTipo(): OnGridMenuClickArg_EnmAcao
        {
            return this._enmTipo;
        }

        public set enmTipo(enmTipo: OnGridMenuClickArg_EnmAcao)
        {
            this._enmTipo = enmTipo;
        }

        public get tagGridRow(): GridRow
        {
            return this._tagGridRow;
        }

        public set tagGridRow(tagGridRow: GridRow)
        {
            this._tagGridRow = tagGridRow;
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