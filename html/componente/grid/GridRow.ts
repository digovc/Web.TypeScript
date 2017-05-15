/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickRightListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class GridRow extends ComponenteHtml implements OnClickListener, OnClickRightListener, OnMouseLeaveListener, OnMouseOverListener
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

        private alterar(): void
        {
            if (this.intId < 1)
            {
                return;
            }

            var argOnGridMenuClick = new OnGridMenuClickArg();

            argOnGridMenuClick.enmTipo = OnGridMenuClickArg_EnmAcao.ALTERAR;
            argOnGridMenuClick.tagGridRow = this;

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