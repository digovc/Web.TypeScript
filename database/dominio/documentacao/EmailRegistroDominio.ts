// #region Reference

/// <reference path="DocumentacaoDominioBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class EmailRegistroDominio extends DocumentacaoDominioBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _dirDocumentacao: string;
        private _strDocumentacaoTitulo: string;
        private _strEmail: string;
        private _urlDocumentacao: string;

        public get dirDocumentacao(): string
        {
            return this._dirDocumentacao;
        }

        public set dirDocumentacao(dirDocumentacao: string)
        {
            this._dirDocumentacao = dirDocumentacao;
        }

        public get strDocumentacaoTitulo(): string
        {
            return this._strDocumentacaoTitulo;
        }

        public set strDocumentacaoTitulo(strDocumentacaoTitulo: string)
        {
            this._strDocumentacaoTitulo = strDocumentacaoTitulo;
        }

        public get strEmail(): string
        {
            return this._strEmail;
        }

        public set strEmail(strEmail: string)
        {
            this._strEmail = strEmail;
        }

        public get urlDocumentacao(): string
        {
            return this._urlDocumentacao;
        }

        public set urlDocumentacao(urlDocumentacao: string)
        {
            this._urlDocumentacao = urlDocumentacao;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}