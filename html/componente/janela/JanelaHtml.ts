/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnMouseDownListener.ts"/>
/// <reference path="../../../OnMouseLeaveListener.ts"/>
/// <reference path="../../../OnMouseMoveListener.ts"/>
/// <reference path="../../../OnMouseUpListener.ts"/>
/// <reference path="../../pagina/PaginaHtml.ts"/>
/// <reference path="../botao/mini/BotaoFecharMini.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JanelaHtml extends ComponenteHtml implements OnClickListener, OnMouseDownListener, OnMouseLeaveListener, OnMouseMoveListener, OnMouseUpListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtivo: boolean;
        private _booDragging: boolean;
        private _booPermitirMover: boolean = true;
        private _divBtnFechar: Div;
        private _divCabecalho: Div;
        private _divInativa: Div;
        private _intCabecalhoLeft: number;
        private _intCabecalhoTop: number;
        private _intCabecalhoX: number;
        private _intCabecalhoY: number;
        private _pag: PaginaHtml;

        public get booAtivo(): boolean
        {
            this._booAtivo = (!this.divInativa.booVisivel);

            return this._booAtivo;
        }

        public set booAtivo(booAtivo: boolean)
        {
            this._booAtivo = booAtivo;

            this.atualizarBooAtivo();
        }

        private get booDragging(): boolean
        {
            return this._booDragging;
        }

        private set booDragging(booCabecalhoArrastar: boolean)
        {
            this._booDragging = booCabecalhoArrastar;
        }

        protected get booPermitirMover(): boolean
        {
            return this._booPermitirMover;
        }

        protected set booPermitirMover(booPermitirMover: boolean)
        {
            this._booPermitirMover = booPermitirMover;
        }

        private get divBtnFechar(): Div
        {
            if (this._divBtnFechar != null)
            {
                return this._divBtnFechar;
            }

            this._divBtnFechar = new BotaoFecharMini(this.strId + "_divBtnFechar");

            return this._divBtnFechar;
        }

        private get divCabecalho(): Div
        {
            if (this._divCabecalho != null)
            {
                return this._divCabecalho;
            }

            this._divCabecalho = new Div(this.strId + "_divCabecalho");

            return this._divCabecalho;
        }

        private get divInativa(): Div
        {
            if (this._divInativa != null)
            {
                return this._divInativa;
            }

            this._divInativa = new Div(this.strId + "_divInativa");

            return this._divInativa;
        }

        private get intCabecalhoLeft(): number
        {
            return this._intCabecalhoLeft;
        }

        private set intCabecalhoLeft(intCabecalhoLeft: number)
        {
            this._intCabecalhoLeft = intCabecalhoLeft;
        }

        private get intCabecalhoTop(): number
        {
            return this._intCabecalhoTop;
        }

        private set intCabecalhoTop(intCabecalhoTop: number)
        {
            this._intCabecalhoTop = intCabecalhoTop;
        }

        private get intCabecalhoX(): number
        {
            return this._intCabecalhoX;
        }

        private set intCabecalhoX(intCabecalhoPageX: number)
        {
            this._intCabecalhoX = intCabecalhoPageX;
        }

        private get intCabecalhoY(): number
        {
            return this._intCabecalhoY;
        }

        private set intCabecalhoY(intCabecalhoPageY: number)
        {
            this._intCabecalhoY = intCabecalhoPageY;
        }

        protected get pag(): PaginaHtml
        {
            return this._pag;
        }

        protected set pag(pag: PaginaHtml)
        {
            this._pag = pag;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, pag: PaginaHtml)
        {
            super(strId);

            this.pag = pag;
        }

        // #endregion Construtores

        // #region Métodos

        private atualizarBooAtivo(): void
        {
            if (this.booAtivo)
            {
                this.divInativa.esconder();
            }
            else
            {
                this.divInativa.mostrar();
            }
        }

        private divCabecalhoOnMouseDown(arg: JQueryMouseEventObject): void
        {
            if (arg.button != 0)
            {
                return;
            }

            if (!this.booPermitirMover)
            {
                return;
            }

            this.booDragging = true;

            this.intCabecalhoLeft = parseInt(this.jq.css("left"));
            this.intCabecalhoTop = parseInt(this.jq.css("top"));

            this.intCabecalhoLeft = (Math.abs(this.intCabecalhoLeft) > 0) ? this.intCabecalhoLeft : 0;
            this.intCabecalhoTop = (Math.abs(this.intCabecalhoTop) > 0) ? this.intCabecalhoTop : 0;

            this.intCabecalhoX = arg.clientX;
            this.intCabecalhoY = arg.clientY;
        }

        private divCabecalhoOnMouseMove(arg: JQueryMouseEventObject): void
        {
            if (!this.booDragging)
            {
                return;
            }

            if (arg.button != 0)
            {
                this.booDragging;
                return;
            }

            console.log(arg);

            var x = (this.intCabecalhoLeft + arg.clientX - this.intCabecalhoX);
            var y = (this.intCabecalhoTop + (arg.clientY - this.intCabecalhoY));

            this.jq.css("left", x);
            this.jq.css("top", y);
        }

        private divCabecalhoOnMouseUp(arg: JQueryMouseEventObject): void
        {
            if (arg.button != 0)
            {
                return;
            }

            this.booDragging = false;
        }

        protected fechar(): void
        {
            this.dispose();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarPosicao();
        }

        private inicializarPosicao(): void
        {
            var intParentHeight = this.jq.parent().height();
            var intParentWidth = this.jq.parent().width();

            var intHeight = this.jq.height();
            var intWidth = this.jq.width();

            var x = ((intParentWidth / 2) - (intWidth / 2));
            var y = ((intParentHeight / 2) - (intHeight / 2));

            this.jq.css("left", x);
            this.jq.css("top", y);
        }

        protected setEventos(): void
        {
            this.divBtnFechar.addEvtOnClickListener(this);

            this.setEventosPermitirMover();
        }

        private setEventosPermitirMover(): void
        {
            if (!this.booPermitirMover)
            {
                return;
            }

            this.divCabecalho.addEvtOnMouseDownListener(this);
            this.divCabecalho.addEvtOnMouseLeaveListener(this);
            this.divCabecalho.addEvtOnMouseMoveListener(this);
            this.divCabecalho.addEvtOnMouseUpListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.divBtnFechar:
                        this.fechar();
                        return;
                }
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

        public onMouseDown(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.divCabecalho:
                        this.divCabecalhoOnMouseDown(arg);
                        return;
                }
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

        public onMouseLeave(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.divCabecalho:
                        this.booDragging = false;
                        return;
                }
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

        public onMouseMove(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.divCabecalho:
                        this.divCabecalhoOnMouseMove(arg);
                        return;
                }
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

        public onMouseUp(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.divCabecalho:
                        this.divCabecalhoOnMouseUp(arg);
                        return;
                }
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