// #region Reference

/// <reference path="../database/TabelaWeb.ts"/>
/// <reference path="../server/ajax/SrvAjaxBase.ts"/>
/// <reference path="Input.ts"/>

// #endregion Reference

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

        private _intOpcaoQuantidade: number;
        private _strTexto: string;

        public get intOpcaoQuantidade(): number
        {
            this._intOpcaoQuantidade = (this.jq[0] as any).length;

            return this._intOpcaoQuantidade;
        }

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

        public carregarDados(tblWeb: TabelaWeb, fncSucesso: Function = null): void
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

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.carregarDadosSucesso(o, fncSucesso));
            objInterlocutor.addJsn(tblWeb);

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private carregarDadosSucesso(objInterlocutor: Interlocutor, fncSucesso: Function): void
        {
            if (objInterlocutor == null)
            {
                this.carregarDadosSucessoVazio(fncSucesso);
                return;
            }

            if (objInterlocutor.objData == null)
            {
                this.carregarDadosSucessoVazio(fncSucesso);
                return;
            }

            if (objInterlocutor.objData == SrvAjaxBase.STR_RESULTADO_VAZIO)
            {
                this.carregarDadosSucessoVazio(fncSucesso);
                return;
            }

            var arrData: Array<any> = JSON.parse(objInterlocutor.objData.toString());

            arrData.forEach(o => this.carregarDadosSucesso2(o));

            if (fncSucesso != null)
            {
                fncSucesso();
            }
        }

        private carregarDadosSucessoVazio(fncSucesso: Function): void
        {
            Notificacao.notificar("Nenhum registro foi encontrado.", Notificacao_EnmTipo.INFO);

            if (fncSucesso != null)
            {
                fncSucesso();
            }
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