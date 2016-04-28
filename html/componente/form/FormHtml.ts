/// <reference path="../campo/CampoAlfanumerico.ts"/>
/// <reference path="../campo/CampoCheckBox.ts"/>
/// <reference path="../campo/CampoComboBox.ts"/>
/// <reference path="../campo/CampoConsulta.ts"/>
/// <reference path="../campo/CampoNumerico.ts"/>

module NetZ_Web_TypeScript
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

        protected get arrCmp(): Array<CampoHtml>
        {
            if (this._arrCmp != null)
            {
                return this._arrCmp;
            }

            this._arrCmp = this.getArrCmp();

            return this._arrCmp;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected carregarDados(): void
        {
        }

        public carregarTblWeb(tblWeb: TabelaWeb): void
        {
            if (tblWeb == null)
            {
                return;
            }

            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { tblWeb.addClnWeb(cmp.clnWeb); });
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

            if (Utils.getBooStrVazia(cmpJq.id))
            {
                return;
            }

            switch ($(cmpJq).attr("clazz"))
            {
                case "CampoAlfanumerico":
                    arrCmpResultado.push(new CampoAlfanumerico(cmpJq.id));
                    return;

                case "CampoCheckBox":
                    arrCmpResultado.push(new CampoCheckBox(cmpJq.id));
                    return;

                case "CampoComboBox":
                    arrCmpResultado.push(new CampoComboBox(cmpJq.id));
                    return;

                case "CampoConsulta":
                    arrCmpResultado.push(new CampoConsulta(cmpJq.id));
                    return;

                case "CampoNumerico":
                    arrCmpResultado.push(new CampoNumerico(cmpJq.id));
                    return;
            }
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
        public getCmpClnWebNome(strClnNome: string): CampoHtml
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
                cmpResultado = this.getCmpClnWebNome2(strClnNome, this.arrCmp[i]);

                if (cmpResultado == null)
                {
                    continue;
                }
            }

            return cmpResultado;
        }

        private getCmpClnWebNome2(strClnNome: string, cmp: CampoHtml): CampoHtml
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

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarCampos();
        }

        private inicializarCampos(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { cmp.iniciar(); });
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

                if (!cmp.booAtivo)
                {
                    continue;
                }

                cmp.receberFoco();
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
        // #endregion Eventos
    }
}