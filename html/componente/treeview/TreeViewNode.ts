// #region Reference

/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TreeViewNode extends ComponenteHtmlBase implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTvnFilho: Array<TreeViewNode>;
        private _divIcone: Div;
        private _divNodeContainer: Div;
        private _divSeta: Div;
        private _divTitulo: Div;
        private _srcIcone: string = "/res/media/png/tree_view_icon_default.png";
        private _tvhPai: TreeViewHtml;
        private _tvnPai: TreeViewNode;

        private get arrTvnFilho(): Array<TreeViewNode>
        {
            if (this._arrTvnFilho != null)
            {
                return this._arrTvnFilho;
            }

            this._arrTvnFilho = new Array<TreeViewNode>();

            return this._arrTvnFilho;
        }

        private get divIcone(): Div
        {
            if (this._divIcone != null)
            {
                return this._divIcone;
            }

            this._divIcone = new Div(this.strId + "_divIcone");

            return this._divIcone;
        }

        private get divNodeContainer(): Div
        {
            if (this._divNodeContainer != null)
            {
                return this._divNodeContainer;
            }

            this._divNodeContainer = new Div(this.strId + "_divNodeContainer");

            return this._divNodeContainer;
        }

        private get divSeta(): Div
        {
            if (this._divSeta != null)
            {
                return this._divSeta;
            }

            this._divSeta = new Div(this.strId + "_divSeta");

            return this._divSeta;
        }

        private get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        public get srcIcone(): string
        {
            return this._srcIcone;
        }

        public set srcIcone(srcIcone: string)
        {
            this._srcIcone = srcIcone;
        }

        public get tvhPai(): TreeViewHtml
        {
            return this._tvhPai;
        }

        public set tvhPai(tvhPai: TreeViewHtml)
        {
            this._tvhPai = tvhPai;
        }

        private get tvnPai(): TreeViewNode
        {
            return this._tvnPai;
        }

        private set tvnPai(tvnPai: TreeViewNode)
        {
            this._tvnPai = tvnPai;
        }

        // #endregion Atributos

        // #region Construtor

        constructor()
        {
            super(null);
        }

        // #endregion Construtor

        // #region Métodos

        public addNode(tvnFilho: TreeViewNode): void
        {
            if (tvnFilho == null)
            {
                return;
            }

            if (this.arrTvnFilho.indexOf(tvnFilho) > -1)
            {
                return;
            }

            this.arrTvnFilho.push(tvnFilho);

            tvnFilho.tvnPai = this;

            if (Utils.getBooStrVazia(tvnFilho.strLayoutFixo))
            {
                return;
            }

            this.divNodeContainer.jq.append(tvnFilho.strLayoutFixo);

            tvnFilho.iniciar();
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return null;
            }

            if (this.tvhPai != null)
            {
                this.strId = (this.tvhPai.strId + "_tvn_" + this.tvhPai.arrTvnFilho.indexOf(this))
            }

            if (this.tvnPai != null)
            {
                this.strId = (this.tvnPai.strId + "_tvn_" + this.tvnPai.arrTvnFilho.indexOf(this))
            }

            if (Utils.getBooStrVazia(this.strId))
            {
                return null;
            }

            strLayoutFixo = strLayoutFixo.replace("_node_id", this.strId);
            strLayoutFixo = strLayoutFixo.replace("_node_titulo", this.strNome);
            strLayoutFixo = strLayoutFixo.replace("_node_container_id", this.divNodeContainer.strId);
            strLayoutFixo = strLayoutFixo.replace("_node_src_icone", this.srcIcone);

            return strLayoutFixo;
        }

        private processarOnClick(tvn: TreeViewNode, arg: JQueryEventObject): void
        {
            if (tvn == null)
            {
                return;
            }

            if (this.tvhPai != null)
            {
                this.tvhPai.processarOnClick(tvn, arg);
                return;
            }

            if (this.tvnPai != null)
            {
                this.tvnPai.processarOnClick(tvn, arg);
                return;
            }
        }

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
                        this.processarOnClick(this, arg);
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