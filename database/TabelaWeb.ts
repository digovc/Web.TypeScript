/// <reference path="../Objeto.ts"/>
/// <reference path="FiltroWeb.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TabelaWeb extends Objeto
    {
        // #region Constantes

        public static get SQL_CLN_STR_TAG_NOME(): string { return "str_tag" };

        // #endregion Constantes

        // #region Atributos

        private _arrCln: Array<ColunaWeb>;
        private _arrFil: Array<FiltroWeb>;
        private _booPermitirAlterar: boolean = true;
        private _clnBooAtivo: ColunaWeb;
        private _clnBooExcluido: ColunaWeb;
        private _clnDttAlteracao: ColunaWeb;
        private _clnDttCadastro: ColunaWeb;
        private _clnDttExclusao: ColunaWeb;
        private _clnIntId: ColunaWeb;
        private _clnIntUsuarioAlteracaoId: ColunaWeb;
        private _clnIntUsuarioCadastroId: ColunaWeb;
        private _clnIntUsuarioExclusaoId: ColunaWeb;
        private _clnNome: ColunaWeb;
        private _dttUpload: Date;
        private _intRegistroPaiId: number;
        private _srvAjaxDbe: SrvAjaxDbeBase;
        private _strCritica: string;
        private _strTblPaiNome: string;

        public get arrCln(): Array<ColunaWeb>
        {
            if (this._arrCln != null)
            {
                return this._arrCln;
            }

            this._arrCln = new Array<ColunaWeb>();

            return this._arrCln;
        }

        public set arrCln(arrCln: Array<ColunaWeb>)
        {
            this._arrCln = arrCln;
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

        public get booPermitirAlterar(): boolean
        {
            return this._booPermitirAlterar;
        }

        public set booPermitirAlterar(booPermitirAlterar: boolean)
        {
            this._booPermitirAlterar = booPermitirAlterar;
        }

        public get clnBooAtivo(): ColunaWeb
        {
            if (this._clnBooAtivo != null)
            {
                return this._clnBooAtivo;
            }

            this._clnBooAtivo = this.getCln("boo_ativo");

            return this._clnBooAtivo;
        }

        public get clnBooExcluido(): ColunaWeb
        {
            if (this._clnBooExcluido != null)
            {
                return this._clnBooExcluido;
            }

            this._clnBooExcluido = this.getCln("boo_excluido");

            return this._clnBooExcluido;
        }

        public get clnDttAlteracao(): ColunaWeb
        {
            if (this._clnDttAlteracao != null)
            {
                return this._clnDttAlteracao;
            }

            this._clnDttAlteracao = this.getCln("dtt_alteracao");

            return this._clnDttAlteracao;
        }

        public get clnDttCadastro(): ColunaWeb
        {
            if (this._clnDttCadastro != null)
            {
                return this._clnDttCadastro;
            }

            this._clnDttCadastro = this.getCln("dtt_cadastro");

            return this._clnDttCadastro;
        }

        public get clnDttExclusao(): ColunaWeb
        {
            if (this._clnDttExclusao != null)
            {
                return this._clnDttExclusao;
            }

            this._clnDttExclusao = this.getCln("dtt_exclusao");

            return this._clnDttExclusao;
        }

        public get clnIntId(): ColunaWeb
        {
            if (this._clnIntId != null)
            {
                return this._clnIntId;
            }

            this._clnIntId = this.getCln(this.getSqlChavePrimariaNome());

            return this._clnIntId;
        }

        public get clnIntUsuarioAlteracaoId(): ColunaWeb
        {
            if (this._clnIntUsuarioAlteracaoId != null)
            {
                return this._clnIntUsuarioAlteracaoId;
            }

            this._clnIntUsuarioAlteracaoId = this.getCln("int_usuario_alteracao_id");

            return this._clnIntUsuarioAlteracaoId;
        }

        public get clnIntUsuarioCadastroId(): ColunaWeb
        {
            if (this._clnIntUsuarioCadastroId != null)
            {
                return this._clnIntUsuarioCadastroId;
            }

            this._clnIntUsuarioCadastroId = this.getCln("int_usuario_cadastro_id");

            return this._clnIntUsuarioCadastroId;
        }

        public get clnIntUsuarioExclusaoId(): ColunaWeb
        {
            if (this._clnIntUsuarioExclusaoId != null)
            {
                return this._clnIntUsuarioExclusaoId;
            }

            this._clnIntUsuarioExclusaoId = this.getCln("int_usuario_exclusao_id");

            return this._clnIntUsuarioExclusaoId;
        }

        public get clnNome(): ColunaWeb
        {
            if (this._clnNome != null)
            {
                return this._clnNome;
            }

            this._clnNome = this.getClnNome();

            return this._clnNome;
        }

        public get intRegistroPaiId(): number
        {
            return this._intRegistroPaiId;
        }

        public get dttUpload(): Date
        {
            return this._dttUpload;
        }

        public set dttUpload(dttUpload: Date)
        {
            this._dttUpload = dttUpload;
        }

        public set intRegistroPaiId(intRegistroPaiId: number)
        {
            this._intRegistroPaiId = intRegistroPaiId;
        }

        private get srvAjaxDbe(): SrvAjaxDbeBase
        {
            if (this._srvAjaxDbe != null)
            {
                return this._srvAjaxDbe;
            }

            this._srvAjaxDbe = this.getSrvAjaxDbe();

            return this._srvAjaxDbe;
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

        // #region Construtor

        constructor(strNome: string = null)
        {
            super();

            if (!Utils.getBooStrVazia(strNome))
            {
                this.strNome = strNome;
            }
            else
            {
                this.strNome = this.getSqlNome();
            }
        }

        // #endregion Construtor

        // #region Métodos

        public addCln(cln: ColunaWeb): void
        {
            if (cln == null)
            {
                return;
            }

            if (this.arrCln.indexOf(cln) > -1)
            {
                return;
            }

            this.arrCln.push(cln);
        }

        public addFil(filWeb: FiltroWeb): void
        {
            if (filWeb == null)
            {
                return;
            }

            this.arrFil.push(filWeb);
        }

        public addFil2(cln: ColunaWeb, objValor: Object): void
        {
            if (cln == null)
            {
                return;
            }

            var filWeb = new FiltroWeb(cln, objValor);

            this.arrFil.push(filWeb);
        }

        public copiarDados(obj: any): void
        {
            super.copiarDados(obj);

            this.copiarDadosArrCln();
        }

        private copiarDadosArrCln(): void
        {
            if (this.arrCln == null)
            {
                return;
            }

            var arrObjTemp = this.arrCln;

            this.arrCln = null;

            arrObjTemp.forEach(o => this.copiarDadosArrCln2(o));
        }

        private copiarDadosArrCln2(obj: any): void
        {
            if (obj == null)
            {
                return;
            }

            var cln = new ColunaWeb(null);

            cln.copiarDados(obj);

            this.addCln(cln);
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
            if (this.arrCln == null)
            {
                return false;
            }

            var booResultado: boolean;

            this.arrCln.some((cln) =>
            {
                booResultado = this.getBooCriticaCln2(cln);

                return booResultado;
            });

            return booResultado;
        }

        private getBooCriticaCln2(cln: ColunaWeb): boolean
        {
            if (cln == null)
            {
                return false;
            }

            return !Utils.getBooStrVazia(cln.strCritica);
        }

        /**
         * Retorna a coluna que contém o nome passado por parâmetro ou null
         * caso nenhuma seja encontrada.
         */
        public getCln(sqlClnNome: string): ColunaWeb
        {
            if (Utils.getBooStrVazia(sqlClnNome))
            {
                return null;
            }

            if (this.arrCln == null)
            {
                return null;
            }

            for (var i = 0; i < this.arrCln.length; i++)
            {
                if (this.arrCln[i] == null)
                {
                    continue;
                }

                if (Utils.getBooStrVazia(this.arrCln[i].strNome))
                {
                    continue;
                }

                if (sqlClnNome.toLowerCase() != this.arrCln[i].strNome.toLowerCase())
                {
                    continue;
                }

                return this.arrCln[i];
            }

            var clnNova = new ColunaWeb(sqlClnNome);

            this.addCln(clnNova);

            return clnNova;
        }

        private getClnNome(): ColunaWeb
        {
            for (var i = 0; i < this.arrCln.length; i++)
            {
                var cln = this.arrCln[i];

                if (cln == null)
                {
                    continue;
                }

                if (!cln.booNome)
                {
                    continue;
                }

                return cln;
            }

            return this.clnIntId;
        }

        protected getSqlChavePrimariaNome(): string
        {
            return "int_id";
        }

        private getSqlNome(): string
        {
            var sqlNomeResultado = Utils.STR_VAZIA;
            var strTipoNome = this.constructor.name;

            for (var i = 0; i < strTipoNome.length; i++)
            {
                if (strTipoNome[i] != strTipoNome[i].toUpperCase())
                {
                    sqlNomeResultado += strTipoNome[i];
                }
                else
                {
                    sqlNomeResultado += ("_" + strTipoNome[i].toLowerCase());
                }
            }

            return sqlNomeResultado;
        }

        protected getSrvAjaxDbe(): SrvAjaxDbeBase
        {
            return null;
        }

        public limparDados(): void
        {
            this.arrCln.forEach(c => c.limparDados());
        }

        public limparFiltro(): void
        {
            if (this.arrFil.length < 1)
            {
                return;
            }

            this.arrFil.splice(0);
        }

        public pesquisar(arrFil: Array<FiltroWeb>, fncSucesso: ((o: Interlocutor) => void), fncErro: ((strStatus: string, strThrown: string) => void) = null): void
        {
            if (this.srvAjaxDbe == null)
            {
                throw new Error("O servidor de dados não foi indicado.");
            }

            this.srvAjaxDbe.pesquisar(this.strNome, arrFil, fncSucesso, fncErro);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}