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
        private _clnWebIntId: ColunaWeb;
        private _clnWebNome: ColunaWeb;
        private _intRegistroPaiId: number;
        private _strCritica: string;
        private _strTblPaiNome: string;

        public get arrClnWeb(): Array<ColunaWeb>
        {
            if (this._arrClnWeb != null)
            {
                return this._arrClnWeb;
            }

            this._arrClnWeb = new Array<ColunaWeb>();

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

        public get clnWebIntId(): ColunaWeb
        {
            if (this._clnWebIntId != null)
            {
                return this._clnWebIntId;
            }

            this._clnWebIntId = this.getClnWeb("int_id");

            return this._clnWebIntId;
        }

        public get clnWebNome(): ColunaWeb
        {
            if (this._clnWebNome != null)
            {
                return this._clnWebNome;
            }

            this._clnWebNome = this.getClnWebNome();

            return this._clnWebNome;
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

        // #endregion Atributos

        // #region Construtores

        constructor(strNome: string)
        {
            super();

            this.strNome = strNome;
        }

        // #endregion Construtores

        // #region Métodos

        public addClnWeb(clnWeb: ColunaWeb): void
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

        public addFil(filWeb: FiltroWeb): void
        {
            if (filWeb == null)
            {
                return;
            }

            this.arrFil.push(filWeb);
        }

        public addFil2(clnWeb: ColunaWeb, objValor: Object): void
        {
            if (clnWeb == null)
            {
                return;
            }

            var filWeb = new FiltroWeb(clnWeb, objValor);

            this.arrFil.push(filWeb);
        }

        public copiarDados(obj: any): void
        {
            super.copiarDados(obj);

            this.copiarDadosArrClnWeb();
        }

        private copiarDadosArrClnWeb(): void
        {
            if (this.arrClnWeb == null)
            {
                return;
            }

            var arrObjTemp = this.arrClnWeb;

            this.arrClnWeb = null;

            arrObjTemp.forEach((obj) => { this.copiarDadosArrClnWeb2(obj); });
        }

        private copiarDadosArrClnWeb2(obj: any): void
        {
            if (obj == null)
            {
                return;
            }

            var clnWeb = new ColunaWeb(null);

            clnWeb.copiarDados(obj);

            this.addClnWeb(clnWeb);
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

            var clnWebNew = new ColunaWeb(strClnWebNome);

            this.addClnWeb(clnWebNew);

            return clnWebNew;
        }

        private getClnWebNome(): ColunaWeb
        {
            for (var i = 0; i < this.arrClnWeb.length; i++)
            {
                var clnWeb = this.arrClnWeb[i];

                if (clnWeb == null)
                {
                    continue;
                }

                if (!clnWeb.booNome)
                {
                    continue;
                }

                return clnWeb;
            }

            return this.clnWebIntId;
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