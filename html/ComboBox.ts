/// <reference path="../database/TabelaWeb.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ComboBox extends Input
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addOpcao(par: ParValorNome): void
        {
            if (par == null)
            {
                return;
            }

            if (par.objValor == null)
            {
                return;
            }

            var tagOption: any = document.createElement('option');

            tagOption.value = par.objValor;
            tagOption.innerHTML = par.strNome;

            this.jq.append(tagOption);
        }

        public carregarDados(tblWeb: TabelaWeb): void
        {
            this.limparDados();

            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.PESQUISAR_COMBO_BOX;

            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjaxDb: SolicitacaoAjaxDb) => { this.carregarDadosSucesso(objSolicitacaoAjaxDb); });
            objSolicitacaoAjaxDb.addJsn(tblWeb);

            objSolicitacaoAjaxDb.enviar();
        }

        private carregarDadosSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return;
            }

            var arrData: Array<any> = JSON.parse(objSolicitacaoAjaxDb.strData);

            arrData.forEach((par) => { this.carregarDadosSucesso2(par); });
        }

        private carregarDadosSucesso2(par: ParValorNome): void
        {
            if (par == null)
            {
                return;
            }

            this.addOpcao(par);
        }

        public limparDados(): void
        {
            this.jq.html(Utils.STR_VAZIA);

            this.strValor = null;

            this.addOpcao(new ParValorNome(0, Utils.STR_VAZIA));
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}