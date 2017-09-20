// #region Reference

/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickRightListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="../menu/contexto/MenuContexto.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TableRow extends ComponenteHtmlBase implements OnClickListener, OnClickRightListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _intId: number;
        private _tagTable: TableHtml = null;

        public get intId(): number
        {
            if (this._intId != null)
            {
                return this._intId;
            }

            this._intId = this.getIntId();

            return this._intId;
        }

        public get tagTable(): TableHtml
        {
            return this._tagTable;
        }

        public set tagTable(tagTable: TableHtml)
        {
            this._tagTable = tagTable;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private alterar(): void
        {
            if (this.intId < 1)
            {
                return;
            }

            var arg = new OnTableMenuClickArg();

            arg.enmTipo = OnTableMenuClickArg_EnmAcao.ALTERAR;
            arg.tagTableRow = this;

            this.processarOnTableMenuClick(arg);
        }

        private getIntId(): number
        {
            if (this.jq == null)
            {
                return;
            }

            return Number(this.jq.attr("int_id"));
        }

        private processarOnClick(arg: JQueryEventObject): void
        {
            if (this.intId < 1)
            {
                return;
            }

            this.selecionar(arg.ctrlKey);

            if (this.tagTable == null)
            {
                return;
            }

            this.tagTable.dispararEvtOnTableRowClickListener(this);
        }

        private processarOnClickRight(arg: JQueryMouseEventObject): void
        {
            if (this.intId < 1)
            {
                return;
            }

            this.selecionar(false);

            var objMenuContexto = new MenuContexto();

            objMenuContexto.addOpcao(("Alterar registro " + this.intId), (() => this.alterar()));

            objMenuContexto.abrirMenu(arg);
        }

        public processarOnTableMenuClick(arg: OnTableMenuClickArg): void
        {
            if (arg == null)
            {
                return;
            }

            if (this.tagTable == null)
            {
                return;
            }

            this.tagTable.processarOnTableMenuClick(arg);
        }

        private selecionar(booControl: boolean): void
        {
            if (this.tagTable == null)
            {
                return;
            }

            if (booControl)
            {
                this.booSelecionado = !this.booSelecionado;
                return;
            }

            this.tagTable.selecinarTudo(false);

            this.booSelecionado = !this.booSelecionado;
        }

        protected setBooSelecionado(booSelecionado: boolean): void
        {
            super.setBooSelecionado(booSelecionado);

            if (this.tagTable == null)
            {
                return;
            }

            if (booSelecionado)
            {
                this.tagTable.addRowSelecionada(this);
            }
            else
            {
                this.tagTable.removerRowSelecionada(this);
            }
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
            this.addEvtOnClickRightListener(this);
            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);
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
                        this.processarOnClick(arg);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onClickRight(tagSender: Tag, arg: JQueryMouseEventObject): void
        {
            try
            {
                switch (tagSender)
                {
                    case this:
                        this.processarOnClickRight(arg);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onMouseLeave(tagSender: Tag, arg: JQueryMouseEventObject): void
        {
            try
            {
                this.jq.css("background-color", this.booSelecionado ? AppWebBase.i.objTema.corSelecionado : Utils.STR_VAZIA);
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onMouseOver(tagSender: Tag, arg: JQueryMouseEventObject): void
        {
            try
            {
                this.jq.css("background-color", AppWebBase.i.objTema.corMouseOver);
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}