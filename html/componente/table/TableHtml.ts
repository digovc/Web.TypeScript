// #region Reference

/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="TableRow.ts"/>
/// <reference path="OnTableMenuClickArg.ts"/>
/// <reference path="OnTableMenuClickListener.ts"/>
/// <reference path="OnTableRowClickListener.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TableHtml extends ComponenteHtmlBase
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

            tagTableRow.tagTable = this;

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
            this.inicializarArrTagRow();
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

        public processarOnTableMenuClick(arg: OnTableMenuClickArg): void
        {
            this.dispararEvtOnTableMenuClickListener(arg);
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

            this.arrRow.forEach(r => r.booSelecionado = booSelecionar);
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnTableMenuClickListener

        private _arrEvtOnTableMenuClickListener: Array<OnTableMenuClickListener>;

        private get arrEvtOnTableMenuClickListener(): Array<OnTableMenuClickListener>
        {
            if (this._arrEvtOnTableMenuClickListener != null)
            {
                return this._arrEvtOnTableMenuClickListener;
            }

            this._arrEvtOnTableMenuClickListener = new Array<OnTableMenuClickListener>();

            return this._arrEvtOnTableMenuClickListener;
        }

        public addEvtOnTableMenuClickListener(evt: OnTableMenuClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTableMenuClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnTableMenuClickListener.push(evt);
        }

        private dispararEvtOnTableMenuClickListener(arg: OnTableMenuClickArg): void
        {
            if (arg == null)
            {
                return;
            }

            if (this.arrEvtOnTableMenuClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnTableMenuClickListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onTableMenuClick(this, arg);
            });
        }

        public removerEvtOnTableMenuClickListener(evt: OnTableMenuClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTableMenuClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnTableMenuClickListener.splice(this.arrEvtOnTableMenuClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnTableMenuClickListener

        // #region Evento OnTableRowClickListener

        private _arrEvtOnTableRowClickListener: Array<OnTableRowClickListener>;

        private get arrEvtOnTableRowClickListener(): Array<OnTableRowClickListener>
        {
            if (this._arrEvtOnTableRowClickListener != null)
            {
                return this._arrEvtOnTableRowClickListener;
            }

            this._arrEvtOnTableRowClickListener = new Array<OnTableRowClickListener>();

            return this._arrEvtOnTableRowClickListener;
        }

        public addEvtOnTableRowClickListener(evt: OnTableRowClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTableRowClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnTableRowClickListener.push(evt);
        }

        public dispararEvtOnTableRowClickListener(tagTableRow: TableRow): void
        {
            if (this.arrEvtOnTableRowClickListener.length == 0)
            {
                return;
            }

            if (tagTableRow == null)
            {
                return;
            }

            this.arrEvtOnTableRowClickListener.forEach(e => e.onTableRowClick(this, tagTableRow));
        }

        public removerEvtOnTableRowClickListener(evt: OnTableRowClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTableRowClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnTableRowClickListener.splice(this.arrEvtOnTableRowClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnTableRowClickListener

        // #region Evento OnTableRowDoubleClickListener

        private _arrEvtOnTableRowDoubleClickListener: Array<OnTableRowDoubleClickListener>;

        private get arrEvtOnTableRowDoubleClickListener(): Array<OnTableRowDoubleClickListener>
        {
            if (this._arrEvtOnTableRowDoubleClickListener != null)
            {
                return this._arrEvtOnTableRowDoubleClickListener;
            }

            this._arrEvtOnTableRowDoubleClickListener = new Array<OnTableRowDoubleClickListener>();

            return this._arrEvtOnTableRowDoubleClickListener;
        }

        public addEvtOnTableRowDoubleClickListener(evt: OnTableRowDoubleClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTableRowDoubleClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnTableRowDoubleClickListener.push(evt);
        }

        public dispararEvtOnTableRowDoubleClickListener(tagTableRow: TableRow): void
        {
            if (this.arrEvtOnTableRowDoubleClickListener.length == 0)
            {
                return;
            }

            if (tagTableRow == null)
            {
                return;
            }

            this.arrEvtOnTableRowDoubleClickListener.forEach(e => e.onTableRowDoubleClick(this, tagTableRow));
        }

        public removerEvtOnTableRowDoubleClickListener(evt: OnTableRowDoubleClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnTableRowDoubleClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnTableRowDoubleClickListener.splice(this.arrEvtOnTableRowDoubleClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnTableRowDoubleClickListener

        // #endregion Eventos
    }
}