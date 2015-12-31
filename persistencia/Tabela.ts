﻿module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Tabela extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrCln: Array<Coluna>;
        private _clnChavePrimaria: Coluna;

        private get arrCln(): Array<Coluna>
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

                this._arrCln = new Array<Coluna>();
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

        private get clnChavePrimaria(): Coluna
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

        public addCln(cln: Coluna): void
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

        public salvar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.clnChavePrimaria.numValor = DataBase.i.salvar(this);
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

        private getClnChavePrimaria(): Coluna
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