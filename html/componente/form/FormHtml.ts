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

            this.arrCmp.forEach((cmp) => { tblWeb.addClnWeb(cmp.cln); });
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

            this.finalizarSelecionarCampo();
        }

        private finalizarSelecionarCampo(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            if (this.arrCmp.length < 2)
            {
                return;
            }

            this.arrCmp[1].receberFoco();
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

        /**
         * Busca na lista de campos desta janela de cadastro o
         * campo que represente a coluna com o nome passado por parãmetro.
         * @param strClnNome Nome da coluna que o campo representa.
         */
        public getCmp(strClnNome: string): CampoHtml
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

            this.arrCmp.some((cmp) =>
            {
                cmpResultado = this.getCmp2(strClnNome, cmp);

                return cmpResultado != null;
            });

            return cmpResultado;
        }

        private getCmp2(strClnNome: string, cmp: CampoHtml): CampoHtml
        {
            if (cmp == null)
            {
                return null;
            }

            if (cmp.cln == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(cmp.cln.strNome))
            {
                return null;
            }

            if (strClnNome.toLowerCase() != cmp.cln.strNome.toLowerCase())
            {
                return null;
            }

            return cmp;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarCampos();

            this.carregarDados();
        }

        private inicializarCampos(): void
        {
            if (this.arrCmp == null)
            {
                return;
            }

            this.arrCmp.forEach((cmp) => { cmp.iniciar(); });
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