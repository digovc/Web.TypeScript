module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabelaWeb extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrCln: Array<ColunaWeb>;
        private _clnChavePrimaria: ColunaWeb;

        private get arrCln(): Array<ColunaWeb>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrCln != null)
                {
                    return this._arrCln;
                }

                this._arrCln = new Array<ColunaWeb>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrCln;
        }

        private get clnChavePrimaria(): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._clnChavePrimaria != null)
                {
                    return this._clnChavePrimaria;
                }

                this._clnChavePrimaria = this.getClnChavePrimaria();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._clnChavePrimaria;
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

        public addCln(cln: ColunaWeb): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (cln == null)
                {
                    return;
                }

                if (this.arrCln.indexOf(cln) > 0)
                {
                    return;
                }

                this.arrCln.push(cln);
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

        private getClnChavePrimaria(): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrCln == null)
                {
                    return;
                }

                for (var i = 0; i < this.arrCln.length; i++)
                {
                    if ("int_id" == this.arrCln[i].strNome)
                    {
                        return this.arrCln[i];
                    }
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

            return null;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}