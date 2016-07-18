/// <reference path="../AppWeb.ts"/>

module NetZ_Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados

    // #endregion Enumerados

    export class SolicitacaoAjax extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrFncErro: Array<Function>;
        private _arrFncSucesso: Array<Function>;
        private _strData: string;
        private _strErro: string;

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

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        /**
         * Adiciona uma função que será executada caso haja algum erro ao enviar a solicitação.
         * Esta função receberá duas strings contendo detalhes do erro que aconteceu (strTextStatus, strErrorThrown).
         * @param fncErro Função que será executada caso haja algum erro ao enviar a solicitação.
         */
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

        /**
         * Adiciona uma função que será executada caso a solicitação seja bem sucedida.
         * Esta função receberá um objeto do tipo @link SolicitacaoAjax contendo
         * os dados de resposta do servidor.
         * @param fncSucesso Função que será executada caso a solicitação seja bem sucedida.
         */
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

        public addJsn(obj: any): void
        {
            if (obj == null)
            {
                return;
            }

            this.strData = JSON.stringify(obj);
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
         * Método disparado quando o servidor devolve algum tipo de
         * exceção durante o processamento desta solicitação.
         * Isso não significa que o processo em si deu errado, mas que
         * o algo na conexão deu.
         * @param strTextStatus Texto contendo o status do erro.
         * @param strErrorThrown Texto contendo detalhes do erro.
         */
        public ajaxErro(strTextStatus: string, strErrorThrown: string): void
        {
            this.mostrarMsgErro(strTextStatus, strErrorThrown);

            this.dispararArrFncErro(strTextStatus, strErrorThrown);
        }

        /**
         * Método disparado quando a resposta desta solicitação retorna,
         * contendo o resultado do processamento no servidor.
         * @param anyData Objeto JSON que foi enviado pelo servidor
         * contendo informações sobre o resultado do processo que foi
         * executado no servido.
         */
        public ajaxSucesso(anyData: any): void
        {
            this.dispararArrFncSucesso(anyData);
        }

        private dispararArrFncSucesso(anyData: any): void
        {
            if (anyData == null)
            {
                return;
            }

            var objSolicitacaoAjax = new SolicitacaoAjax();

            objSolicitacaoAjax.copiarDados(anyData);

            if (!Utils.getBooStrVazia(objSolicitacaoAjax.strErro))
            {
                this.mostrarMsgErro("Erro no servidor", objSolicitacaoAjax.strErro);
                return;
            }

            this.arrFncSucesso.forEach((fnc) => { fnc(objSolicitacaoAjax); });
        }

        private dispararArrFncErro(strTextStatus: string, strErrorThrown: string): void
        {
            this.arrFncErro.forEach((fnc) => { fnc(strTextStatus, strErrorThrown); });
        }

        private mostrarMsgErro(strTextStatus: string, strErrorThrown: string): void
        {
            if (Utils.getBooStrVazia(strErrorThrown))
            {
                strErrorThrown = "Erro desconhecido no servidor.";
            }

            new Mensagem(strTextStatus, strErrorThrown, Mensagem_EnmTipo.NEGATIVA).abrirMensagem();
        }

        /**
         * Verifica se esta solicitação possui dados válidos
         * para ser enviada para o servidor.
         */
        public validarDados(): boolean
        {
            return true;
        }

        protected validarJson(strKey: string, anyValue: any): any
        {
            if (strKey == "_arrEvtOnAjaxListener")
            {
                return null;
            }

            if (strKey == "_objJson")
            {
                return null;
            }

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