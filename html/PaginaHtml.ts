/// <reference path="pagina/consulta/PagConsulta.ts"/>
/// <reference path="../Objeto.ts"/>
/// <reference path="Div.ts"/>

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

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            var urlConsulta: string;

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

                urlConsulta = "/consulta?tblWeb=_tbl_web_nome";

                urlConsulta = urlConsulta.replace("_tbl_web_nome", tblWeb.strNome);

                this.importarPagina(urlConsulta, this.getDivConsulta());
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

        /**
         * Este método deve ser implementado e retornar a div que conterá as telas de consulta.
         */
        protected getDivConsulta(): Div
        {
            return null;
        }

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

        private importarPagina(urlImport: string, divContainer: Div): void
        {
            // #region Variáveis

            var tagLink: HTMLLinkElement;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(urlImport))
                {
                    return;
                }

                if (divContainer == null)
                {
                    return;
                }

                tagLink = document.createElement("link");

                tagLink.rel = "import";
                tagLink.href = urlImport;
                tagLink.onload = (arg) => { this.importarPagina_onLoad(tagLink, urlImport, divContainer); };
                tagLink.onerror = (arg) => { this.importarPagina_onError(arg); };

                tagLink.setAttribute("defer", "");
                //tagLink.setAttribute("async", "");

                document.head.appendChild(tagLink);
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

        private importarPagina_onError(arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        private importarPagina_onLoad(tagLink: any, urlImport: string, divContainer: Div): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (tagLink == null)
                {
                    return;
                }

                if (divContainer == null)
                {
                    return;
                }

                divContainer.jq.html(tagLink.import.documentElement);
                divContainer.mostrar();

                PagConsulta.i.iniciar();

                //AppWeb.i.dispararEvtOnPaginaImportadaListener(urlImport);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}