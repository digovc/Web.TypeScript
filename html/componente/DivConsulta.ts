/// <reference path="../Div.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivConsulta extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: DivConsulta;

        public static get i(): DivConsulta
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (DivConsulta._i != null)
                {
                    return DivConsulta._i;
                }

                DivConsulta._i = new DivConsulta("divConsulta");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return DivConsulta._i;
        }

        private _tagObject: Tag;

        private get tagObject(): Tag
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tagObject != null)
                {
                    return this._tagObject;
                }

                this._tagObject = new Tag("divConsulta_tagObject");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tagObject;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            var url: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(tblWeb.strNome))
                {
                    return;
                }

                url = "/consulta?tbl=_tbl_web_nome";

                url = url.replace("_tbl_web_nome", tblWeb.strNome);

                this.tagObject.jq.attr("data", url);

                //window.history.pushState("object or string", strTblNome, ("/consulta-" + strTblNome));
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