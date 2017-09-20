// #region Reference

/// <reference path="../../ConstanteManager.ts"/>
/// <reference path="../Div.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ComponenteHtmlBase extends Div
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booSelecionado: boolean;
        private _objAnexo: Object;
        private _strConstanteLayoutFixoNome: string;
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

            this.setBooSelecionado(this._booSelecionado);
        }

        public get objAnexo(): Object
        {
            return this._objAnexo;
        }

        public set objAnexo(objAnexo: Object)
        {
            this._objAnexo = objAnexo;
        }

        private get strConstanteLayoutFixoNome(): string
        {
            if (this._strConstanteLayoutFixoNome != null)
            {
                return this._strConstanteLayoutFixoNome;
            }

            this._strConstanteLayoutFixoNome = this.getStrConstanteLayoutFixoNome();

            return this._strConstanteLayoutFixoNome;
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

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected setBooSelecionado(booSelecionado: boolean): void
        {
            this.jq.css("background-color", booSelecionado ? this.getCorSelecionado() : Utils.STR_VAZIA);
            this.jq.css("color", booSelecionado ? "black" : Utils.STR_VAZIA);

            this.setBooSelecionadoFoco(booSelecionado);
        }

        private setBooSelecionadoFoco(booSelecionado: boolean): void
        {
            if (!booSelecionado)
            {
                return;
            }

            this.receberFoco();
        }

        protected getCorSelecionado(): string
        {
            return AppWebBase.i.objTema.corSelecionado;
        }

        protected getStrConstanteLayoutFixoNome(): string
        {
            return (this.strClassNome + "_layoutFixo");
        }

        private getStrLayoutFixo(): string
        {
            var strLayoutFixo = ConstanteManager.i.getStrConstante(this.strConstanteLayoutFixoNome);

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

        public animar(enmAnimacao: Animator_EnmAnimacao = Animator_EnmAnimacao.FADE_IN, fncComplete: Function = null)
        {
            super.animar(enmAnimacao, fncComplete);

            AppWebBase.i.tagFoco = this;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}