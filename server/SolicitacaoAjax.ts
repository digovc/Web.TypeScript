module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum Solicitacao_EnmMetodo
    {
        NONE,
        SALVAR_REGISTRO,
    }

    // #endregion Enumerados

    export class SolicitacaoAjax extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _enmMetodo: Solicitacao_EnmMetodo = Solicitacao_EnmMetodo.NONE;
        private _objJsonEnvio: Object;
        private _strJsonEnvio: string;

        public get enmMetodo(): Solicitacao_EnmMetodo
        {
            return this._enmMetodo;
        }

        public set enmMetodo(enmMetodo: Solicitacao_EnmMetodo)
        {
            this._enmMetodo = enmMetodo;
        }

        public get objJsonEnvio(): Object
        {
            return this._objJsonEnvio;
        }

        public set objJsonEnvio(objJsonEnvio: Object)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._objJsonEnvio = objJsonEnvio;

                this.atualizarObjJsonEnvio();
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

        private get strJsonEnvio(): string
        {
            return this._strJsonEnvio;
        }

        private set strJsonEnvio(strJsonEnvio: string)
        {
            this._strJsonEnvio = strJsonEnvio;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private atualizarObjJsonEnvio(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.objJsonEnvio == null)
                {
                    this.strJsonEnvio = null;
                    return;
                }

                this.strJsonEnvio = JSON.stringify(this.objJsonEnvio);
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

        public ajaxAntesEnviar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Solicitacao_EnmMetodo.NONE == this.enmMetodo)
                {
                    return false;
                }

                if (Utils.getBooStrVazia(this.strJsonEnvio))
                {
                    return false;
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

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}