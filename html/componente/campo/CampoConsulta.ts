/// <reference path="../../../database/TabelaWeb.ts"/>
/// <reference path="../../../Keys.ts"/>
/// <reference path="../../../OnClickListener.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoConsulta extends CampoComboBox implements OnClickListener, OnKeyDownListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strClnFiltroWebNome: string;
        private _strTblWebRefNome: string;
        private _txtPesquisa: Input;

        private get strClnFiltroWebNome(): string
        {
            if (this._strClnFiltroWebNome != null)
            {
                return this._strClnFiltroWebNome;
            }

            this._strClnFiltroWebNome = this.getStrAttValor("cln_web_filtro_nome");

            return this._strClnFiltroWebNome;
        }

        private set strClnFiltroWebNome(strClnFiltroWebNome: string)
        {
            this._strClnFiltroWebNome = strClnFiltroWebNome;
        }

        private get strTblWebRefNome(): string
        {
            if (this._strTblWebRefNome != null)
            {
                return this._strTblWebRefNome;
            }

            this._strTblWebRefNome = this.getStrAttValor("tbl_web_ref_nome");

            return this._strTblWebRefNome;
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

        private _tblWebRef: TabelaWeb;

        private get tblWebRef(): TabelaWeb
        {
            if (this._tblWebRef != null)
            {
                return this._tblWebRef;
            }

            this._tblWebRef = this.getTblWebRef();

            return this._tblWebRef;
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

            return AppWeb.i.getTbl(this.strTblWebRefNome);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.txtPesquisa.iniciar();

            this.inicializarTblWebRef();
        }

        private inicializarTblWebRef(): void
        {
            AppWeb.i.carregarTbl(this.strTblWebRefNome);
        }

        public limparDados(): void
        {
            super.limparDados();

            this.txtPesquisa.strValor = null;

            this.cmb.jq.hide();

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

            fil.clnWeb = new ColunaWeb(this.strClnFiltroWebNome);

            fil.enmOperador = FiltroWeb_EnmOperador.LIKE;
            fil.objValor = this.txtPesquisa.strValor;

            this.tblWebRef.addFil(fil);

            this.cmb.carregarDados(this.tblWebRef);

            this.txtPesquisa.jq.hide();

            this.txtPesquisa.strValor = null;

            this.cmb.mostrar();
        }

        private processarOnClick(arg: JQueryEventObject): void
        {
            this.processarOnClickDireito(arg);
        }

        private processarOnClickDireito(arg: JQueryEventObject): void
        {
            if (arg.which != Tag.INT_MOUSE_BUTTON_RIGHT)
            {
                return;
            }

            window.alert("Botão direito acionado.");
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

            this.addEvtOnClickListener(this);
            this.addEvtOnKeyDownListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this:
                        this.processarOnClick(arg);
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