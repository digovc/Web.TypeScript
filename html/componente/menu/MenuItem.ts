/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../OnMouseLeaveListener.ts"/>
/// <reference path="../../../OnMouseOverListener.ts"/>
/// <reference path="../painel/PainelHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuItem extends ComponenteHtml implements OnClickListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMniFilho: Array<MenuItem>;
        private _arrStrTag: Array<string>;
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

        private get arrStrTag(): Array<string>
        {
            if (this._arrStrTag != null)
            {
                return this._arrStrTag;
            }

            this._arrStrTag = new Array<string>();

            return this._arrStrTag;
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

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private abrirConsulta(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (this.mniPai != null)
            {
                this.mniPai.abrirConsulta(tblWeb);
                return;
            }

            if (this.mnuPai != null)
            {
                this.mnuPai.abrirConsulta(tblWeb);
                return;
            }
        }

        public abrirConsultaPrimeira(): boolean
        {
            for (var i = 0; i < this.arrMniFilho.length; i++)
            {
                if (this.arrMniFilho[i].abrirConsultaPrimeira())
                {
                    return true;
                }
            }

            if (this.arrMniFilho.length > 0)
            {
                return false;
            }

            if (this.mniPai == null)
            {
                return false;
            }

            if (!this.booVisivel)
            {
                return false;
            }

            if (!this.mniPai.divItemConteudo.booVisivel)
            {
                return false;
            }

            this.abrirConsulta(this.tblWeb);

            return true;
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

            mniFilho.iniciar();
        }

        private divTituloOnClick(): void
        {
            if (this.arrMniFilho.length > 0)
            {
                this.mostrarEsconderDivItemConteudo();
                return;
            }

            this.abrirConsulta(this.tblWeb);
        }

        public esconderDivItemConteudo(): void
        {
            if (this.arrMniFilho.length < 1)
            {
                return;
            }

            this.divItemConteudo.esconder();
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

            this.arrStrTag.forEach((strTag) => { this.pesquisar2(strPesquisa, strTag); });
        }

        private pesquisar2(strPesquisa: string, strTag: string): void
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

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            this.divTitulo.addEvtOnClickListener(this);
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
                    case this.divTitulo:
                        this.divTituloOnClick();
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
                if (this.mniPai == null)
                {
                    return;
                }

                this.jq.css("background-color", Utils.STR_VAZIA);
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

        public onMouseOver(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.mniPai == null)
                {
                    return;
                }

                this.jq.css("background-color", "rgb(128,197,195)");
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