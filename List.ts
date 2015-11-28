module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class List<T>
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booPermitirValorDuplicado: boolean;
        private _booVazia: boolean;
        private _intItemQuantidade: number;
        private _lstItem: Array<T>;

        /**
         * Indica se esta lista poderá conter valores duplicados. Caso esta
         * lista contenha objetos complexos, a validação será feita através
         * das instâncias destes objetos e não de seus valores.
         */
        public get booPermitirValorDuplicado(): boolean
        {
            return this._booPermitirValorDuplicado;
        }

        /**
         * Indica se esta lista está vazia (se contém elementos).
         */
        public get booVazia(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booVazia = (this.intItemQuantidade < 1);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._booVazia;
        }

        public set booPermitirValorDuplicado(booPermitirValorDuplicado: boolean)
        {
            this._booPermitirValorDuplicado = booPermitirValorDuplicado;
        }

        /**
         * Indica a quantidade de itens que estão presentes nesta lista.
         */
        public get intItemQuantidade(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._intItemQuantidade = this.lstItem.length;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._intItemQuantidade;
        }

        private get lstItem(): Array<T>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._lstItem != null)
                {
                    return this._lstItem;
                }

                this._lstItem = new Array<T>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._lstItem;
        }

        [intIndex: number]: T;

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        /**
         * Adiciona um item para esta lista.
         */
        public adicionar(itm: T): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (itm == null)
                {
                    return;
                }

                if ((!this.booPermitirValorDuplicado) && (this.lstItem.indexOf(itm) > -1))
                {
                    return;
                }

                this.lstItem.push(itm);
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

        /**
         * Adiciona um item para esta lista.
         */
        public forEach(fnc: Function): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (fnc == null)
                {
                    return;
                }

                if (this.booVazia)
                {
                    return;
                }

                for (var itm in this.lstItem)
                {
                    fnc(itm);
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

        public remover(itm: T): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (itm == null)
                {
                    return;
                }

                if (this.lstItem.indexOf(itm) < 0)
                {
                    return;
                }

                this.lstItem.splice(this.lstItem.indexOf(itm), 1);
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