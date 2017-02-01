/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickRightListener.ts"/>
/// <reference path="../../../OnDoubleClickListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="MenuGrid.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class GridRow extends ComponenteHtml implements OnClickListener, OnClickRightListener, OnDoubleClickListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _intId: number;
        private _tagGridHtml: GridHtml = null;

        public get intId(): number
        {
            if (this._intId != null)
            {
                return this._intId;
            }

            this._intId = this.getIntId();

            return this._intId;
        }

        public get tagGridHtml(): GridHtml
        {
            return this._tagGridHtml;
        }

        public set tagGridHtml(tagGridHtml: GridHtml)
        {
            this._tagGridHtml = tagGridHtml;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected atualizarBooSelecionado(): void
        {
            super.atualizarBooSelecionado();

            if (this.tagGridHtml == null)
            {
                return;
            }

            if (this.booSelecionado)
            {
                this.tagGridHtml.addRowSelecionada(this);
            }
            else
            {
                this.tagGridHtml.removerRowSelecionada(this);
            }
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

            if (this.tagGridHtml == null)
            {
                return;
            }

            this.tagGridHtml.dispararEvtOnRowClickListener(this);
        }

        private processarOnClickRight(arg: JQueryMouseEventObject): void
        {
            this.selecionar(arg.ctrlKey);

            MenuGrid.abrirMenuGrid(this, arg);

            arg.stopPropagation();
        }

        private processarOnDoubleClick(): void
        {
            if (this.intId < 1)
            {
                return;
            }

            if (this.tagGridHtml == null)
            {
                return;
            }

            this.tagGridHtml.dispararEvtOnRowDoubleClickListener(this);
        }

        public processarOnGridMenuClick(arg: OnGridMenuClickArg): void
        {
            if (arg == null)
            {
                return;
            }

            if (this.tagGridHtml == null)
            {
                return;
            }

            this.tagGridHtml.processarOnGridMenuClick(arg);
        }

        private selecionar(booControl: boolean): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            if (booControl)
            {
                this.booSelecionado = !this.booSelecionado;
                return;
            }

            this.tagGridHtml.selecinarTudo(false);

            this.booSelecionado = !this.booSelecionado;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
            this.addEvtOnClickRightListener(this);
            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            // TODO: Não é possível disparar o click e double-click para um mesmo componente.
            //this.addEvtOnDoubleClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
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
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onClickRight(objSender: Object, arg: JQueryMouseEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.processarOnClickRight(arg);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onDoubleClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                this.processarOnDoubleClick();
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onMouseLeave(objSender: Object, arg: JQueryMouseEventObject): void
        {
            try
            {
                this.jq.css("background-color", this.booSelecionado ? AppWebBase.i.objTema.corSelecionado : Utils.STR_VAZIA);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onMouseOver(objSender: Object, arg: JQueryMouseEventObject): void
        {
            try
            {
                this.jq.css("background-color", AppWebBase.i.objTema.corMouseOver);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}