/// <reference path="../../database/dominio/documentacao/EmailRegistroDominio.ts"/>
/// <reference path="SrvAjaxBase.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class SrvAjaxDocumentacao extends SrvAjaxBase
    {
        // #region Constantes

        private static get STR_METODO_EMAIL_DESINSCREVER(): string { return "STR_METODO_EMAIL_DESINSCREVER" };
        private static get STR_METODO_EMAIL_REGISTRAR(): string { return "STR_METODO_EMAIL_REGISTRAR" };

        public static get URL_MARKDOWN_FOLDER(): string { return "/url-md" };

        // #endregion Constantes

        // #region Atributos

        protected static _i: SrvAjaxDocumentacao;

        public static get i(): SrvAjaxDocumentacao
        {
            if (SrvAjaxDocumentacao._i != null)
            {
                return SrvAjaxDocumentacao._i;
            }

            SrvAjaxDocumentacao._i = new SrvAjaxDocumentacao("Servidor AJAX (Documentação)");

            return SrvAjaxDocumentacao._i;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public cancelarInscricao(objEmailRegistro: EmailRegistroDominio): void
        {
            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDocumentacao.STR_METODO_EMAIL_DESINSCREVER;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.cancelarInscricaoSucesso(objInterlocutor) });
            objInterlocutor.addJsn(objEmailRegistro);

            this.enviar(objInterlocutor);
        }

        private cancelarInscricaoSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objInterlocutor.objData.toString()))
            {
                return;
            }

            Mensagem.mostrar("Desinscrito", objInterlocutor.objData.toString(), Mensagem_EnmTipo.POSITIVA);

            window.setTimeout((() => window.close()), 500);
        }

        protected getIntPorta(): number
        {
            return ConstanteManager.i.getIntConstante(SrvAjaxDocumentacao.name + "_intPorta");
        }

        public registrarEmail(objEmailRegistro: EmailRegistroDominio): void
        {
            if (objEmailRegistro == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objEmailRegistro.strEmail))
            {
                return;
            }

            if (!Utils.validarEmail(objEmailRegistro.strEmail))
            {
                return;
            }

            if (Utils.getBooStrVazia(objEmailRegistro.dirDocumentacao))
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDocumentacao.STR_METODO_EMAIL_REGISTRAR;

            objInterlocutor.addJsn(objEmailRegistro);
            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.registrarEmailSucesso(objInterlocutor); });

            this.enviar(objInterlocutor);
        }

        private registrarEmailSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            Mensagem.mostrar("Inscrito", objInterlocutor.objData.toString());
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}