// #region Reference

/// <reference path="../../AppWebBase.ts"/>
/// <reference path="../../Objeto.ts"/>
/// <reference path="../../server/ajax/data/SrvAjaxDbeBase.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class DominioWebBase extends Objeto
    {
        // #region Constantes

        private static get STR_MSG_SALVAR_SUCESSO(): string { return "Registro salvo com sucesso." };

        // #endregion Constantes

        // #region Atributos

        private _booAtivo: boolean;
        private _dttAlteracao: Date;
        private _dttCadastro: Date;
        private _intId: number;
        private _intUsuarioAlteracaoId: number;
        private _intUsuarioCadastroId: number;

        public get booAtivo(): boolean
        {
            return this._booAtivo;
        }

        public set booAtivo(booAtivo: boolean)
        {
            this._booAtivo = booAtivo;
        }

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

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public copiarDados(obj: any): DominioWebBase
        {
            super.copiarDados(obj);

            this.dttAlteracao = new Date(String(this.dttAlteracao));
            this.dttCadastro = new Date(String(this.dttCadastro));

            return this;
        }

        public salvar(fncSucesso: ((o: Interlocutor) => void)): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_SALVAR_DOMINIO;

            objInterlocutor.addJsn(this);
            objInterlocutor.addFncSucesso(fncSucesso);

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}