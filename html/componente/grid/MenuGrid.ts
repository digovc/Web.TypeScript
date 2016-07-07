/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuGrid extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAdicionar: BotaoCircular;
        private _btnAlterar: BotaoCircular;
        private _btnApagar: BotaoCircular;
        private _btnOpcao: BotaoCircular;

        private get btnAdicionar(): BotaoCircular
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoCircular(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        private get btnAlterar(): BotaoCircular
        {
            if (this._btnAlterar != null)
            {
                return this._btnAlterar;
            }

            this._btnAlterar = new BotaoCircular(this.strId + "_btnAlterar");

            return this._btnAlterar;
        }

        private get btnApagar(): BotaoCircular
        {
            if (this._btnApagar != null)
            {
                return this._btnApagar;
            }

            this._btnApagar = new BotaoCircular(this.strId + "_btnApagar");

            return this._btnApagar;
        }

        private get btnOpcao(): BotaoCircular
        {
            if (this._btnOpcao != null)
            {
                return this._btnOpcao;
            }

            this._btnOpcao = new BotaoCircular(this.strId + "_btnOpcao");

            return this._btnOpcao;
        }

        // #endregion Atributos

        // #region Construtores

        constructor()
        {
            super(null);

            this.strId = ("tagMenuGrid_" + this.intObjetoId);
        }

        // #endregion Construtores

        // #region Métodos

        public abrirMenuGrid(arg: JQueryMouseEventObject): void
        {
            if (arg == null)
            {
                return;
            }

            if (arg.pageX < 1)
            {
                return;
            }

            if (arg.pageY < 1)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.strLayoutFixo))
            {
                return;
            }

            $(document.body).append(this.strLayoutFixo);

            this.jq.css("left", (arg.pageX - 100));
            this.jq.css("top", (arg.pageY - 45));

            this.iniciar();
            this.mostrar();

            AppWeb.i.abrirTagFocoExclusivo(this);
        }

        public dispose(): void
        {
            super.dispose();

            AppWeb.i.pag.removeEvtOnClickListener(this);
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return strLayoutFixo;
            }

            strLayoutFixo = strLayoutFixo.replace("_str_id", this.strId);
            strLayoutFixo = strLayoutFixo.replace("_btn_adicionar_str_id", this.btnAdicionar.strId);
            strLayoutFixo = strLayoutFixo.replace("_btn_alterar_str_id", this.btnAlterar.strId);
            strLayoutFixo = strLayoutFixo.replace("_btn_apagar_str_id", this.btnApagar.strId);
            strLayoutFixo = strLayoutFixo.replace("_btn_opcao_str_id", this.btnOpcao.strId);

            return strLayoutFixo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            window.setTimeout(() => { AppWeb.i.pag.addEvtOnClickListener(this); }, 1);
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
                this.dispose();
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