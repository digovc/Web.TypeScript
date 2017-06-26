/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="TableRow.ts"/>
/// <reference path="OnTableMenuClickArg.ts"/>
/// <reference path="OnTableMenuClickListener.ts"/>
/// <reference path="OnTableRowClickListener.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TableHtml extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrRow: Array<TableRow>;
        private _arrRowSelecionada: Array<TableRow>;
        private _intRowSelecionadaQtd: number;
        private _rowSelecionada: TableRow;
        private _tagTable: Tag;
        private _tagTbody: Tag;
        private _tblWeb: TabelaWeb;

        private get arrRow(): Array<TableRow>
        {
            if (this._arrRow != null)
            {
                return this._arrRow;
            }

            this._arrRow = this.getArrRow();

            return this._arrRow;
        }

        private get arrRowSelecionada(): Array<TableRow>
        {
            if (this._arrRowSelecionada != null)
            {
                return this._arrRowSelecionada;
            }

            this._arrRowSelecionada = new Array<TableRow>();

            return this._arrRowSelecionada;
        }

        public get intRowSelecionadaQtd(): number
        {
            this._intRowSelecionadaQtd = this.arrRowSelecionada.length;

            return this._intRowSelecionadaQtd;
        }

        public get rowSelecionada(): TableRow
        {
            this._rowSelecionada = this.getRowSelecionada();

            return this._rowSelecionada;
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

        public get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtor

        // #endregion Construtor

        // #region Métodos

        public addRowSelecionada(rowSelecionada: TableRow): void
        {
            if (rowSelecionada == null)
            {
                return;
            }

            if (this.arrRowSelecionada.indexOf(rowSelecionada) > -1)
            {
                return;
            }

            this.arrRowSelecionada.push(rowSelecionada);
        }

        private getArrRow(): Array<TableRow>
        {
            if (this.tagTbody == null)
            {
                return;
            }

            if (this.tagTbody.jq == null)
            {
                return;
            }

            var arrJqTableRow = this.tagTbody.jq.find('[clazz=TableRow]');

            if (arrJqTableRow == null)
            {
                return;
            }

            var arrTagTableRowResultado = new Array<TableRow>();

            for (var i = 0; i < arrJqTableRow.length; i++)
            {
                this.getArrRow2(arrTagTableRowResultado, arrJqTableRow[i]);
            }

            return arrTagTableRowResultado;
        }

        private getArrRow2(arrTagTableRow: Array<TableRow>, jqTableRow: any): void
        {
            if (jqTableRow == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(jqTableRow.id))
            {
                return;
            }

            var tagTableRow = new TableRow(jqTableRow.id);

            tagTableRow.tagGridHtml = this;

            arrTagTableRow.push(tagTableRow);
        }

        public getIntRowSelecionadaId(): number
        {
            if (this.rowSelecionada == null)
            {
                return 0;
            }

            return this.rowSelecionada.intId;
        }

        private getRowSelecionada(): TableRow
        {
            if (this.arrRowSelecionada.length < 1)
            {
                return;
            }

            return this.arrRowSelecionada[0];
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
            this.inicializarArrTagRow();
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

        private inicializarArrTagRow(): void
        {
            if (this.arrRow == null)
            {
                return;
            }

            if (this.arrRow.length < 1)
            {
                return;
            }

            for (var i = 0; i < this.arrRow.length; i++)
            {
                this.arrRow[i].iniciar();
            }
        }

        public processarOnGridMenuClick(arg: OnTableMenuClickArg): void
        {
            this.dispararEvtOnGridMenuClickListener(arg);
        }

        public removerRowSelecionada(rowSelecionada: TableRow): void
        {
            if (rowSelecionada == null)
            {
                return;
            }

            if (this.arrRowSelecionada.indexOf(rowSelecionada) < 0)
            {
                return;
            }

            this.arrRowSelecionada.splice(this.arrRowSelecionada.indexOf(rowSelecionada), 1);
        }

        public selecinar(intId: number, booSelecionar: boolean): void
        {
            if (intId < 1)
            {
                return;
            }

            for (var i = 0; i < this.arrRow.length; i++)
            {
                var row = this.arrRow[i];

                if (row == null)
                {
                    continue;
                }

                if (row.intId != intId)
                {
                    continue;
                }

                row.booSelecionado = booSelecionar;
                return;
            }
        }

        public selecinarTudo(booSelecionar: boolean): void
        {
            if (this.arrRowSelecionada.length < 1)
            {
                return;
            }

            this.arrRow.forEach((row) => { row.booSelecionado = booSelecionar; });
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnGridMenuClickListener

        private _arrEvtOnGridMenuClickListener: Array<OnTableMenuClickListener>;

        private get arrEvtOnGridMenuClickListener(): Array<OnTableMenuClickListener>
        {
            if (this._arrEvtOnGridMenuClickListener != null)
            {
                return this._arrEvtOnGridMenuClickListener;
            }

            this._arrEvtOnGridMenuClickListener = new Array<OnTableMenuClickListener>();

            return this._arrEvtOnGridMenuClickListener;
        }

        public addEvtOnGridMenuClickListener(evt: OnTableMenuClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnGridMenuClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnGridMenuClickListener.push(evt);
        }

        private dispararEvtOnGridMenuClickListener(arg: OnTableMenuClickArg): void
        {
            if (arg == null)
            {
                return;
            }

            if (this.arrEvtOnGridMenuClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnGridMenuClickListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onTableMenuClick(this, arg);
            });
        }

        public removerEvtOnGridMenuClickListener(evt: OnTableMenuClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnGridMenuClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnGridMenuClickListener.splice(this.arrEvtOnGridMenuClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnGridMenuClickListener

        // #region Evento OnRowClickListener

        private _arrEvtOnRowClickListener: Array<OnTableRowClickListener>;

        private get arrEvtOnRowClickListener(): Array<OnTableRowClickListener>
        {
            if (this._arrEvtOnRowClickListener != null)
            {
                return this._arrEvtOnRowClickListener;
            }

            this._arrEvtOnRowClickListener = new Array<OnTableRowClickListener>();

            return this._arrEvtOnRowClickListener;
        }

        public addEvtOnRowClickListener(evt: OnTableRowClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnRowClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnRowClickListener.push(evt);
        }

        public dispararEvtOnRowClickListener(tagTableRow: TableRow): void
        {
            if (this.arrEvtOnRowClickListener.length == 0)
            {
                return;
            }

            if (tagTableRow == null)
            {
                return;
            }

            this.arrEvtOnRowClickListener.forEach((evt) => { evt.onTableRowClick(this, tagTableRow); });
        }

        public removerEvtOnRowClickListener(evt: OnTableRowClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnRowClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnRowClickListener.splice(this.arrEvtOnRowClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnRowClickListener

        // #region Evento OnRowDoubleClickListener

        private _arrEvtOnRowDoubleClickListener: Array<OnTableRowDoubleClickListener>;

        private get arrEvtOnRowDoubleClickListener(): Array<OnTableRowDoubleClickListener>
        {
            if (this._arrEvtOnRowDoubleClickListener != null)
            {
                return this._arrEvtOnRowDoubleClickListener;
            }

            this._arrEvtOnRowDoubleClickListener = new Array<OnTableRowDoubleClickListener>();

            return this._arrEvtOnRowDoubleClickListener;
        }

        public addEvtOnRowDoubleClickListener(evt: OnTableRowDoubleClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnRowDoubleClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnRowDoubleClickListener.push(evt);
        }

        public dispararEvtOnRowDoubleClickListener(tagTableRow: TableRow): void
        {
            if (this.arrEvtOnRowDoubleClickListener.length == 0)
            {
                return;
            }

            if (tagTableRow == null)
            {
                return;
            }

            this.arrEvtOnRowDoubleClickListener.forEach((evt) => { evt.onTableRowDoubleClick(this, tagTableRow); });
        }

        public removerEvtOnRowDoubleClickListener(evt: OnTableRowDoubleClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnRowDoubleClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnRowDoubleClickListener.splice(this.arrEvtOnRowDoubleClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnRowDoubleClickListener

        // #endregion Eventos
    }
}