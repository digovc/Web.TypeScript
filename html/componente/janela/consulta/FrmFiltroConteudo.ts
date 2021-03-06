﻿// #region Reference

/// <reference path="../../../../Keys.ts"/>
/// <reference path="../../../../OnKeyDownListener.ts"/>
/// <reference path="../../form/FormHtml.ts"/>
/// <reference path="PainelFiltro.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class FrmFiltroConteudo extends FormHtml implements OnKeyDownListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _pnlFiltro: PainelFiltro;

        private get pnlFiltro(): PainelFiltro
        {
            return this._pnlFiltro;
        }

        private set pnlFiltro(pnlFiltro: PainelFiltro)
        {
            this._pnlFiltro = pnlFiltro;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(pnlFiltro: PainelFiltro)
        {
            super("frmFiltroConteudo");

            this.pnlFiltro = pnlFiltro;
        }

        // #endregion Construtor

        // #region Métodos

        public atualizarArrFiltro(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (this.arrCmp == null)
            {
                return;
            }

            tblWeb.limparFiltro();

            this.arrCmp.forEach(c => this.atualizarArrFiltro2(tblWeb, c));
        }

        private atualizarArrFiltro2(tblWeb: TabelaWeb, cmpFiltro: CampoHtmlBase): void
        {
            if (cmpFiltro == null)
            {
                return;
            }

            if (cmpFiltro.tagInput.booVazio)
            {
                return;
            }

            var fil = new FiltroWeb(cmpFiltro.clnWeb, cmpFiltro.tagInput.strValor);

            fil.enmOperador = this.getEnmOperador(cmpFiltro);

            tblWeb.addFil(fil);
        }

        private cmpOnKeydown(arg: JQueryKeyEventObject): void
        {
            if (arg.keyCode != Keys.ENTER)
            {
                return;
            }

            arg.preventDefault();

            this.pesquisar();
        }

        private getEnmOperador(cmpFiltro: CampoHtmlBase): any
        {
            if (cmpFiltro == null)
            {
                return FiltroWeb_EnmOperador.IGUAL;
            }

            return cmpFiltro.jq.attr("enm_operador");
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarCssMain();
        }

        protected inicializarArrCmp(): void
        {
            super.inicializarArrCmp();

            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach(c => c.tagInput.booDisabled = false);
        }

        private inicializarCssMain(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            AppWebBase.i.srvHttp.atualizarCssMain();
        }

        private pesquisar(): void
        {
            if (this.pnlFiltro == null)
            {
                return;
            }

            this.pnlFiltro.pesquisar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.setEventosArrCmp();
        }

        private setEventosArrCmp(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach(c => c.addEvtOnKeyDownListener(this));
        }

        // #endregion Métodos

        // #region Eventos

        public onKeyDown(objSender: Objeto, arg: JQueryKeyEventObject): void
        {
            try
            {
                if (objSender instanceof CampoHtmlBase)
                {
                    this.cmpOnKeydown(arg);
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