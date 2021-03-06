﻿// #region Reference

/// <reference path="../componente/janela/cadastro/JnlCadastro.ts"/>
/// <reference path="../componente/janela/cadastro/JnlTag.ts"/>
/// <reference path="../componente/janela/consulta/JnlConsulta.ts"/>
/// <reference path="../Div.ts"/>
/// <reference path="PaginaHtmlBase.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class PagPrincipalBase extends PaginaHtmlBase implements OnDisposedListener
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

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public abrirCadastro(tblWeb: TabelaWeb): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
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

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_ABRIR_CADASTRO;

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.abrirCadastroSucesso(o, tblWeb));
            objInterlocutor.addJsn(tblWeb);

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private abrirCadastroSucesso(objInterlocutor: Interlocutor, tblWeb: TabelaWeb): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            this.divCadastro.jq.append(objInterlocutor.objData.toString());

            this.carregarJsCadastro(tblWeb);
        }

        public abrirConsulta(tblWeb: TabelaWeb): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
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

            this.divConsulta.anm.sumir();

            var objInterlocutor = new Interlocutor();

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.abrirConsultaSucesso(o));

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_ABRIR_CONSULTA;

            objInterlocutor.addJsn(tblWeb);

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private abrirConsultaSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            this.divConsulta.jq.slideUp(200, (() => this.inicializarJnlConsulta(objInterlocutor)));
        }

        private abrirConsultaSucessoHistorico(): void
        {
        }

        public abrirFiltroCadastro(intFiltroId: number): void
        {
            TblFiltro.i.limparFiltro();

            TblFiltro.i.clnIntId.intValor = intFiltroId;

            this.abrirCadastro(TblFiltro.i);
        }

        public abrirJnlTag(tbl: TabelaWeb): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                throw SrvAjaxDbeBase.STR_EXCEPTION_NULL;
            }

            if (tbl == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(tbl.strNome))
            {
                return;
            }

            if (tbl.clnIntId.intValor < 1)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_TAG_ABRIR_JANELA;

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.abrirJnlTagSucesso(tbl, o));
            objInterlocutor.addJsn(tbl);

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private abrirJnlTagSucesso(tblWeb: TabelaWeb, objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            this.divCadastro.jq.append(objInterlocutor.objData.toString());

            this.inicializarJnlTag(tblWeb);
        }

        private carregarJsCadastro(tblWeb: TabelaWeb): void
        {
            var jnlCadastroJq = this.divCadastro.jq.children().last();

            if (jnlCadastroJq == null)
            {
                return;
            }

            var srcJqCadastro = $(jnlCadastroJq).attr("src_js");

            if (Utils.getBooStrVazia(srcJqCadastro))
            {
                return;
            }

            if ((window as any)[AppWebBase.i.strNamespace][jnlCadastroJq.id] != null)
            {
                return;
            }

            var tagScriptCadastro = document.createElement("script");

            tagScriptCadastro.src = srcJqCadastro;
            tagScriptCadastro.type = "text/javascript";

            tagScriptCadastro.onload = (() => this.inicializarJnlCadastro(jnlCadastroJq));

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

        private inicializarJnlCadastro(jnlCadastroJq: JQuery): void
        {
            this.divCadastro.anm.aparecer();

            var jnlCadastro: JnlCadastro = new (window as any)[AppWebBase.i.strNamespace][jnlCadastroJq[0].id]();

            jnlCadastro.iniciar();
        }

        private inicializarJnlConsulta(objInterlocutor: Interlocutor): void
        {
            this.divConsulta.jq.html(objInterlocutor.objData.toString());

            this.divConsulta.anm.aparecer();

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

        public onDisposed(objSender: Objeto): void
        {
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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}