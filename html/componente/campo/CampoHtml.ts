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

        private _lstEvtOnValorAlteradoListener: List<OnValorAlteradoListener>;

        public get lstEvtOnValorAlteradoListener(): List<OnValorAlteradoListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._lstEvtOnValorAlteradoListener != null)
                {
                    return this._lstEvtOnValorAlteradoListener;
                }

                this._lstEvtOnValorAlteradoListener = new List<OnValorAlteradoListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._lstEvtOnValorAlteradoListener;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private atualizarStrValor(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispararOnValorAlterado();
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

        private dispararOnValorAlterado(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.lstEvtOnValorAlteradoListener.booVazia)
                {
                    return;
                }

                if (this.strValor == this.strValorAnterior)
                {
                    return;
                }

                for (var onValorAlteradoListener in this.lstEvtOnValorAlteradoListener)
                {
                    this.dispararOnValorAlteradoItem((onValorAlteradoListener as OnValorAlteradoListener));
                }
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

        private dispararOnValorAlteradoItem(evt: OnValorAlteradoListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.lstEvtOnValorAlteradoListener.booVazia)
                {
                    return;
                }

                if (this.strValor == this.strValorAnterior)
                {
                    return;
                }

                //this.lstEvtOnValorAlteradoListener.forEach((i) => this.dispararOnValorAlteradoItem(i));
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

        // #endregion Métodos

        // #region Eventos

        // #endregion Eventos
    }
}