/// <reference path="ComponenteHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Canvas extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

private _booAnimar: boolean ;

public get booAnimar(): boolean
{
return this._booAnimar;
}

public set booAnimar(booAnimar: boolean)
{
this._booAnimar = booAnimar;
}

        private _ctx2D: CanvasRenderingContext2D;

        private get ctx2D(): CanvasRenderingContext2D
        {
            if (this._ctx2D != null)
            {
                return this._ctx2D;
            }

            this._ctx2D = this.getCtx2D();

            return this._ctx2D;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public animar(): void
        {
            this.booAnimar = true;


        }

        private getCtx2D(): CanvasRenderingContext2D
        {
            if (Utils.getBooStrVazia(this.strId))
            {
                return null;
            }

            var tagCanvas = (document.getElementById(this.strId) as HTMLCanvasElement);

            if (tagCanvas == null)
            {
                return null;
            }

            return tagCanvas.getContext("2d");
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}