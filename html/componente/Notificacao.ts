/// <reference path="botao/BotaoMini.ts"/>
/// <reference path="ComponenteHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
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

        constructor(strNotificacao: string)
        {
            super(null);

            this.strId = ("tagNotificacao_" + this.intObjetoId);
            this.strNotificacao = strNotificacao;
        }

        // #endregion Construtores

        // #region Métodos

        public abrirNotificacao(): void
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

            this.mostrar();

            this.iniciarIntervalFechar();
        }

        private fecharNotificacao(): void
        {
            window.clearInterval(this.intFecharInterval);

            Notificacao.intNotificacaoAberta--;

            this.dispose();
        }

        private iniciarIntervalFechar()
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
                        this.iniciarIntervalFechar();
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