/// <reference path="../ServerBase.ts"/>
/// <reference path="OnWsCloseListenner.ts"/>
/// <reference path="OnWsErrorListenner.ts"/>
/// <reference path="OnWsOpenListenner.ts"/>

module Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class SrvWsBase extends ServerBase
    {
        // #region Constantes

        private static get INT_MONITOR_INTERVALO(): number { return 35000 };

        private static get STR_METODO_ERRO(): string { return "STR_METODO_ERRO" };
        private static get STR_METODO_PING(): string { return "ping" };
        private static get STR_METODO_PONG(): string { return "pong" };
        private static get STR_METODO_WELCOME(): string { return "STR_METODO_WELCOME" };

        // #endregion Constantes

        // #region Atributos

        private _dttUltimoPong: Date;
        private _objWebSocket: WebSocket;

        private _booConectado: boolean;

        public get booConectado(): boolean
        {
            this._booConectado = this.getBooConectado();

            return this._booConectado;
        }

        private get dttUltimoPong(): Date
        {
            return this._dttUltimoPong;
        }

        private set dttUltimoPong(dttUltimoPong: Date)
        {
            this._dttUltimoPong = dttUltimoPong;
        }

        private get objWebSocket(): WebSocket
        {
            if (this._objWebSocket != null)
            {
                return this._objWebSocket;
            }

            this._objWebSocket = this.getObjWebSocket();

            return this._objWebSocket;
        }

        private set objWebSocket(objWebSocket: WebSocket)
        {
            this._objWebSocket = objWebSocket;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public enviar(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (!objInterlocutor.validarDados())
            {
                return;
            }

            if (this.objWebSocket == null)
            {
                return;
            }

            if (this.objWebSocket.readyState != WebSocket.OPEN)
            {
                return;
            }

            this.objWebSocket.send(objInterlocutor.toJson());
        }

        private getBooConectado(): boolean
        {
            if (this.objWebSocket == null)
            {
                return false;
            }

            return (this.objWebSocket.readyState == WebSocket.OPEN);
        }

        protected getIntPorta(): number
        {
            return 443;
        }

        private getObjWebSocket(): WebSocket
        {
            if (!("WebSocket" in window))
            {
                new Erro("Não foi encontrado suporte para WebSockets. Utilize um navegador mais moderno (Chrome, Firefox, Edge).");
            }

            if (Utils.getBooStrVazia(this.url))
            {
                return null;
            }

            var objWebSocketResultado = new WebSocket("ws://" + this.url);

            objWebSocketResultado.onclose = ((arg: CloseEvent) => { this.processarOnCloseLocal(arg); });
            objWebSocketResultado.onerror = ((arg: Event) => { this.processarOnErrorLocal(arg); });
            objWebSocketResultado.onmessage = ((arg: MessageEvent) => { this.processarOnMessageLocal(arg); });
            objWebSocketResultado.onopen = ((arg: Event) => { this.processarOnOpenLocal(arg); });

            return objWebSocketResultado;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarObjWebSocket();
        }

        private inicializarObjWebSocket(): void
        {
            this.objWebSocket;
        }

        private monitorar(): void
        {
            if (this.objWebSocket == null)
            {
                return;
            }

            if (this.objWebSocket.readyState != WebSocket.OPEN)
            {
                return;
            }

            this.enviar(new Interlocutor(SrvWsBase.STR_METODO_PING));
        }

        protected processarMessage(objInterlocutor: Interlocutor): boolean
        {
            switch (objInterlocutor.strMetodo)
            {
                case SrvWsBase.STR_METODO_ERRO:
                    this.processarMensagemErro(objInterlocutor);
                    return true;

                case SrvWsBase.STR_METODO_PONG:
                    this.processarMensagemPong();
                    return true;

                case SrvWsBase.STR_METODO_WELCOME:
                    this.processarMensagemWelcome();
                    return true;
            }

            return false;
        }

        private processarMensagemErro(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor.objData == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(objInterlocutor.objData.toString()))
            {
                return;
            }

            new Erro('Erro no servidor "_srv_nome"'.replace("_srv_nome", this.strNome), new Error(objInterlocutor.objData.toString()));
        }

        private processarMensagemPong(): void
        {
            this.dttUltimoPong = new Date();

            window.setTimeout((() => { this.monitorar() }), SrvWsBase.INT_MONITOR_INTERVALO);
        }

        protected processarMensagemWelcome(): void
        {
            //Notificacao.notificar('O serviço "_srv_nome" está conectado.'.replace("_srv_nome", this.strNome), Notificacao_EnmTipo.INFO);
            this.monitorar();
        }

        private processarOnCloseLocal(arg: CloseEvent): void
        {
            //Notificacao.notificar('O servidor "_server_name" fechou a conexão.'.replace("_server_name", this.strNome), Notificacao_EnmTipo.NEGATIVA);

            this.dispararEvtOnWsCloseListenner(arg);
        }

        private processarOnErrorLocal(arg: Event): void
        {
            Notificacao.notificar('Aconteceu um erro no servidor "_server_name".'.replace("_server_name", this.strNome));

            this.dispararEvtOnWsErrorListenner(arg);
        }

        private processarOnMessageLocal(arg: MessageEvent): void
        {
            if (arg == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(String(arg.data)))
            {
                return;
            }

            var objInterlocutor = new Interlocutor()

            objInterlocutor.copiarDados(JSON.parse(arg.data));

            this.processarMessage(objInterlocutor);
        }

        protected processarOnOpenLocal(arg: Event): void
        {
            this.enviar(new Interlocutor(SrvWsBase.STR_METODO_WELCOME));

            this.dispararEvtOnWsOpenListenner(arg);
        }

        public reconectar(): void
        {
            if (this.objWebSocket.readyState == WebSocket.OPEN)
            {
                this.objWebSocket.close();
            }

            this.objWebSocket = null;

            this.enviar(new Interlocutor(SrvWsBase.STR_METODO_WELCOME));
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnWsCloseListenner

        private _arrEvtOnWsCloseListenner: Array<OnWsCloseListenner>;

        private get arrEvtOnWsCloseListenner(): Array<OnWsCloseListenner>
        {
            if (this._arrEvtOnWsCloseListenner != null)
            {
                return this._arrEvtOnWsCloseListenner;
            }

            this._arrEvtOnWsCloseListenner = new Array<OnWsCloseListenner>();

            return this._arrEvtOnWsCloseListenner;
        }

        public addEvtOnWsCloseListenner(evt: OnWsCloseListenner): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnWsCloseListenner.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnWsCloseListenner.push(evt);
        }

        private dispararEvtOnWsCloseListenner(arg: CloseEvent): void
        {
            if (this.arrEvtOnWsCloseListenner.length == 0)
            {
                return;
            }

            this.arrEvtOnWsCloseListenner.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onWsClose(this, arg);
            });
        }

        public removerEvtOnWsCloseListenner(evt: OnWsCloseListenner): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnWsCloseListenner.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnWsCloseListenner.splice(this.arrEvtOnWsCloseListenner.indexOf(evt), 1);
        }

        // #endregion Evento OnWsCloseListenner

        // #region Evento OnWsErrorListenner

        private _arrEvtOnWsErrorListenner: Array<OnWsErrorListenner>;

        private get arrEvtOnWsErrorListenner(): Array<OnWsErrorListenner>
        {
            if (this._arrEvtOnWsErrorListenner != null)
            {
                return this._arrEvtOnWsErrorListenner;
            }

            this._arrEvtOnWsErrorListenner = new Array<OnWsErrorListenner>();

            return this._arrEvtOnWsErrorListenner;
        }

        public addEvtOnWsErrorListenner(evt: OnWsErrorListenner): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnWsErrorListenner.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnWsErrorListenner.push(evt);
        }

        private dispararEvtOnWsErrorListenner(arg: Event): void
        {
            if (this.arrEvtOnWsErrorListenner.length == 0)
            {
                return;
            }

            this.arrEvtOnWsErrorListenner.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onWsError(this, arg);
            });
        }

        public removerEvtOnWsErrorListenner(evt: OnWsErrorListenner): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnWsErrorListenner.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnWsErrorListenner.splice(this.arrEvtOnWsErrorListenner.indexOf(evt), 1);
        }

        // #endregion Evento OnWsErrorListenner

        // #region Evento OnWsOpenListenner

        private _arrEvtOnWsOpenListenner: Array<OnWsOpenListenner>;

        private get arrEvtOnWsOpenListenner(): Array<OnWsOpenListenner>
        {
            if (this._arrEvtOnWsOpenListenner != null)
            {
                return this._arrEvtOnWsOpenListenner;
            }

            this._arrEvtOnWsOpenListenner = new Array<OnWsOpenListenner>();

            return this._arrEvtOnWsOpenListenner;
        }

        public addEvtOnWsOpenListenner(evt: OnWsOpenListenner): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnWsOpenListenner.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnWsOpenListenner.push(evt);
        }

        private dispararEvtOnWsOpenListenner(arg: Event): void
        {
            if (this.arrEvtOnWsOpenListenner.length == 0)
            {
                return;
            }

            this.arrEvtOnWsOpenListenner.forEach((evt) =>
            {
                if (evt == null)
                {
                    return;
                }

                evt.onWsOpen(this, arg);
            });
        }

        public removerEvtOnWsOpenListenner(evt: OnWsOpenListenner): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnWsOpenListenner.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnWsOpenListenner.splice(this.arrEvtOnWsOpenListenner.indexOf(evt), 1);
        }

        // #endregion Evento OnWsOpenListenner

        // #endregion Eventos
    }
}