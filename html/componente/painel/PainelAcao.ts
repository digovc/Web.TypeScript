﻿// #region Reference

/// <reference path="../../Div.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class PainelAcao extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAcaoPrincipal: BotaoCircular;

        protected get btnAcaoPrincipal(): BotaoCircular
        {
            if (this._btnAcaoPrincipal != null)
            {
                return this._btnAcaoPrincipal;
            }

            this._btnAcaoPrincipal = new BotaoCircular("btnAcaoPrincipal");

            return this._btnAcaoPrincipal;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected inicializar(): void
        {
            super.inicializar();

            this.btnAcaoPrincipal.iniciar();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}