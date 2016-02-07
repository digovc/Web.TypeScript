/// <reference path="../html/Tag.ts"/>
/// <reference path="ServerBase.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ServerHttp extends ServerBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        protected static _i: ServerHttp;

        public static get i(): ServerHttp
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (ServerHttp._i != null)
                {
                    return ServerHttp._i;
                }

                ServerHttp._i = new ServerHttp();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return ServerHttp._i;
        }

        private _booResConsultaCarregado: boolean;

        private get booResConsultaCarregado(): boolean
        {
            return this._booResConsultaCarregado;
        }

        private set booResConsultaCarregado(booResConsultaCarregado: boolean)
        {
            this._booResConsultaCarregado = booResConsultaCarregado;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public atualizarCssMain(): void
        {
            // #region Variáveis

            var tagLink: HTMLLinkElement;

            // #endregion Variáveis

            // #region Ações
            try
            {
                tagLink = <HTMLLinkElement>document.getElementById("cssMain");

                if (tagLink == null)
                {
                    return;
                }

                if (tagLink.href.indexOf("?x") == -1)
                {
                    tagLink.href = tagLink.href + "?x";
                }
                else
                {
                    tagLink.href = tagLink.href + "x";
                }
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

        public carregarHtml(urlImport: string, tabContainer: Tag, fncComplete: any): void
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

                if (tabContainer == null)
                {
                    return;
                }

                if (tabContainer.jq == null)
                {
                    return;
                }

                tabContainer.jq.load(urlImport, null, () => this.carregarHtmlComplete(fncComplete));
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

        private carregarHtmlComplete(fncComplete: Function): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.atualizarCssMain();

                if (fncComplete != null)
                {
                    fncComplete();
                }
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

        public carregarJq(strJqClass: string): void
        {
            // #region Variáveis

            var urlJq: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(strJqClass))
                {
                    return;
                }

                urlJq = "/res?method=getScript&class=_js_class";

                urlJq = urlJq.replace("_js_class", strJqClass);

                $.getScript(urlJq);
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