/// <reference path="LayoutFixo.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class LayoutFixoManager
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: LayoutFixoManager;

        public static get i(): LayoutFixoManager
        {
            if (LayoutFixoManager._i != null)
            {
                return LayoutFixoManager._i;
            }

            LayoutFixoManager._i = new LayoutFixoManager();

            return LayoutFixoManager._i;
        }

        private _arrObjLayoutFixo: Array<LayoutFixo>;

        private get arrObjLayoutFixo(): Array<LayoutFixo>
        {
            if (this._arrObjLayoutFixo != null)
            {
                return this._arrObjLayoutFixo;
            }

            this._arrObjLayoutFixo = new Array<LayoutFixo>();

            return this._arrObjLayoutFixo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addLayoutFixo(objLayoutFixo: LayoutFixo): void
        {
            if (objLayoutFixo == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objLayoutFixo.strClassNome))
            {
                return;
            }

            if (Utils.getBooStrVazia(objLayoutFixo.strLayoutFixo))
            {
                return;
            }

            this.arrObjLayoutFixo.push(objLayoutFixo);
        }

        public getStrLayoutFixo(strClassNome: string): string
        {
            if (Utils.getBooStrVazia(strClassNome))
            {
                return null;
            }

            for (var i = 0; i < this.arrObjLayoutFixo.length; i++)
            {
                var objLayoutFixo = this.arrObjLayoutFixo[i];

                if (strClassNome == objLayoutFixo.strClassNome)
                {
                    return objLayoutFixo.strLayoutFixo;
                }
            }

            return null;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}