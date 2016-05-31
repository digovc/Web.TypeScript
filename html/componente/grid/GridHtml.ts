/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="GridRow.ts"/>
/// <reference path="OnRowClickListener.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class GridHtml extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTagGridRow: Array<GridRow>;
        private _btnAdicionar: BotaoAdicionarMini;
        private _tagTable: Tag;
        private _tagTbody: Tag;
        private _tblWeb: TabelaWeb;

        private get arrTagGridRow(): Array<GridRow>
        {
            if (this._arrTagGridRow != null)
            {
                return this._arrTagGridRow;
            }

            this._arrTagGridRow = this.getArrTagGridRow();

            return this._arrTagGridRow;
        }

        public get btnAdicionar(): BotaoAdicionarMini
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoAdicionarMini(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        private get tagTable(): Tag
        {
            if (this._tagTable != null)
            {
                return this._tagTable;
            }

            this._tagTable = new Tag(this.strId + "_table");

            return this._tagTable;
        }

        private get tagTbody(): Tag
        {
            if (this._tagTbody != null)
            {
                return this._tagTbody;
            }

            this._tagTbody = new Tag(this.strId + "_tbody");

            return this._tagTbody;
        }

        private get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        private getArrTagGridRow(): Array<GridRow>
        {
            if (this.tagTbody == null)
            {
                return;
            }

            if (this.tagTbody.jq == null)
            {
                return;
            }

            var arrJqGridRow = this.tagTbody.jq.find('[clazz=GridRow]');

            if (arrJqGridRow == null)
            {
                return;
            }

            var arrTagGridRowResultado = new Array<GridRow>();

            for (var i = 0; i < arrJqGridRow.length; i++)
            {
                this.getArrTagGridRow2(arrTagGridRowResultado, arrJqGridRow[i]);
            }

            return arrTagGridRowResultado;
        }

        private getArrTagGridRow2(arrTagGridRow: Array<GridRow>, jqGridRow: any): void
        {
            if (jqGridRow == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(jqGridRow.id))
            {
                return;
            }

            var tagGridRow = new GridRow(jqGridRow.id);

            tagGridRow.tagGridHtml = this;

            arrTagGridRow.push(tagGridRow);
        }

        private getTblWeb(): TabelaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.jq.attr("tbl_web_nome")))
            {
                return null;
            }

            return new TabelaWeb(this.jq.attr("tbl_web_nome"));
        }

        protected inicializar(): void
        {
            this.inicializarCabecalhoFixo();
            this.inicializarLstTagRow();
        }

        private inicializarCabecalhoFixo(): void
        {
            if (this.tagTable.jq == null)
            {
                return;
            }

            //this.tagTable.jq.floatThead({
            //    scrollContainer: function ()
            //    {
            //        return this.tagTable.jq.closest('#divGrid');
            //    }
            //});
        }

        private inicializarLstTagRow(): void
        {
            if (this.arrTagGridRow == null)
            {
                return;
            }

            if (this.arrTagGridRow.length < 1)
            {
                return;
            }

            for (var i = 0; i < this.arrTagGridRow.length; i++)
            {
                this.arrTagGridRow[i].iniciar();
            }
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnRowClickListener

        private _arrEvtOnRowClickListener: Array<OnRowClickListener>;

        private get arrEvtOnRowClickListener(): Array<OnRowClickListener>
        {
            if (this._arrEvtOnRowClickListener != null)
            {
                return this._arrEvtOnRowClickListener;
            }

            this._arrEvtOnRowClickListener = new Array<OnRowClickListener>();

            return this._arrEvtOnRowClickListener;
        }

        public addEvtOnRowClickListener(evtOnRowClickListener: OnRowClickListener): void
        {
            if (evtOnRowClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnRowClickListener.indexOf(evtOnRowClickListener) > -1)
            {
                return;
            }

            this.arrEvtOnRowClickListener.push(evtOnRowClickListener);
        }

        public dispararEvtOnRowClickListener(tagGridRow: GridRow): void
        {
            if (this.arrEvtOnRowClickListener.length == 0)
            {
                return;
            }

            if (tagGridRow == null)
            {
                return;
            }

            this.arrEvtOnRowClickListener.forEach((evt) => { evt.onRowClick(this, tagGridRow); });
        }

        public removerEvtOnRowClickListener(evtOnRowClickListener: OnRowClickListener): void
        {
            if (evtOnRowClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnRowClickListener.indexOf(evtOnRowClickListener) == -1)
            {
                return;
            }

            this.arrEvtOnRowClickListener.splice(this.arrEvtOnRowClickListener.indexOf(evtOnRowClickListener));
        }

        // #endregion Evento OnRowClickListener

        // #region Evento OnRowDoubleClickListener

        private _arrEvtOnRowDoubleClickListener: Array<OnRowDoubleClickListener>;

        private get arrEvtOnRowDoubleClickListener(): Array<OnRowDoubleClickListener>
        {
            if (this._arrEvtOnRowDoubleClickListener != null)
            {
                return this._arrEvtOnRowDoubleClickListener;
            }

            this._arrEvtOnRowDoubleClickListener = new Array<OnRowDoubleClickListener>();

            return this._arrEvtOnRowDoubleClickListener;
        }

        public addEvtOnRowDoubleClickListener(evtOnRowDoubleClickListener: OnRowDoubleClickListener): void
        {
            if (evtOnRowDoubleClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnRowDoubleClickListener.indexOf(evtOnRowDoubleClickListener) > -1)
            {
                return;
            }

            this.arrEvtOnRowDoubleClickListener.push(evtOnRowDoubleClickListener);
        }

        public dispararEvtOnRowDoubleClickListener(tagGridRow: GridRow): void
        {
            if (this.arrEvtOnRowDoubleClickListener.length == 0)
            {
                return;
            }

            if (tagGridRow == null)
            {
                return;
            }

            this.arrEvtOnRowDoubleClickListener.forEach((evt) => { evt.onRowDoubleClick(this, tagGridRow); });
        }

        public removerEvtOnRowDoubleClickListener(evtOnRowDoubleClickListener: OnRowDoubleClickListener): void
        {
            if (evtOnRowDoubleClickListener == null)
            {
                return;
            }

            if (this.arrEvtOnRowDoubleClickListener.indexOf(evtOnRowDoubleClickListener) == -1)
            {
                return;
            }

            this.arrEvtOnRowDoubleClickListener.splice(this.arrEvtOnRowDoubleClickListener.indexOf(evtOnRowDoubleClickListener));
        }

        // #endregion Evento OnRowDoubleClickListener

        // #endregion Eventos
    }
}