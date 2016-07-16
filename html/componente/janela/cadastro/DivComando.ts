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
        private _btnTag: BotaoCircular;
        private _frm: FormHtml;

        private get btnSalvar(): BotaoCircular
        {
            if (this._btnSalvar != null)
            {
                return this._btnSalvar;
            }

            this._btnSalvar = new BotaoCircular(this.strId + "_btnSalvar");

            return this._btnSalvar;
        }

        private get btnTag(): BotaoCircular
        {
            if (this._btnTag != null)
            {
                return this._btnTag;
            }

            this._btnTag = new BotaoCircular(this.strId + "_btnTag");

            return this._btnTag;
        }

        private get frm(): FormHtml
        {
            return this._frm;
        }

        private set frm(frm: FormHtml)
        {
            this._frm = frm;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, frm: FormHtml)
        {
            super(strId);

            this.frm = frm;
        }

        // #endregion Construtores

        // #region Métodos

        private abrirJnlTag(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.abrirJnlTag();
        }

        private salvar(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.salvar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnSalvar.addEvtOnClickListener(this);
            this.btnTag.addEvtOnClickListener(this);
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

                    case this.btnTag:
                        return this.abrirJnlTag();
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