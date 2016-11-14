/// <reference path="../../ConstanteManager.ts"/>
/// <reference path="../Div.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ComponenteHtml extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booSelecionado: boolean;
        private _objAnexo: Object;
        private _strLayoutFixo: string;

        public get booSelecionado(): boolean
        {
            return this._booSelecionado;
        }

        public set booSelecionado(booSelecionado: boolean)
        {
            if (this._booSelecionado == booSelecionado)
            {
                return;
            }

            this._booSelecionado = booSelecionado;

            this.atualizarBooSelecionado();
        }

        public get objAnexo(): Object
        {
            return this._objAnexo;
        }

        public set objAnexo(objAnexo: Object)
        {
            this._objAnexo = objAnexo;
        }

        public get strLayoutFixo(): string
        {
            if (this._strLayoutFixo != null)
            {
                return this._strLayoutFixo;
            }

            this._strLayoutFixo = this.getStrLayoutFixo();

            return this._strLayoutFixo;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected atualizarBooSelecionado(): void
        {
            this.jq.css("background-color", this.booSelecionado ? this.getCorSelecionado() : Utils.STR_VAZIA);
            this.jq.css("color", this.booSelecionado ? "black" : Utils.STR_VAZIA);

            this.atualizarBooSelecionadoFoco();
        }

        private atualizarBooSelecionadoFoco(): void
        {
            if (!this.booSelecionado)
            {
                return;
            }

            this.receberFoco();
        }

        protected getCorSelecionado(): string
        {
            return AppWebBase.i.objTema.corSelecionado;
        }

        private getStrLayoutFixo(): string
        {
            var strLayoutFixo = ConstanteManager.i.getStrConstante(this.strClassNome + "_layoutFixo");

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return null;
            }

            return this.montarLayoutFixo(strLayoutFixo);
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            return strLayoutFixo;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}