/// <reference path="../../../database/ColunaWeb.ts"/>
/// <reference path="../../../erro/Erro.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../../Div.ts"/>
/// <reference path="../../Input.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoHtml extends ComponenteHtml implements OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booMostrarTituloSempre: boolean;
        private _clnWeb: ColunaWeb;
        private _divTitulo: Div;
        private _frm: FormHtml;
        private _strCritica: string;
        private _tagInput: Input;

        private get booMostrarTituloSempre(): boolean
        {
            if (this._booMostrarTituloSempre != null)
            {
                return this._booMostrarTituloSempre;
            }

            this._booMostrarTituloSempre = (!Utils.getBooStrVazia(this.jq.attr("mostrar_titulo_sempre")));

            return this._booMostrarTituloSempre;
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

        private get divTitulo(): Div
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

        public get strCritica(): string
        {
            return this._strCritica;
        }

        public set strCritica(strCritica: string)
        {
            this._strCritica = strCritica;

            this.atualizarStrCritica();
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

        private atualizarStrCritica(): void
        {
            // TODO: Criar uma forma melhor para mostrar ao usuário que este campo está com crítica.
            this.strTitle = this.strCritica;
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

        private atualizarStrValor(): void
        {
            this.atualizarStrValorCln();
            this.atualizarStrValorDivTitulo();
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

        private getClnWeb(): ColunaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            if (this.frm == null)
            {
                return new ColunaWeb(this.jq.attr("cln_web_nome"));
            }

            if (this.frm.tblWeb == null)
            {
                return new ColunaWeb(this.jq.attr("cln_web_nome"));
            }

            return this.frm.tblWeb.getClnWeb(this.jq.attr("cln_web_nome"));
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
            if (booMostrar)
            {
                this.divTitulo.jq.animate({ opacity: 1 }, 200);
                return;
            }

            if (this.booMostrarTituloSempre)
            {
                return;
            }

            this.divTitulo.jq.animate({ opacity: 0 }, 200);
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
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.tagInput.addEvtOnValorAlteradoListener(this);
        }

        public validarDados(): boolean
        {
            return true;
        }

        // #endregion Métodos

        // #region Eventos

        public onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.atualizarStrValor();
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