/// <reference path="../../../OnFocusInListener.ts"/>
/// <reference path="../../../OnFocusOutListener.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class BotaoHtml extends ComponenteHtmlBase implements OnFocusInListener, OnFocusOutListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected processarOnFocusIn(): void
        {
            AppWebBase.i.tagFoco = this;

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

        public onFocusIn(objSender: Objeto): void
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
                new Erro("Algo deu errado.", ex);
            }
        }

        public onFocusOut(objSender: Objeto): void
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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Métodos

        // #region Eventos



        // #endregion Eventos
    }
}