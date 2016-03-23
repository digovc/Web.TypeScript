/// <reference path="../../painel/PainelHtml.ts"/>
/// <reference path="FrmFiltro.ts"/>
/// <reference path="JnlConsulta.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelFiltro extends PainelHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _frmFiltro: FrmFiltro;
        private _jnlConsulta: JnlConsulta;
        private _pnlCondicao: PainelHtml;

        private get frmFiltro(): FrmFiltro
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._frmFiltro != null)
                {
                    return this._frmFiltro;
                }

                this._frmFiltro = new FrmFiltro(this);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._frmFiltro;
        }

        public get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        public set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        private get pnlCondicao(): PainelHtml
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._pnlCondicao != null)
                {
                    return this._pnlCondicao;
                }

                this._pnlCondicao = new PainelHtml(this.strId + "_pnlCondicao");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._pnlCondicao;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(jnlConsulta: JnlConsulta)
        {
            super("pnlFiltro");

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jnlConsulta = jnlConsulta;
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

        // #endregion Construtores

        // #region Métodos

        public iniciar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.frmFiltro.iniciar();
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