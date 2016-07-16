/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../painel/PainelNivel.ts"/>
/// <reference path="JnlCadastro.ts"/>

module NetZ_Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivComando extends PainelNivel implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnSalvar: BotaoCircular;
        private _jnlCadastro: JnlCadastro;

        private get btnSalvar(): BotaoCircular
        {
            if (this._btnSalvar != null)
            {
                return this._btnSalvar;
            }

            this._btnSalvar = new BotaoCircular(this.strId + "_btnSalvar");

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

            this.jnlCadastro = jnlCadastro;
        }

        // #endregion Construtores

        // #region Métodos

        private salvar(): void
        {
            if (this.jnlCadastro == null)
            {
                return;
            }

            this.jnlCadastro.salvar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnSalvar.addEvtOnClickListener(this);
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