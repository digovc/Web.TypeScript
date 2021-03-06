﻿// #region Reference

/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="MenuMobileItem.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class MenuMobileBase extends ComponenteHtmlBase implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMmi: Array<MenuMobileItem>;

        private get arrMmi(): Array<MenuMobileItem>
        {
            if (this._arrMmi != null)
            {
                return this._arrMmi;
            }

            this._arrMmi = new Array<MenuMobileItem>();

            this.inicializarItem(this._arrMmi);

            return this._arrMmi;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public abrir(): void
        {
            this.mostrar();
        }

        private fechar(): void
        {
            this.esconder();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.arrMmi.forEach(m => m.iniciar());
        }

        protected abstract inicializarItem(arrMmi: Array<MenuMobileItem>): void;

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.fechar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}