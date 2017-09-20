// #region Reference

/// <reference path="../BotaoHtml.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class BotaoActionBar extends BotaoHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booRapido: boolean = true;
        private _srcIcone: string;

        public get booRapido(): boolean
        {
            return this._booRapido;
        }

        public set booRapido(booRapido: boolean)
        {
            this._booRapido = booRapido;
        }

        public get srcIcone(): string
        {
            return this._srcIcone;
        }

        public set srcIcone(srcIcone: string)
        {
            this._srcIcone = srcIcone;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarIcone();
        }

        private inicializarIcone(): void
        {
            if (Utils.getBooStrVazia(this.srcIcone))
            {
                return;
            }

            this.jq.css("background-image", ("url(" + this.srcIcone + ")"));
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_div_id", this.strId);

            return strLayoutFixo;
        }

        protected processarOnFocusIn(): void
        {
            //super.processarOnFocusIn();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}