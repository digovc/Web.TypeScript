/// <reference path="../../PaginaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PagCadastro extends PaginaHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: PagCadastro;

        public static get i(): PagCadastro
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (PagCadastro._i != null)
                {
                    return PagCadastro._i;
                }

                PagCadastro._i = new PagCadastro();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return PagCadastro._i;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }

    // #region Inicialização

    $(document).ready(() => { PagCadastro.i.iniciar(); });

    // #endregion Inicialização
}