// #region Reference

/// <reference path="../Div.ts"/>
/// <reference path="ComponenteHtmlBase.ts"/>

// #endregion Reference

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

        private _divOk: Div;
        private _enmTipo: Notificacao_EnmTipo;
        private _intFecharTimeout: number;
        private _intTempo: number;
        private _objNotificacao: any;
        private _strNotificacao: string;

        private get divOk(): Div
        {
            if (this._divOk != null)
            {
                return this._divOk;
            }

            this._divOk = new Div(this.strId + "_divOk");

            return this._divOk;
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
            this.strId = ("divNotificacao_" + this.intObjetoId);
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

            if (AppWebBase.i == null)
            {
                return;
            }

            if (AppWebBase.i.tagFoco instanceof Notificacao)
            {
                (AppWebBase.i.tagFoco as Notificacao).fechar();
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

            AppWebBase.i.pag.tagBody.jq.append(this.strLayoutFixo);

            AppWebBase.i.tagFoco = this;

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
                    onclose: (() => this.fechar()),
                }

            this.objNotificacao = new Notification((!Utils.getBooStrVazia(AppWebBase.i.strNome) ? AppWebBase.i.strNome : "Notificação"), objOptions);

            this.intFecharTimeout = window.setTimeout((() => this.fechar()), this.intTempo);
        }

        private atrasarNotificacao(): void
        {
            window.setTimeout((() => this.abrirNotificacao()), 1000);
        }

        private fechar(): void
        {
            window.clearTimeout(this.intFecharTimeout);

            if (this.objNotificacao != null)
            {
                this.objNotificacao.close();
            }

            if (AppWebBase.i.tagFoco == this)
            {
                AppWebBase.i.tagFoco = null;
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
                    return (AppWebBase.DIR_MEDIA_PNG + "img_notificacao_info.png");

                case Notificacao_EnmTipo.NEGATIVA:
                    return (AppWebBase.DIR_MEDIA_PNG + "img_notificacao_negativa.png");

                default:
                    return (AppWebBase.DIR_MEDIA_PNG + "img_notificacao_positiva.png");
            }
        }

        protected inicializar(): void
        {
            super.inicializar()

            this.booRipple = true;

            this.divOk.iniciar();

            this.inicializarEnmTipo();

            this.inicializarTimeoutFechar();

            this.anm.deslizarCimaIn();
        }

        private inicializarEnmTipo(): void
        {
            switch (this.enmTipo)
            {
                case Notificacao_EnmTipo.INFO:
                    this.jq.css("background-color", "#ffecb3");
                    return;

                case Notificacao_EnmTipo.NEGATIVA:
                    this.jq.css("background-color", "#ef9a9a");
                    return;
            }
        }

        private inicializarTimeoutFechar()
        {
            this.intFecharTimeout = window.setTimeout((() => this.fechar()), this.intTempo);
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            if (Utils.getBooStrVazia(strLayoutFixo))
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.strNotificacao))
            {
                return null;
            }

            strLayoutFixo = Utils.replaceAll(strLayoutFixo, "_div_id", this.strId);

            strLayoutFixo = strLayoutFixo.replace("_div_conteudo", this.strNotificacao);

            return strLayoutFixo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            this.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.fechar();
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