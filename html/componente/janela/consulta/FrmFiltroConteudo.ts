/// <reference path="../../../../OnKeyDownListener.ts"/>
/// <reference path="../../form/FormHtml.ts"/>
/// <reference path="PainelFiltro.ts"/>

module NetZ_Web
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

        // #region Construtores

        constructor(pnlFiltro: PainelFiltro)
        {
            super("frmFiltroConteudo");

            this.pnlFiltro = pnlFiltro;
        }

        // #endregion Construtores

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

            this.arrCmp.forEach((cmpFiltro) => { this.atualizarArrFiltro2(tblWeb, cmpFiltro); });
        }

        private atualizarArrFiltro2(tblWeb: TabelaWeb, cmpFiltro: CampoHtml): void
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

        private getEnmOperador(cmpFiltro: CampoHtml): any
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

            ServerHttp.i.atualizarCssMain();
        }

        protected inicializarArrCmp(): void
        {
            super.inicializarArrCmp();

            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { cmp.tagInput.booDisabled = false; });
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

            this.arrCmp.forEach((cmp) => { this.setEventosArrCmp2(cmp); });
        }

        private setEventosArrCmp2(cmp: CampoHtml): void
        {
            cmp.addEvtOnKeyDownListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onKeyDown(objSender: Object, arg: JQueryKeyEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (objSender instanceof CampoHtml)
                {
                    this.cmpOnKeydown(arg);
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}