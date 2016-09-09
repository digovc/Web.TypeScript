/// <reference path="ComponenteHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum Mensagem_EnmTipo
    {
        NEGATIVA,
        PERGUNTA,
        POSITIVA,
    }

    // #endregion Enumerados

    export class Mensagem extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnCancelar: BotaoCircular;
        private _btnConfirmar: BotaoCircular;
        private _divContainerFaixa: Div;
        private _enmTipo: Mensagem_EnmTipo = Mensagem_EnmTipo.POSITIVA;
        private _fncOnConfirmar: Function;
        private _strMensagem: string;
        private _strTitulo: string;

        private get btnCancelar(): BotaoCircular
        {
            if (this._btnCancelar != null)
            {
                return this._btnCancelar;
            }

            this._btnCancelar = new BotaoCircular(this.strId + "_btnCancelar");

            return this._btnCancelar;
        }

        private get btnConfirmar(): BotaoCircular
        {
            if (this._btnConfirmar != null)
            {
                return this._btnConfirmar;
            }

            this._btnConfirmar = new BotaoCircular(this.strId + "_btnConfirmar");

            return this._btnConfirmar;
        }

        private get divContainerFaixa(): Div
        {
            if (this._divContainerFaixa != null)
            {
                return this._divContainerFaixa;
            }

            this._divContainerFaixa = new Div(this.strId + "_divContainerFaixa");

            return this._divContainerFaixa;
        }

        private get enmTipo(): Mensagem_EnmTipo
        {
            return this._enmTipo;
        }

        private set enmTipo(enmTipo: Mensagem_EnmTipo)
        {
            this._enmTipo = enmTipo;
        }

        public get fncOnConfirmar(): Function
        {
            return this._fncOnConfirmar;
        }

        public set fncOnConfirmar(fncOnConfirmar: Function)
        {
            this._fncOnConfirmar = fncOnConfirmar;
        }

        private get strMensagem(): string
        {
            return this._strMensagem;
        }

        private set strMensagem(strMensagem: string)
        {
            this._strMensagem = strMensagem;
        }

        private get strTitulo(): string
        {
            return this._strTitulo;
        }

        private set strTitulo(strTitulo: string)
        {
            this._strTitulo = strTitulo;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strTitulo: string, strMensagem: string, enmTipo: Mensagem_EnmTipo = Mensagem_EnmTipo.POSITIVA)
        {
            super(null);

            this.enmTipo = enmTipo;
            this.strId = ("tagMensagem_" + this.intObjetoId);
            this.strMensagem = strMensagem;
            this.strTitulo = strTitulo;
        }

        // #endregion Construtores

        // #region Métodos

        public static mostrar(strTitulo: string, strMensagem: string, enmTipo: Mensagem_EnmTipo = Mensagem_EnmTipo.POSITIVA): void
        {
            if (Utils.getBooStrVazia(strTitulo))
            {
                return;
            }

            if (Utils.getBooStrVazia(strMensagem))
            {
                return;
            }

            new Mensagem(strTitulo, strMensagem, enmTipo).abrirMensagem();
        }

        private abrirMensagem(): void
        {
            if (Utils.getBooStrVazia(this.strTitulo))
            {
                return;
            }

            if (Utils.getBooStrVazia(this.strMensagem))
            {
                return;
            }

            if (Utils.getBooStrVazia(this.strLayoutFixo))
            {
                return;
            }

            $(document.body).append(this.strLayoutFixo);

            this.iniciar();
            this.mostrar();

            AppWeb.i.abrirTagFocoExclusivo(this);
        }

        private btnCancelarOnClick(): void
        {
            this.dispose();
        }

        private btnConfirmarOnClick(): void
        {
            this.dispose();

            this.btnConfirmarFncOnConfirmar();
        }

        private btnConfirmarFncOnConfirmar(): void
        {
            if (this.fncOnConfirmar == null)
            {
                return;
            }

            this.fncOnConfirmar();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarEnmTipo();
        }

        private inicializarEnmTipo(): void
        {
            switch (this.enmTipo)
            {
                case Mensagem_EnmTipo.NEGATIVA:
                    this.inicializarEnmTipoNegativa();
                    return;

                case Mensagem_EnmTipo.PERGUNTA:
                    this.inicializarEnmTipoPergunta();
                    return;
            }
        }

        private inicializarEnmTipoNegativa(): void
        {
            this.divContainerFaixa.jq.css("background-color", "rgb(161,65,58)");
        }

        private inicializarEnmTipoPergunta(): void
        {
            this.divContainerFaixa.jq.css("background-color", "#ca8116");

            this.btnCancelar.booVisivel = true;
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return strLayoutFixo;
            }

            strLayoutFixo = strLayoutFixo.replace("_str_id", this.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_msg_mensagem", this.strMensagem);
            strLayoutFixo = strLayoutFixo.replace("_str_msg_titulo", this.strTitulo);
            strLayoutFixo = strLayoutFixo.replace("_btn_cancelar_str_id", this.btnCancelar.strId);
            strLayoutFixo = strLayoutFixo.replace("_btn_confirmar_str_id", this.btnConfirmar.strId);
            strLayoutFixo = strLayoutFixo.replace("_div_container_faixa_str_id", this.divContainerFaixa.strId);

            return strLayoutFixo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnConfirmar.addEvtOnClickListener(this);
            this.btnCancelar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.btnCancelar:
                        this.btnCancelarOnClick();
                        return;

                    case this.btnConfirmar:
                        this.btnConfirmarOnClick();
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