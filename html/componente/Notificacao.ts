/// <reference path="botao/BotaoMini.ts"/>
/// <reference path="ComponenteHtml.ts"/>

module NetZ_Web
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

    export class Notificacao extends ComponenteHtml implements OnClickListener, OnMouseLeaveListener, OnMouseOverListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private static _intNotificacaoAberta: number = 0;

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
        private _intFecharInterval: number;
        private _strNotificacao: string;

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

        private get intFecharInterval(): number
        {
            return this._intFecharInterval;
        }

        private set intFecharInterval(intFecharInterval: number)
        {
            this._intFecharInterval = intFecharInterval;
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

        // #region Construtores

        constructor(strNotificacao: string, enmTipo: Notificacao_EnmTipo = Notificacao_EnmTipo.POSITIVA)
        {
            super(null);

            this.enmTipo = enmTipo;
            this.strId = ("tagNotificacao_" + this.intObjetoId);
            this.strNotificacao = strNotificacao;
        }

        // #endregion Construtores

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

            if (AppWeb.i.pag == null)
            {
                return;
            }

            if (Notificacao.intNotificacaoAberta > 4)
            {
                window.setTimeout(() => { this.abrirNotificacao(); }, 500);
                return;
            }

            AppWeb.i.pag.divNotificacao.jq.append(this.strLayoutFixo);

            Notificacao.intNotificacaoAberta++;

            this.iniciar();
        }

        private fecharNotificacao(): void
        {
            window.clearInterval(this.intFecharInterval);

            Notificacao.intNotificacaoAberta--;

            this.dispose();
        }

        protected inicializar(): void
        {
            super.inicializar()

            this.inicializarEnmTipo();

            this.inicializarIntervalFechar();

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

                default:
                    return;
            }
        }

        private inicializarIntervalFechar()
        {
            var intTempo = (!Utils.getBooStrVazia(this.strNotificacao)) ? (this.strNotificacao.length * 150) : 5000;

            intTempo = (intTempo > 250) ? intTempo : 5000;

            this.intFecharInterval = window.setTimeout(() => { this.fecharNotificacao(); }, intTempo);
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

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onMouseLeave(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this:
                        this.inicializarIntervalFechar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        public onMouseOver(objSender: Object, arg: JQueryMouseEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this:
                        window.clearInterval(this.intFecharInterval);
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}