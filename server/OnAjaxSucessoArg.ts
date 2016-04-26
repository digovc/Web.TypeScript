/// <reference path="SolicitacaoAjaxDb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class OnAjaxSucessoArg
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _anyData: any;
        private _objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

        public get anyData(): any
        {
            return this._anyData;
        }

        public set anyData(anyData: any)
        {
            this._anyData = anyData;
        }

        public get objSolicitacaoAjaxDb(): SolicitacaoAjaxDb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._objSolicitacaoAjaxDb != null)
                {
                    return this._objSolicitacaoAjaxDb;
                }

                this._objSolicitacaoAjaxDb = this.getObjSolicitacaoAjaxDb();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._objSolicitacaoAjaxDb;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private getObjSolicitacaoAjaxDb(): SolicitacaoAjaxDb
        {
            // #region Variáveis

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.anyData == null)
                {
                    return null;
                }

                objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

                objSolicitacaoAjaxDb.copiarDados(this.anyData);

                return objSolicitacaoAjaxDb;
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