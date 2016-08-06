/// <reference path="../../database/TabelaWeb.ts"/>
/// <reference path="../../OnDisposedListener.ts"/>
/// <reference path="../../server/ServerHttp.ts"/>
/// <reference path="../componente/janela/cadastro/JnlCadastro.ts"/>
/// <reference path="../componente/janela/cadastro/jnltag.ts"/>
/// <reference path="../componente/janela/consulta/JnlConsulta.ts"/>
/// <reference path="../Div.ts"/>
/// <reference path="PaginaHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagPrincipal extends PaginaHtml implements OnDisposedListener
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
            if (AppWeb.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_ABRIR_CADASTRO;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.abrirCadastroSucesso(objInterlocutor); });
            objInterlocutor.addJsn(tblWeb);

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private abrirCadastroSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objInterlocutor.strData))
            {
                return;
            }

            this.divCadastro.jq.append(objInterlocutor.strData);

            this.inicializarJnlCadastro();
        }

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            if (AppWeb.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (tblWeb == null)
            {
                return;
            }

            if (this.jnlConsulta != null && this.jnlConsulta.tblWeb.strNome == tblWeb.strNome)
            {
                Notificacao.notificar("Essa consulta já está aberta.", Notificacao_EnmTipo.INFO);
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            this.divConsulta.esconder(Tag_EnmAnimacaoTipo.SLIDE_VERTICAL);

            var objInterlocutor = new Interlocutor();

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.abrirConsultaSucesso(objInterlocutor); });

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_ABRIR_CONSULTA;
            objInterlocutor.strData = JSON.stringify(tblWeb);

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private abrirConsultaSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objInterlocutor.strData))
            {
                return;
            }

            this.divConsulta.jq.slideUp(200, (() => { this.inicializarJnlConsulta(objInterlocutor); }));
        }

        public abrirFiltroCadastro(intFiltroId: number): void
        {
            TblFiltro.i.limparFiltro();

            TblFiltro.i.clnWebIntId.intValor = intFiltroId;

            this.abrirCadastro(TblFiltro.i);
        }

        public abrirJnlTag(tblWeb: TabelaWeb): void
        {
            if (AppWeb.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            if (tblWeb.clnWebIntId.intValor < 1)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_ABRIR_JANELA_TAG;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.abrirJnlTagSucesso(tblWeb, objInterlocutor); });
            objInterlocutor.addJsn(tblWeb);

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private abrirJnlTagSucesso(tblWeb: TabelaWeb, objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objInterlocutor.strData))
            {
                return;
            }

            this.divCadastro.jq.append(objInterlocutor.strData);

            this.inicializarJnlTag(tblWeb);
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
                this.carregarJsCadastroItem(arrJnlCadastroJq[i]);
            }
        }

        private carregarJsCadastroItem(jnlCadastroJq: HTMLElement): void
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

        private inicializarJnlConsulta(objInterlocutor: Interlocutor): void
        {
            this.divConsulta.jq.html(objInterlocutor.strData);

            this.divConsulta.mostrar(Tag_EnmAnimacaoTipo.SLIDE_VERTICAL);

            this.jnlConsulta = new JnlConsulta(this);

            this.jnlConsulta.addEvtOnDisposedListener(this);

            this.jnlConsulta.iniciar();
        }

        private inicializarJnlTag(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tblWeb.strNome))
            {
                return;
            }

            var jnlTag = new JnlTag(this, tblWeb);

            jnlTag.iniciar();
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