/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../persistencia/TabelaWeb.ts"/>
/// <reference path="../painel/PainelHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MainMenuItem extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrMmiFilho: Array<MainMenuItem>;
        private _arrStrTag: Array<string>;
        private _divItemConteudo: Div;
        private _divTitulo: Div;
        private _mmiPai: MainMenuItem;
        private _mmnPai: MainMenu;
        private _tblWeb: TabelaWeb;

        private get arrMmiFilho(): Array<MainMenuItem>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrMmiFilho != null)
                {
                    return this._arrMmiFilho;
                }

                this._arrMmiFilho = new Array<MainMenuItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrMmiFilho;
        }

        private get arrStrTag(): Array<string>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrStrTag != null)
                {
                    return this._arrStrTag;
                }

                this._arrStrTag = new Array<string>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrStrTag;
        }

        private get divItemConteudo(): PainelHtml
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divItemConteudo != null)
                {
                    return this._divItemConteudo;
                }

                this._divItemConteudo = new Div(this.strId + "_itemConteudo");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divItemConteudo;
        }

        private get mmiPai(): MainMenuItem
        {
            return this._mmiPai;
        }

        private set mmiPai(mmiPai: MainMenuItem)
        {
            this._mmiPai = mmiPai;
        }

        private get divTitulo(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divTitulo != null)
                {
                    return this._divTitulo;
                }

                this._divTitulo = new Div(this.strId + "_titulo");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divTitulo;
        }

        public set mmnPai(mmnPai: MainMenu)
        {
            this._mmnPai = mmnPai;
        }

        public get mmnPai(): MainMenu
        {
            return this._mmnPai;
        }

        private get tblWeb(): TabelaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tblWeb != null)
                {
                    return this._tblWeb;
                }

                this._tblWeb = this.getTblWeb();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private abrirConsulta(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.tblWeb == null)
                {
                    return;
                }

                DivConsulta.i.abrirConsulta(this.tblWeb);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public addMmiFilho(mmiFilho: MainMenuItem): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (mmiFilho == null)
                {
                    return;
                }

                if (this.arrMmiFilho.indexOf(mmiFilho) > -1)
                {
                    return;
                }

                this.arrMmiFilho.push(mmiFilho);

                mmiFilho.mmiPai = this;
                mmiFilho.iniciar();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private divTitulo_onClick(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrMmiFilho != null && (this.arrMmiFilho.length > 0))
                {
                    this.mostrarEsconderDivItemConteudo();
                    return;
                }

                this.abrirConsulta();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private getTblWeb(): TabelaWeb
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return null;
                }

                if (Utils.getBooStrVazia(this.jq.attr("tblWebNome")))
                {
                    return null;
                }

                return new TabelaWeb(this.jq.attr("tblWebNome"));
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected inicializar(): void
        {
            super.inicializar();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.inicializarArrStrTag(this.arrStrTag);
                this.inicializarItem();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected inicializarArrStrTag(arrStrTag: Array<string>): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                arrStrTag.push(this.divTitulo.strConteudo);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected inicializarItem(): void
        {
        }

        public limparPesquisa(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.mostrar();
                this.divItemConteudo.esconder();

                if (this.arrMmiFilho == null)
                {
                    return;
                }

                this.arrMmiFilho.forEach((mmi) => { mmi.limparPesquisa() });
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public mostrarEsconderDivItemConteudo(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrMmiFilho.length < 1)
                {
                    return;
                }

                this.divItemConteudo.mostrarEsconder(Tag_EnmAnimacaoTipo.SLIDE_VERTICAL);

                //this.lstMmiFilho.forEach((mmi) => (mmi != null) && mmi.mostrarEsconder(EnmAnimacaoTipo.SLIDE_VERTICAL));
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public pesquisar(strPesquisa: string): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrMmiFilho == null)
                {
                    return;
                }

                this.esconder();
                this.divItemConteudo.esconder();

                this.arrMmiFilho.forEach((mni) => { mni.pesquisar(strPesquisa) });

                if (this.arrStrTag == null)
                {
                    return;
                }

                this.arrStrTag.forEach((strTag) => this.pesquisarStrTag(strPesquisa, strTag));
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private pesquisarStrTag(strPesquisa: string, strTag: string): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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

                if (this.mmiPai == null)
                {
                    return;
                }

                this.mmiPai.mostrar();
                this.mmiPai.divItemConteudo.mostrar();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divTitulo.addEvtOnClickListener(this);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
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
                        this.divTitulo_onClick();
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