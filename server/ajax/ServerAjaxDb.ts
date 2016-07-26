/// <reference path="ServerAjax.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerAjaxDb extends ServerAjax
    {
        // #region Constantes

        public static get STR_EXCEPTION_NULL(): string { return "O servidor de acesso ao banco de dados está nulo." };
        public static get STR_METODO_ABRIR_CADASTRO(): string { return "ABRIR_CADASTRO" };
        public static get STR_METODO_ABRIR_CADASTRO_FILTRO_CONTEUDO(): string { return "ABRIR_CADASTRO_FILTRO_CONTEUDO" };
        public static get STR_METODO_ABRIR_CONSULTA(): string { return "ABRIR_CONSULTA" };
        public static get STR_METODO_ABRIR_JANELA_TAG(): string { return "ABRIR_JANELA_TAG" };
        public static get STR_METODO_ADICIONAR(): string { return "ADICIONAR" };
        public static get STR_METODO_APAGAR(): string { return "APAGAR" };
        public static get STR_METODO_CARREGAR_TBL_WEB(): string { return "CARREGAR_TBL_WEB" };
        public static get STR_METODO_FILTRO(): string { return "FILTRO" };
        public static get STR_METODO_PESQUISAR_COMBO_BOX(): string { return "PESQUISAR_COMBO_BOX" };
        public static get STR_METODO_PESQUISAR_GRID(): string { return "PESQUISAR_GRID" };
        public static get STR_METODO_RECUPERAR(): string { return "RECUPERAR" };
        public static get STR_METODO_SALVAR(): string { return "SALVAR" };
        public static get STR_METODO_SALVAR_DOMINIO(): string { return "SALVAR_DOMINIO" };

        // #endregion Constantes

        // #region Atributos

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public enviar(objSolicitacaoAjax: SolicitacaoAjax): void
        {
            if (objSolicitacaoAjax == null)
            {
                return;
            }

            if (!objSolicitacaoAjax.validarDados())
            {
                return;
            }

            $.ajaxSettings.crossDomain = true;
            $.ajaxSettings.data = objSolicitacaoAjax.toJson();
            $.ajaxSettings.dataType = "json";
            $.ajaxSettings.method = "POST";
            $.ajaxSettings.url = this.url;
            $.ajaxSettings.xhrFields = { "withCredentials": true };

            //$.ajaxSettings.beforeSend = ((objJqXhr: JQueryXHR, cnf: JQueryAjaxSettings) => { objSolicitacaoAjax.ajaxAntesEnviar(); });
            $.ajaxSettings.error = ((objJqXhr: JQueryXHR, strTextStatus: string, strErrorThrown: string) => { objSolicitacaoAjax.ajaxErro(strTextStatus, strErrorThrown); });
            $.ajaxSettings.success = ((anyData: any, strTextStatus: string, objJqXhr: JQueryXHR) => { objSolicitacaoAjax.ajaxSucesso(anyData); });

            $.ajax($.ajaxSettings);
        }

        protected getIntPort(): number
        {
            return 8081;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}