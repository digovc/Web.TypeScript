/// <reference path="../../../OnFocusInListener.ts"/>
/// <reference path="../../../OnFocusOutListener.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class BotaoHtml extends ComponenteHtml implements OnFocusInListener, OnFocusOutListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private processarOnFocusIn(): void
        {
            AppWebBase.i.tagFoco = this;

            //this.jq.css("border", "1px solid gray");
            this.jq.css("box-shadow", "0px 2px 5px 0px black");
        }

        private processarOnFocusOut(): void
        {
            this.jq.css("border", Utils.STR_VAZIA);
            this.jq.css("border-radius", Utils.STR_VAZIA);
            this.jq.css("box-shadow", Utils.STR_VAZIA);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnFocusInListener(this);
            this.addEvtOnFocusOutListener(this);
        }

        public onFocusIn(objSender: Object): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.processarOnFocusIn();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onFocusOut(objSender: Object): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.processarOnFocusOut();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}