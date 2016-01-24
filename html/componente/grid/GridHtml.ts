/// <reference path="../../../persistencia/TabelaWeb.ts"/>
/// <reference path="../../../Utils.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class GridHtml extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _tagTable: Tag;
        private _tblWeb: TabelaWeb;

        private get tagTable(): Tag
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tagTable != null)
                {
                    return this._tagTable;
                }

                this._tagTable = new Tag(this.strId + "_table");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tagTable;
        }

        private get tblWeb(): TabelaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tblWeb != null)
                {
                    return this._tblWeb;
                }

                this._tblWeb = this.getTblWeb();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        private getTblWeb(): TabelaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return null;
                }

                if (Utils.getBooStrVazia(this.jq.attr("tblWebNome")))
                {
                    return null;
                }

                return new TabelaWeb(this.jq.attr("tblWebNome"));
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializarCabecalhoFixo();
                window.alert("Grid inicializado.");
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

        private inicializarCabecalhoFixo(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tagTable.jq == null)
                {
                    return;
                }

                //this.tagTable.jq.floatThead({
                //    scrollContainer: function ()
                //    {
                //        return this.tagTable.jq.closest('#divGrid');
                //    }
                //});
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