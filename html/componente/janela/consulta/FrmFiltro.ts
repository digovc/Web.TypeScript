/// <reference path="../../../../database/DataTable.ts"/>
/// <reference path="../../../../database/ParValorNome.ts"/>
/// <reference path="../../../../database/TblFiltro.ts"/>
/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../botao/BotaoCircular.ts"/>
/// <reference path="../../campo/CampoComboBox.ts"/>
/// <reference path="../../form/FormHtml.ts"/>
/// <reference path="PainelFiltro.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class FrmFiltro extends FormHtml implements OnClickListener, OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAdicionar: BotaoCircular;
        private _btnAlterar: BotaoCircular;
        private _btnApagar: BotaoCircular;
        private _cmpIntFiltroId: CampoComboBox;
        private _pnlFiltro: PainelFiltro;
        private _viwAtual: TabelaWeb;

        private get btnAdicionar(): BotaoCircular
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoCircular(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        private get btnAlterar(): BotaoCircular
        {
            if (this._btnAlterar != null)
            {
                return this._btnAlterar;
            }

            this._btnAlterar = new BotaoCircular(this.strId + "_btnAlterar");

            return this._btnAlterar;
        }

        private get btnApagar(): BotaoCircular
        {
            if (this._btnApagar != null)
            {
                return this._btnApagar;
            }

            this._btnApagar = new BotaoCircular(this.strId + "_btnApagar");

            return this._btnApagar;
        }

        private get cmpIntFiltroId(): CampoComboBox
        {
            if (this._cmpIntFiltroId != null)
            {
                return this._cmpIntFiltroId;
            }

            this._cmpIntFiltroId = (<CampoComboBox>this.getCmp(this.strId + "_cmpIntFiltroId"));

            return this._cmpIntFiltroId;
        }

        private get pnlFiltro(): PainelFiltro
        {
            return this._pnlFiltro;
        }

        private set pnlFiltro(pnlFiltro: PainelFiltro)
        {
            this._pnlFiltro = pnlFiltro;
        }

        private get viwAtual(): TabelaWeb
        {
            if (this._viwAtual != null)
            {
                return this._viwAtual;
            }

            this._viwAtual = this.getViwAtual();

            return this._viwAtual;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(pnlFiltro: PainelFiltro)
        {
            super("frmFiltro");

            this.pnlFiltro = pnlFiltro;
        }

        // #endregion Construtores

        // #region Métodos

        private abrirFiltroConteudo(): void
        {
            if (AppWebBase.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (this.pnlFiltro == null)
            {
                return;
            }

            if (this.cmpIntFiltroId.tagInput.intValor < 1)
            {
                this.pnlFiltro.atualizarFrmFiltroConteudo(Utils.STR_VAZIA);
                return;
            }

            TblFiltro.i.limparFiltro();

            TblFiltro.i.addFil2(TblFiltro.i.clnWebIntId, this.cmpIntFiltroId.tagInput.intValor);

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_ABRIR_CADASTRO_FILTRO_CONTEUDO;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.abrirFiltroConteudoSucesso(objInterlocutor); });
            objInterlocutor.addJsn(TblFiltro.i);

            AppWebBase.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private abrirFiltroCadastro(intFiltroId: number): void
        {
            if (this.pnlFiltro == null)
            {
                return;
            }

            if (this.pnlFiltro.jnlConsulta == null)
            {
                return;
            }

            this.pnlFiltro.jnlConsulta.abrirFiltroCadastro(intFiltroId);
        }

        private abrirFiltroConteudoSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            this.pnlFiltro.atualizarFrmFiltroConteudo(objInterlocutor.objData.toString());
        }

        private apagarFiltro(): void
        {
        }

        protected carregarDados(): void
        {
            super.carregarDados();

            this.carregarDadosCmpFiltro();
        }

        private carregarDadosCmpFiltro(): void
        {
            if (this.viwAtual == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.viwAtual.strNome))
            {
                return;
            }

            TblFiltro.i.limparFiltro();

            TblFiltro.i.addFil2(TblFiltro.i.clnStrTabelaNome, this.viwAtual.strNome);

            this.cmpIntFiltroId.carregarDados(TblFiltro.i);
        }

        private getViwAtual(): TabelaWeb
        {
            if (this.pnlFiltro == null)
            {
                return null;
            }

            if (this.pnlFiltro.jnlConsulta == null)
            {
                return null;
            }

            if (this.pnlFiltro.jnlConsulta.viwAtual == null)
            {
                return null;
            }

            return this.pnlFiltro.jnlConsulta.viwAtual;
        }

        public receberFoco(): void
        {
            super.receberFoco();

            this.cmpIntFiltroId.jq.focus();
        }

        protected setEventos(): void
        {
            this.btnAdicionar.addEvtOnClickListener(this);

            this.btnAlterar.addEvtOnClickListener(this);

            this.btnApagar.addEvtOnClickListener(this);

            this.cmpIntFiltroId.tagInput.addEvtOnValorAlteradoListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            switch (objSender)
            {
                case this.btnAdicionar:
                    this.abrirFiltroCadastro(0);
                    return;

                case this.btnAlterar:
                    this.abrirFiltroCadastro(this.cmpIntFiltroId.tagInput.intValor);
                    return;

                case this.btnApagar:
                    this.apagarFiltro();
                    return;
            }
        }

        public onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.cmpIntFiltroId.tagInput:
                        this.abrirFiltroConteudo();
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