/// <reference path="../ComponenteHtmlBase.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabItemHead extends ComponenteHtmlBase implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _tabItem: TabItem;

        public get tabItem(): TabItem
        {
            return this._tabItem;
        }

        public set tabItem(tabItem: TabItem)
        {
            this._tabItem = tabItem;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private ativar()
        {
            if (this.tabItem == null)
            {
                return;
            }

            this.tabItem.ativar();
        }

        protected getCorSelecionado(): string
        {
            return AppWebBase.i.objTema.corFundo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}