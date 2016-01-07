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

        private _objJsonEnvio: Object;

        public get objJsonEnvio(): Object
        {
            return this._objJsonEnvio;
        }

        public set objJsonEnvio(objJsonEnvio: Object)
        {
            this._objJsonEnvio = objJsonEnvio;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

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

        public validarDadosEnvio(): boolean
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