/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnMouseLeaveListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../circulo/DivCirculo.ts"/>
/// <reference path="../ComponenteHtml.ts"/>
/// <reference path="../painel/PainelHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuItem extends ComponenteHtml implements OnClickListener, OnKeyUpListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMniFilho: Array<MenuItem>;
        private _arrMniFilhoVisivel: Array<MenuItem>;
        private _arrStrTag: Array<string>;
        private _booFilho: boolean;
        private _divIcone: DivCirculo;
        private _divItemConteudo: Div;
        private _divTitulo: Div;
        private _mniPai: MenuItem;
        private _mnuPai: Menu;
        private _tblWeb: TabelaWeb;

        private get arrMniFilho(): Array<MenuItem>
        {
            if (this._arrMniFilho != null)
            {
                return this._arrMniFilho;
            }

            this._arrMniFilho = new Array<MenuItem>();

            return this._arrMniFilho;
        }

        public get arrMniFilhoVisivel(): Array<MenuItem>
        {
            if (this._arrMniFilhoVisivel != null)
            {
                return this._arrMniFilhoVisivel;
            }

            this._arrMniFilhoVisivel = this.getArrMniFilhoVisivel();

            return this._arrMniFilhoVisivel;
        }

        public set arrMniFilhoVisivel(arrMniFilhoVisivel: Array<MenuItem>)
        {
            this._arrMniFilhoVisivel = arrMniFilhoVisivel;
        }

        private get arrStrTag(): Array<string>
        {
            if (this._arrStrTag != null)
            {
                return this._arrStrTag;
            }

            this._arrStrTag = new Array<string>();

            return this._arrStrTag;
        }

        private get booFilho(): boolean
        {
            this._booFilho = (this.arrMniFilho.length < 1);

            return this._booFilho;
        }

        private get divItemConteudo(): Div
        {
            if (this._divItemConteudo != null)
            {
                return this._divItemConteudo;
            }

            this._divItemConteudo = new Div(this.strId + "_divItemConteudo");

            return this._divItemConteudo;
        }

        private get mniPai(): MenuItem
        {
            return this._mniPai;
        }

        private set mniPai(mniPai: MenuItem)
        {
            this._mniPai = mniPai;
        }

        private get divIcone(): DivCirculo
        {
            if (this._divIcone != null)
            {
                return this._divIcone;
            }

            this._divIcone = new DivCirculo(this.strId + "_divIcone");

            return this._divIcone;
        }

        private get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        public set mnuPai(mnuPai: Menu)
        {
            this._mnuPai = mnuPai;
        }

        public get mnuPai(): Menu
        {
            return this._mnuPai;
        }

        private get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public abrirConsulta(): void
        {
            if (!this.booFilho)
            {
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            if (this.mnuPai == null)
            {
                return;
            }

            this.mnuPai.abrirConsulta(this.tblWeb);

            this.booSelecionado = false;
        }

        public addMniFilho(mniFilho: MenuItem): void
        {
            if (mniFilho == null)
            {
                return;
            }

            if (this.arrMniFilho.indexOf(mniFilho) > -1)
            {
                return;
            }

            this.arrMniFilho.push(mniFilho);

            mniFilho.mniPai = this;
            mniFilho.mnuPai = this.mnuPai;

            mniFilho.iniciar();
        }

        protected setBooSelecionado(booSelecionado: boolean): void
        {
            super.setBooSelecionado(booSelecionado);

            if (this.mnuPai == null)
            {
                return;
            }

            this.mnuPai.mniSelecionado = booSelecionado ? this : null;
        }

        public esconderDivItemConteudo(): void
        {
            if (this.arrMniFilho.length < 1)
            {
                return;
            }

            this.divItemConteudo.booVisivel = false;
        }

        private getArrMniFilhoVisivel(): Array<MenuItem>
        {
            if (this.booFilho)
            {
                return null;
            }

            var arrMniFilhoVisivelResultado = new Array<MenuItem>();

            for (var i = 0; i < this.arrMniFilho.length; i++)
            {
                var mniFilho = this.arrMniFilho[i];

                if (mniFilho == null)
                {
                    continue;
                }

                if (!mniFilho.booVisivel)
                {
                    continue;
                }

                arrMniFilhoVisivelResultado.push(mniFilho);
            }

            return arrMniFilhoVisivelResultado;
        }

        private getTblWeb(): TabelaWeb
        {
            if (this.jq == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.jq.attr("tbl_web_nome")))
            {
                return null;
            }

            return new TabelaWeb(this.jq.attr("tbl_web_nome"));
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarArrStrTag(this.arrStrTag);
            this.inicializarItem();
        }

        protected inicializarArrStrTag(arrStrTag: Array<string>): void
        {
            arrStrTag.push(this.divTitulo.strConteudo);
        }

        protected inicializarItem(): void
        {
        }

        public limparPesquisa(): void
        {
            this.mostrar();

            if (this.arrMniFilho.length < 1)
            {
                return;
            }

            this.divItemConteudo.esconder();

            this.arrMniFilho.forEach((mni) => { mni.limparPesquisa() });
        }

        public mostrarEsconderDivItemConteudo(): void
        {
            if (this.arrMniFilho.length < 1)
            {
                return;
            }

            this.divItemConteudo.mostrarEsconder();
        }

        public pesquisar(strPesquisa: string): void
        {
            if (this.arrMniFilho == null)
            {
                return;
            }

            this.esconder();

            if (this.arrMniFilho.length > 0)
            {
                this.divItemConteudo.esconder();
            }

            this.arrMniFilho.forEach((mni) => { mni.pesquisar(strPesquisa); });

            this.arrStrTag.forEach((strTag) => { this.pesquisarItem(strPesquisa, strTag); });
        }

        private pesquisarItem(strPesquisa: string, strTag: string): void
        {
            if (Utils.getBooStrVazia(strTag))
            {
                return;
            }

            if (strTag.toLowerCase().indexOf(strPesquisa.toLowerCase()) < 0)
            {
                return;
            }

            this.mostrar();

            if (this.mniPai == null)
            {
                return;
            }

            this.mniPai.mostrar();
            this.mniPai.divItemConteudo.mostrar();
        }

        private processarOnClick(): void
        {
            if (this.booFilho)
            {
                this.abrirConsulta();
                return;
            }

            this.processarOnClickMnuPai();

            this.mostrarEsconderDivItemConteudo();
        }

        private processarOnClickMnuPai(): void
        {
            if (this.mnuPai == null)
            {
                return;
            }

            this.mnuPai.fecharGrupos();
        }

        private processarOnKeyUp(arg: JQueryKeyEventObject): void
        {
            this.processarOnKeyUpEnter(arg);
            this.processarOnKeyUpSeta(arg);
        }

        private processarOnKeyUpEnter(arg: JQueryKeyEventObject): void
        {
            if (!this.booFilho)
            {
                return;
            }

            if (arg == null)
            {
                return;
            }

            if (arg.keyCode != Keys.ENTER)
            {
                return;
            }

            this.abrirConsulta();
        }

        private processarOnKeyUpSeta(arg: JQueryKeyEventObject): void
        {
            if (arg == null)
            {
                return;
            }

            if (this.mnuPai == null)
            {
                return;
            }

            switch (arg.keyCode)
            {
                case Keys.DOWN_ARROW:
                    this.mnuPai.selecionarProximo();
                    return;

                case Keys.UP_ARROW:
                    this.mnuPai.selecionarAnterior();
                    return;
            }
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            if (this.booFilho)
            {
                this.setEventosFilho();
            }
            else
            {
                this.setEventosPai();
            }
        }

        private setEventosFilho(): void
        {
            this.addEvtOnClickListener(this);
            this.addEvtOnKeyUpListener(this);
        }

        private setEventosPai(): void
        {
            this.divIcone.addEvtOnClickListener(this);
            this.divTitulo.addEvtOnClickListener(this);
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
                    case this.divIcone:
                    case this.divTitulo:
                        this.processarOnClick();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        public onKeyUp(objSender: Object, arg: JQueryKeyEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.processarOnKeyUp(arg);
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
                if (this.mniPai == null)
                {
                    return;
                }

                this.jq.css("background-color", this.booSelecionado ? this.getCorSelecionado() : Utils.STR_VAZIA);
                this.jq.css("color", this.booSelecionado ? "black" : Utils.STR_VAZIA);
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
                if (this.mniPai == null)
                {
                    return;
                }

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