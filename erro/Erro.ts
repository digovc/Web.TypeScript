/// <reference path="../Objeto.ts"/>

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

        // #region Construtor

        constructor(strMensagem: string, exp: Error = null)
        {
            super();

            this.strMensagem = strMensagem;
            this.exp = exp;

            this.mostrarMensagem();
        }

        // #endregion Construtor

        // #region Métodos

        private getStrMensagemFormatada(): string
        {
            if (Utils.getBooStrVazia(this.strMensagemTecnica))
            {
                return this.strMensagem;
            }

            return (this.strMensagem + "<br/><br/>Detalhes:<br/><br/>" + this.strMensagemTecnica);
        }

        private getStrMensagemTecnica(): string
        {
            if (this.exp == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.exp.message))
            {
                return null;
            }

            return this.exp.message;
        }

        private mostrarMensagem(): void
        {
            Mensagem.animar("Erro", this.strMensagemFormatada, Mensagem_EnmTipo.NEGATIVA);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}