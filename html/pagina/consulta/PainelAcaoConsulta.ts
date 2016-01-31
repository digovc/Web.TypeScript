/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../componente/botao/mini/BotaoAdicionarMini.ts"/>
/// <reference path="../../componente/botao/mini/BotaoAlterarMini.ts"/>
/// <reference path="../../componente/painel/PainelAcao.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelAcaoConsulta extends PainelAcao implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAdicionar: BotaoAdicionarMini;
        private _btnAlterar: BotaoAlterarMini;

        private get btnAdicionar(): BotaoAdicionarMini
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnAdicionar != null)
                {
                    return this._btnAdicionar;
                }

                this._btnAdicionar = new BotaoAdicionarMini("btnAdicionar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnAdicionar;
        }

        private get btnAlterar(): BotaoAlterarMini
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnAlterar != null)
                {
                    return this._btnAlterar;
                }

                this._btnAlterar = new BotaoAlterarMini("btnAlterar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnAlterar;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.btnAcaoPrincipal.addEvtOnClickListener(this);
                this.btnAdicionar.addEvtOnClickListener(this);
                this.btnAlterar.addEvtOnClickListener(this);
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

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.btnAcaoPrincipal:
                        PagConsulta.i.pesquisar();
                        return;

                    case this.btnAdicionar:
                        PagConsulta.i.adicionar();
                        return;
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