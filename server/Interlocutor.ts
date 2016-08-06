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
        private _arrFncSucesso: Array<Function>;
        private _strData: string;
        private _strErro: string;
        private _strJsonTipo: string;
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

        private get arrFncSucesso(): Array<Function>
        {
            if (this._arrFncSucesso != null)
            {
                return this._arrFncSucesso;
            }

            this._arrFncSucesso = new Array<Function>();

            return this._arrFncSucesso;
        }

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

            this.strData = JSON.stringify(obj);
            this.strJsonTipo = (obj.constructor as any).name;
        }

        public addStr(str: string): void
        {
            if (Utils.getBooStrVazia(str))
            {
                return;
            }

            this.strData = str;
            this.strJsonTipo = null;
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

        private dispararArrFncErro(strTextStatus: string, strErrorThrown: string): void
        {
            this.arrFncErro.forEach((fnc) => { fnc(strTextStatus, strErrorThrown); });
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

            new Mensagem(strTextStatus, strErrorThrown, Mensagem_EnmTipo.NEGATIVA).abrirMensagem();
        }

        public processarOnAjaxErro(strTextStatus: string, strErrorThrown: string): void
        {
            this.mostrarMsgErro(strTextStatus, strErrorThrown);

            this.dispararArrFncErro(strTextStatus, strErrorThrown);
        }

        public processarOnAjaxSucesso(anyData: any): void
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