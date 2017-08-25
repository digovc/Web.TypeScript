/// <reference path="JnlMensagem.ts"/>

module Web
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
            if (this._btnEntrar != null)
            {
                return this._btnEntrar;
            }

            this._btnEntrar = new PainelAcao("btnEntrar");

            return this._btnEntrar;
        }

        private get cmpLogin(): CampoAlfanumerico
        {
            if (this._cmpLogin != null)
            {
                return this._cmpLogin;
            }

            this._cmpLogin = new CampoAlfanumerico("cmpLogin");

            return this._cmpLogin;
        }

        private get cmpSenha(): CampoSenha
        {
            if (this._cmpSenha != null)
            {
                return this._cmpSenha;
            }

            this._cmpSenha = new CampoSenha("cmpSenha");

            return this._cmpSenha;
        }

        private get frmLogin(): FormHtml
        {
            if (this._frmLogin != null)
            {
                return this._frmLogin;
            }

            this._frmLogin = new FormHtml("frmLogin");

            return this._frmLogin;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private validarDados(): void
        {
            if (Utils.getBooStrVazia(this.cmpLogin.tagInput.strValor))
            {
            }
        }

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}