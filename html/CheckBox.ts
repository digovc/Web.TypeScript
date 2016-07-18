/// <reference path="Input.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CheckBox extends Input implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divSeletor: Div;

        private get divSeletor(): Div
        {
            if (this._divSeletor != null)
            {
                return this._divSeletor;
            }

            this._divSeletor = new Div(this.strId + "_divSeletor");

            return this._divSeletor;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected atualizarStrValor(): void
        {
            super.atualizarStrValor();

            this.divSeletor.jq.animate({ "left": this.booValor ? "15px" : "1px" }, 200);
            this.divSeletor.jq.css("background-color", this.booValor ? "rgb(132,202,156)" : Utils.STR_VAZIA);
        }

        protected inicializarStrValor(): void
        {
            //super.inicializarStrValor();

            this.strValor = this.getStrAttValor("value");
            this.strValorInicial = this.strValor;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
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
                this.booValor = !this.booValor;
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