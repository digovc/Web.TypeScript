module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabItemHead extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtiva: boolean;
        private _tabItem: TabItem;

        public get booAtiva(): boolean
        {
            return this._booAtiva;
        }

        public set booAtiva(booAtiva: boolean)
        {
            if (this._booAtiva == booAtiva)
            {
                return;
            }

            this._booAtiva = booAtiva;

            this.atualizarBooAtiva();
        }

        public get tabItem(): TabItem
        {
            return this._tabItem;
        }

        public set tabItem(tabItem: TabItem)
        {
            this._tabItem = tabItem;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private ativar()
        {
            if (this.tabItem == null)
            {
                return;
            }

            this.tabItem.ativar();
        }

        private atualizarBooAtiva(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.jq.css("background-color", this.booAtiva ? "#549A84" : "white"); // TODO: Colocar a cor do tema da aplicação.
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this:
                        this.ativar();
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