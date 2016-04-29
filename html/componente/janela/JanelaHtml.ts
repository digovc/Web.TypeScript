/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnMouseDownListener.ts"/>
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

    export class JanelaHtml extends ComponenteHtml implements OnClickListener, OnMouseDownListener, OnMouseMoveListener, OnMouseUpListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtivo: boolean;
        private _booCabecalhoArrastar: boolean;
        private _divBtnFechar: Div;
        private _divCabecalho: Div;
        private _divInativa: Div;
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

        private get booCabecalhoArrastar(): boolean
        {
            return this._booCabecalhoArrastar;
        }

        private set booCabecalhoArrastar(booCabecalhoArrastar: boolean)
        {
            this._booCabecalhoArrastar = booCabecalhoArrastar;
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

            this.booCabecalhoArrastar = true;

            this.intCabecalhoX = arg.screenX;
            this.intCabecalhoY = arg.screenY;
        }

        private divCabecalhoOnMouseMove(arg: JQueryMouseEventObject): void
        {
            if (!this.booCabecalhoArrastar)
            {
                return;
            }

            console.log(arg);

            var intCabecalhoLeft = parseInt(this.jq.css("left"));
            var intCabecalhoTop = parseInt(this.jq.css("top"));

            intCabecalhoLeft = (Math.abs(intCabecalhoLeft) > 0) ? intCabecalhoLeft : 0;
            intCabecalhoTop = (Math.abs(intCabecalhoTop) > 0) ? intCabecalhoTop : 0;

            this.jq.css("left", (intCabecalhoLeft - (this.intCabecalhoX - arg.screenX)));
            this.jq.css("top", (intCabecalhoTop - (this.intCabecalhoY - arg.screenY)));
        }

        private divCabecalhoOnMouseUp(arg: JQueryMouseEventObject): void
        {
            if (arg.button != 0)
            {
                return;
            }

            this.booCabecalhoArrastar = false;
        }

        protected fechar(): void
        {
            this.dispose();
        }

        protected setEventos(): void
        {
            this.divBtnFechar.addEvtOnClickListener(this);
            this.divCabecalho.addEvtOnMouseDownListener(this);
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