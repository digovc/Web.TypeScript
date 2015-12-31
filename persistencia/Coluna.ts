module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Coluna extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booValor: boolean;
        private _dttValor: Date;
        private _numValor: number;
        private _strValor: string;
        private _strValorAnterior: string;

        public get booValor(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(this.strValor))
                {
                    return this._booValor = false;
                }

                switch (this.strValor.toLowerCase())
                {
                    case "1":
                    case "s":
                    case "sim":
                    case "t":
                    case "true":
                        return this._booValor = true;
                    default:
                        return this._booValor = false;
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

                this.strValor = String(this._booValor);
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
                this._dttValor = new Date(this.strValor);
            }
            catch (ex)
            {
                this._dttValor = new Date(- 8640000000000000);
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

                this.strValor = String(this._dttValor);
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

        public get numValor(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._numValor = parseFloat(this.strValor);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._numValor;
        }

        public set numValor(numValor: number)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._numValor = numValor;

                this.strValor = String(this._numValor);
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

            this._strValor = strValor;
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

        constructor(strNome: string)
        {
            super();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strNome = strNome;
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

        private atualizarStrValor(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.strValor == this.strValorAnterior)
                {
                    return;
                }

                this.dispararEvtOnValorAlteradoListener();
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

        // #region Evento OnValorAlteradoListener

        private _arrEvtOnValorAlteradoListener: Array<OnValorAlteradoListener>;

        private get arrEvtOnValorAlteradoListener(): Array<OnValorAlteradoListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnValorAlteradoListener != null)
                {
                    return this._arrEvtOnValorAlteradoListener;
                }

                this._arrEvtOnValorAlteradoListener = new Array<OnValorAlteradoListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnValorAlteradoListener;
        }

        public addEvtOnValorAlteradoListener(evtOnValorAlteradoListener: OnValorAlteradoListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnValorAlteradoListener == null)
                {
                    return;
                }

                if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) > 0)
                {
                    return;
                }

                this.arrEvtOnValorAlteradoListener.push(evtOnValorAlteradoListener);
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

        public removeEvtOnValorAlteradoListener(evtOnValorAlteradoListener: OnValorAlteradoListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnValorAlteradoListener == null)
                {
                    return;
                }

                if (this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener) == 0)
                {
                    return;
                }

                this.arrEvtOnValorAlteradoListener.splice(this.arrEvtOnValorAlteradoListener.indexOf(evtOnValorAlteradoListener));
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

        private dispararEvtOnValorAlteradoListener(): void
        {
            // #region Variáveis

            var e: OnValorAlteradoArg;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnValorAlteradoListener.length == 0)
                {
                    return;
                }

                e = new OnValorAlteradoArg();

                e.strValor = this.strValor;
                e.strValorAnterior = this.strValorAnterior;

                this.arrEvtOnValorAlteradoListener.forEach((value) => { value.onValorAlterado(this, e); });
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

        // #endregion Evento OnValorAlteradoListener

        // #endregion Eventos
    }
}