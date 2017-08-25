/// <reference path="../SrvAjaxBase.ts"/>
/// <reference path="PesquisaInterlocutor.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class SrvAjaxDbeBase extends SrvAjaxBase
    {
        // #region Constantes

        public static get INT_CODIGO_RETORNO_SUCESSO(): number { return 0 };

        public static get STR_EXCEPTION_NULL(): string { return "O servidor de acesso ao banco de dados está nulo." };
        public static get STR_METODO_ABRIR_CADASTRO(): string { return "ABRIR_CADASTRO" };
        public static get STR_METODO_ABRIR_CADASTRO_FILTRO_CONTEUDO(): string { return "ABRIR_CADASTRO_FILTRO_CONTEUDO" };
        public static get STR_METODO_ABRIR_CONSULTA(): string { return "ABRIR_CONSULTA" };
        public static get STR_METODO_ADICIONAR(): string { return "ADICIONAR" };
        public static get STR_METODO_APAGAR(): string { return "APAGAR" };
        public static get STR_METODO_CARREGAR_TBL_WEB(): string { return "CARREGAR_TBL_WEB" };
        public static get STR_METODO_FILTRO(): string { return "FILTRO" };
        public static get STR_METODO_PESQUISAR_COMBO_BOX(): string { return "PESQUISAR_COMBO_BOX" };
        public static get STR_METODO_PESQUISAR_TABLE(): string { return "PESQUISAR_TABLE" };
        public static get STR_METODO_RECUPERAR(): string { return "RECUPERAR" };
        public static get STR_METODO_SALVAR(): string { return "SALVAR" };
        public static get STR_METODO_SALVAR_DOMINIO(): string { return "SALVAR_DOMINIO" };
        public static get STR_METODO_TABELA_FAVORITO_ADD(): string { return "TABELA_FAVORITO_ADD" };
        public static get STR_METODO_TABELA_FAVORITO_PESQUISAR(): string { return "TABELA_FAVORITO_PESQUISAR" };
        public static get STR_METODO_TABELA_FAVORITO_VERIFICAR(): string { return "TABELA_FAVORITO_VERIFICAR" };
        public static get STR_METODO_TAG_ABRIR_JANELA(): string { return "TAG_ABRIR_JANELA" };
        public static get STR_METODO_TAG_SALVAR(): string { return "TAG_SALVAR" };

        private static get STR_METODO_PESQUISAR(): string { return "STR_METODO_PESQUISAR" };

        // #endregion Constantes

        // #region Atributos

        private _arrTbl: Array<TabelaWeb>;

        private get arrTbl(): Array<TabelaWeb>
        {
            if (this._arrTbl != null)
            {
                return this._arrTbl;
            }

            this._arrTbl = new Array<TabelaWeb>();

            return this._arrTbl;
        }

        // #endregion Atributos

        // #region Construtor

        constructor()
        {
            super("Servidor de dados");
        }

        // #endregion Construtor

        // #region Métodos

        public addTbl(tbl: TabelaWeb): void
        {
            if (tbl == null)
            {
                return null;
            }

            if (this.arrTbl.indexOf(tbl) > -1)
            {
                return;
            }

            for (var i = 0; i < this.arrTbl.length; i++)
            {
                if (tbl.strNome == this.arrTbl[i].strNome)
                {
                    return;
                }
            }

            this.arrTbl.push(tbl);
        }

        public carregarTabela(sqlTabelaNome: string, fncSucesso: ((t: TabelaWeb) => void) = null): void
        {
            if (Utils.getBooStrVazia(sqlTabelaNome))
            {
                return;
            }

            if (this.getTbl(sqlTabelaNome) != null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_CARREGAR_TBL_WEB;

            objInterlocutor.addStr(sqlTabelaNome);
            objInterlocutor.addFncSucesso(o => this.carregarTabelaSucesso(o, fncSucesso));

            this.enviar(objInterlocutor);
        }

        private carregarTabelaSucesso(objInterlocutor: Interlocutor, fncSucesso: ((t: TabelaWeb) => void)): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            var tbl = new TabelaWeb();

            tbl.copiarDados(objInterlocutor.getObjJson<TabelaWeb>());

            this.addTbl(tbl);

            if (fncSucesso != null)
            {
                fncSucesso(tbl);
            }
        }

        protected getIntPorta(): number
        {
            return 8081;
        }

        public getTbl(sqlTabelaNome: string): TabelaWeb
        {
            if (Utils.getBooStrVazia(sqlTabelaNome))
            {
                return null;
            }

            for (var i = 0; i < this.arrTbl.length; i++)
            {
                if (sqlTabelaNome.toLowerCase() == this.arrTbl[i].strNome.toLowerCase())
                {
                    return this.arrTbl[i];
                }
            }

            return null;
        }

        public pesquisar(strTabelaNome: string, arrFil: Array<FiltroWeb>, fncSucesso: ((o: Interlocutor) => void), fncErro: ((strStatus: string, strThrown: string) => void) = null): void
        {
            if (Utils.getBooStrVazia(strTabelaNome))
            {
                return;
            }

            if (fncSucesso == null)
            {
                return;
            }

            var objPesquisa = new PesquisaInterlocutor();

            objPesquisa.arrFil = arrFil;
            objPesquisa.sqlTabelaNome = strTabelaNome;

            var objInterlocutor = new Interlocutor(SrvAjaxDbeBase.STR_METODO_PESQUISAR, objPesquisa);

            objInterlocutor.addFncErro(fncErro);
            objInterlocutor.addFncSucesso(fncSucesso);

            this.enviar(objInterlocutor);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}