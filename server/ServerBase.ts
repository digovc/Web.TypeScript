/// <reference path="../Objeto.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerBase extends Objeto
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _intPort: number;
        private _url: string;

        public get intPort(): number
        {
            if (this._intPort != null)
            {
                return this._intPort;
            }

            this._intPort = this.getIntPorta();

            return this._intPort;
        }

        protected get url(): string
        {
            if (this._url != null)
            {
                return this._url;
            }

            this._url = this.getUrl();

            return this._url;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strNome: string)
        {
            super();

            this.strNome = strNome;
        }

        // #endregion Construtores

        // #region Métodos

        protected getIntPorta(): number
        {
            return 8080;
        }

        protected getUrl(): string
        {
            var urlResultado = "_server_host:_server_port";

            urlResultado = urlResultado.replace("_server_host", window.location.hostname);
            urlResultado = urlResultado.replace("_server_port", String(this.intPort));

            return urlResultado;
        }

        protected inicializar(): void
        {
        }

        public iniciar(): void
        {
            this.inicializar();
            this.setEventos();
        }

        protected setEventos(): void
        {
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}