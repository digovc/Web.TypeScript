// #region Reference

/// <reference path="botao/BotaoMini.ts"/>
/// <reference path="ComponenteHtmlBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum Notificacao_EnmTipo
    {
        INFO,
        NEGATIVA,
        POSITIVA,
    }

    // #endregion Enumerados

    export class Notificacao extends ComponenteHtmlBase implements OnClickListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes

        private static get STR_PERMISSAO_DENIED(): string { return "denied" };
        private static get STR_PERMISSAO_GRANTED(): string { return "granted" };

        // #endregion Constantes

        // #region Atributos

        private static _intNotificacaoAberta: number;

        private static get intNotificacaoAberta(): number
        {
            return this._intNotificacaoAberta;
        }

        private static set intNotificacaoAberta(intNotificacaoAberta: number)
        {
            this._intNotificacaoAberta = intNotificacaoAberta;
        }

        private _btnFechar: BotaoMini;
        private _divIcone: Div;
        private _enmTipo: Notificacao_EnmTipo;
        private _intFecharTimeout: number;
        private _intTempo: number;
        private _strNotificacao: string;
        private _objNotificacao: any;

        private get btnFechar(): BotaoMini
        {
            if (this._btnFechar != null)
            {
                return this._btnFechar;
            }

            this._btnFechar = new BotaoMini(this.strId + "_btnFechar");

            return this._btnFechar;
        }

        private get divIcone(): Div
        {
            if (this._divIcone != null)
            {
                return this._divIcone;
            }

            this._divIcone = new Div(this.strId + "_divIcone");

            return this._divIcone;
        }

        private get enmTipo(): Notificacao_EnmTipo
        {
            return this._enmTipo;
        }

        private set enmTipo(enmTipo: Notificacao_EnmTipo)
        {
            this._enmTipo = enmTipo;
        }

        private get intFecharTimeout(): number
        {
            return this._intFecharTimeout;
        }

        private set intFecharTimeout(intFecharTimeout: number)
        {
            this._intFecharTimeout = intFecharTimeout;
        }

        private get intTempo(): number
        {
            if (this._intTempo > 0)
            {
                return this._intTempo;
            }

            this._intTempo = this.getIntTempo();

            return this._intTempo;
        }

        private get objNotificacao(): any
        {
            return this._objNotificacao;
        }

        private set objNotificacao(objNotificacao: any)
        {
            this._objNotificacao = objNotificacao;
        }

        private get strNotificacao(): string
        {
            return this._strNotificacao;
        }

        private set strNotificacao(strNotificacao: string)
        {
            this._strNotificacao = strNotificacao;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(strNotificacao: string, enmTipo: Notificacao_EnmTipo = Notificacao_EnmTipo.POSITIVA)
        {
            super(null);

            this.enmTipo = enmTipo;
            this.strId = ("tagNotificacao_" + this.intObjetoId);
            this.strNotificacao = strNotificacao;
        }

        // #endregion Construtor

        // #region Métodos

        public static notificar(strNotificacao: string, enmTipo: Notificacao_EnmTipo = Notificacao_EnmTipo.POSITIVA): void
        {
            if (Utils.getBooStrVazia(strNotificacao))
            {
                return;
            }

            new Notificacao(strNotificacao, enmTipo).abrirNotificacao();
        }

        private abrirNotificacao(): void
        {
            if (Utils.getBooStrVazia(this.strNotificacao))
            {
                return;
            }

            if (Notificacao.intNotificacaoAberta > 4)
            {
                this.atrasarNotificacao();
                return;
            }

            if (AppWebBase.i.pag == null)
            {
                return;
            }

            if (!AppWebBase.i.booEmFoco)
            {
                this.abrirNotificacaoExterna();
                return;
            }

            // TODO: Adicionar a notificação para dentro do próprio body, removendo a necessidade dessa "divNotificacao".
            AppWebBase.i.pag.divNotificacao.jq.append(this.strLayoutFixo);

            Notificacao.intNotificacaoAberta++;

            this.iniciar();
        }

        private abrirNotificacaoExterna(): void
        {
            if (!("Notification" in window))
            {
                this.atrasarNotificacao();
                return;
            }

            if ((Notification as any).permission == Notificacao.STR_PERMISSAO_DENIED)
            {
                this.atrasarNotificacao();
                return;
            }

            if ((Notification as any).permission == Notificacao.STR_PERMISSAO_GRANTED)
            {
                this.abrirNotificacaoExternaPermitido();
                return;
            }

            Notification.requestPermission(() => this.abrirNotificacaoExterna());
            return;
        }

        private abrirNotificacaoExternaPermitido(): void
        {
            var objOptions =
                {
                    body: this.strNotificacao,
                    icon: this.getUrlIcon(),
                    onclose: (() => this.fecharNotificacao()),
                }

            this.objNotificacao = new Notification((!Utils.getBooStrVazia(AppWebBase.i.strNome) ? AppWebBase.i.strNome : "Notificação"), objOptions);

            Notificacao.intNotificacaoAberta++;

            this.intFecharTimeout = window.setTimeout((() => this.fecharNotificacao()), this.intTempo)
        }

        private atrasarNotificacao(): void
        {
            window.setTimeout((() => this.abrirNotificacao()), 1000);
        }

        private fecharNotificacao(): void
        {
            window.clearTimeout(this.intFecharTimeout);

            Notificacao.intNotificacaoAberta--;

            if (this.objNotificacao != null)
            {
                this.objNotificacao.close();
            }

            this.dispose();
        }

        private getIntTempo(): number
        {
            var intTempoResultado = (!Utils.getBooStrVazia(this.strNotificacao)) ? (this.strNotificacao.length * 150) : 5000;

            return ((intTempoResultado > 250) ? intTempoResultado : 5000);
        }

        private getUrlIcon(): string
        {
            switch (this.enmTipo)
            {
                case Notificacao_EnmTipo.INFO:
                    return "/res/media/png/img_notificacao_info.png";

                case Notificacao_EnmTipo.NEGATIVA:
                    return "/res/media/png/img_notificacao_negativa.png";

                default:
                    return "/res/media/png/img_notificacao_positiva.png";
            }
        }

        protected inicializar(): void
        {
            super.inicializar()

            this.btnFechar.iniciar();

            this.inicializarEnmTipo();

            this.inicializarTimeoutFechar();

            this.mostrar();
        }

        private inicializarEnmTipo(): void
        {
            switch (this.enmTipo)
            {
                case Notificacao_EnmTipo.INFO:
                    this.divIcone.jq.css("background-image", "url('/res/media/png/img_notificacao_info.png')");
                    this.divIcone.jq.css("border-right", "5px solid #9bcad1");
                    return;

                case Notificacao_EnmTipo.NEGATIVA:
                    this.divIcone.jq.css("background-image", "url('/res/media/png/img_notificacao_negativa.png')");
                    this.divIcone.jq.css("border-right", "5px solid #f15b28");
                    return;
            }
        }

        private inicializarTimeoutFechar()
        {
            this.intFecharTimeout = window.setTimeout((() => this.fecharNotificacao()), this.intTempo);
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return strLayoutFixo;
            }

            if (Utils.getBooStrVazia(this.strNotificacao))
            {
                return strLayoutFixo;
            }

            strLayoutFixo = strLayoutFixo.replace("_str_id", this.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_fechar_id", this.btnFechar.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_icone_id", this.divIcone.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_texto_conteudo", this.strNotificacao);

            return strLayoutFixo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            this.btnFechar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnFechar:
                        this.fecharNotificacao();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onMouseLeave(tagSender: Tag, arg: JQueryMouseEventObject): void
        {
            try
            {
                switch (tagSender)
                {
                    case this:
                        this.inicializarTimeoutFechar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        public onMouseOver(tagSender: Tag, arg: JQueryMouseEventObject): void
        {
            try
            {
                switch (tagSender)
                {
                    case this:
                        window.clearTimeout(this.intFecharTimeout);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}