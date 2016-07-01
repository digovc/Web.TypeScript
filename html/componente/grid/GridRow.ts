/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnDoubleClickListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../../Tag.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class GridRow extends Tag implements OnClickListener, OnDoubleClickListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes

        private static get COR_ROW_SELECINADA(): string { return "#dadada" };

        // #endregion Constantes

        // #region Atributos

        private _booSelecionada: boolean;
        private _intId: number;
        private _tagGridHtml: GridHtml = null;

        public get booSelecionada(): boolean
        {
            return this._booSelecionada;
        }

        public set booSelecionada(booSelecionada: boolean)
        {
            if (this._booSelecionada == booSelecionada)
            {
                return;
            }

            this._booSelecionada = booSelecionada;

            this.atualizarBooSelecionado();
        }

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

        private atualizarBooSelecionado(): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            this.jq.css("background-color", this.booSelecionada ? GridRow.COR_ROW_SELECINADA : Utils.STR_VAZIA);

            if (this.booSelecionada)
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

            this.selecionar(arg);

            if (this.tagGridHtml == null)
            {
                return;
            }

            this.tagGridHtml.dispararEvtOnRowClickListener(this);
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

        private selecionar(arg: JQueryEventObject): void
        {
            if (this.tagGridHtml == null)
            {
                return;
            }

            if (arg.ctrlKey)
            {
                this.booSelecionada = !this.booSelecionada;
                return;
            }

            this.tagGridHtml.selecinarTudo(false);

            this.booSelecionada = !this.booSelecionada;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            // TODO: Não é possível disparar o click e double-click para um mesmo componente.
            //this.addEvtOnDoubleClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.processarOnClick(arg);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onDoubleClick(objSender: Object, arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.processarOnDoubleClick();
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onMouseLeave(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.css("background-color", this.booSelecionada ? GridRow.COR_ROW_SELECINADA : Utils.STR_VAZIA);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onMouseOver(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.css("background-color", AppWeb.i.objTema.corMouseOver);
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}