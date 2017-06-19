/// <reference path="../../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuContextoItem extends ComponenteHtml implements OnClickListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _fncOnClick: Function;
        private _mnc: MenuContexto;
        private _strTitulo: string;

        private get fncOnClick(): Function
        {
            return this._fncOnClick;
        }

        private set fncOnClick(fncOnClick: Function)
        {
            this._fncOnClick = fncOnClick;
        }

        private get mnc(): MenuContexto
        {
            return this._mnc;
        }

        private set mnc(mnc: MenuContexto)
        {
            this._mnc = mnc;
        }

        public get strTitulo(): string
        {
            return this._strTitulo;
        }

        public set strTitulo(strTitulo: string)
        {
            this._strTitulo = strTitulo;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(strId: string, mnc: MenuContexto, fncOnClick: Function)
        {
            super(strId)

            this.fncOnClick = fncOnClick;
            this.mnc = mnc;
        }

        // #endregion Construtor

        // #region Métodos

        protected montarLayout(): void
        {
            super.montarLayout();

            this.montarLayoutBorderBottom();
        }

        private montarLayoutBorderBottom(): void
        {
            if (this.mnc.arrMci.indexOf(this) != (this.mnc.arrMci.length - 1))
            {
                return;
            }

            this.jq.css("border", "none");
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return;
            }

            strLayoutFixo = strLayoutFixo.replace("_id", this.strId);

            return strLayoutFixo.replace("_conteudo", this.strTitulo);
        }

        private processarClick(arg: JQueryEventObject): void
        {
            this.processarClickMnc();
            this.processarClickFncOnClick(arg);
        }

        private processarClickFncOnClick(arg: JQueryEventObject): void
        {
            if (this.fncOnClick == null)
            {
                return;
            }

            this.fncOnClick(this, arg);
        }

        private processarClickMnc(): void
        {
            if (this.mnc == null)
            {
                return;
            }

            this.mnc.processarClick(this);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                this.processarClick(arg);
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
                this.jq.css("background-color", Utils.STR_VAZIA);
                this.jq.css("color", Utils.STR_VAZIA);
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
                this.jq.css("color", "black");
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}