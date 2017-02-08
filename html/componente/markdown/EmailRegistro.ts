/// <reference path="../../../database/dominio/documentacao/EmailRegistroDominio.ts"/>
/// <reference path="../../../server/ajax/SrvAjaxDocumentacao.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class EmailRegistro extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnRegistrar: BotaoHtml;
        private _divSumario: Sumario;
        private _divTitulo: Div;
        private _txtEmail: Input;

        private get btnRegistrar(): BotaoHtml
        {
            if (this._btnRegistrar != null)
            {
                return this._btnRegistrar;
            }

            this._btnRegistrar = new BotaoHtml(this.strId + "_btnRegistrar");

            return this._btnRegistrar;
        }

        private get divSumario(): Sumario
        {
            return this._divSumario;
        }

        private set divSumario(divSumario: Sumario)
        {
            this._divSumario = divSumario;
        }

        private get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        private get txtEmail(): Input
        {
            if (this._txtEmail != null)
            {
                return this._txtEmail;
            }

            this._txtEmail = new Input(this.strId + "_txtEmail");

            return this._txtEmail;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(divSumario: Sumario)
        {
            super(EmailRegistro.name);

            this.divSumario = divSumario;
        }

        // #endregion Construtores

        // #region Métodos

        protected inicializar(): void
        {
            super.inicializar();

            this.txtEmail.iniciar();
        }

        private registrarEmail(): void
        {
            if (Utils.getBooStrVazia(this.txtEmail.strValor))
            {
                return;
            }

            if (!Utils.validarEmail(this.txtEmail.strValor))
            {
                return;
            }

            var objEmailRegistro = new EmailRegistroDominio();

            objEmailRegistro.dirDocumentacao = this.divSumario.dirDocumentacao;
            objEmailRegistro.strDocumentacaoTitulo = this.divSumario.pagDoc.divActionBar.divTitulo.strConteudo;
            objEmailRegistro.strEmail = this.txtEmail.strValor;
            objEmailRegistro.urlDocumentacao = location.href.substring(0, location.href.indexOf(SrvAjaxDocumentacao.URL_MARKDOWN_FOLDER));

            SrvAjaxDocumentacao.i.registrarEmail(objEmailRegistro);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnRegistrar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnRegistrar:
                        this.registrarEmail();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}