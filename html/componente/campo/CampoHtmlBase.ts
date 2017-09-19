/// <reference path="../../../database/ColunaWeb.ts"/>
/// <reference path="../../../erro/Erro.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../../Div.ts"/>
/// <reference path="../../Input.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class CampoHtmlBase extends ComponenteHtmlBase implements OnFocusInListener, OnFocusOutListener, OnValorAlteradoListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _booEmFoco: boolean;
        private _booObrigatorio: boolean;
        private _booPermitirAlterar: boolean;
        private _booSomenteLeitura: boolean;
        private _booTituloFixo: boolean;
        private _booTituloInvisivel: boolean;
        private _btnAcao: BotaoHtml;
        private _clnWeb: ColunaWeb;
        private _divContainer: Div;
        private _divTitulo: Div;
        private _frm: FormHtml;
        private _intRegistroId: number;
        private _strCritica: string;
        private _strDica: string;
        private _strTitulo: string;
        private _tagInput: Input;

        protected get booEmFoco(): boolean
        {
            return this._booEmFoco;
        }

        protected set booEmFoco(booSEmFoco: boolean)
        {
            if (this._booEmFoco == booSEmFoco)
            {
                return;
            }

            this._booEmFoco = booSEmFoco;

            this.setBooEmFoco(this._booEmFoco);
        }

        private get booPermitirAlterar(): boolean
        {
            this._booPermitirAlterar = (this.getStrAttValor("permitir_alterar") != "false");

            return this._booPermitirAlterar;
        }

        private set booPermitirAlterar(booPermitirAlterar: boolean)
        {
            this._booPermitirAlterar = booPermitirAlterar;

            this.setBooPermitirAlterar(this._booPermitirAlterar);
        }

        private get booObrigatorio(): boolean
        {
            if (this._booObrigatorio != null)
            {
                return this._booObrigatorio;
            }

            this._booObrigatorio = this.getBooObrigatorio();

            return this._booObrigatorio;
        }

        private set booObrigatorio(booObrigatorio: boolean)
        {
            if (this._booObrigatorio == booObrigatorio)
            {
                return;
            }

            this._booObrigatorio = booObrigatorio;

            this.setBooObrigatorio(this._booObrigatorio);
        }

        private get booSomenteLeitura(): boolean
        {
            return this._booSomenteLeitura;
        }

        private set booSomenteLeitura(booSomenteLeitura: boolean)
        {
            this._booSomenteLeitura = booSomenteLeitura;
        }

        private get booTituloFixo(): boolean
        {
            if (this._booTituloFixo != null)
            {
                return this._booTituloFixo;
            }

            this._booTituloFixo = (!Utils.getBooStrVazia(this.jq.attr("titulo-fixo")));

            return this._booTituloFixo;
        }

        public get booTituloInvisivel(): boolean
        {
            return this._booTituloInvisivel;
        }

        public set booTituloInvisivel(booTituloInvisivel: boolean)
        {
            this._booTituloInvisivel = booTituloInvisivel;
        }

        public get btnAcao(): BotaoHtml
        {
            if (this._btnAcao != null)
            {
                return this._btnAcao;
            }

            this._btnAcao = new BotaoHtml(this.strId + "_btnAcao");

            return this._btnAcao;
        }

        protected get divContainer(): Div
        {
            if (this._divContainer != null)
            {
                return this._divContainer;
            }

            this._divContainer = new Div(this.strId + "_divContainer");

            return this._divContainer;
        }

        public get clnWeb(): ColunaWeb
        {
            if (this._clnWeb != null)
            {
                return this._clnWeb;
            }

            this._clnWeb = this.getClnWeb();

            return this._clnWeb;
        }

        protected get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        public get frm(): FormHtml
        {
            return this._frm;
        }

        public set frm(frm: FormHtml)
        {
            this._frm = frm;
        }

        protected get intRegistroId(): number
        {
            this._intRegistroId = this.getIntRegistroId();

            return this._intRegistroId;
        }

        public get strCritica(): string
        {
            return this._strCritica;
        }

        public set strCritica(strCritica: string)
        {
            if (this._strCritica == strCritica)
            {
                return;
            }

            this._strCritica = strCritica;

            this.setStrCritica(this._strCritica);
        }

        public get strDica(): string
        {
            if (this._strDica != null)
            {
                return this._strDica;
            }

            this._strDica = this.getStrAttValor("str_dica");

            return this._strDica;
        }

        public set strDica(strDica: string)
        {
            this._strDica = strDica;
        }

        public get strTitulo(): string
        {
            this._strTitulo = this.divTitulo.strConteudo;

            return this._strTitulo;
        }

        public set strTitulo(strTitulo: string)
        {
            if (this._strTitulo == strTitulo)
            {
                return;
            }

            this._strTitulo = strTitulo;

            this.setStrTitulo(this._strTitulo);
        }

        public get tagInput(): Input
        {
            if (this._tagInput != null)
            {
                return this._tagInput;
            }

            this._tagInput = this.getTagInput();

            return this._tagInput;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected atualizarStrValor(): void
        {
            if (!this.booPermitirAlterar)
            {
                Notificacao.notificar("O campo \"_campo_nome\" não pode ser alterado.".replace("_campo_nome", this.divTitulo.strConteudo), Notificacao_EnmTipo.NEGATIVA);
                this.tagInput.reverterValor();
                return;
            }

            this.atualizarStrValorCln();
            this.atualizarStrValorDivTitulo();

            this.strCritica = null;
        }

        private atualizarStrValorCln(): void
        {
            if (this.clnWeb == null)
            {
                return;
            }

            if (this.clnWeb.strValor == this.tagInput.strValor)
            {
                return;
            }

            this.clnWeb.strValor = this.tagInput.strValor;
        }

        private atualizarStrValorDivTitulo(): void
        {
            this.mostrarEsconderDivTitulo(!this.tagInput.booVazio);
        }

        private getBooObrigatorio(): boolean
        {
            return (!Utils.getBooStrVazia(this.getStrAttValor("required")));
        }

        private getClnWeb(): ColunaWeb
        {
            if (Web["ColunaWeb"] == null)
            {
                return;
            }

            var clnWebResultado = new ColunaWeb(this.jq.attr("coluna-nome"));

            if (this.jq == null)
            {
                return clnWebResultado;
            }

            if (this.frm == null)
            {
                return clnWebResultado;
            }

            if (this.frm.jnlCadastro == null)
            {
                return clnWebResultado;
            }

            if (this.frm.jnlCadastro.tblWeb == null)
            {
                return clnWebResultado;
            }

            return this.frm.jnlCadastro.tblWeb.getCln(this.jq.attr("coluna-nome"));
        }

        private getIntRegistroId(): number
        {
            if (this.frm == null)
            {
                return 0;
            }

            if (this.frm.jnlCadastro == null)
            {
                return 0;
            }

            return this.frm.jnlCadastro.intRegistroId;
        }

        protected getTagInput(): Input
        {
            return new Input(this.strId + "_tagInput");
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnAcao.iniciar();

            this.tagInput.iniciar();

            this.atualizarStrValor();

            this.inicializarMostrarTituloSempre();

            this.inicializarBooObrigatorio();
        }

        protected inicializarBooObrigatorio(): void
        {
            if (this.intRegistroId > 0)
            {
                return;
            }

            if (!this.booObrigatorio)
            {
                return;
            }

            this.strCritica = "O preenchimento deste campo é obrigatório.";
        }

        private inicializarMostrarTituloSempre(): void
        {
            if (!this.booTituloFixo)
            {
                return;
            }

            this.strPlaceholder = null;

            this.mostrarEsconderDivTitulo(true);
        }

        protected mostrarEsconderDivTitulo(booMostrar: boolean): void
        {
            if (booMostrar && !this.booTituloInvisivel)
            {
                this.divTitulo.jq.animate({ opacity: 1 }, 200, "swing");
                return;
            }

            if (!this.booTituloFixo)
            {
                this.divTitulo.jq.animate({ opacity: 0 }, 200, "swing");
            }
        }

        public receberFoco(): void
        {
            //super.receberFoco();

            if (this.tagInput == null)
            {
                return;
            }

            if (this.tagInput.jq == null)
            {
                return;
            }

            this.tagInput.jq.focus();

            this.receberFocoFrm();
        }

        private receberFocoFrm(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.cmpEmFoco = this;
        }

        protected setBooEmFoco(booEmFoco: boolean): void
        {
            this.divTitulo.jq.css("font-weight", (booEmFoco ? "bold" : Utils.STR_VAZIA));

            if (!Utils.getBooStrVazia(this.strCritica))
            {
                // TODO: Mudar a aparência quando houver crítica no campo.
            }

            this.setBooEmFocoFrm(booEmFoco);
        }

        private setBooEmFocoFrm(booEmFoco: boolean): void
        {
            if (!booEmFoco)
            {
                return;
            }

            if (this.frm == null)
            {
                return;
            }

            this.frm.cmpEmFoco = this;
        }

        private setBooObrigatorio(booObrigatorio: boolean): void
        {
            if (this.jq == null)
            {
                return;
            }

            if (booObrigatorio)
            {
                this.jq.attr("required", "true");
                return;
            }

            this.jq.removeAttr("required");
        }

        private setBooPermitirAlterar(booPermitirAlterar: boolean): void
        {
            this.jq.attr("permitir_alterar", String(booPermitirAlterar));
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.tagInput.addEvtOnFocusInListener(this);
            this.tagInput.addEvtOnFocusOutListener(this);
            this.tagInput.addEvtOnValorAlteradoListener(this);
        }

        protected setStrCritica(strCritica: string): void
        {
            this.setStrCriticaFrm(strCritica);
        }

        private setStrCriticaFrm(strCritica: string): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.divCritica.strConteudo = strCritica;
        }

        protected setStrPlaceholder(strPlaceholder: string): void
        {
            super.setStrPlaceholder(strPlaceholder);

            if (!Utils.getBooStrVazia(strPlaceholder))
            {
                this.tagInput.jq.attr("placeholder", strPlaceholder);
                return;
            }

            this.tagInput.jq.removeAttr("placeholder");
        }

        private setStrTitulo(strTitulo: string): void
        {
            this.divTitulo.strConteudo = strTitulo;
            this.tagInput.strPlaceholder = strTitulo;
        }

        public validarDados(): boolean
        {
            if (this.tagInput.booVazio && this.booObrigatorio)
            {
                this.validarDadosErro("O preenchimento do campo \"_campo_titulo\" é obrigatório.".replace("_campo_titulo", this.divTitulo.strConteudo));
                return false;
            }

            return true;
        }

        private validarDadosErro(strErro: string): void
        {
            if (Utils.getBooStrVazia(strErro))
            {
                return;
            }

            this.strCritica = strErro;

            Notificacao.notificar(strErro, Notificacao_EnmTipo.NEGATIVA);
        }

        // #endregion Métodos

        // #region Eventos

        public onFocusIn(objSender: Objeto): void
        {
            try
            {
                switch (objSender)
                {
                    case this.tagInput:
                        this.booEmFoco = true;
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onFocusOut(objSender: Objeto): void
        {
            try
            {
                switch (objSender)
                {
                    case this.tagInput:
                        this.booEmFoco = false;
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onValorAlterado(objSender: Objeto, arg: OnValorAlteradoArg): void
        {
            try
            {
                switch (objSender)
                {
                    case this.tagInput:
                        this.atualizarStrValor();
                        return;
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