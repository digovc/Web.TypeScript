/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="../janela/cadastro/JnlCadastro.ts"/>
/// <reference path="TabItem.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabHtml extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTabItem: Array<TabItem>;
        private _btnAdicionar: BotaoCircular;
        private _btnAlterar: BotaoCircular;
        private _btnApagar: BotaoCircular;
        private _jnlCadastro: JnlCadastro;
        private _tabItemAtiva: TabItem;
        private _tabItemAtivaAnterior: TabItem;

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

        public get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        public set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
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

            this.tabItemAtivaAnterior = this._tabItemAtiva;

            this._tabItemAtiva = tabItemAtiva;

            this.atualizarTabItemAtiva();
        }

        private get tabItemAtivaAnterior(): TabItem
        {
            return this._tabItemAtivaAnterior;
        }

        private set tabItemAtivaAnterior(tabItemAtivaAnterior: TabItem)
        {
            this._tabItemAtivaAnterior = tabItemAtivaAnterior;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

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

        private atualizarTabItemAtiva(): void
        {
            if (this.tabItemAtiva == null)
            {
                return;
            }

            if (this.tabItemAtivaAnterior != null)
            {
                this.tabItemAtivaAnterior.booAtiva = false;
            }

            this.tabItemAtiva.booAtiva = true;
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

            this.inicializarArrTabItem();

            this.mostrar();
        }

        private inicializarArrTabItem(): void
        {
            if (this.arrTabItem == null)
            {
                return;
            }

            this.arrTabItem.forEach((tabItem) => { tabItem.iniciar(); });
        }

        protected setEventos()
        {
            super.setEventos();

            this.btnAdicionar.addEvtOnClickListener(this);
            this.btnAlterar.addEvtOnClickListener(this);
            this.btnApagar.addEvtOnClickListener(this);
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