/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../../../OnFocusOutListener.ts"/>
/// <reference path="../../ComponenteHtml.ts"/>
/// <reference path="MenuContextoItem.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuContexto extends ComponenteHtml implements OnClickListener, OnFocusOutListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMci: Array<MenuContextoItem>;

        public get arrMci(): Array<MenuContextoItem>
        {
            if (this._arrMci != null)
            {
                return this._arrMci;
            }

            this._arrMci = new Array<MenuContextoItem>();

            return this._arrMci;
        }

        // #endregion Atributos

        // #region Construtor

        constructor()
        {
            super(null);

            this.strId = ("tagMenuContexto_" + this.intObjetoId);
        }

        // #endregion Construtor

        // #region Métodos

        public abrirMenu(arg: BaseJQueryEventObject): void
        {
            if (arg == null)
            {
                return;
            }

            if (arg.pageX < 1)
            {
                return;
            }

            if (arg.pageY < 1)
            {
                return;
            }

            if (this.arrMci == null)
            {
                return;
            }

            if (this.arrMci.length < 1)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.strLayoutFixo))
            {
                return;
            }

            $(document.body).append(this.strLayoutFixo);

            var intLeft = this.calcularLeft(arg.pageX);

            this.jq.css("left", intLeft);
            this.jq.css("top", (arg.pageY - 10));

            this.iniciar();
            this.mostrar();

            AppWebBase.i.tagFoco = this;
        }

        private addMci(mci: MenuContextoItem): void
        {
            if (mci == null)
            {
                return;
            }

            if (this.arrMci.indexOf(mci) > -1)
            {
                return;
            }

            this.arrMci.push(mci);
        }

        /**
         * Adiciona uma opção para este menu de contexto.
         * @param strOpcaoTitulo Título que ficará visível para o usuário.
         * @param fncOnClick Função que será chamada quando esta opção for clicada pelo usuário.
         * Essa função irá receber um objeto do tipo @see MenuContextoItem que é a instância da
         * opção clicada e outro do tipo @see JQueryEventObject contendo informações do evento
         * click.
         */
        public addOpcao(strTitulo: string, fncOnClick: ((o: MenuContextoItem, a: JQueryEventObject) => void) = null): string
        {
            if (Utils.getBooStrVazia(strTitulo))
            {
                return;
            }

            var strMciId = (this.strId + "_MenuContextoItem_" + this.arrMci.length);

            var mci = new MenuContextoItem(strMciId, this, fncOnClick);

            mci.strTitulo = strTitulo;

            this.addMci(mci);

            return mci.strId;
        }

        private calcularLeft(intPageX: number): number
        {
            var intResultado = (intPageX + 250 - window.screen.width);

            if (intResultado < 0)
            {
                return (intPageX - 50);
            }

            return (intPageX - 50 - intResultado);
        }

        public dispose(): void
        {
            super.dispose();

            AppWebBase.i.pag.removeEvtOnClickListener(this);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarArrMci();
        }

        private inicializarArrMci(): void
        {
            this.arrMci.forEach(m => m.iniciar());
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return;
            }

            strLayoutFixo = strLayoutFixo.replace("_id", this.strId);

            var strConteudo = Utils.STR_VAZIA;

            this.arrMci.forEach(m => strConteudo += m.strLayoutFixo);

            return strLayoutFixo.replace("_conteudo", strConteudo);
        }

        public processarClick(mci: MenuContextoItem): void
        {
            if (mci == null)
            {
                return;
            }

            if (this.arrMci.indexOf(mci) < 0)
            {
                return;
            }

            this.dispose();
        }

        protected setEventos(): void
        {
            super.setEventos();

            window.setTimeout((() => AppWebBase.i.pag.addEvtOnClickListener(this)), 1);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                this.dispose();
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onFocusOut(objSender: Objeto): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.dispose();
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