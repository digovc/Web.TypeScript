/// <reference path="GridRow.ts"/>
/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Utils.ts"/>

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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrTagGridRow != null)
                {
                    return this._arrTagGridRow;
                }

                this._arrTagGridRow = this.getArrTagGridRow();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tagTable != null)
                {
                    return this._tagTable;
                }

                this._tagTable = new Tag(this.strId + "_table");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tagTable;
        }

        private get tagTbody(): Tag
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tagTbody != null)
                {
                    return this._tagTbody;
                }

                this._tagTbody = new Tag(this.strId + "_tbody");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tagTbody;
        }

        private get tblWeb(): TabelaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tblWeb != null)
                {
                    return this._tblWeb;
                }

                this._tblWeb = this.getTblWeb();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtores

        // #endregion Construtores

        // #region Métodos

        private getArrTagGridRow(): Array<GridRow>
        {
            // #region Variáveis

            var arrJqGridRow: JQuery;
            var arrTagGridRowResultado: Array<GridRow>;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tagTbody == null)
                {
                    return;
                }

                if (this.tagTbody.jq == null)
                {
                    return;
                }

                arrJqGridRow = this.tagTbody.jq.find('[clazz=GridRow]');

                if (arrJqGridRow == null)
                {
                    return;
                }

                arrTagGridRowResultado = new Array<GridRow>();

                for (var i = 0; i < arrJqGridRow.length; i++)
                {
                    this.getArrTagGridRow2(arrTagGridRowResultado, arrJqGridRow[i]);
                }

                return arrTagGridRowResultado;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private getArrTagGridRow2(arrTagGridRow: Array<GridRow>, jqGridRow: any): void
        {
            // #region Variáveis

            var tagGridRow: GridRow;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (jqGridRow == null)
                {
                    return;
                }

                if (Utils.getBooStrVazia(jqGridRow.id))
                {
                    return;
                }

                tagGridRow = new GridRow(jqGridRow.id);

                tagGridRow.tagGridHtml = this;

                arrTagGridRow.push(tagGridRow);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private getTblWeb(): TabelaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializarCabecalhoFixo();
                this.inicializarLstTagRow();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private inicializarCabecalhoFixo(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private inicializarLstTagRow(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnRowDoubleClickListener

        private _arrEvtOnRowDoubleClickListener: Array<OnRowDoubleClickListener>;

        private get arrEvtOnRowDoubleClickListener(): Array<OnRowDoubleClickListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnRowDoubleClickListener != null)
                {
                    return this._arrEvtOnRowDoubleClickListener;
                }

                this._arrEvtOnRowDoubleClickListener = new Array<OnRowDoubleClickListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnRowDoubleClickListener;
        }

        public addEvtOnRowDoubleClickListener(evtOnRowDoubleClickListener: OnRowDoubleClickListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public dispararEvtOnRowDoubleClickListener(tagGridRow: GridRow): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public removerEvtOnRowDoubleClickListener(evtOnRowDoubleClickListener: OnRowDoubleClickListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Evento OnRowDoubleClickListener

        // #endregion Eventos
    }
}