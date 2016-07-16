module NetZ_Web
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

        private _strMensagem: string = "Erro inesperado.";
        private _strMensagemFormatada: string;
        private _strMensagemTecnica: string = "<Sem detalhes>";

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
            this._strMensagemFormatada = this.strMensagem;

            if (Utils.getBooStrVazia(this.strMensagemTecnica))
            {
                return this._strMensagemFormatada;
            }

            this._strMensagemFormatada += "\n\n"
            this._strMensagemFormatada += "Detalhes:"
            this._strMensagemFormatada += "\n\n"
            this._strMensagemFormatada += this.strMensagemTecnica;

            return this._strMensagemFormatada;
        }

        private get strMensagemTecnica(): string
        {
            return this._strMensagemTecnica;
        }

        private set strMensagemTecnica(strMensagemTecnica: string)
        {
            this._strMensagemTecnica = strMensagemTecnica;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strMensagem: string, e: Error)
        {
            super();

            this.strMensagem = strMensagem;

            if (e != null)
            {
                this.strMensagemTecnica = e.message;
            }

            this.mostrarMensagem();
        }

        // #endregion Construtores

        // #region Métodos

        private mostrarMensagem(): void
        {
            new Mensagem("Erro", this.strMensagemFormatada, Mensagem_EnmTipo.NEGATIVA).abrirMensagem();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}