﻿/// <reference path="../../../../database/DataTable.ts"/>
/// <reference path="../../../../database/ParValorNome.ts"/>
/// <reference path="../../../../database/TblFiltro.ts"/>
/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../botao/mini/BotaoAdicionarMini.ts"/>
/// <reference path="../../campo/CampoComboBox.ts"/>
/// <reference path="../../form/FormHtml.ts"/>
/// <reference path="PainelFiltro.ts"/>

module NetZ_Web_TypeScript
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

        private _btnAdicionar: BotaoAdicionarMini;
        private _btnAlterar: BotaoAlterarMini;
        private _btnApagar: BotaoApagarMini;
        private _cmpIntFiltroId: CampoComboBox;
        private _pnlFiltro: PainelFiltro;
        private _viwAtual: TabelaWeb;

        private get btnAdicionar(): BotaoAdicionarMini
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoAdicionarMini(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        private get btnAlterar(): BotaoAlterarMini
        {
            if (this._btnAlterar != null)
            {
                return this._btnAlterar;
            }

            this._btnAlterar = new BotaoAlterarMini(this.strId +"_btnAlterar");

            return this._btnAlterar;
        }

        private get btnApagar(): BotaoApagarMini
        {
            if (this._btnApagar != null)
            {
                return this._btnApagar;
            }

            this._btnApagar = new BotaoApagarMini(this.strId + "_btnApagar");

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

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.ABRIR_CADASTRO_FILTRO_CONTEUDO;

            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjaxDb: SolicitacaoAjaxDb) => { this.abrirFiltroConteudoSucesso(objSolicitacaoAjaxDb); });
            objSolicitacaoAjaxDb.addJsn(TblFiltro.i);

            ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
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

        private abrirFiltroConteudoSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return;
            }

            this.pnlFiltro.atualizarFrmFiltroConteudo(objSolicitacaoAjaxDb.strData);
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