/// <reference path="Constante.ts"/>

module Web
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

        // #region Construtor
        // #endregion Construtor

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

            for (var i = 0; i < this.arrObjConstante.length; i++)
            {
                if (objConstante.strNome == this.arrObjConstante[i].strNome)
                {
                    return;
                }
            }

            this.arrObjConstante.push(objConstante);
        }

        public getBooConstante(strConstanteNome: string): boolean
        {
            return Utils.getBoo(this.getStrConstante(strConstanteNome));
        }

        public getDecConstante(strConstanteNome: string): number
        {
            return this.getFltConstante(strConstanteNome);
        }

        public getFltConstante(strConstanteNome: string): number
        {
            return Number(this.getStrConstante(strConstanteNome));
        }

        public getIntConstante(strConstanteNome: string): number
        {
            return Math.round(this.getFltConstante(strConstanteNome));
        }

        public getStrConstante(strConstanteNome: string): string
        {
            if (Utils.getBooStrVazia(strConstanteNome))
            {
                return null;
            }

            for (var i = 0; i < this.arrObjConstante.length; i++)
            {
                if (strConstanteNome == this.arrObjConstante[i].strNome)
                {
                    return this.arrObjConstante[i].strValor;
                }
            }

            return null;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}