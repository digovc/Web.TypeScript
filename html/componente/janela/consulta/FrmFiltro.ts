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

    export class FrmFiltro extends FormHtml implements OnAjaxListener, OnClickListener, OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _btnAdicionar: BotaoAdicionarMini;
        private _cmpIntFiltroId: CampoComboBox;
        private _pnlFiltro: PainelFiltro;
        private _tblWebConsulta: TabelaWeb;

        private get btnAdicionar(): BotaoAdicionarMini
        {
            if (this._btnAdicionar != null)
            {
                return this._btnAdicionar;
            }

            this._btnAdicionar = new BotaoAdicionarMini(this.strId + "_btnAdicionar");

            return this._btnAdicionar;
        }

        private get cmpIntFiltroId(): CampoComboBox
        {
            if (this._cmpIntFiltroId != null)
            {
                return this._cmpIntFiltroId;
            }

            this._cmpIntFiltroId = new CampoComboBox(this.strId + "_cmpIntFiltroId");

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

        private get tblWebConsulta(): TabelaWeb
        {
            if (this._tblWebConsulta != null)
            {
                return this._tblWebConsulta;
            }

            this._tblWebConsulta = this.getTblWebConsulta();

            return this._tblWebConsulta;
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
                return;
            }

            TblFiltro.i.limparFiltro();

            TblFiltro.i.addFiltro2(TblFiltro.i.clnIntId, this.cmpIntFiltroId.tagInput.intValor);

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.ABRIR_CADASTRO_FILTRO_CONTEUDO;

            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjaxDb: SolicitacaoAjaxDb) => { this.abrirFiltroConteudoSucesso(objSolicitacaoAjaxDb); });
            objSolicitacaoAjaxDb.addJsn(TblFiltro.i);

            objSolicitacaoAjaxDb.enviar();
        }

        private abrirFiltroCadastro(): void
        {
            if (this.pnlFiltro == null)
            {
                return;
            }

            if (this.pnlFiltro.jnlConsulta == null)
            {
                return;
            }

            this.pnlFiltro.jnlConsulta.abrirFiltroCadastro();
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

        protected carregarDados(): void
        {
            super.carregarDados();

            this.carregarDadosCmpFiltro();
        }

        private carregarDadosCmpFiltro(): void
        {
            if (this.tblWebConsulta == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.tblWebConsulta.strNome))
            {
                return;
            }

            TblFiltro.i.limparFiltro();

            TblFiltro.i.addFiltro2(TblFiltro.i.clnStrTabelaNome, this.tblWebConsulta.strNome);

            var objSolicitacaoAjaxDb: SolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.PESQUISAR_COMBO_BOX;

            objSolicitacaoAjaxDb.addFncSucesso((objSolicitacaoAjaxDb: SolicitacaoAjaxDb) => { this.carregarDadosCmpFiltroSucesso(objSolicitacaoAjaxDb); });
            objSolicitacaoAjaxDb.addJsn(TblFiltro.i);

            objSolicitacaoAjaxDb.enviar();
        }

        private carregarDadosCmpFiltroSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return;
            }

            var arrData: Array<any> = JSON.parse(objSolicitacaoAjaxDb.strData);

            arrData.forEach((par) => { this.carregarDadosCmpFiltroSucesso2(par); });
        }

        private carregarDadosCmpFiltroSucesso2(par: ParValorNome): void
        {
            if (par == null)
            {
                return;
            }

            this.cmpIntFiltroId.addOpcao(par);
        }

        private getTblWebConsulta(): TabelaWeb
        {
            if (this.pnlFiltro == null)
            {
                return null;
            }

            if (this.pnlFiltro.jnlConsulta == null)
            {
                return null;
            }

            if (this.pnlFiltro.jnlConsulta.tblWeb == null)
            {
                return null;
            }

            return this.pnlFiltro.jnlConsulta.tblWeb;
        }

        protected setEventos(): void
        {
            this.btnAdicionar.addEvtOnClickListener(this);

            this.cmpIntFiltroId.tagInput.addEvtOnValorAlteradoListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void { }

        public onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxErroArg): void { }

        public onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxSucessoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
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

        public onClick(objSender: Object, arg: any): void
        {
            switch (objSender)
            {
                case this.btnAdicionar:
                    this.abrirFiltroCadastro();
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