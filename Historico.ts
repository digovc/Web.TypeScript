module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Historico
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strParametro: string;
        private _strTitulo: string;

        public get strParametro(): string
        {
            return this._strParametro;
        }

        public set strParametro(strParametro: string)
        {
            this._strParametro = strParametro;
        }

        public get strTitulo(): string
        {
            return this._strTitulo;
        }

        public set strTitulo(strTitulo: string)
        {
            this._strTitulo = strTitulo;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public addParametro(strNome: string, objValor: any): Historico
        {
            if (Utils.getBooStrVazia(strNome))
            {
                return;
            }

            if (objValor == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.strParametro))
            {
                this.strParametro = "?";
            }
            else
            {
                this.strParametro += "&";
            }

            var strItem = "_param_nome=_param_valor";

            strItem = strItem.replace("_param_nome", strNome);
            strItem = strItem.replace("_param_valor", objValor);

            this.strParametro += strItem;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}