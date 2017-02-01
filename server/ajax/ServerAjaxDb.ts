/// <reference path="ServerAjax.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerAjaxDb extends ServerAjax
    {
        // #region Constantes

        public static get INT_CODIGO_RETORNO_SUCESSO(): number { return 0 };

        public static get STR_EXCEPTION_NULL(): string { return "O servidor de acesso ao banco de dados está nulo." };
        public static get STR_METODO_ABRIR_CADASTRO(): string { return "ABRIR_CADASTRO" };
        public static get STR_METODO_ABRIR_CADASTRO_FILTRO_CONTEUDO(): string { return "ABRIR_CADASTRO_FILTRO_CONTEUDO" };
        public static get STR_METODO_ABRIR_CONSULTA(): string { return "ABRIR_CONSULTA" };
        public static get STR_METODO_ADICIONAR(): string { return "ADICIONAR" };
        public static get STR_METODO_APAGAR(): string { return "APAGAR" };
        public static get STR_METODO_CARREGAR_TBL_WEB(): string { return "CARREGAR_TBL_WEB" };
        public static get STR_METODO_FILTRO(): string { return "FILTRO" };
        public static get STR_METODO_PESQUISAR_COMBO_BOX(): string { return "PESQUISAR_COMBO_BOX" };
        public static get STR_METODO_PESQUISAR_GRID(): string { return "PESQUISAR_GRID" };
        public static get STR_METODO_RECUPERAR(): string { return "RECUPERAR" };
        public static get STR_METODO_SALVAR(): string { return "SALVAR" };
        public static get STR_METODO_SALVAR_DOMINIO(): string { return "SALVAR_DOMINIO" };
        public static get STR_METODO_TABELA_FAVORITO_ADD(): string { return "TABELA_FAVORITO_ADD" };
        public static get STR_METODO_TABELA_FAVORITO_PESQUISAR(): string { return "TABELA_FAVORITO_PESQUISAR" };
        public static get STR_METODO_TABELA_FAVORITO_VERIFICAR(): string { return "TABELA_FAVORITO_VERIFICAR" };
        public static get STR_METODO_TAG_ABRIR_JANELA(): string { return "TAG_ABRIR_JANELA" };
        public static get STR_METODO_TAG_SALVAR(): string { return "TAG_SALVAR" };

        // #endregion Constantes

        // #region Atributos

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected getIntPorta(): number
        {
            return 8081;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}