module NetZ_Web
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

        private _btnEntrar: PainelAcao;
        private _cmpLogin: CampoAlfanumerico;
        private _cmpSenha: CampoSenha;
        private _frmLogin: FormHtml;

        private get btnEnter(): PainelAcao
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

                this._btnEntrar = new PainelAcao("btnEntrar");
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

        private validarDados(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(this.cmpLogin.tagInput.strValor))
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

        // #endregion Eventos
    }
}