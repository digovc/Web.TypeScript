/// <reference path="../../../database/ColunaWeb.ts"/>
/// <reference path="../../../erro/Erro.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../../Div.ts"/>
/// <reference path="../../Input.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class CampoHtml extends ComponenteHtml implements OnFocusInListener, OnFocusOutListener, OnValorAlteradoListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _booEmFoco: boolean;
        private _booMostrarTituloNunca: boolean;
        private _booMostrarTituloSempre: boolean;
        private _booObrigatorio: boolean;
        private _booPermitirAlterar: boolean;
        private _booSomenteLeitura: boolean;
        private _clnWeb: ColunaWeb;
        private _divInputContainer: Div;
        private _divTitulo: Div;
        private _frm: FormHtml;
        private _intRegistroId: number;
        private _strCritica: string;
        private _strDica: string;
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

            this.atualizarBooEmFoco();
        }

        public get booMostrarTituloNunca(): boolean
        {
            return this._booMostrarTituloNunca;
        }

        public set booMostrarTituloNunca(booMostrarTituloNunca: boolean)
        {
            this._booMostrarTituloNunca = booMostrarTituloNunca;
        }

        private get booMostrarTituloSempre(): boolean
        {
            if (this._booMostrarTituloSempre != null)
            {
                return this._booMostrarTituloSempre;
            }

            this._booMostrarTituloSempre = (!Utils.getBooStrVazia(this.jq.attr("mostrar_titulo_sempre")));

            return this._booMostrarTituloSempre;
        }

        private get booPermitirAlterar(): boolean
        {
            this._booPermitirAlterar = (this.getStrAttValor("permitir_alterar") != "false");

            return this._booPermitirAlterar;
        }

        private set booPermitirAlterar(booPermitirAlterar: boolean)
        {
            this._booPermitirAlterar = booPermitirAlterar;

            this.atualizarBooPermitirAlterar();
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

            this.atualizarBooObrigatorio();
        }

        private get booSomenteLeitura(): boolean
        {
            return this._booSomenteLeitura;
        }

        private set booSomenteLeitura(booSomenteLeitura: boolean)
        {
            this._booSomenteLeitura = booSomenteLeitura;
        }

        protected get divInputContainer(): Div
        {
            if (this._divInputContainer != null)
            {
                return this._divInputContainer;
            }

            this._divInputContainer = new Div(this.strId + "_divInputContainer");

            return this._divInputContainer;
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

            this.atualizarStrCritica();
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

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected atualizarBooEmFoco(): void
        {
            this.divTitulo.jq.css("color", (this.booEmFoco ? "black" : Utils.STR_VAZIA));
            this.divTitulo.jq.css("font-weight", (this.booEmFoco ? "bold" : Utils.STR_VAZIA));
            this.tagInput.jq.css("border-bottom-color", (this.booEmFoco ? AppWeb.i.objTema.corTema : Utils.STR_VAZIA));
            this.tagInput.jq.css("border-bottom-width", (this.booEmFoco ? 2 : 1));

            if (!Utils.getBooStrVazia(this.strCritica))
            {
                this.tagInput.jq.css("border-bottom-color", "#f8b2b2");
            }

            this.atualizarBooEmFocoFrm();
        }

        private atualizarBooEmFocoFrm(): void
        {
            if (!this.booEmFoco)
            {
                return;
            }

            if (this.frm == null)
            {
                return;
            }

            this.frm.cmpEmFoco = this;
        }

        private atualizarBooObrigatorio(): void
        {
            if (this.jq == null)
            {
                return;
            }

            if (this.booObrigatorio)
            {
                this.jq.attr("required", "true");
            }
            else
            {
                this.jq.removeAttr("required");
            }
        }

        private atualizarBooPermitirAlterar(): void
        {
            this.jq.attr("permitir_alterar", String(this._booPermitirAlterar));
        }

        protected atualizarStrCritica(): void
        {
            if (Utils.getBooStrVazia(this.strCritica))
            {
                this.tagInput.jq.css("border-bottom-color", (this.booEmFoco ? AppWeb.i.objTema.corTema : Utils.STR_VAZIA));
            }
            else
            {
                this.tagInput.jq.css("border-bottom-color", "#f8b2b2");
            }

            this.atualizarStrCriticaFrm();
        }

        private atualizarStrCriticaFrm(): void
        {
            if (this.frm == null)
            {
                return;
            }

            this.frm.divCritica.strConteudo = this.strCritica;
        }

        protected atualizarStrPlaceholder(): void
        {
            super.atualizarStrPlaceholder();

            if (!Utils.getBooStrVazia(this.strPlaceholder))
            {
                this.tagInput.jq.attr("placeholder", this.strPlaceholder);
            }
            else
            {
                this.tagInput.jq.removeAttr("placeholder");
            }
        }

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
            this.mostrarDivTitulo(!this.tagInput.booVazio);
        }

        private getBooObrigatorio(): boolean
        {
            return (!Utils.getBooStrVazia(this.getStrAttValor("required")));
        }

        private getClnWeb(): ColunaWeb
        {
            var clnWebResultado = new ColunaWeb(this.jq.attr("cln_web_nome"));

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

            return this.frm.jnlCadastro.tblWeb.getClnWeb(this.jq.attr("cln_web_nome"));
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
            if (!this.booMostrarTituloSempre)
            {
                return;
            }

            this.strPlaceholder = null;

            this.mostrarDivTitulo(true);
        }

        protected mostrarDivTitulo(booMostrar: boolean): void
        {
            if (booMostrar && !this.booMostrarTituloNunca)
            {
                this.divTitulo.jq.animate({ opacity: 1 }, 200);
                return;
            }

            if (!this.booMostrarTituloSempre)
            {
                this.divTitulo.jq.animate({ opacity: 0 }, 200);
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

        protected setEventos(): void
        {
            super.setEventos();

            this.tagInput.addEvtOnFocusInListener(this);
            this.tagInput.addEvtOnFocusOutListener(this);
            this.tagInput.addEvtOnValorAlteradoListener(this);
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

        public onFocusIn(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onFocusOut(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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