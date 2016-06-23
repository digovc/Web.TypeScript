/// <reference path="SolicitacaoAjax.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum SolicitacaoAjaxDb_EnmMetodo
    {
        ABRIR_CADASTRO,
        ABRIR_CADASTRO_FILTRO_CONTEUDO,
        ABRIR_CONSULTA,
        ADICIONAR,
        APAGAR,
        FILTRO,
        JSON_TABELA_WEB,
        NONE,
        PESQUISAR_COMBO_BOX,
        PESQUISAR_GRID,
        RECUPERAR,
        SALVAR,
    }

    // #endregion Enumerados

    export class SolicitacaoAjaxDb extends SolicitacaoAjax
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _enmMetodo: SolicitacaoAjaxDb_EnmMetodo = SolicitacaoAjaxDb_EnmMetodo.NONE;

        public get enmMetodo(): SolicitacaoAjaxDb_EnmMetodo
        {
            return this._enmMetodo;
        }

        public set enmMetodo(enmMetodo: SolicitacaoAjaxDb_EnmMetodo)
        {
            this._enmMetodo = enmMetodo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public validarDados(): boolean
        {
            if (!super.validarDados())
            {
                return false;
            }

            if (SolicitacaoAjaxDb_EnmMetodo.NONE == this.enmMetodo)
            {
                return false;
            }

            if (Utils.getBooStrVazia(this.strData))
            {
                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}