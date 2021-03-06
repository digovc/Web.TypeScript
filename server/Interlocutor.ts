﻿// #region Reference

/// <reference path="../Objeto.ts"/>

// #endregion Reference

module Web
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

        private _arrFncErro: Array<((strStatus: string, strThrown: string) => void)>;
        private _arrFncProgresso: Array<((a: ProgressEvent) => void)>;
        private _arrFncSucesso: Array<((o: Interlocutor) => void)>;
        private _intHttpPorta: number;
        private _objData: Object;
        private _strClazz: string;
        private _strErro: string;
        private _strMetodo: string;

        private get arrFncErro(): Array<((strStatus: string, strThrown: string) => void)>
        {
            if (this._arrFncErro != null)
            {
                return this._arrFncErro;
            }

            this._arrFncErro = new Array<((strStatus: string, strThrown: string) => void)>();

            return this._arrFncErro;
        }

        private get arrFncProgresso(): Array<((a: ProgressEvent) => void)>
        {
            if (this._arrFncProgresso != null)
            {
                return this._arrFncProgresso;
            }

            this._arrFncProgresso = new Array<((a: ProgressEvent) => void)>();

            return this._arrFncProgresso;
        }

        private get arrFncSucesso(): Array<((o: Interlocutor) => void)>
        {
            if (this._arrFncSucesso != null)
            {
                return this._arrFncSucesso;
            }

            this._arrFncSucesso = new Array<((o: Interlocutor) => void)>();

            return this._arrFncSucesso;
        }

        public get intHttpPorta(): number
        {
            return this._intHttpPorta;
        }

        public set intHttpPorta(intHttpPorta: number)
        {
            this._intHttpPorta = intHttpPorta;
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

        // #region Construtor

        constructor(strMetodo: string = "<desconhecido>", objJson: Objeto = null)
        {
            super();

            this.strMetodo = strMetodo;
            this.addJsn(objJson);
        }

        // #endregion Construtor

        // #region Métodos

        public addFncErro(fncErro: ((strStatus: string, strThrown: string) => void)): Interlocutor
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

            return this;
        }

        public addFncProgresso(fncProgresso: ((a: ProgressEvent) => void)): Interlocutor
        {
            if (fncProgresso == null)
            {
                return;
            }

            if (this.arrFncProgresso.indexOf(fncProgresso) > -1)
            {
                return;
            }

            this.arrFncProgresso.push(fncProgresso);

            return this;
        }

        public addFncSucesso(fncSucesso: ((o: Interlocutor) => void)): Interlocutor
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

            return this;
        }

        public addJsn(obj: Objeto): void
        {
            if (obj == null)
            {
                return;
            }

            this.objData = obj.toJson();

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

        public getObjJson<T>(): T
        {
            if (this.objData == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.objData.toString()))
            {
                return null;
            }

            return JSON.parse(this.objData.toString());
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

        public processarOnErro(strStatus: string, strThrown: string): void
        {
            this.mostrarMsgErro(strStatus, strThrown);

            this.arrFncErro.forEach(f => f(strStatus, strThrown));
        }

        public processarOnProgresso(arg: ProgressEvent): void
        {
            this.arrFncProgresso.forEach(f => f(arg));
        }

        public processarOnSucesso(objData: any): void
        {
            if (objData == null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.copiarDados(objData);

            if (!Utils.getBooStrVazia(objInterlocutor.strErro))
            {
                this.mostrarMsgErro("Erro no servidor", objInterlocutor.strErro);
                return;
            }

            this.arrFncSucesso.forEach(f => f(objInterlocutor));
        }

        public validarDados(): boolean
        {
            if (Utils.getBooStrVazia(this.strMetodo))
            {
                return false;
            }

            return true;
        }

        protected validarJson(strPropriedade: string): boolean
        {
            if (!super.validarJson(strPropriedade))
            {
                return false;
            }

            if (strPropriedade == "_objJson")
            {
                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}