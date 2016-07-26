/// <reference path="../Objeto.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class Interlocutor extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strData: string;
        private _strErro: string;
        private _strJsonTipo: string;
        private _strMetodo: string;

        public get strData(): string
        {
            return this._strData;
        }

        public set strData(jsn: string)
        {
            this._strData = jsn;
        }

        public get strErro(): string
        {
            return this._strErro;
        }

        public set strErro(strErro: string)
        {
            this._strErro = strErro;
        }

        public get strJsonTipo(): string
        {
            return this._strJsonTipo;
        }

        public set strJsonTipo(strJsonTipo: string)
        {
            this._strJsonTipo = strJsonTipo;
        }

        public get strMetodo(): string
        {
            return this._strMetodo;
        }

        public set strMetodo(strMetodo: string)
        {
            this._strMetodo = strMetodo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addJsn(obj: Object): void
        {
            if (obj == null)
            {
                return;
            }

            this.strData = JSON.stringify(obj);
            this.strJsonTipo = obj.constructor.name;
        }

        public addStr(str: string): void
        {
            if (Utils.getBooStrVazia(str))
            {
                return;
            }

            this.strData = str;
        }

        /**
         * Verifica se esta solicitação possui dados válidos
         * para ser enviada para o servidor.
         */
        public validarDados(): boolean
        {
            if (Utils.getBooStrVazia(this.strMetodo))
            {
                return false;
            }

            return true;
        }

        protected validarJson(strKey: string, anyValue: any): any
        {
            return anyValue;
        }

        public toJson(): string
        {
            return JSON.stringify(this, (strKey, anyValue) => this.validarJson(strKey, anyValue));
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}