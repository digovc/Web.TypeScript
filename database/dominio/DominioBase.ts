/// <reference path="../../Objeto.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class DominioBase extends Objeto
    {
        // #region Constantes

        private static get STR_MSG_SALVAR_SUCESSO(): string { return "Registro salvo com sucesso." };

        // #endregion Constantes

        // #region Atributos

        private _dttAlteracao: Date;
        private _dttCadastro: Date;
        private _intId: number;
        private _intUsuarioAlteracaoId: number;
        private _intUsuarioCadastroId: number;

        public get dttAlteracao(): Date
        {
            return this._dttAlteracao;
        }

        public set dttAlteracao(dttAlteracao: Date)
        {
            this._dttAlteracao = dttAlteracao;
        }

        public get dttCadastro(): Date
        {
            return this._dttCadastro;
        }

        public set dttCadastro(dttCadastro: Date)
        {
            this._dttCadastro = dttCadastro;
        }

        public get intId(): number
        {
            return this._intId;
        }

        public set intId(intId: number)
        {
            this._intId = intId;
        }

        public get intUsuarioAlteracaoId(): number
        {
            return this._intUsuarioAlteracaoId;
        }

        public set intUsuarioAlteracaoId(intUsuarioAlteracaoId: number)
        {
            this._intUsuarioAlteracaoId = intUsuarioAlteracaoId;
        }

        public get intUsuarioCadastroId(): number
        {
            return this._intUsuarioCadastroId;
        }

        public set intUsuarioCadastroId(intUsuarioCadastroId: number)
        {
            this._intUsuarioCadastroId = intUsuarioCadastroId;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public copiarDados(obj: any): void
        {
            super.copiarDados(obj);

            this.dttAlteracao = new Date(String(this.dttAlteracao));
            this.dttCadastro = new Date(String(this.dttCadastro));
        }

        public salvar(fncSucesso: Function): void
        {
            if (AppWeb.i.srvAjaxDb == null)
            {
                return;
            }

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.strMetodo = ServerAjaxDb.STR_METODO_SALVAR_DOMINIO;

            objSolicitacaoAjaxDb.addJsn(this);
            objSolicitacaoAjaxDb.addFncSucesso(fncSucesso);

            AppWeb.i.srvAjaxDb.enviar(objSolicitacaoAjaxDb);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}