// #region Reference

/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="BotaoHtml.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class BotaoCircular extends BotaoHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private animarClick(): void
        {
            this.jq.css("box-shadow", "0px 0px 1px grey");

            this.girar(undefined, undefined, (() => this.animarClick2()));
        }

        private animarClick2(): void
        {
            this.jq.css("box-shadow", Utils.STR_VAZIA)
        }

        private processarOnClick(arg: JQueryEventObject): void
        {
            this.animarClick();
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
                        this.processarOnClick(arg)
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