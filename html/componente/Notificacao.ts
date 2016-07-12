/// <reference path="ComponenteHtml.ts"/>

module NetZ_Web_TypeScript
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

        private _divAdiar: Div;
        private _divFechar: Div;
        private _divIcone: Div;
        private _divLink: Div;
        private _intFecharInterval: number;
        private _strNotificacao: string;

        private get divAdiar(): Div
        {
            if (this._divAdiar != null)
            {
                return this._divAdiar;
            }

            this._divAdiar = new Div(this.strId + "_divAdiar");

            return this._divAdiar;
        }

        private get divFechar(): Div
        {
            if (this._divFechar != null)
            {
                return this._divFechar;
            }

            this._divFechar = new Div(this.strId + "_divFechar");

            return this._divFechar;
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

        private get divLink(): Div
        {
            if (this._divLink != null)
            {
                return this._divLink;
            }

            this._divLink = new Div(this.strId + "_divLink");

            return this._divLink;
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

            AppWeb.i.pag.divNotificacao.jq.append(this.strLayoutFixo);

            this.iniciar();

            this.mostrar();

            this.iniciarIntervalFechar();
        }

        private fecharNotificacao(): void
        {
            window.clearInterval(this.intFecharInterval);

            this.dispose();
        }

        private iniciarIntervalFechar()
        {
            var intTempo = (!Utils.getBooStrVazia(this.strConteudo)) ? (this.strNotificacao.length * 150) : 5000;

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
            strLayoutFixo = strLayoutFixo.replace("_str_div_adiar_id", this.divAdiar.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_fechar_id", this.divFechar.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_icone_id", this.divIcone.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_link_id", this.divLink.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_div_texto_conteudo", this.strNotificacao);

            return strLayoutFixo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnMouseLeaveListener(this);
            this.addEvtOnMouseOverListener(this);

            this.divFechar.addEvtOnClickListener(this);
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
                    case this.divFechar:
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