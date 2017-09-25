// #region Reference

/// <reference path="../typedefinition/velocity-animate.d.ts" />

// #endregion Reference

module Web
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

        // #region Construtor

        constructor(tag: Tag)
        {
            super();

            this.tag = tag;
        }

        // #endregion Construtor

        // #region Métodos

        public animarBackgroundColor(cor: string): void
        {
            this.preparar();

            if (Utils.getBooStrVazia(cor))
            {
                return;
            }

            if (this.tag == null)
            {
                return;
            }

            this.tag.jq.velocity({ "background-color": cor }, { duration: 350 });
        }

        public balancar(fncComplete: Function = null): void
        {
            this.preparar();

            this.tag.jq.velocity({ "translateX": "+=25" }, { duration: 125 });
            this.tag.jq.velocity({ "translateX": "-=50" }, { duration: 125 });
            this.tag.jq.velocity({ "translateX": "+=50" }, { duration: 125 });
            this.tag.jq.velocity({ "translateX": "-=50" }, { duration: 125 });
            this.tag.jq.velocity({ "translateX": "+=50" }, { duration: 125 });

            this.tag.jq.velocity({ "translateX": "0px" },
                {
                    duration: 125,
                    complete: (fncComplete as any)
                });
        }

        public fadeIn(fncComplete: Function = null): void
        {
            this.preparar();

            if (this.tag.booVisivel)
            {
                return;
            }

            var cfg: jquery.velocity.Options =
                {
                    complete: (fncComplete as any),
                    display: "block",
                    duration: 250,
                }

            this.tag.jq.velocity({ "opacity": 1 }, cfg);
        }

        public fadeOut(fncComplete: Function = null): void
        {
            this.preparar();

            if (!this.tag.booVisivel)
            {
                return;
            }

            var cfg: jquery.velocity.Options =
                {
                    complete: (fncComplete as any),
                    display: "none",
                    duration: 250,
                }

            this.tag.jq.velocity({ "opacity": 0 }, cfg);
        }

        private slideVerticalDireitaEsquerdaIn(fncComplete: Function, booDireita: boolean): void
        {
            this.preparar();

            if (this.tag.booVisivel)
            {
                return;
            }

            this.tag.jq.css("opacity", 0);

            this.tag.jq.velocity({ "translateX": (booDireita ? "25px" : "-25px") }, { duration: 0 });

            var cfg: jquery.velocity.Options =
                {
                    complete: (fncComplete as any),
                    display: "block",
                    duration: 250,
                    easing: "easeInOutQuart",
                }

            var arrCss =
                {
                    "opacity": 1,
                    "translateX": "0px",
                }

            this.tag.jq.velocity(arrCss, cfg);
        }

        public slideVerticalDireitaIn(fncComplete: Function = null): void
        {
            this.slideVerticalDireitaEsquerdaIn(fncComplete, true);
        }

        public slideVerticalEsquerdaIn(fncComplete: Function = null): void
        {
            this.slideVerticalDireitaEsquerdaIn(fncComplete, false);
        }

        public slideVerticalDireitaOut(fncComplete: Function): void
        {
            this.preparar();

            if (!this.tag.booVisivel)
            {
                return;
            }

            this.tag.jq.css("margin-left", "-25vw");
            this.tag.jq.css("margin-right", "25vw");
            this.tag.jq.css("opacity", "1");

            var cfg: jquery.velocity.Options =
                {
                    complete: (fncComplete as any),
                    duration: 250,
                    easing: "ease",
                }

            var arrCss =
                {
                    "margin-left": "0vw",
                    "margin-right": "0vw",
                    "opacity": "0",
                }

            this.tag.jq.velocity(arrCss, cfg);
        }

        public girar(fltDegrees: number = 360, intDuracao: number = 250, fncComplete: Function = null): void
        {
            this.preparar();

            var cfg: JQueryAnimationOptions =
                {
                    duration: 250,

                    complete: fncComplete,
                    step: (f => this.tag.jq.css("transform", "rotate(" + f + "deg)")),
                };

            $({ i: 0 }).animate({ fltDegrees }, cfg);
        }

        private pararAnimacao(): void
        {
            this.tag.jq.stop();
            this.tag.jq.velocity("finish");
        }

        private preparar(): void
        {
            if (this.tag == null)
            {
                throw new Error('O atributo "tag" está vazio.');
            }

            this.pararAnimacao();
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}