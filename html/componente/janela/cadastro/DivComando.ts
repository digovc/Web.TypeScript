// #region Reference

/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../painel/PainelNivel.ts"/>
/// <reference path="JnlCadastro.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
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
        private _tblWeb: TabelaWeb;

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

        private get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(strId: string, frm: FormHtml)
        {
            super(strId);

            this.frm = frm;
        }

        // #endregion Construtor

        // #region Métodos

        private abrirJnlTag(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.abrirJnlTag();
        }

        private getTblWeb(): TabelaWeb
        {
            if (this.frm == null)
            {
                return null;
            }

            return this.frm.tblWeb;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnSalvar.iniciar();
            this.btnTag.iniciar();

            this.inicializarBtnTag();

            this.inicializarTblWeb();
        }

        private inicializarBtnTag(): void
        {
            if (this.frm == null)
            {
                return;
            }

            if (this.frm.jnlCadastro == null)
            {
                return;
            }

            if (this.frm.jnlCadastro.intRegistroId < 1)
            {
                return;
            }

            this.btnTag.animar();
        }

        private inicializarTblWeb(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.inicializarTblWebSomenteLeitura();
        }

        private inicializarTblWebSomenteLeitura(): void
        {
            if (this.frm == null)
            {
                return;
            }

            if (this.frm.jnlCadastro == null)
            {
                return;
            }

            if (this.frm.jnlCadastro.intRegistroId < 1)
            {
                return;
            }

            if (this.tblWeb.booPermitirAlterar)
            {
                return;
            }

            this.btnSalvar.booVisivel = false;
        }

        private salvar(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.btnTag.animar(); // TODO: Somente mostrar o botão de tag se o salvamento for bem sucedido.

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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}