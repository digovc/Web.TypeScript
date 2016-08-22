/// <reference path="../Objeto.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Interlocutor extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrFncErro: Array<Function>;
        private _arrFncProgress: Array<Function>;
        private _arrFncSucesso: Array<Function>;
        private _objData: Object;
        private _strClazz: string;
        private _strErro: string;
        private _strMetodo: string;

        private get arrFncErro(): Array<Function>
        {
            if (this._arrFncErro != null)
            {
                return this._arrFncErro;
            }

            this._arrFncErro = new Array<Function>();

            return this._arrFncErro;
        }

        private get arrFncProgress(): Array<Function>
        {
            if (this._arrFncProgress != null)
            {
                return this._arrFncProgress;
            }

            this._arrFncProgress = new Array<Function>();

            return this._arrFncProgress;
        }

        private get arrFncSucesso(): Array<Function>
        {
            if (this._arrFncSucesso != null)
            {
                return this._arrFncSucesso;
            }

            this._arrFncSucesso = new Array<Function>();

            return this._arrFncSucesso;
        }

        public get objData(): Object
        {
            return this._objData;
        }

        public set objData(objData: Object)
        {
            this._objData = objData;
        }

        public get strClazz(): string
        {
            return this._strClazz;
        }

        public set strClazz(strClazz: string)
        {
            this._strClazz = strClazz;
        }

        public get strErro(): string
        {
            return this._strErro;
        }

        public set strErro(strErro: string)
        {
            this._strErro = strErro;
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

        public addFncErro(fncErro: Function): void
        {
            if (fncErro == null)
            {
                return;
            }

            if (this.arrFncErro.indexOf(fncErro) > -1)
            {
                return;
            }

            this.arrFncErro.push(fncErro);
        }

        public addFncSucesso(fncSucesso: Function): void
        {
            if (fncSucesso == null)
            {
                return;
            }

            if (this.arrFncSucesso.indexOf(fncSucesso) > -1)
            {
                return;
            }

            this.arrFncSucesso.push(fncSucesso);
        }

        public addJsn(obj: Object): void
        {
            if (obj == null)
            {
                return;
            }

            this.objData = JSON.stringify(obj);
            this.strClazz = (obj.constructor as any).name;
        }

        public addStr(str: string): void
        {
            if (Utils.getBooStrVazia(str))
            {
                return;
            }

            this.objData = str;
            this.strClazz = null;
        }

        private dispararArrFncSucesso(anyData: any): void
        {
            if (anyData == null)
            {
                return;
            }

            this.copiarDados(anyData);

            if (!Utils.getBooStrVazia(this.strErro))
            {
                this.mostrarMsgErro("Erro no servidor", this.strErro);
                return;
            }

            this.arrFncSucesso.forEach((fnc) => { fnc(this); });
        }

        private mostrarMsgErro(strTextStatus: string, strErrorThrown: string): void
        {
            if (strTextStatus == "error")
            {
                strTextStatus = "Ops!";
            }

            if (Utils.getBooStrVazia(strErrorThrown))
            {
                strErrorThrown = Utils.STR_VAZIA;

                strErrorThrown += "Erro desconhecido no servidor.<br/><br/>";
                strErrorThrown += "Mas não se preocupe, nossos macacos astronautas já estão cuidando para que este problema seja resolvido.";
            }

            Mensagem.mostrar(strTextStatus, strErrorThrown, Mensagem_EnmTipo.NEGATIVA);
        }

        public processarOnErro(strTextStatus: string, strErrorThrown: string): void
        {
            this.mostrarMsgErro(strTextStatus, strErrorThrown);

            this.arrFncErro.forEach((fnc) => { fnc(strTextStatus, strErrorThrown); });
        }

        public processarOnProgress(arg: ProgressEvent): void
        {
            this.arrFncProgress.forEach((fnc) => { fnc(arg); });
        }

        public processarOnSucesso(anyData: any): void
        {
            this.dispararArrFncSucesso(anyData);
        }

        public toJson(): string
        {
            return JSON.stringify(this, (strKey, anyValue) => this.validarJson(strKey, anyValue));
        }

        public validarDados(): boolean
        {
            if (Utils.getBooStrVazia(this.strMetodo))
            {
                return false;
            }

            return true;
        }

        private validarJson(strKey: string, anyValue: any): any
        {
            if (strKey == "_arrEvtOnAjaxListener")
            {
                return null;
            }

            if (strKey == "_arrFncSucesso")
            {
                return null;
            }

            if (strKey == "_objJson")
            {
                return null;
            }

            return anyValue;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}