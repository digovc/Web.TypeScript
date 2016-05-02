/// <reference path="../../ComponenteHtml.ts"/>
/// <reference path="MenuContextoItem.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuContexto extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMci: Array<MenuContextoItem>;

        private get arrMci(): Array<MenuContextoItem>
        {
            if (this._arrMci != null)
            {
                return this._arrMci;
            }

            this._arrMci = new Array<MenuContextoItem>();

            return this._arrMci;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirMenu(): void
        {
            if (Utils.getBooStrVazia(this.strLayoutFixo))
            {
                return;
            }

            this.montarLayoutFixo();

            $(document).add(this.strLayoutFixo);
        }

        public addMci(mci: MenuContextoItem): void
        {
            if (mci == null)
            {
                return;
            }

            if (this.arrMci.indexOf(mci) > -1)
            {
                return;
            }

            mci.mnc = this;

            this.arrMci.push(mci);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}