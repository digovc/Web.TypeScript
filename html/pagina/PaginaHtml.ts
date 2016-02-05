/// <reference path="../../Objeto.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PaginaHtml extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _tagBody: Tag;

        protected get tagBody(): Tag
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tagBody != null)
                {
                    return this._tagBody;
                }

                this._tagBody = this.getTagBody();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tagBody;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        protected getTagBody(): Tag
        {
            // #region Variáveis

            var tagBodyResultado: Tag;

            // #endregion Variáveis

            // #region Ações
            try
            {
                tagBodyResultado = new Tag(null);

                tagBodyResultado.strJqSelector = "body";

                return tagBodyResultado;
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

        protected inicializar(): void
        {
        }

        public iniciar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializar();
                this.montarLayout();
                this.setEventos();
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

        protected montarLayout(): void
        {
        }

        protected setEventos(): void
        {
        }

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}