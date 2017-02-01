/// <reference path="../componente/markdown/Sumario.ts"/>
/// <reference path="../componente/markdown/Viewer.ts"/>
/// <reference path="../componente/mobile/ActionBar.ts"/>
/// <reference path="PagMobile.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagMarkdownBase extends PagMobile implements OnMenuClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divSumario: Sumario;
        private _divViewer: Viewer;

        private _divActionBar: ActionBar;

        private get divActionBar(): ActionBar
        {
            if (this._divActionBar != null)
            {
                return this._divActionBar;
            }

            this._divActionBar = new ActionBar();

            return this._divActionBar;
        }

        private get divSumario(): Sumario
        {
            if (this._divSumario != null)
            {
                return this._divSumario;
            }

            this._divSumario = new Sumario(this);

            return this._divSumario;
        }

        private get divViewer(): Viewer
        {
            if (this._divViewer != null)
            {
                return this._divViewer;
            }

            this._divViewer = new Viewer(this);

            return this._divViewer;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirConteudo(divSumarioItem: SumarioItem): void
        {
            this.divViewer.abrirConteudo(divSumarioItem);
        }

        public fecharSumario(): void
        {
            this.divSumario.esconder();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.divActionBar.iniciar();
            this.divSumario.iniciar();
            this.divViewer.iniciar();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.divActionBar.addEvtOnMenuClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onMenuClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.divActionBar:
                        this.divSumario.mostrarEsconder();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}