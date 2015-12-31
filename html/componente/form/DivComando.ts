/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../botao/comando/BotaoSalvarComando.ts"/>
/// <reference path="../painel/PainelNivel.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    import BotaoSalvarComando = NetZ_Web_TypeScript.BotaoSalvarComando;
    import PainelNivel = NetZ_Web_TypeScript.PainelNivel;

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivComando extends PainelNivel implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnSalvar: BotaoSalvarComando;
        private _jnlCadastro: JnlCadastro;

        private get btnSalvar(): BotaoSalvarComando
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._btnSalvar != null)
                {
                    return this._btnSalvar;
                }

                this._btnSalvar = new BotaoSalvarComando("btnSalvar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._btnSalvar;
        }

        private get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        private set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, jnlCadastro: JnlCadastro)
        {
            super(strId);

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jnlCadastro = jnlCadastro;
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

        private salvar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jnlCadastro == null)
                {
                    return;
                }

                this.jnlCadastro.salvar();
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

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.btnSalvar.addEvtOnClickListener(this);
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

        public onClick(objSender: Object, e: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.btnSalvar:
                        return this.salvar();
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