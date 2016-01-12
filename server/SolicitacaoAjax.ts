module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados

    // #endregion Enumerados

    export class SolicitacaoAjax
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _jsn: string;

        public get jsn(): string
        {
            return this._jsn;
        }

        public set jsn(jsn: string)
        {
            this._jsn = jsn;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        /**
         * Método disparado antes que esta solicitação AJAX seja
         * enviada para o servidor.
         */
        public ajaxAntesEnviar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispararEvtOnAjaxListenerOnAjaxAntesEnviar();
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispararEvtOnAjaxListenerOnAjaxErroListener(strErrorThrown, strTextStatus);
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

        /**
         * Método disparado quando a resposta desta solicitação retorna,
         * contendo o resultado do processamento no servidor.
         * @param anyData Objeto JSON que foi enviado pelo servidor
         * contendo informações sobre o resultado do processo que foi
         * executado no servido.
         */
        public ajaxSucesso(anyData: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispararEvtOnAjaxListenerOnAjaxSucesso(anyData);
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

        /**
         * Carrega os valores de um objeto com o mesmo prototipo desta classe
         * para esta instância.
         * @param obj Objeto com o mesmo prototipo deste.
         */
        public carregarDados(obj: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                for (var objPropriedade in obj)
                {
                    (<any>this)[objPropriedade] = obj[objPropriedade];
                }
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (strKey == "_arrEvtOnAjaxListener")
                {
                    return null;
                }

                if (strKey == "_objJson")
                {
                    return null;
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return anyValue;
        }

        public toJson(): string
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                return JSON.stringify(this, (strKey, anyValue) => this.validarJson(strKey, anyValue));
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

        // #region Evento OnAjaxListener

        private _arrEvtOnAjaxListener: Array<OnAjaxListener>;

        private get arrEvtOnAjaxListener(): Array<OnAjaxListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnAjaxListener != null)
                {
                    return this._arrEvtOnAjaxListener;
                }

                this._arrEvtOnAjaxListener = new Array<OnAjaxListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnAjaxListener;
        }

        public addEvtOnAjaxListener(evtOnAjaxListener: OnAjaxListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnAjaxListener == null)
                {
                    return;
                }

                if (this.arrEvtOnAjaxListener.indexOf(evtOnAjaxListener) > 0)
                {
                    return;
                }

                this.arrEvtOnAjaxListener.push(evtOnAjaxListener);
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

        public removeEvtOnAjaxListener(evtOnAjaxListener: OnAjaxListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnAjaxListener == null)
                {
                    return;
                }

                if (this.arrEvtOnAjaxListener.indexOf(evtOnAjaxListener) == 0)
                {
                    return;
                }

                this.arrEvtOnAjaxListener.splice(this.arrEvtOnAjaxListener.indexOf(evtOnAjaxListener));
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

        private dispararEvtOnAjaxListenerOnAjaxAntesEnviar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnAjaxListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnAjaxListener.forEach((value) => { value.onAjaxAntesEnviar(this); });
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

        private dispararEvtOnAjaxListenerOnAjaxErroListener(strErrorThrown: string, strTextStatus: string): void
        {
            // #region Variáveis

            var e: OnAjaxErroArg;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnAjaxListener.length == 0)
                {
                    return;
                }

                e = new OnAjaxErroArg();

                e.strErrorThrown = strErrorThrown;
                e.strTextStatus = strTextStatus;

                this.arrEvtOnAjaxListener.forEach((value) => { value.onAjaxErroListener(this, e); });
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

        private dispararEvtOnAjaxListenerOnAjaxSucesso(anyData: any): void
        {
            // #region Variáveis

            var e: OnAjaxSucessoArg;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnAjaxListener.length == 0)
                {
                    return;
                }

                e = new OnAjaxSucessoArg();

                e.anyData = anyData;

                this.arrEvtOnAjaxListener.forEach((value) => { value.onAjaxSucesso(this, e); });
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

        // #endregion Evento OnAjaxListener

        // #endregion Eventos
    }
}