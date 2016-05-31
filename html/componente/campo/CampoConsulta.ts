/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Keys.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoConsulta extends CampoComboBox implements OnKeyDownListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _clnWebRef: ColunaWeb;
        private _clnWebRefNome: ColunaWeb;
        private _strTblWebRefNome: string;
        private _tblWebRef: TabelaWeb;
        private _txtPesquisa: Input;

        private get clnWebRef(): ColunaWeb
        {
            if (this._clnWebRef != null)
            {
                return this._clnWebRef;
            }

            this._clnWebRef = new ColunaWeb(this.getStrAttValor("cln_web_ref"));

            return this._clnWebRef;
        }

        private get clnWebRefNome(): ColunaWeb
        {
            if (this._clnWebRefNome != null)
            {
                return this._clnWebRefNome;
            }

            this._clnWebRefNome = new ColunaWeb(this.getStrAttValor("cln_web_ref_nome"));

            return this._clnWebRefNome;
        }

        private get strTblWebRefNome(): string
        {
            if (this._strTblWebRefNome != null)
            {
                return this._strTblWebRefNome;
            }

            this._strTblWebRefNome = this.getStrAttValor("tbl_web_ref");

            return this._strTblWebRefNome;
        }

        private get tblWebRef(): TabelaWeb
        {
            if (this._tblWebRef != null)
            {
                return this._tblWebRef;
            }

            this._tblWebRef = this.getTblWebRef();

            return this._tblWebRef;
        }

        private get txtPesquisa(): Input
        {
            if (this._txtPesquisa != null)
            {
                return this._txtPesquisa;
            }

            this._txtPesquisa = new Input(this.strId + "_txtPesquisa");

            return this._txtPesquisa;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private getTblWebRef(): TabelaWeb
        {
            if (Utils.getBooStrVazia(this.strTblWebRefNome))
            {
                return null;
            }

            return new TabelaWeb(this.strTblWebRefNome);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.txtPesquisa.iniciar();
        }

        public limparDados(): void
        {
            super.limparDados();

            this.cmb.esconder();

            this.txtPesquisa.strValor = null;
            this.txtPesquisa.mostrar();

            this.txtPesquisa.receberFoco();
        }

        private pesquisar(): void
        {
            if (this.tblWebRef == null)
            {
                return;
            }

            this.tblWebRef.limparFiltro();

            var fil = new FiltroWeb();

            fil.clnWeb = this.clnWebRefNome;
            fil.enmOperador = FiltroWeb_EnmOperador.LIKE;
            fil.objValor = this.txtPesquisa.strValor;

            this.tblWebRef.addFil(fil);

            this.cmb.carregarDados(this.tblWebRef);

            this.txtPesquisa.esconder();

            this.txtPesquisa.strValor = null;

            this.cmb.mostrar();
        }

        public receberFoco(): void
        {
            //super.receberFoco();

            if (this.txtPesquisa.booVisivel)
            {
                this.txtPesquisa.jq.focus();
                return;
            }

            this.cmb.jq.focus();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnKeyDownListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onKeyDown(objSender: Object, arg: JQueryKeyEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (arg.keyCode)
                {
                    case Keys.DELETE:
                        this.limparDados();
                        return;

                    case Keys.ENTER:
                        this.pesquisar();
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