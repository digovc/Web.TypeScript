/// <reference path="../../OnCloseListener.ts"/>
/// <reference path="../../persistencia/TabelaWeb.ts"/>
/// <reference path="../../server/ServerHttp.ts"/>
/// <reference path="../componente/janela/cadastro/JnlCadastro.ts"/>
/// <reference path="../componente/janela/consulta/JnlConsulta.ts"/>
/// <reference path="../Div.ts"/>
/// <reference path="PaginaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagPrincipal extends PaginaHtml implements OnCloseListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divCadastro: Div;
        private _divConsulta: Div;
        private _jnlCadastro: JnlCadastro;
        private _jnlConsulta: JnlConsulta;

        private get divCadastro(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divCadastro != null)
                {
                    return this._divCadastro;
                }

                this._divCadastro = new Div("divCadastro");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divCadastro;
        }

        private get divConsulta(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divConsulta != null)
                {
                    return this._divConsulta;
                }

                this._divConsulta = new Div("divConsulta");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divConsulta;
        }

        public get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        public set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
        }

        private get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        private set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirCadastro(tblWeb: TabelaWeb, intId: number): void
        {
            // #region Variáveis

            var urlConsulta: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.esconder();

                if (tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(tblWeb.strNome))
                {
                    return;
                }

                urlConsulta = "/cadastro?tbl_web=_tbl_web_nome&int_id=_registro_id";

                urlConsulta = urlConsulta.replace("_tbl_web_nome", tblWeb.strNome);
                urlConsulta = urlConsulta.replace("_registro_id", intId.toString());

                ServerHttp.i.carregarHtml(urlConsulta, this.divCadastro, () => { this.inicializarCadastro() });
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

        public abrirFiltroCadastro(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            var urlConsulta: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.esconder();

                if (tblWeb == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(tblWeb.strNome))
                {
                    return;
                }

                urlConsulta = "/cadastro?tblWeb=tbl_filtro";

                ServerHttp.i.carregarHtml(urlConsulta, this.divCadastro, () => { this.inicializarFiltroCadastro(tblWeb) });
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

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            var urlConsulta: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divConsulta.esconder();

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

                ServerHttp.i.carregarHtml(urlConsulta, this.divConsulta, () => { this.inicializarConsulta() });
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

        private carregarJsCadastro(): void
        {
            // #region Variáveis

            var srcJqCadastro: string;
            var tagScriptCadastro: HTMLScriptElement;

            // #endregion Variáveis

            // #region Ações
            try
            {
                srcJqCadastro = this.divCadastro.jq.children().attr("js_src");

                if (Utils.getBooStrVazia(srcJqCadastro))
                {
                    return;
                }

                tagScriptCadastro = document.createElement("script");

                tagScriptCadastro.src = srcJqCadastro;
                tagScriptCadastro.type = "text/javascript";

                document.head.appendChild(tagScriptCadastro);
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

        private fecharCadastro(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.esconder();
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

        private fecharConsulta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divConsulta.esconder();
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

        private inicializarCadastro(): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.mostrar();
                this.carregarJsCadastro();
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

        private inicializarConsulta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divConsulta.mostrar();

                this.jnlConsulta = new JnlConsulta(this);

                this.jnlConsulta.addEvtOnCloseListener(this);

                this.jnlConsulta.iniciar();
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

        private inicializarFiltroCadastro(tblWeb: TabelaWeb): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divCadastro.mostrar();
                this.carregarJsCadastro();
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

        public onClose(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.jnlCadastro:
                        this.fecharCadastro();
                        return

                    case this.jnlConsulta:
                        this.fecharConsulta();
                        return
                }
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