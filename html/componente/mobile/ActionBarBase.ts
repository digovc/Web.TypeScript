// #region Reference

/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../botao/actionbar/BotaoActionBar.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="../menu/contexto/MenuContexto.ts"/>
/// <reference path="OnMenuClickListener.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ActionBarBase extends ComponenteHtmlBase implements OnClickListener
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
        private _fncVoltar: ((a: ActionBarBase) => void);

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

        public get btnVoltar(): BotaoActionBar
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

        public get fncVoltar(): ((a: ActionBarBase) => void)
        {
            return this._fncVoltar;
        }

        public set fncVoltar(fncVoltar: ((a: ActionBarBase) => void))
        {
            this._fncVoltar = fncVoltar;
        }

        // #endregion Atributos

        // #region Construtor

        // #endregion Construtor

        // #region Métodos

        private abrirSubMenu(arg: JQueryEventObject): void
        {
            var mnu = new MenuContexto();

            this.arrBtnTempSubMenu.forEach(btn => this.abrirSubMenuItem(btn, mnu));

            mnu.abrirMenu(arg);
        }

        private abrirSubMenuItem(btn: BotaoActionBar, mnu: MenuContexto): void
        {
            mnu.addOpcao(btn.strTitle, ((mni: MenuContextoItem, arg: JQueryEventObject) => btn.dispararEvtOnClickListener(arg)));
        }

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
            else
            {
                this.addOpcaoSubMenu(btn);
            }
        }

        private addOpcaoRapido(btn: BotaoActionBar): void
        {
            if (this.arrBtnTemp.indexOf(btn) > -1)
            {
                return;
            }

            this.arrBtnTemp.push(btn);
            this.addHtml(btn.strLayoutFixo);

            btn.iniciar();
        }

        private addOpcaoSubMenu(btn: BotaoActionBar): void
        {
            if (this.arrBtnTempSubMenu.indexOf(btn) > -1)
            {
                return;
            }

            this.arrBtnTempSubMenu.push(btn);

            this.btnSubMenu.anm.aparecer();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnMenu.iniciar();
            this.btnSubMenu.iniciar();
            this.btnVoltar.iniciar();
            this.divTitulo.iniciar();
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
            this.btnSubMenu.addEvtOnClickListener(this);
            this.btnVoltar.addEvtOnClickListener(this);
            this.divTitulo.addEvtOnClickListener(this);
        }

        private voltar(): void
        {
            if (this.fncVoltar == null)
            {
                return;
            }

            this.fncVoltar(this);
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
                        this.dispararEvtOnMenuClickListener(arg);
                        return;

                    case this.btnSubMenu:
                        this.abrirSubMenu(arg);
                        return;

                    case this.btnVoltar:
                    case this.divTitulo:
                        this.voltar();
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

        // #endregion Eventos
    }
}