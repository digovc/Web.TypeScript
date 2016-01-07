/// <reference path="../../../persistencia/ColunaWeb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoHtml extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booValor: boolean;
        private _cln: ColunaWeb;
        private _decValor: number;
        private _dttValor: Date;
        private _intValor: number;
        private _strValor: string;
        private _strValorAnterior: string;

        public get booValor(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booValor = Utils.strToBoo(this.strValor);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._booValor;
        }

        public set booValor(booValor: boolean)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booValor = booValor;

                this.strValor = this._booValor ? "true" : "false";
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

        public get cln(): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._cln != null)
                {
                    return this._cln;
                }

                this._cln = this.getCln();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._cln;
        }

        public get dttValor(): Date
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                // TODO: Converter strValor para dttValor.
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._dttValor;
        }

        public set dttValor(dttValor: Date)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._dttValor = dttValor;

                // TODO: Converter dttValor para strValor.
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

        public get decValor(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._decValor = parseFloat(this.strValor);
            }
            catch (ex)
            {
                return 0;
            }
            finally
            {
            }
            // #endregion Ações

            return this._decValor;
        }

        public set decValor(decValor: number)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._decValor = decValor;

                this.strValor = this._decValor.toString();
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

        public get intValor(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intValor = parseInt(this.strValor);
            }
            catch (ex)
            {
                return 0;
            }
            finally
            {
            }
            // #endregion Ações

            return this._intValor;
        }

        public set intValor(intValor: number)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intValor = intValor;

                this.strValor = this._intValor.toString();
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

        public get strValor(): string
        {
            return this._strValor;
        }

        public set strValor(strValor: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strValorAnterior = this._strValor;

                this._strValor = strValor;

                this.atualizarStrValor();
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

        public get strValorAnterior(): string
        {
            return this._strValorAnterior;
        }

        public set strValorAnterior(strValorAnterior: string)
        {
            this._strValorAnterior = strValorAnterior;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private atualizarStrValor(): void
        {
        }

        private getCln(): ColunaWeb
        {
            // #region Variáveis

            var clnResultado: ColunaWeb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                clnResultado = new ColunaWeb(this.jq.attr("cln"));

                 // TODO: Manter os valores atualizados dos dois lados.

                return clnResultado;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return clnResultado;
            
        }

        public validarDados(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return true;
        }

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}