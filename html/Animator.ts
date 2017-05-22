﻿module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Animator extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _tag: Tag;

        private get tag(): Tag
        {
            return this._tag;
        }

        private set tag(tag: Tag)
        {
            this._tag = tag;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(tag: Tag)
        {
            super();

            this.tag = tag;
        }

        // #endregion Construtores

        // #region Métodos

        public girar(fltDegrees: number = 360, intDuracao: number = 250, fncComplete: Function = null): void
        {
            var cfg: JQueryAnimationOptions =
                {
                    duration: 250,

                    complete: fncComplete,
                    step: ((fltNow: number) => { this.tag.jq.css("transform", "rotate(" + fltNow + "deg)"); }),
                };

            $({ i: 0 }).animate({ fltDegrees }, cfg);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}