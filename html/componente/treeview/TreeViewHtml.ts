// #region Reference

/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="OnTreeViewNodeClickListener.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TreeViewHtml extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTvnFilho: Array<TreeViewNode>;

        public get arrTvnFilho(): Array<TreeViewNode>
        {
            if (this._arrTvnFilho != null)
            {
                return this._arrTvnFilho;
            }

            this._arrTvnFilho = new Array<TreeViewNode>();

            return this._arrTvnFilho;
        }

        public set arrTvnFilho(arrTvnFilho: Array<TreeViewNode>)
        {
            this._arrTvnFilho = arrTvnFilho;
        }

        private _divNodeContainer: Div;

        private get divNodeContainer(): Div
        {
            if (this._divNodeContainer != null)
            {
                return this._divNodeContainer;
            }

            this._divNodeContainer = new Div(this.strId + "_divNodeContainer");

            return this._divNodeContainer;
        }

        // #endregion Atributos

        // #region Construtor
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

            tvnFilho.tvhPai = this;

            if (Utils.getBooStrVazia(tvnFilho.strLayoutFixo))
            {
                return;
            }

            this.divNodeContainer.jq.append(tvnFilho.strLayoutFixo);

            tvnFilho.iniciar();
        }

        public limpar(): void
        {
            this.arrTvnFilho = null;
            this.divNodeContainer.strConteudo = null;
        }

        public processarOnClick(tvn: TreeViewNode, arg: JQueryEventObject): void
        {
            if (tvn == null)
            {
                return;
            }

            this.dispararEvtOnTreeViewNodeClickListener(tvn, arg);
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnTreeViewNodeClickListener

        private _arrEvtOnTreeViewNodeClickListener: Array<OnTreeViewNodeClickListener>;

        private get arrEvtOnTreeViewNodeClickListener(): Array<OnTreeViewNodeClickListener>
        {
            if (this._arrEvtOnTreeViewNodeClickListener != null)
            {
                return this._arrEvtOnTreeViewNodeClickListener;
            }

            this._arrEvtOnTreeViewNodeClickListener = new Array<OnTreeViewNodeClickListener>();

            return this._arrEvtOnTreeViewNodeClickListener;
        }

        public addEvtOnTreeViewNodeClickListener(evt: OnTreeViewNodeClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTreeViewNodeClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnTreeViewNodeClickListener.push(evt);
        }

        private dispararEvtOnTreeViewNodeClickListener(tvn: TreeViewNode, arg: JQueryEventObject): void
        {
            if (this.arrEvtOnTreeViewNodeClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnTreeViewNodeClickListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onTreeViewNodeClick(this, tvn, arg);
            });
        }

        public removerEvtOnTreeViewNodeClickListener(evt: OnTreeViewNodeClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTreeViewNodeClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnTreeViewNodeClickListener.splice(this.arrEvtOnTreeViewNodeClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnTreeViewNodeClickListener

        // #endregion Eventos
    }
}