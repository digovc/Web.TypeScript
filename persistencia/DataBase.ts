module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DataBase extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: DataBase;

        public static get i(): DataBase
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (DataBase._i != null)
                {
                    return DataBase._i;
                }

                DataBase._i = new DataBase();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return DataBase._i;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public salvar(tbl: Tabela): number
        {
            // #region Variáveis

            var objSolicitacao: SolicitacaoAjax;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (tbl == null)
                {
                    return;
                }

                objSolicitacao = new SolicitacaoAjax();

                objSolicitacao.enmMetodo = Solicitacao_EnmMetodo.SALVAR_REGISTRO;
                objSolicitacao.objJsonEnvio = tbl;

                Servidor.i.enviar(objSolicitacao);
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