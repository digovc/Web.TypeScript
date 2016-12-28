/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="OnGridMenuClickArg.ts"/>

module NetZ_Web
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
        private _btnMenu: BotaoCircular;
        private _tagGridRow: GridRow = null;

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

        private get btnMenu(): BotaoCircular
        {
            if (this._btnMenu != null)
            {
                return this._btnMenu;
            }

            this._btnMenu = new BotaoCircular(this.strId + "_btnOpcao");

            return this._btnMenu;
        }

        private get tagGridRow(): GridRow
        {
            return this._tagGridRow;
        }

        private set tagGridRow(tagGridRow: GridRow)
        {
            this._tagGridRow = tagGridRow;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(tagGridRow: GridRow)
        {
            super(null);

            this.strId = ("tagMenuGrid_" + this.intObjetoId);
            this.tagGridRow = tagGridRow;
        }

        // #endregion Construtores

        // #region Métodos

        public static abrirMenuGrid(tagGridRow: GridRow, arg: JQueryMouseEventObject): void
        {
            if (tagGridRow == null)
            {
                return;
            }

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

            var mnuGrid = new MenuGrid(tagGridRow);

            if (Utils.getBooStrVazia(mnuGrid.strLayoutFixo))
            {
                return;
            }

            $(document.body).append(mnuGrid.strLayoutFixo);

            mnuGrid.jq.css("left", (arg.pageX - 75));
            mnuGrid.jq.css("top", (arg.pageY - 85));

            mnuGrid.iniciar();
            mnuGrid.mostrar();

            AppWebBase.i.abrirTagFocoExclusivo(mnuGrid);
        }

        public dispose(): void
        {
            super.dispose();

            AppWebBase.i.pag.removeEvtOnClickListener(this);
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
            strLayoutFixo = strLayoutFixo.replace("_btn_menu_str_id", this.btnMenu.strId);

            return strLayoutFixo;
        }

        private processarClick(objSender: Object, argOrigem: JQueryEventObject): void
        {
            if (objSender == null)
            {
                return;
            }

            if (argOrigem == null)
            {
                return;
            }

            if (this.tagGridRow == null)
            {
                return;
            }

            var arg = new OnGridMenuClickArg();

            arg.argOrigem = argOrigem;
            arg.tagGridRow = this.tagGridRow;

            switch (objSender)
            {
                case this.btnAdicionar:
                    arg.enmTipo = OnGridMenuClickArg_EnmAcao.ADICIONAR;
                    break;

                case this.btnAlterar:
                    arg.enmTipo = OnGridMenuClickArg_EnmAcao.ALTERAR;
                    break;

                case this.btnApagar:
                    arg.enmTipo = OnGridMenuClickArg_EnmAcao.APAGAR;
                    break;

                case this.btnMenu:
                    arg.enmTipo = OnGridMenuClickArg_EnmAcao.MENU;
                    break;
            }

            this.tagGridRow.processarOnGridMenuClick(arg);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.jq.bind("contextmenu", (() => { return false; }));

            window.setTimeout(() => { AppWebBase.i.pag.addEvtOnClickListener(this); }, 1);

            this.btnAdicionar.addEvtOnClickListener(this);
            this.btnAlterar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnAdicionar:
                    case this.btnAlterar:
                    case this.btnApagar:
                    case this.btnMenu:
                        this.processarClick(objSender, arg);
                        return;
                }

                this.dispose();
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}