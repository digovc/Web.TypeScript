/// <reference path="ComponenteHtml.ts"/>

declare var Notification: any;

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados

    export enum EnmTipo
    {
        ALERTA,
        LOAD,
        NEGATIVA,
        POSITIVA,
    }

    // #endregion Enumerados

    export class MensagemOld extends ComponenteHtml
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booBloquearTela: boolean = true;
        private _enmTipo: EnmTipo = EnmTipo.POSITIVA;
        private _srcIcon: string;
        private _strMsg: string;
        private _strTitulo: string;
        private static _booMensagemVisivel: boolean;
        private static _strEstruturaAlerta: string;
        private static _strEstruturaLoad: string;
        private static _strEstruturaNegativa: string;
        private static _strEstruturaPositiva: string;
        private static _strMensagemUltima: string;

        private get booBloquearTela(): boolean
        {
            return this._booBloquearTela;
        }

        private set booBloquearTela(booBloquearTela: boolean)
        {
            this._booBloquearTela = booBloquearTela;
        }

        private get enmTipo(): EnmTipo
        {
            return this._enmTipo;
        }

        private set enmTipo(enmTipo: EnmTipo)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._enmTipo = enmTipo;
                this.booBloquearTela = !(this._enmTipo == EnmTipo.POSITIVA);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private get srcIcon(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._srcIcon != null)
                {
                    return this._srcIcon;
                }

                switch (this.enmTipo)
                {
                    case EnmTipo.LOAD:
                        this._srcIcon = "res/media/gif/load.gif";
                        break;

                    case EnmTipo.NEGATIVA:
                        this._srcIcon = "res/media/png/info_negativa.png";
                        break;

                    case EnmTipo.POSITIVA:
                        this._srcIcon = "res/media/png/info_positiva.png";
                        break;

                    default:
                        this._srcIcon = "res/media/png/info_alerta.png";
                        break;
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._srcIcon;
        }

        private get strMsg(): string
        {
            return this._strMsg;
        }

        private set strMsg(strMsg: string)
        {
            this._strMsg = strMsg;
        }

        private get strTitulo(): string
        {
            return this._strTitulo;
        }

        private set strTitulo(strTitulo: string)
        {
            this._strTitulo = strTitulo;
        }

        private static get booMensagemVisivel(): boolean
        {
            return MensagemOld._booMensagemVisivel;
        }

        private static set booMensagemVisivel(booMensagemVisivel: boolean)
        {
            MensagemOld._booMensagemVisivel = booMensagemVisivel;
        }

        public static get strEstruturaAlerta(): string
        {
            return MensagemOld._strEstruturaAlerta;
        }

        public static set strEstruturaAlerta(strEstruturaAlerta: string)
        {
            MensagemOld._strEstruturaAlerta = strEstruturaAlerta;
        }

        public static get strEstruturaLoad(): string
        {
            return MensagemOld._strEstruturaLoad;
        }

        public static set strEstruturaLoad(strEstruturaLoad: string)
        {
            MensagemOld._strEstruturaLoad = strEstruturaLoad;
        }

        public static get strEstruturaNegativa(): string
        {
            return MensagemOld._strEstruturaNegativa;
        }

        public static set strEstruturaNegativa(strEstruturaNegativa: string)
        {
            MensagemOld._strEstruturaNegativa = strEstruturaNegativa;
        }

        public static get strEstruturaPositiva(): string
        {
            return MensagemOld._strEstruturaPositiva;
        }

        public static set strEstruturaPositiva(strEstruturaPositiva: string)
        {
            MensagemOld._strEstruturaPositiva = strEstruturaPositiva;
        }

        private static get strMensagemUltima(): string
        {
            return MensagemOld._strMensagemUltima;
        }

        private static set strMensagemUltima(strMensagemUltima: string)
        {
            MensagemOld._strMensagemUltima = strMensagemUltima;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strTitulo: string, strMsg: string, enmTipo: EnmTipo)
        {
            super(null); // TODO: Passar o id do elemento desta mensagem, e não apenas null.

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.enmTipo = enmTipo;
                this.strTitulo = strTitulo;
                this.strMsg = strMsg;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Construtores

        // #region Métodos

        public esconder(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                $(document).find("#msg").fadeOut("slow");

                window.setTimeout(() =>
                {
                    $(document).find("#msg").remove();
                    MensagemOld.booMensagemVisivel = false;
                }, 400);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected montarLayout(): void
        {
            super.montarLayout();

            // #region Variáveis

            var tag: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (this.enmTipo)
                {
                    case 0:
                        tag = MensagemOld.strEstruturaAlerta;
                        break;

                    case 1:
                        tag = MensagemOld.strEstruturaLoad;
                        break;

                    case 2:
                        tag = MensagemOld.strEstruturaNegativa;
                        break;

                    default:
                        tag = MensagemOld.strEstruturaPositiva;
                        break;
                }

                tag = tag.replace("_titulo", this.strTitulo);
                tag = tag.replace("_msg", this.strMsg);

                this.montarLayoutBloquearTela(tag)
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public mostrar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                var intTempo: number;

                if (!AppWebBase.i.booEmFoco)
                {
                    this.mostrarNotificacao();
                    return;
                }

                if (MensagemOld.booMensagemVisivel)
                {
                    window.setTimeout(function ()
                    {
                        this.mostrar();
                    }, 250);

                    return;
                }

                intTempo = this.strMsg.length * 75;

                //$("body").append(this.toHtml());

                MensagemOld.booMensagemVisivel = true;

                if (this.enmTipo == EnmTipo.LOAD)
                {
                    return;
                }

                window.setTimeout(function ()
                {
                    this.esconder();
                }, intTempo);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        private montarLayoutBloquearTela(tag: string): void
        {
            // #region Variáveis

            var tagJq: any;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!this.booBloquearTela)
                {
                    //this.strEstrutura = tag;
                    return;
                }

                tagJq = $(tag).css("background", "rgba(0, 0, 0, 0.15)");
                tagJq = $(tag).css("bottom", "0px");

                //this.strEstrutura = tagJq[0];
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public mostrarNotificacao(): void
        {
            // #region Variáveis

            var objNotificacaoOption: any;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (MensagemOld.strMensagemUltima == (this.strTitulo + this.strMsg))
                {
                    return;
                }

                objNotificacaoOption = {
                    body: this.strMsg,
                    icon: this.srcIcon,
                }

                if (!("Notification" in window))
                {
                    return;
                } else if (Notification.permission === "granted")
                {
                    new Notification(this.strTitulo, objNotificacaoOption);
                } else if (Notification.permission !== 'denied')
                {
                    Notification.requestPermission(function (permission: any)
                    {
                        if (permission === "granted")
                        {
                            new Notification(this.getStrTitulo(), objNotificacaoOption);
                        }
                    });
                }

                MensagemOld.strMensagemUltima = (this.strTitulo + this.strMsg);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}