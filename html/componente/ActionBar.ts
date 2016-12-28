/// <reference path="../../OnClickListener.ts"/>
/// <reference path="botao/actionbar/BotaoActionBar.ts"/>
/// <reference path="ComponenteHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ActionBar extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnMenu: BotaoActionBar;
        private _btnVoltar: BotaoActionBar;
        private _divTitulo: Div;
        private _pagMobile: PagMobile;

        private get btnMenu(): BotaoActionBar
        {
            if (this._btnMenu != null)
            {
                return this._btnMenu;
            }

            this._btnMenu = new BotaoActionBar(this.strId + "_btnMenu");

            return this._btnMenu;
        }

        private get btnVoltar(): BotaoActionBar
        {
            if (this._btnVoltar != null)
            {
                return this._btnVoltar;
            }

            this._btnVoltar = new BotaoActionBar(this.strId + "_btnVoltar");

            return this._btnVoltar;
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

        public get pagMobile(): PagMobile
        {
            return this._pagMobile;
        }

        public set pagMobile(pagMobile: PagMobile)
        {
            this._pagMobile = pagMobile;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected btnMenu_onClick()
        {
        }

        protected btnVoltar_onClick()
        {
        }

        protected divTitulo_onClick()
        {
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnMenu.addEvtOnClickListener(this);
            this.btnVoltar.addEvtOnClickListener(this);
            this.divTitulo.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnMenu:
                        this.btnMenu_onClick();
                        return;

                    case this.btnVoltar:
                        this.btnVoltar_onClick();
                        return;

                    case this.divTitulo:
                        this.divTitulo_onClick();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}