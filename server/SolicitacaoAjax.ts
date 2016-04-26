module NetZ_Web_TypeScript
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

        private _arrFncSucesso: Array<Function>;
        private _strData: string;

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

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

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

        /**
         * Método disparado antes que esta solicitação AJAX seja
         * enviada para o servidor.
         */
        public ajaxAntesEnviar(): void
        {
            this.dispararEvtOnAjaxListenerOnAjaxAntesEnviar();
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
            this.dispararEvtOnAjaxListenerOnAjaxErroListener(strErrorThrown, strTextStatus);
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

            this.dispararEvtOnAjaxListenerOnAjaxSucesso(anyData);
        }

        private dispararArrFncSucesso(anyData: any): void
        {
            if (anyData == null)
            {
                return;
            }

            var objSolicitacaoAjax = new SolicitacaoAjax();

            objSolicitacaoAjax.copiarDados(anyData);

            this.arrFncSucesso.forEach((fnc) => { fnc(objSolicitacaoAjax); });
        }

        public enviar(): void
        {
            return;
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

        // #region Evento OnAjaxListener

        private _arrEvtOnAjaxListener: Array<OnAjaxListener>;

        private get arrEvtOnAjaxListener(): Array<OnAjaxListener>
        {
            if (this._arrEvtOnAjaxListener != null)
            {
                return this._arrEvtOnAjaxListener;
            }

            this._arrEvtOnAjaxListener = new Array<OnAjaxListener>();

            return this._arrEvtOnAjaxListener;
        }

        public addEvtOnAjaxListener(evtOnAjaxListener: OnAjaxListener): void
        {
            if (evtOnAjaxListener == null)
            {
                return;
            }

            if (this.arrEvtOnAjaxListener.indexOf(evtOnAjaxListener) > -1)
            {
                return;
            }

            this.arrEvtOnAjaxListener.push(evtOnAjaxListener);
        }

        public removeEvtOnAjaxListener(evtOnAjaxListener: OnAjaxListener): void
        {
            if (evtOnAjaxListener == null)
            {
                return;
            }

            if (this.arrEvtOnAjaxListener.indexOf(evtOnAjaxListener) == -1)
            {
                return;
            }

            this.arrEvtOnAjaxListener.splice(this.arrEvtOnAjaxListener.indexOf(evtOnAjaxListener));
        }

        private dispararEvtOnAjaxListenerOnAjaxAntesEnviar(): void
        {
            if (this.arrEvtOnAjaxListener.length == 0)
            {
                return;
            }

            this.arrEvtOnAjaxListener.forEach((evt) => { evt.onAjaxAntesEnviar(this); });
        }

        private dispararEvtOnAjaxListenerOnAjaxErroListener(strErrorThrown: string, strTextStatus: string): void
        {
            if (this.arrEvtOnAjaxListener.length == 0)
            {
                return;
            }

            var arg = new OnAjaxErroArg();

            arg.strErrorThrown = strErrorThrown;
            arg.strTextStatus = strTextStatus;

            this.arrEvtOnAjaxListener.forEach((evt) => { evt.onAjaxErroListener(this, arg); });
        }

        private dispararEvtOnAjaxListenerOnAjaxSucesso(anyData: any): void
        {
            if (this.arrEvtOnAjaxListener.length == 0)
            {
                return;
            }

            var arg = new OnAjaxSucessoArg();

            arg.anyData = anyData;

            this.arrEvtOnAjaxListener.forEach((evt) => { evt.onAjaxSucesso(this, arg); });
        }

        // #endregion Evento OnAjaxListener

        // #endregion Eventos
    }
}