﻿/// <reference path="../Objeto.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Erro extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _exp: Error;
        private _strMensagem: string = "Erro inesperado.";
        private _strMensagemFormatada: string;
        private _strMensagemTecnica: string;

        private get exp(): Error
        {
            return this._exp;
        }

        private set exp(exp: Error)
        {
            this._exp = exp;
        }

        public get strMensagem(): string
        {
            return this._strMensagem;
        }

        public set strMensagem(strMensagem: string)
        {
            this._strMensagem = strMensagem;
        }

        private get strMensagemFormatada(): string
        {
            if (this._strMensagemFormatada != null)
            {
                return this._strMensagemFormatada;
            }

            this._strMensagemFormatada = this.getStrMensagemFormatada();

            return this._strMensagemFormatada;
        }

        private get strMensagemTecnica(): string
        {
            if (this._strMensagemTecnica != null)
            {
                return this._strMensagemTecnica;
            }

            this._strMensagemTecnica = this.getStrMensagemTecnica()

            return this._strMensagemTecnica;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strMensagem: string, exp: Error = null)
        {
            super();

            this.strMensagem = strMensagem;
            this.exp = exp;

            this.mostrarMensagem();
        }

        // #endregion Construtores

        // #region Métodos

        private getStrMensagemFormatada(): string
        {
            var strResultado = this.strMensagem;

            if (Utils.getBooStrVazia(this.strMensagemTecnica))
            {
                return strResultado;
            }

            strResultado += "<br/>"
            strResultado += "<br/>"
            strResultado += "Detalhes:"
            strResultado += "<br/>"
            strResultado += "<br/>"
            strResultado += this.strMensagemTecnica;

            return strResultado;
        }

        private getStrMensagemTecnica(): string
        {
            var strResultado = "Sem maiores informações.";

            if (this.exp == null)
            {
                return strResultado;
            }

            if (Utils.getBooStrVazia(this.exp.message))
            {
                return strResultado;
            }

            return this.exp.message;
        }

        private mostrarMensagem(): void
        {
            Mensagem.mostrar("Erro", this.strMensagemFormatada, Mensagem_EnmTipo.NEGATIVA);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}