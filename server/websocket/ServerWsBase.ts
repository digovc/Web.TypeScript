﻿/// <reference path="../ServerBase.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerWsBase extends ServerBase
    {
        // #region Constantes

        public static get STR_METODO_WELCOME(): string { return "WELCOME" };

        // #endregion Constantes

        // #region Atributos

        private _objWebSocket: WebSocket;

        private get objWebSocket(): WebSocket
        {
            if (this._objWebSocket != null)
            {
                return this._objWebSocket;
            }

            this._objWebSocket = this.getObjWebSocket();

            return this._objWebSocket;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

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

        protected getIntPort(): number
        {
            return 443;
        }

        private getObjWebSocket(): WebSocket
        {
            if (Utils.getBooStrVazia(this.url))
            {
                return null;
            }

            var objWebSocketResultado = new WebSocket("ws://" + this.url);

            return objWebSocketResultado;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarObjWebSocket();
        }

        private inicializarObjWebSocket(): void
        {
            if ((<any>window)["WebSocket"] == null)
            {
                throw "Não foi encontrado suporte para WebSockets. Utilize um navegador mais moderno (Chrome, Firefox, Edge).";
            }

            if (this.objWebSocket == null)
            {
                return;
            }

            this.objWebSocket.binaryType = "arraybuffer";

            this.objWebSocket.onclose = ((arg: CloseEvent) => { this.processarOnCloseLocal(arg); });
            this.objWebSocket.onerror = ((arg: Event) => { this.processarOnErrorLocal(arg); });
            this.objWebSocket.onmessage = ((arg: MessageEvent) => { this.processarOnMessageLocal(arg); });
            this.objWebSocket.onopen = ((arg: Event) => { this.processarOnOpenLocal(arg); });
        }

        protected processarMessage(objInterlocutor: Interlocutor): boolean
        {
            if (objInterlocutor == null)
            {
                return false;
            }

            switch (objInterlocutor.strMetodo)
            {
                case ServerWsBase.STR_METODO_WELCOME:
                    Notificacao.notificar("O servidor de notificação enviou olá.", Notificacao_EnmTipo.INFO);
                    return true;
            }

            return false;
        }

        private processarOnCloseLocal(arg: CloseEvent): void
        {
        }

        private processarOnErrorLocal(arg: Event): void
        {
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
            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = ServerWsBase.STR_METODO_WELCOME;

            this.enviar(objInterlocutor);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}