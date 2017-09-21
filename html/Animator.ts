// #region Reference

/// <reference path="../typedefinition/velocity-animate.d.ts" />

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum Animator_EnmAnimacao
    {
        FADE_IN,
        FADE_OUT,
        SLIDE_HORIZONTAL_IN,
        SLIDE_HORIZONTAL_OUT,
        SLIDE_VERTICAL_IN,
        SLIDE_VERTICAL_OUT,
        SLIDE_VERTICAL_DIREITA_IN,
        SLIDE_VERTICAL_DIREITA_OUT,
        SLIDE_VERTICAL_ESQUERDA_IN,
        SLIDE_VERTICAL_ESQUERDA_OUT,
    }

    // #endregion Enumerados

    export class Animator extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private static _arrEnmAnimacaoIn: Array<Animator_EnmAnimacao>;
        private static _arrEnmAnimacaoOut: Array<Animator_EnmAnimacao>;

        private static get arrEnmAnimacaoIn(): Array<Animator_EnmAnimacao>
        {
            if (this._arrEnmAnimacaoIn != null)
            {
                return this._arrEnmAnimacaoIn;
            }

            this._arrEnmAnimacaoIn = this.getArrEnmAnimacaoIn();

            return this._arrEnmAnimacaoIn;
        }

        private static get arrEnmAnimacaoOut(): Array<Animator_EnmAnimacao>
        {
            if (this._arrEnmAnimacaoOut != null)
            {
                return this._arrEnmAnimacaoOut;
            }

            this._arrEnmAnimacaoOut = this.getArrEnmAnimacaoOut();

            return this._arrEnmAnimacaoOut;
        }

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

        public animar(enmAnimacao: Animator_EnmAnimacao = Animator_EnmAnimacao.FADE_IN, fncComplete: Function = null): void
        {
            if (this.tag == null)
            {
                return;
            }

            if (!this.validar(enmAnimacao))
            {
                return;
            }

            this.tag.jq.stop();

            switch (enmAnimacao)
            {
                case Animator_EnmAnimacao.FADE_IN:
                    this.tag.jq.fadeIn(250, fncComplete);
                    return;

                case Animator_EnmAnimacao.FADE_OUT:
                    this.tag.jq.fadeOut(250, fncComplete);
                    return;

                case Animator_EnmAnimacao.SLIDE_HORIZONTAL_IN:
                    this.tag.jq.show(250, fncComplete); // TODO: Implementar.
                    return;

                case Animator_EnmAnimacao.SLIDE_HORIZONTAL_OUT:
                    this.tag.jq.hide(250, fncComplete); // TODO: Implementar.
                    return;

                case Animator_EnmAnimacao.SLIDE_VERTICAL_IN:
                    this.tag.jq.slideDown(250, fncComplete);
                    return;

                case Animator_EnmAnimacao.SLIDE_VERTICAL_OUT:
                    this.tag.jq.slideUp(250, fncComplete);
                    return;

                case Animator_EnmAnimacao.SLIDE_VERTICAL_DIREITA_IN:
                    this.slideVerticalDireitaIn(fncComplete);
                    return;

                case Animator_EnmAnimacao.SLIDE_VERTICAL_DIREITA_OUT:
                    this.slideVerticalDireitaOut(fncComplete);
                    return;

                default:
                    new Erro("Animação não implementada.");
                    return;
            }
        }

        private slideVerticalDireitaIn(fncComplete: Function): void
        {
            this.tag.jq.css("transform", "translateX(25px)");
            this.tag.jq.css("opacity", "0");

            var cfg: jquery.velocity.Options =
                {
                    complete: (fncComplete as any),
                    display: "block",
                    duration: 150,
                    easing: "ease",
                }

            var arrCss =
                {
                    "translateX": 0,
                    "opacity": 1,
                }

            this.tag.jq.velocity(arrCss, cfg);
        }

        private slideVerticalDireitaOut(fncComplete: Function): void
        {
            this.tag.jq.css("margin-left", "-25vw");
            this.tag.jq.css("margin-right", "25vw");
            this.tag.jq.css("opacity", "1");

            var cfg: jquery.velocity.Options =
                {
                    complete: (fncComplete as any),
                    duration: 150,
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

        private static getArrEnmAnimacaoIn(): Array<Animator_EnmAnimacao>
        {
            var arrEnmAnimacaoInResultado = new Array<Animator_EnmAnimacao>();

            arrEnmAnimacaoInResultado.push(Animator_EnmAnimacao.FADE_IN);
            arrEnmAnimacaoInResultado.push(Animator_EnmAnimacao.SLIDE_HORIZONTAL_IN);
            arrEnmAnimacaoInResultado.push(Animator_EnmAnimacao.SLIDE_VERTICAL_DIREITA_IN);
            arrEnmAnimacaoInResultado.push(Animator_EnmAnimacao.SLIDE_VERTICAL_IN);

            return arrEnmAnimacaoInResultado;
        }

        private static getArrEnmAnimacaoOut(): Array<Animator_EnmAnimacao>
        {
            var arrEnmAnimacaoOutResultado = new Array<Animator_EnmAnimacao>();

            arrEnmAnimacaoOutResultado.push(Animator_EnmAnimacao.FADE_OUT);
            arrEnmAnimacaoOutResultado.push(Animator_EnmAnimacao.SLIDE_HORIZONTAL_OUT);
            arrEnmAnimacaoOutResultado.push(Animator_EnmAnimacao.SLIDE_VERTICAL_DIREITA_OUT);
            arrEnmAnimacaoOutResultado.push(Animator_EnmAnimacao.SLIDE_VERTICAL_OUT);

            return arrEnmAnimacaoOutResultado;
        }

        public girar(fltDegrees: number = 360, intDuracao: number = 250, fncComplete: Function = null): void
        {
            var cfg: JQueryAnimationOptions =
                {
                    duration: 250,

                    complete: fncComplete,
                    step: (f => this.tag.jq.css("transform", "rotate(" + f + "deg)")),
                };

            $({ i: 0 }).animate({ fltDegrees }, cfg);
        }

        private validar(enmAnimcatao: Animator_EnmAnimacao): boolean
        {
            if (this.tag.booVisivel && (Animator.arrEnmAnimacaoIn.indexOf(enmAnimcatao) > -1))
            {
                return false;
            }

            if (!this.tag.booVisivel && (Animator.arrEnmAnimacaoOut.indexOf(enmAnimcatao) > -1))
            {
                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}