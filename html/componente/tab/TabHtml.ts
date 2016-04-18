/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="../janela/cadastro/JnlCadastro.ts"/>
/// <reference path="TabItem.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabHtml extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTabItem: Array<TabItem>;
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

        public get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        public set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
        }

        private get tabItemAtiva(): TabItem
        {
            return this._tabItemAtiva;
        }

        private set tabItemAtiva(tabItemAtiva: TabItem)
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

        private getArrTabItem(): Array<TabItem>
        {
            var arrTabItemResultado: Array<TabItem> = new Array<TabItem>();

            var arrTabItemJq = this.jq.find("[clazz*=TabItem]");

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

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}