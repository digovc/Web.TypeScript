/// <reference path="../../Div.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelAcao extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAcaoPrincipal: BotaoCircular;

        protected get btnAcaoPrincipal(): BotaoCircular
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnAcaoPrincipal != null)
                {
                    return this._btnAcaoPrincipal;
                }

                this._btnAcaoPrincipal = new BotaoCircular("btnAcaoPrincipal");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnAcaoPrincipal;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}