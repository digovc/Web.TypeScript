// #region Reference

/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="../janela/cadastro/JnlCadastro.ts"/>
/// <reference path="TabItem.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabHtml extends ComponenteHtmlBase implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTabItem: Array<TabItem>;
        private _btnAdicionar: BotaoCircular;
        private _btnAlterar: BotaoCircular;
        private _btnApagar: BotaoCircular;
        private _divComando: Div;
        private _frm: FormHtml;
        private _tabItemAtiva: TabItem;

        private get arrTabItem(): Array<TabItem>
        {
            if (this._arrTabItem != null)
            {
                return this._arrTabItem;
            }

            this._arrTabItem = this.getArrTabItem();

            return this._arrTabItem;
        }

        private get btnAdicionar(): BotaoCircular
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoCircular(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        public get btnAlterar(): BotaoCircular
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

        private get divComando(): Div
        {
            if (this._divComando != null)
            {
                return this._divComando;
            }

            this._divComando = new Div(this.strId + "_divComando");

            return this._divComando;
        }

        public get frm(): FormHtml
        {
            return this._frm;
        }

        public set frm(frm: FormHtml)
        {
            this._frm = frm;
        }

        public get tabItemAtiva(): TabItem
        {
            return this._tabItemAtiva;
        }

        public set tabItemAtiva(tabItemAtiva: TabItem)
        {
            if (this._tabItemAtiva == tabItemAtiva)
            {
                return;
            }

            if (this._tabItemAtiva != null)
            {
                this._tabItemAtiva.booAtiva = false;
            }

            this._tabItemAtiva = tabItemAtiva;

            this.setTabItemAtiva(this._tabItemAtiva);
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private abrirCadastro(booAlterar: boolean)
        {
            if (this.tabItemAtiva == null)
            {
                return;
            }

            this.tabItemAtiva.abrirCadastro(booAlterar);
        }

        private apagar(): void
        {
            if (this.tabItemAtiva == null)
            {
                return;
            }

            this.tabItemAtiva.apagar();
        }

        public ativar(tabItem: TabItem): void
        {
            if (tabItem == null)
            {
                return;
            }

            if (this.arrTabItem == null)
            {
                return;
            }

            if (this.arrTabItem.indexOf(tabItem) < 0)
            {
                return;
            }

            if (this.tabItemAtiva == tabItem)
            {
                return;
            }

            this.tabItemAtiva = tabItem;
        }

        protected finalizar()
        {
            super.finalizar();

            this.finalizarCarregarTabItem();
        }

        private finalizarCarregarTabItem()
        {
            if (this.arrTabItem.length < 1)
            {
                return;
            }

            this.arrTabItem[0].booAtiva = true;
        }

        private getArrTabItem(): Array<TabItem>
        {
            var arrTabItemResultado: Array<TabItem> = new Array<TabItem>();

            var arrTabItemJq = this.jq.find("[clazz=TabItem]");

            if (arrTabItemJq == null)
            {
                return;
            }

            for (var i = 0; i < arrTabItemJq.length; i++)
            {
                this.getArrTabItem2(arrTabItemResultado, arrTabItemJq[i]);
            }

            return arrTabItemResultado;
        }

        private getArrTabItem2(arrTabItem: Array<TabItem>, tabItemJq: HTMLElement): void
        {
            if (tabItemJq == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tabItemJq.id))
            {
                return;
            }

            var tabItem: TabItem = new TabItem(tabItemJq.id);

            tabItem.tabHtml = this;

            arrTabItem.push(tabItem);
        }

        public getTabItem(tblWeb: TabelaWeb): TabItem
        {
            if (tblWeb == null)
            {
                return null;
            }

            if (this.arrTabItem.length < 1)
            {
                return null;
            }

            for (var i = 0; i < this.arrTabItem.length; i++)
            {
                var tabItem = this.arrTabItem[i];

                if (tabItem == null)
                {
                    continue;
                }

                if (tabItem.tblWeb.strNome.toLowerCase() == tblWeb.strNome.toLowerCase())
                {
                    return tabItem;
                }

                if (tabItem.tblWebPrincipal.strNome.toLowerCase() == tblWeb.strNome.toLowerCase())
                {
                    return tabItem;
                }
            }

            return null;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnAdicionar.iniciar();
            this.btnAlterar.iniciar();
            this.btnApagar.iniciar();

            this.inicializarArrTabItem();

            this.mostrarDivComando();
        }

        private inicializarArrTabItem(): void
        {
            if (this.arrTabItem == null)
            {
                return;
            }

            this.arrTabItem.forEach(t => t.iniciar());
        }

        public mostrarDivComando(): void
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

            this.divComando.mostrar();
        }

        public pesquisarTabItemPrincipal(): void
        {
            if (this.arrTabItem == null)
            {
                return;
            }

            if (this.arrTabItem.length < 1)
            {
                return;
            }

            var tabItemPrincipal = this.arrTabItem[0];

            if (tabItemPrincipal == null)
            {
                return;
            }

            tabItemPrincipal.booAtiva = true;

            this.divComando.mostrar();
        }

        protected setEventos()
        {
            super.setEventos();

            this.btnAdicionar.addEvtOnClickListener(this);
            this.btnAlterar.addEvtOnClickListener(this);
            this.btnApagar.addEvtOnClickListener(this);
        }

        private setTabItemAtiva(tabItemAtiva: TabItem): void
        {
            if (this.tabItemAtiva == null)
            {
                return;
            }

            this.tabItemAtiva.booAtiva = true;
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnAdicionar:
                        this.abrirCadastro(false);
                        return;

                    case this.btnAlterar:
                        this.abrirCadastro(true);
                        return;

                    case this.btnApagar:
                        this.apagar();
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