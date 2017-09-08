﻿/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../botao/actionbar/BotaoActionBar.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="OnMenuClickListener.ts"/>
/// <reference path="OnVoltarClickListener.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ActionBarBase extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrBtnTemp: Array<BotaoActionBar>;
        private _arrBtnTempSubMenu: Array<BotaoActionBar>;
        private _btnMenu: BotaoActionBar;
        private _btnSubMenu: BotaoActionBar;
        private _btnVoltar: BotaoActionBar;
        private _divTitulo: Div;

        private get arrBtnTemp(): Array<BotaoActionBar>
        {
            if (this._arrBtnTemp != null)
            {
                return this._arrBtnTemp;
            }

            this._arrBtnTemp = new Array<BotaoActionBar>();

            return this._arrBtnTemp;
        }

        private get arrBtnTempSubMenu(): Array<BotaoActionBar>
        {
            if (this._arrBtnTempSubMenu != null)
            {
                return this._arrBtnTempSubMenu;
            }

            this._arrBtnTempSubMenu = new Array<BotaoActionBar>();

            return this._arrBtnTempSubMenu;
        }

        private get btnMenu(): BotaoActionBar
        {
            if (this._btnMenu != null)
            {
                return this._btnMenu;
            }

            this._btnMenu = new BotaoActionBar(this.strId + "_btnMenu");

            return this._btnMenu;
        }

        private get btnSubMenu(): BotaoActionBar
        {
            if (this._btnSubMenu != null)
            {
                return this._btnSubMenu;
            }

            this._btnSubMenu = new BotaoActionBar(this.strId + "_btnSubMenu");

            return this._btnSubMenu;
        }

        private get btnVoltar(): BotaoActionBar
        {
            if (this._btnVoltar != null)
            {
                return this._btnVoltar;
            }

            this._btnVoltar = new BotaoActionBar(this.strId + "_btnVoltar");

            return this._btnVoltar;
        }

        public get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        // #endregion Atributos

        // #region Construtor

        // #endregion Construtor

        // #region Métodos

        public addOpcao(btn: BotaoActionBar): void
        {
            if (btn == null)
            {
                return;
            }

            if (btn.booRapido)
            {
                this.addOpcaoRapido(btn);
                return;
            }

            this.arrBtnTempSubMenu.push(btn);
            this.btnSubMenu.mostrar();
        }

        private addOpcaoRapido(btn: BotaoActionBar): void
        {
            this.arrBtnTemp.push(btn);
            this.addHtml(btn.strLayoutFixo);

            btn.iniciar();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnMenu.iniciar();
            this.btnSubMenu.iniciar();
            this.btnVoltar.iniciar();
        }

        public limpar(): void
        {
            this.arrBtnTemp.forEach(btn => btn.dispose());

            this.arrBtnTemp.splice(0, this.arrBtnTemp.length);

            this.arrBtnTempSubMenu.splice(0, this.arrBtnTemp.length);

            this.btnSubMenu.esconder();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnMenu.addEvtOnClickListener(this);
            this.btnVoltar.addEvtOnClickListener(this);
            this.divTitulo.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnMenu:
                        this.dispararEvtOnMenuClickListener(arg)
                        return;

                    case this.btnVoltar:
                    case this.divTitulo:
                        this.dispararEvtOnVoltarClickListener(arg)
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #region Evento OnMenuClickListener

        private _arrEvtOnMenuClickListener: Array<OnMenuClickListener>;

        private get arrEvtOnMenuClickListener(): Array<OnMenuClickListener>
        {
            if (this._arrEvtOnMenuClickListener != null)
            {
                return this._arrEvtOnMenuClickListener;
            }

            this._arrEvtOnMenuClickListener = new Array<OnMenuClickListener>();

            return this._arrEvtOnMenuClickListener;
        }

        public addEvtOnMenuClickListener(evt: OnMenuClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMenuClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnMenuClickListener.push(evt);
        }

        private dispararEvtOnMenuClickListener(arg: JQueryEventObject): void
        {
            if (this.arrEvtOnMenuClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnMenuClickListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onMenuClick(this, arg);
            });
        }

        public removerEvtOnMenuClickListener(evt: OnMenuClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnMenuClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnMenuClickListener.splice(this.arrEvtOnMenuClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnMenuClickListener

        // #region Evento OnVoltarClickListener

        private _arrEvtOnVoltarClickListener: Array<OnVoltarClickListener>;

        private get arrEvtOnVoltarClickListener(): Array<OnVoltarClickListener>
        {
            if (this._arrEvtOnVoltarClickListener != null)
            {
                return this._arrEvtOnVoltarClickListener;
            }

            this._arrEvtOnVoltarClickListener = new Array<OnVoltarClickListener>();

            return this._arrEvtOnVoltarClickListener;
        }

        public addEvtOnVoltarClickListener(evt: OnVoltarClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnVoltarClickListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnVoltarClickListener.push(evt);
        }

        private dispararEvtOnVoltarClickListener(arg: JQueryEventObject): void
        {
            if (this.arrEvtOnVoltarClickListener.length == 0)
            {
                return;
            }

            this.arrEvtOnVoltarClickListener.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onVoltarClick(this, arg);
            });
        }

        public removerEvtOnVoltarClickListener(evt: OnVoltarClickListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnVoltarClickListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnVoltarClickListener.splice(this.arrEvtOnVoltarClickListener.indexOf(evt), 1);
        }

        // #endregion Evento OnVoltarClickListener

        // #endregion Eventos
    }
}