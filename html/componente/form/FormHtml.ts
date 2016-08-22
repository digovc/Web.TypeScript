/// <reference path="DivCritica.ts"/>
/// <reference path="DivDica.ts"/>
/// <reference path="OnCmpEmFocoAlterado.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class FormHtml extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrCmp: Array<CampoHtml>;
        private _cmpEmFoco: CampoHtml;
        private _divComando: DivComando;
        private _jnlCadastro: JnlCadastro;
        private _divCritica: DivDica;
        private _divDica: DivDica;
        private _tabHtml: TabHtml;
        private _tblWeb: TabelaWeb;

        protected get arrCmp(): Array<CampoHtml>
        {
            if (this._arrCmp != null)
            {
                return this._arrCmp;
            }

            this._arrCmp = this.getArrCmp();

            return this._arrCmp;
        }

        public get cmpEmFoco(): CampoHtml
        {
            return this._cmpEmFoco;
        }

        public set cmpEmFoco(cmpEmFoco: CampoHtml)
        {
            if (this._cmpEmFoco == cmpEmFoco)
            {
                return;
            }

            this._cmpEmFoco = cmpEmFoco;

            this.atualizarCmpEmFoco();
        }

        private get divComando(): DivComando
        {
            if (this._divComando != null)
            {
                return this._divComando;
            }

            this._divComando = new DivComando((this.strId + "_divComando"), this);

            return this._divComando;
        }

        public get jnlCadastro(): JnlCadastro
        {
            return this._jnlCadastro;
        }

        public set jnlCadastro(jnlCadastro: JnlCadastro)
        {
            if (this._jnlCadastro == jnlCadastro)
            {
                return;
            }

            this._jnlCadastro = jnlCadastro;

            this.atualizarJnlCadastro();
        }

        public get divCritica(): DivCritica
        {
            if (this._divCritica != null)
            {
                return this._divCritica;
            }

            this._divCritica = new DivCritica(this.strId + "_divCritica");

            return this._divCritica;
        }

        private get divDica(): DivDica
        {
            if (this._divDica != null)
            {
                return this._divDica;
            }

            this._divDica = new DivDica(this.strId + "_divDica");

            return this._divDica;
        }

        private get tabHtml(): TabHtml
        {
            if (this._tabHtml != null)
            {
                return this._tabHtml;
            }

            this._tabHtml = this.getTabHtml();

            return this._tabHtml;
        }

        public get tblWeb(): TabelaWeb
        {
            return this._tblWeb;
        }

        public set tblWeb(tblWeb: TabelaWeb)
        {
            if (this._tblWeb == tblWeb)
            {
                return;
            }

            this._tblWeb = tblWeb;

            this.atualizarTblWeb();
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public abrirCadastroFilho(tblWeb: TabelaWeb): void
        {
            if (this.jnlCadastro == null)
            {
                return;
            }

            this.jnlCadastro.abrirCadastroFilho(tblWeb);
        }

        public abrirJnlTag(): void
        {
            if (this.jnlCadastro == null)
            {
                return;
            }

            this.jnlCadastro.abrirJnlTag();
        }

        private abrirTabHtml(): void
        {
            if (this.jq == null)
            {
                return;
            }

            if (this.tabHtml == null)
            {
                return;
            }

            if (this.tabHtml.booVisivel)
            {
                return;
            }

            this.jq.height((this.jq.height() + 250));

            var intTop = Number(this.jq.css("top").replace("px", Utils.STR_VAZIA));

            this.jq.css("top", (intTop - 100));

            this.tabHtml.iniciar();
        }

        private atualizarCmpEmFoco(): void
        {
            this.dispararEvtOnCmpEmFocoAlterado();

            this.atualizarCmpEmFocodivCritica();
            this.atualizarCmpEmFocodivDica();
        }

        private atualizarCmpEmFocodivCritica(): void
        {
            this.divCritica.strConteudo = null;

            if (this.cmpEmFoco == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.cmpEmFoco.strCritica))
            {
                return;
            }

            this.divCritica.strConteudo = this.cmpEmFoco.strCritica;
        }

        private atualizarCmpEmFocodivDica(): void
        {
            this.divDica.strConteudo = null;

            if (this.cmpEmFoco == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.cmpEmFoco.strDica))
            {
                return;
            }

            this.divDica.strConteudo = this.cmpEmFoco.strDica;
        }

        private atualizarJnlCadastro(): void
        {
            if (this.jnlCadastro == null)
            {
                return;
            }

            this.tblWeb = this.jnlCadastro.tblWeb;
        }

        private atualizarTblWeb(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            this.atualizarTblWebArrCmp();
        }

        private atualizarTblWebArrCmp(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { this.tblWeb.addClnWeb(cmp.clnWeb); });
        }

        protected carregarDados(): void
        {
        }

        /**
         * Envia os dados para o servidor.
         */
        public enviar(): void
        {
            if (this.jq == null)
            {
                return;
            }

            this.jq.submit();
        }

        protected finalizar(): void
        {
            super.finalizar();

            this.carregarDados();
            this.selecionarCampo();
        }

        private getArrCmp(): Array<CampoHtml>
        {
            if (this.jq == null)
            {
                return;
            }

            var arrCmpJq = this.jq.find("[clazz*=Campo]");

            if (arrCmpJq == null)
            {
                return;
            }

            var arrCmpResultado = new Array<CampoHtml>();

            for (var i = 0; i < arrCmpJq.length; i++)
            {
                this.getArrCmp2(arrCmpResultado, arrCmpJq[i]);
            }

            return arrCmpResultado;
        }

        private getArrCmp2(arrCmpResultado: Array<CampoHtml>, cmpJq: HTMLElement): void
        {
            if (cmpJq == null)
            {
                return;
            }

            if (Utils.getBooStrVazia($(cmpJq).attr("clazz")))
            {
                return;
            }

            if (Utils.getBooStrVazia(cmpJq.id))
            {
                return;
            }

            var cmp: CampoHtml = new (<any>window)["NetZ_Web"][$(cmpJq).attr("clazz")](cmpJq.id);

            cmp.frm = this;

            arrCmpResultado.push(cmp);
        }

        public getCmp(strCmpId: string): CampoHtml
        {
            if (Utils.getBooStrVazia(strCmpId))
            {
                return null;
            }

            if (this.arrCmp == null)
            {
                return null;
            }

            for (var i = 0; i < this.arrCmp.length; i++)
            {
                if (this.arrCmp[i] == null)
                {
                    continue;
                }

                if (this.arrCmp[i].strId != strCmpId)
                {
                    continue;
                }

                return this.arrCmp[i];
            }

            return null;
        }

        /**
         * Busca na lista de campos desta janela de cadastro o
         * campo que represente a coluna com o nome passado por parãmetro.
         * @param strClnNome Nome da coluna que o campo representa.
         */
        public getCmpClnWebStrNome(strClnNome: string): CampoHtml
        {
            if (Utils.getBooStrVazia(strClnNome))
            {
                return null;
            }

            if (this.arrCmp == null)
            {
                return null;
            }

            var cmpResultado: CampoHtml;

            for (var i = 0; i < this.arrCmp.length; i++)
            {
                cmpResultado = this.getCmpClnWebStrNome2(strClnNome, this.arrCmp[i]);

                if (cmpResultado != null)
                {
                    return cmpResultado;
                }
            }

            return null;
        }

        private getCmpClnWebStrNome2(strClnNome: string, cmp: CampoHtml): CampoHtml
        {
            if (cmp == null)
            {
                return null;
            }

            if (cmp.clnWeb == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(cmp.clnWeb.strNome))
            {
                return null;
            }

            if (strClnNome.toLowerCase() != cmp.clnWeb.strNome.toLowerCase())
            {
                return null;
            }

            return cmp;
        }

        public getTabItem(tblWeb: TabelaWeb): TabItem
        {
            if (this.tabHtml == null)
            {
                return null;
            }

            return this.tabHtml.getTabItem(tblWeb);
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarArrCmp();

            this.divComando.iniciar();

            this.inicializarDivDica();

            this.inicializarTabHtml();
        }

        protected inicializarArrCmp(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { cmp.iniciar(); });
        }

        private inicializarDivDica(): void
        {
            if (this.cmpEmFoco == null)
            {
                return;
            }

            this.divDica.strConteudo = this.cmpEmFoco.strDica;
        }

        private inicializarTabHtml(): void
        {
            if (this.tabHtml == null)
            {
                return;
            }

            this.tabHtml.iniciar();
        }

        private getTabHtml(): TabHtml
        {
            var strTabHtmlId: string = (this.strId + "_tabHtml");

            if (document.getElementById(strTabHtmlId) == null)
            {
                return null;
            }

            var tabHtmlResultado: TabHtml = new TabHtml(strTabHtmlId);

            tabHtmlResultado.frm = this;

            return tabHtmlResultado;
        }

        public pesquisarTabItemPrincipal(): void
        {
            if (this.tabHtml == null)
            {
                return;
            }

            this.tabHtml.pesquisarTabItemPrincipal();
        }

        public salvar(): void
        {
            if (this.jnlCadastro == null)
            {
                return;
            }

            this.jnlCadastro.salvar();
        }

        private selecionarCampo(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            for (var i = 0; i < this.arrCmp.length; i++)
            {
                var cmp = this.arrCmp[i];

                if (cmp == null)
                {
                    continue;
                }

                if (!cmp.tagInput.booDisabled)
                {
                    continue;
                }

                cmp.receberFoco();
                return;
            }
        }

        public validarDados(): boolean
        {
            if (!this.validarDadosCmp())
            {
                return false;
            }

            return true;
        }

        private validarDadosCmp()
        {
            if (this.arrCmp == null)
            {
                return false;
            }

            if (this.arrCmp.length < 1)
            {
                return false;
            }

            for (var i = 0; i < this.arrCmp.length; i++)
            {
                if (!this.arrCmp[i].validarDados())
                {
                    return false;
                }
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnCmpEmFocoAlterado

        private _arrEvtOnCmpEmFocoAlterado: Array<OnCmpEmFocoAlterado>;

        private get arrEvtOnCmpEmFocoAlterado(): Array<OnCmpEmFocoAlterado>
        {
            if (this._arrEvtOnCmpEmFocoAlterado != null)
            {
                return this._arrEvtOnCmpEmFocoAlterado;
            }

            this._arrEvtOnCmpEmFocoAlterado = new Array<OnCmpEmFocoAlterado>();

            return this._arrEvtOnCmpEmFocoAlterado;
        }

        public addEvtOnCmpEmFocoAlterado(evtOnCmpEmFocoAlterado: OnCmpEmFocoAlterado): void
        {
            if (evtOnCmpEmFocoAlterado == null)
            {
                return;
            }

            if (this.arrEvtOnCmpEmFocoAlterado.indexOf(evtOnCmpEmFocoAlterado) > -1)
            {
                return;
            }

            this.arrEvtOnCmpEmFocoAlterado.push(evtOnCmpEmFocoAlterado);
        }

        private dispararEvtOnCmpEmFocoAlterado(): void
        {
            if (this.arrEvtOnCmpEmFocoAlterado.length == 0)
            {
                return;
            }

            this.arrEvtOnCmpEmFocoAlterado.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onCmpEmFocoAlterado(this, this.cmpEmFoco);
            });
        }

        public removerEvtOnCmpEmFocoAlterado(evtOnCmpEmFocoAlterado: OnCmpEmFocoAlterado): void
        {
            if (evtOnCmpEmFocoAlterado == null)
            {
                return;
            }

            if (this.arrEvtOnCmpEmFocoAlterado.indexOf(evtOnCmpEmFocoAlterado) == -1)
            {
                return;
            }

            this.arrEvtOnCmpEmFocoAlterado.splice(this.arrEvtOnCmpEmFocoAlterado.indexOf(evtOnCmpEmFocoAlterado), 1);
        }

        // #endregion Evento OnCmpEmFocoAlterado

        // #endregion Eventos
    }
}