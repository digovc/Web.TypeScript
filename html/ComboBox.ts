/// <reference path="../database/TabelaWeb.ts"/>
/// <reference path="Input.ts"/>

module Web
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

            if (AppWebBase.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            var objInterlocutor: Interlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_PESQUISAR_COMBO_BOX;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.carregarDadosSucesso(objInterlocutor); });
            objInterlocutor.addJsn(tblWeb);

            AppWebBase.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private carregarDadosSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            if (objInterlocutor.objData == ServerAjax.STR_RESULTADO_VAZIO)
            {
                return;
            }

            var arrData: Array<any> = JSON.parse(objInterlocutor.objData.toString());

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