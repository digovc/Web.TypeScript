/// <reference path="../../OnCloseListener.ts"/>
/// <reference path="../../server/ServerHttp.ts"/>
/// <reference path="../componente/janela/consulta/JnlConsulta.ts"/>
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

        private _divConsulta: Div;
        private _jnlConsulta: JnlConsulta;

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

                ServerHttp.i.importarHtml(urlConsulta, this.divConsulta, () => { this.inicializarConsulta() });
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

        private inicializarConsulta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divConsulta.mostrar();

                this.jnlConsulta = new JnlConsulta();

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