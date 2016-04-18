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
        private _intRegistroId: number;
        private _intRegistroPaiId: number;
        private _strCritica: string;
        private _strTblPaiNome: string;
        private _tag: string;

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

        public set arrClnWeb(arrClnWeb: Array<ColunaWeb>)
        {
            this._arrClnWeb = arrClnWeb;
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

        public get intRegistroId(): number
        {
            return this._intRegistroId;
        }

        public set intRegistroId(intRegistroId: number)
        {
            this._intRegistroId = intRegistroId;
        }

        public get intRegistroPaiId(): number
        {
            return this._intRegistroPaiId;
        }

        public set intRegistroPaiId(intRegistroPaiId: number)
        {
            this._intRegistroPaiId = intRegistroPaiId;
        }

        public get strCritica(): string
        {
            return this._strCritica;
        }

        public set strCritica(strCritica: string)
        {
            this._strCritica = strCritica;
        }

        public get strTblPaiNome(): string
        {
            return this._strTblPaiNome;
        }

        public set strTblPaiNome(strTblPaiNome: string)
        {
            this._strTblPaiNome = strTblPaiNome;
        }

        public get tag(): string
        {
            return this._tag;
        }

        public set tag(tag: string)
        {
            this._tag = tag;
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

        public carregarDados(obj: any): void
        {
            super.carregarDados(obj);

            this.carregarDadosArrClnWeb();
        }

        private carregarDadosArrClnWeb(): void
        {
            if (this.arrClnWeb == null)
            {
                return;
            }

            var arrObjTemp = this.arrClnWeb;

            this.arrClnWeb = null;

            arrObjTemp.forEach((obj) =>
            {
                this.carregarDadosArrClnWeb2(obj)
            });
        }

        private carregarDadosArrClnWeb2(obj: any): void
        {
            if (obj == null)
            {
                return;
            }

            var clnWeb: ColunaWeb = new ColunaWeb(null);

            clnWeb.carregarDados(obj);

            this.arrClnWeb.push(clnWeb);
        }

        /**
         * Verifica se esta tabela ou uma das colunas possuem críticas.
         * Retorna true caso haja críticas, ou false caso contrário.
         */
        public getBooCritica(): boolean
        {
            if (this.getBooCriticaCln())
            {
                return true;
            }

            return !Utils.getBooStrVazia(this.strCritica)
        }

        private getBooCriticaCln(): boolean
        {
            if (this.arrClnWeb == null)
            {
                return false;
            }

            var booResultado: boolean;

            this.arrClnWeb.some((clnWeb) =>
            {
                booResultado = this.getBooCriticaCln2(clnWeb);

                return booResultado;
            });

            return booResultado;
        }

        private getBooCriticaCln2(clnWeb: ColunaWeb): boolean
        {
            if (clnWeb == null)
            {
                return false;
            }

            return !Utils.getBooStrVazia(clnWeb.strCritica);
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