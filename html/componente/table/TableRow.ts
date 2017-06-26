/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickRightListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="../menu/contexto/MenuContexto.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TableRow extends ComponenteHtml implements OnClickListener, OnClickRightListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _intId: number;
        private _tagGridHtml: TableHtml = null;

        public get intId(): number
        {
            if (this._intId != null)
            {
                return this._intId;
            }

            this._intId = this.getIntId();

            return this._intId;
        }

        public get tagGridHtml(): TableHtml
        {
            return this._tagGridHtml;
        }

        public set tagGridHtml(tagGridHtml: TableHtml)
        {
            this._tagGridHtml = tagGridHtml;
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

            var argOnGridMenuClick = new OnTableMenuClickArg();

            argOnGridMenuClick.enmTipo = OnTableMenuClickArg_EnmAcao.ALTERAR;
            argOnGridMenuClick.tagTableRow = this;

            this.processarOnGridMenuClick(argOnGridMenuClick);
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
            if (this.intId < 1)
            {
                return;
            }

            this.selecionar(false);

            var objMenuContexto = new MenuContexto();

            objMenuContexto.addOpcao(("Alterar registro " + this.intId), (() => { this.alterar(); }));

            objMenuContexto.abrirMenu(arg);
        }

        public processarOnGridMenuClick(arg: OnTableMenuClickArg): void
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

        protected setBooSelecionado(booSelecionado: boolean): void
        {
            super.setBooSelecionado(booSelecionado);

            if (this.tagGridHtml == null)
            {
                return;
            }

            if (booSelecionado)
            {
                this.tagGridHtml.addRowSelecionada(this);
            }
            else
            {
                this.tagGridHtml.removerRowSelecionada(this);
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
                new Erro("Erro desconhecido.", ex);
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
                new Erro("Erro desconhecido.", ex);
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
                new Erro("Erro desconhecido.", ex);
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
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}