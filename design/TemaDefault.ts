// #region Reference

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TemaDefault
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _corFundo: string;
        private _corMouseOver: string;
        private _corSelecionado: string;
        private _corTelaFundo: string;
        private _corTema: string;

        public get corFundo(): string
        {
            if (this._corFundo != null)
            {
                return this._corFundo;
            }

            this._corFundo = this.getCorFundo();

            return this._corFundo;
        }

        public get corMouseOver(): string
        {
            if (this._corMouseOver != null)
            {
                return this._corMouseOver;
            }

            this._corMouseOver = this.getCorMouseOver();

            return this._corMouseOver;
        }

        public get corSelecionado(): string
        {
            if (this._corSelecionado != null)
            {
                return this._corSelecionado;
            }

            this._corSelecionado = this.getCorSelecionado();

            return this._corSelecionado;
        }

        public get corTelaFundo(): string
        {
            if (this._corTelaFundo != null)
            {
                return this._corTelaFundo;
            }

            this._corTelaFundo = this.getCorTelaFundo();

            return this._corTelaFundo;
        }

        public get corTema(): string
        {
            if (this._corTema != null)
            {
                return this._corTema;
            }

            this._corTema = this.getCorTema();

            return this._corTema;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected getCorFundo(): string
        {
            return "#e3e3e3";
        }

        protected getCorMouseOver(): string
        {
            return "lightgray";
        }

        protected getCorSelecionado(): string
        {
            return "#dadada";
        }

        protected getCorTelaFundo(): string
        {
            return "black";
        }

        protected getCorTema(): string
        {
            return "black";
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}