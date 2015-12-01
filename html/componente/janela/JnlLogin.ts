module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlLogin extends JnlMensagem
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnEntrar: BotaoAcao;
        private _cmpLogin: CampoAlfanumerico;
        private _cmpSenha: CampoSenha;
        private _frmLogin: FormHtml;

        private get btnEnter(): BotaoAcao
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnEntrar != null)
                {
                    return this._btnEntrar;
                }

                this._btnEntrar = new BotaoAcao("btnEntrar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnEntrar;
        }

        private get cmpLogin(): CampoAlfanumerico
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._cmpLogin != null)
                {
                    return this._cmpLogin;
                }

                this._cmpLogin = new CampoAlfanumerico("cmpLogin");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._cmpLogin;
        }

        private get cmpSenha(): CampoSenha
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._cmpSenha != null)
                {
                    return this._cmpSenha;
                }

                this._cmpSenha = new CampoSenha("cmpSenha");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._cmpSenha;
        }

        private get frmLogin(): FormHtml
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                super.inicializar
                if (this._frmLogin != null)
                {
                    return this._frmLogin;
                }

                this._frmLogin = new FormHtml("frmLogin");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._frmLogin;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private entrar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!this.validarDados())
                {
                    return;
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

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.btnEnter.onClick = (e: any) => this.btnEnter_onClick(e);
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

        private validarDados(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(this.cmpLogin.strValor))
                {
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

        // #endregion Métodos

        // #region Eventos

        private btnEnter_onClick(e: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.entrar();
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}