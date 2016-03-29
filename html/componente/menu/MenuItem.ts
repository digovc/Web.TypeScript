/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../../persistencia/TabelaWeb.ts"/>
/// <reference path="../painel/PainelHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class MenuItem extends ComponenteHtml implements OnClickListener
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrMniFilho != null)
                {
                    return this._arrMniFilho;
                }

                this._arrMniFilho = new Array<MenuItem>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrMniFilho;
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

        private abrirConsulta(tblWeb: TabelaWeb): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public addMniFilho(mniFilho: MenuItem): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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
                if (this.arrMniFilho != null && (this.arrMniFilho.length > 0))
                {
                    this.mostrarEsconderDivItemConteudo();
                    return;
                }

                this.abrirConsulta(this.tblWeb);
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

                if (Utils.getBooStrVazia(this.jq.attr("tbl_web_nome")))
                {
                    return null;
                }

                return new TabelaWeb(this.jq.attr("tbl_web_nome"));
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

                if (this.arrMniFilho == null)
                {
                    return;
                }

                this.arrMniFilho.forEach((mni) => { mni.limparPesquisa() });
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
                if (this.arrMniFilho.length < 1)
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
                if (this.arrMniFilho == null)
                {
                    return;
                }

                this.esconder();
                this.divItemConteudo.esconder();

                this.arrMniFilho.forEach((mni) => { mni.pesquisar(strPesquisa) });

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

                if (this.mniPai == null)
                {
                    return;
                }

                this.mniPai.mostrar();
                this.mniPai.divItemConteudo.mostrar();
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