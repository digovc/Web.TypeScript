module NetZ_Web_TypeScript
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

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

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strMensagem = strMensagem;

                if (e != null)
                {
                    this.strMensagemTecnica = e.message;
                }

                this.mostrarMensagem();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Construtores

        // #region Métodos

        private mostrarMensagem(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                // TODO: Usar a classe Mensagem para mostrar as mensagens de erro para o usuário.
                window.alert(this.strMensagemFormatada);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}