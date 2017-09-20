// #region Reference

/// <reference path="../database/TabelaWeb.ts"/>
/// <reference path="Input.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

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

        private _strTexto: string;

        public get strTexto(): string
        {
            this._strTexto = this.getStrTexto();

            return this._strTexto;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public addOpcao(objValor: any, strNome: string): void
        {
            var tagOption: any = document.createElement('option');

            tagOption.value = objValor;
            tagOption.innerHTML = strNome;

            this.jq.append(tagOption);
        }

        public carregarDados(tblWeb: TabelaWeb): void
        {
            this.limparDados();

            if (AppWebBase.i.srvAjaxDbe == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
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

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_PESQUISAR_COMBO_BOX;

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.carregarDadosSucesso(o));
            objInterlocutor.addJsn(tblWeb);

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
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

            if (objInterlocutor.objData == SrvAjaxBase.STR_RESULTADO_VAZIO)
            {
                return;
            }

            var arrData: Array<any> = JSON.parse(objInterlocutor.objData.toString());

            arrData.forEach(o => this.carregarDadosSucesso2(o));
        }

        private carregarDadosSucesso2(par: ParValorNome): void
        {
            if (par == null)
            {
                return;
            }

            this.addOpcao(par.objValor, par.strNome);
        }

        private getStrTexto(): string
        {
            return this.jq.text();
        }

        public limparDados(): void
        {
            this.jq.html(Utils.STR_VAZIA);

            this.strValor = null;

            this.addOpcao(0, Utils.STR_VAZIA);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}