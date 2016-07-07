/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../ComponenteHtml.ts"/>
/// <reference path="MenuContextoItem.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuContexto extends ComponenteHtml implements OnClickListener
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

        constructor()
        {
            super(null);

            this.strId = ("tagMenuContexto_" + this.intObjetoId);
        }

        // #endregion Construtores

        // #region Métodos

        public abrirMenu(arg: JQueryEventObject): void
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

            this.jq.css("left", (arg.pageX - 50));
            this.jq.css("top", (arg.pageY - 10));

            this.iniciar();
            this.mostrar();

            AppWeb.i.abrirTagFocoExclusivo(this);
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
        public addOpcao(strOpcaoTitulo: string, fncOnClick: Function = null): void
        {
            if (Utils.getBooStrVazia(strOpcaoTitulo))
            {
                return;
            }

            var strMciId = (this.strId + "_MenuContextoItem_" + this.arrMci.length);

            var mci = new MenuContextoItem(strMciId, this, fncOnClick);

            mci.strTitulo = strOpcaoTitulo;

            this.addMci(mci);
        }

        public dispose(): void
        {
            super.dispose();

            AppWeb.i.pag.removeEvtOnClickListener(this);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarArrMci();
        }

        private inicializarArrMci(): void
        {
            this.arrMci.forEach((mci) => { mci.iniciar(); });
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

            this.arrMci.forEach((mci) => { strConteudo += mci.strLayoutFixo; });

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

            window.setTimeout(() => { AppWeb.i.pag.addEvtOnClickListener(this); }, 1);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.dispose();
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