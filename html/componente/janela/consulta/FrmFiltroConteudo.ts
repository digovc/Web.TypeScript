/// <reference path="../../form/FormHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class FrmFiltroConteudo extends FormHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores

        constructor()
        {
            super("frmFiltroConteudo");
        }

        // #endregion Construtores

        // #region Métodos

        public atualizarLstFiltro(tblWeb: TabelaWeb): void
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

            this.arrCmp.forEach((cmpFiltro) => { this.atualizarLstFiltro2(tblWeb, cmpFiltro); });
        }

        private atualizarLstFiltro2(tblWeb: TabelaWeb, cmpFiltro: CampoHtml): void
        {
            if (cmpFiltro == null)
            {
                return;
            }

            if (cmpFiltro.tagInput.booVazio)
            {
                return;
            }

            var fil = new FiltroWeb();

            fil.clnWeb = cmpFiltro.cln;
            fil.enmOperador = this.getEnmOperador(cmpFiltro);
            fil.objValor = cmpFiltro.tagInput.strValor;

            tblWeb.addFiltro(fil);
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

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}