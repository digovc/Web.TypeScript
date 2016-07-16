﻿module NetZ_Web
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._intPort != null)
                {
                    return this._intPort;
                }

                this._intPort = this.getIntPort();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._intPort;
        }

        protected get url(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._url != null)
                {
                    return this._url;
                }

                this._url = this.getUrl();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._url;
        }

        // #endregion Atributos

        // #region Construtores

        constructor()
        {
            super();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.iniciar();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Construtores

        // #region Métodos

        protected getIntPort(): number
        {
            return 8080;
        }

        private getUrl(): string
        {
            // #region Variáveis

            var urlResultado: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                urlResultado = "http://_server_host:_server_port";

                urlResultado = urlResultado.replace("_server_host", window.location.hostname);
                urlResultado = urlResultado.replace("_server_port", String(this.intPort));

                return urlResultado;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected inicializar(): void
        {
        }

        private iniciar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializar();
                this.setEventos();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected setEventos(): void
        {
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}