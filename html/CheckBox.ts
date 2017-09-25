// #region Reference

/// <reference path="Input.ts"/>

// #endregion Reference

module Web
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
        private _divTitulo: Div;

        private get divSeletor(): Div
        {
            if (this._divSeletor != null)
            {
                return this._divSeletor;
            }

            this._divSeletor = new Div(this.strId + "_divSeletor");

            return this._divSeletor;
        }

        public get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

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

        protected setStrValor(strValor: string): void
        {
            super.setStrValor(strValor);

            this.divSeletor.jq.animate({ "left": (Utils.getBoo(strValor) ? "37px" : "1px") }, 200, "swing");
            this.divSeletor.jq.css("background-color", (Utils.getBoo(strValor) ? "rgb(132,202,156)" : Utils.STR_VAZIA));
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                this.booValor = !this.booValor;
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}