/// <reference path="DataTable.ts"/>
/// <reference path="FiltroWeb.ts"/>

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
        private _arrFil: Array<FiltroWeb>;
        private _clnIntId: ColunaWeb;
        private _intRegistroId: number;
        private _intRegistroPaiId: number;
        private _strCritica: string;
        private _strTblPaiNome: string;

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

        private get arrFil(): Array<FiltroWeb>
        {
            if (this._arrFil != null)
            {
                return this._arrFil;
            }

            this._arrFil = new Array<FiltroWeb>();

            return this._arrFil;
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

        public get clnIntId(): ColunaWeb
        {
            if (this._clnIntId != null)
            {
                return this._clnIntId;
            }

            this._clnIntId = new ColunaWeb("int_id");

            return this._clnIntId;
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

                if (this.arrClnWeb.indexOf(clnWeb) > -1)
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

        public addFiltro(filWeb: FiltroWeb): void
        {
            if (filWeb == null)
            {
                return;
            }

            this.arrFil.push(filWeb);
        }

        public addFiltro2(clnWeb: ColunaWeb, objValor: Object): void
        {
            if (clnWeb == null)
            {
                return;
            }

            var filWeb = new FiltroWeb();

            filWeb.objValor = objValor;
            filWeb.clnWeb = clnWeb;

            this.arrFil.push(filWeb);
        }

        public copiarDados(obj: any): void
        {
            super.copiarDados(obj);

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

            arrObjTemp.forEach((obj) => { this.carregarDadosArrClnWeb2(obj) });
        }

        private carregarDadosArrClnWeb2(obj: any): void
        {
            if (obj == null)
            {
                return;
            }

            var clnWeb: ColunaWeb = new ColunaWeb(null);

            clnWeb.copiarDados(obj);

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
        public getClnWeb(strClnWebNome: string): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(strClnWebNome))
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

                    if (strClnWebNome.toLowerCase() != this.arrClnWeb[i].strNome.toLowerCase())
                    {
                        continue;
                    }

                    return this.arrClnWeb[i];
                }

                var clnWeb = new ColunaWeb(strClnWebNome);

                this.addClnWeb(clnWeb);

                return clnWeb;
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

        public limparFiltro(): void
        {
            this.arrFil.splice(0, this.arrFil.length);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}