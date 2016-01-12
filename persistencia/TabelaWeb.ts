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

        private _arrClnWeb: Array<ColunaWeb>;
        private _clnChavePrimaria: ColunaWeb;
        private _strCritica: string;

        public get arrClnWeb(): Array<ColunaWeb>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrClnWeb != null)
                {
                    return this._arrClnWeb;
                }

                this._arrClnWeb = new Array<ColunaWeb>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrClnWeb;
        }

        private get clnWebChavePrimaria(): ColunaWeb
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

                this._clnChavePrimaria = this.getClnWebChavePrimaria();
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

        public get strCritica(): string
        {
            return this._strCritica;
        }

        public set strCritica(strCritica: string)
        {
            this._strCritica = strCritica;
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

        public addClnWeb(clnWeb: ColunaWeb): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (clnWeb == null)
                {
                    return;
                }

                if (this.arrClnWeb.indexOf(clnWeb) > 0)
                {
                    return;
                }

                this.arrClnWeb.push(clnWeb);
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
         * Carrega os valores de um objeto com o mesmo prototipo desta classe
         * para esta instância.
         * @param obj Objeto com o mesmo prototipo deste.
         */
        public carregarDados(obj: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                for (var objPropriedade in obj)
                {

                    (<any>this)[objPropriedade] = obj[objPropriedade];
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

        /**
         * Verifica se esta tabela ou uma das colunas possuem críticas.
         * Retorna true caso haja críticas, ou false caso contrário.
         */
        public getBooCritica(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!Utils.getBooStrVazia(this.strCritica))
                {
                    return true;
                }

                if (this.arrClnWeb == null)
                {
                    return true;
                }

                for (var i = 0; i < this.arrClnWeb.length; i++)
                {
                    if (this.arrClnWeb[i] == null)
                    {
                        continue;
                    }

                    if (!Utils.getBooStrVazia(this.arrClnWeb[i].strCritica))
                    {
                        return true;
                    }
                }

                return false;
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
         * Retorna a coluna que contém o nome passado por parâmetro ou null
         * caso nenhuma seja encontrada.
         */
        public getClnWeb(strNome: string): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(strNome))
                {
                    return null;
                }

                if (this.arrClnWeb == null)
                {
                    return null;
                }

                for (var i = 0; i < this.arrClnWeb.length; i++)
                {
                    if (this.arrClnWeb[i] == null)
                    {
                        continue;
                    }

                    if (Utils.getBooStrVazia(this.arrClnWeb[i].strNome))
                    {
                        continue;
                    }

                    if (strNome.toLowerCase() != this.arrClnWeb[i].strNome.toLowerCase())
                    {
                        continue;
                    }

                    return this.arrClnWeb[i];
                }

                return null;
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

        private getClnWebChavePrimaria(): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrClnWeb == null)
                {
                    return;
                }

                for (var i = 0; i < this.arrClnWeb.length; i++)
                {
                    if ("int_id" == this.arrClnWeb[i].strNome)
                    {
                        return this.arrClnWeb[i];
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