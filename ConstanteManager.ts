/// <reference path="Constante.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ConstanteManager
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: ConstanteManager;

        public static get i(): ConstanteManager
        {
            if (ConstanteManager._i != null)
            {
                return ConstanteManager._i;
            }

            ConstanteManager._i = new ConstanteManager();

            return ConstanteManager._i;
        }

        private _arrObjConstante: Array<Constante>;

        private get arrObjConstante(): Array<Constante>
        {
            if (this._arrObjConstante != null)
            {
                return this._arrObjConstante;
            }

            this._arrObjConstante = new Array<Constante>();

            return this._arrObjConstante;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addConstante(objConstante: Constante): void
        {
            if (objConstante == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objConstante.strNome))
            {
                return;
            }

            if (Utils.getBooStrVazia(objConstante.strValor))
            {
                return;
            }

            this.arrObjConstante.push(objConstante);
        }

        public getStrConstante(strClassNome: string): string
        {
            if (Utils.getBooStrVazia(strClassNome))
            {
                return null;
            }

            for (var i = 0; i < this.arrObjConstante.length; i++)
            {
                var objConstante = this.arrObjConstante[i];

                if (strClassNome == objConstante.strNome)
                {
                    return objConstante.strValor;
                }
            }

            return null;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}