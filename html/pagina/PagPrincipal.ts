/// <reference path="../../OnDisposedListener.ts"/>
/// <reference path="../../database/TabelaWeb.ts"/>
/// <reference path="../../server/ServerHttp.ts"/>
/// <reference path="../componente/janela/cadastro/JnlCadastro.ts"/>
/// <reference path="../componente/janela/consulta/JnlConsulta.ts"/>
/// <reference path="../Div.ts"/>
/// <reference path="PaginaHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagPrincipal extends PaginaHtml implements OnAjaxListener, OnDisposedListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divCadastro: Div;
        private _divConsulta: Div;
        private _jnlCadastro: JnlCadastro;
        private _jnlConsulta: JnlConsulta;

        private get divCadastro(): Div
        {
            if (this._divCadastro != null)
            {
                return this._divCadastro;
            }

            this._divCadastro = new Div("divCadastro");

            return this._divCadastro;
        }

        private get divConsulta(): Div
        {
            if (this._divConsulta != null)
            {
                return this._divConsulta;
            }

            this._divConsulta = new Div("divConsulta");

            return this._divConsulta;
        }

        public get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        public set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            this._jnlCadastro = jnlCadastro;
        }

        public get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        public set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirCadastro(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.ABRIR_CADASTRO;

            objSolicitacaoAjaxDb.addEvtOnAjaxListener(this);
            objSolicitacaoAjaxDb.addJsn(tblWeb);

            ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
        }

        private abrirCadastroSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return;
            }

            this.divCadastro.jq.append(objSolicitacaoAjaxDb.strData);

            this.inicializarJnlCadastro();
        }

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            this.divConsulta.esconder();

            var objSolicitacaoAjaxDb = new SolicitacaoAjaxDb();

            objSolicitacaoAjaxDb.addEvtOnAjaxListener(this);

            objSolicitacaoAjaxDb.enmMetodo = SolicitacaoAjaxDb_EnmMetodo.ABRIR_CONSULTA;
            objSolicitacaoAjaxDb.strData = JSON.stringify(tblWeb);

            ServerAjaxDb.i.enviar(objSolicitacaoAjaxDb);
        }

        private abrirConsultaSucesso(objSolicitacaoAjaxDb: SolicitacaoAjaxDb): void
        {
            if (objSolicitacaoAjaxDb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objSolicitacaoAjaxDb.strData))
            {
                return;
            }

            this.divConsulta.jq.html(objSolicitacaoAjaxDb.strData);

            this.inicializarJnlConsulta();
        }

        public abrirFiltroCadastro(intFiltroId: number): void
        {
            TblFiltro.i.limparFiltro();

            TblFiltro.i.addFil2(TblFiltro.i.clnIntId, intFiltroId);

            this.abrirCadastro(TblFiltro.i);
        }

        private carregarJsCadastro(): void
        {
            var arrJnlCadastroJq = this.divCadastro.jq.children();

            if (arrJnlCadastroJq == null)
            {
                return;
            }

            for (var i = 0; i < arrJnlCadastroJq.length; i++)
            {
                this.carregarJsCadastro2(arrJnlCadastroJq[i]);
            }
        }

        private carregarJsCadastro2(jnlCadastroJq: HTMLElement): void
        {
            if (jnlCadastroJq == null)
            {
                return;
            }

            var srcJqCadastro = $(jnlCadastroJq).attr("src_js"); // TODO: Permitir que sejam carregados N arquivos.

            if (Utils.getBooStrVazia(srcJqCadastro))
            {
                return;
            }

            if (this.validarJsCarregado(srcJqCadastro))
            {
                return;
            }

            var tagScriptCadastro = document.createElement("script");

            tagScriptCadastro.src = srcJqCadastro;
            tagScriptCadastro.type = "text/javascript";

            document.head.appendChild(tagScriptCadastro);
        }

        public fecharCadastro(jnlCadastro: JnlCadastro): void
        {
            if (this.jnlCadastro == null)
            {
                this.divCadastro.esconder();
                return;
            }

            if (this.jnlCadastro != jnlCadastro)
            {
                return;
            }

            this.divCadastro.esconder();

            this.jnlCadastro = null;
        }

        private fecharConsulta(): void
        {
            this.divConsulta.esconder();
        }

        private inicializarJnlCadastro(): void
        {
            this.divCadastro.mostrar();

            this.carregarJsCadastro();
        }

        private inicializarJnlConsulta(): void
        {
            this.divConsulta.mostrar();

            this.jnlConsulta = new JnlConsulta(this);

            this.jnlConsulta.addEvtOnDisposedListener(this);

            this.jnlConsulta.iniciar();
        }

        public removerJs(srcJs: string): void
        {
            if (Utils.getBooStrVazia(srcJs))
            {
                return;
            }

            var strSelect: string = "script[src='_src_js']";

            strSelect = strSelect.replace("_src_js", srcJs);

            $(strSelect).remove();
        }

        // #endregion Métodos

        // #region Eventos

        public onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void
        {
        }

        public onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxErroArg): void
        {
        }

        public onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxSucessoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch ((<SolicitacaoAjaxDb>objSolicitacaoAjaxSender).enmMetodo)
                {
                    case SolicitacaoAjaxDb_EnmMetodo.ABRIR_CADASTRO:
                        this.abrirCadastroSucesso(arg.objSolicitacaoAjaxDb);
                        return;

                    case SolicitacaoAjaxDb_EnmMetodo.ABRIR_CONSULTA:
                        this.abrirConsultaSucesso(arg.objSolicitacaoAjaxDb);
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

        public onDisposed(objSender: Object): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (objSender instanceof JnlConsulta)
                {
                    this.fecharConsulta();
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