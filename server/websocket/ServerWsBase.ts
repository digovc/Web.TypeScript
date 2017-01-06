/// <reference path="../ServerBase.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export abstract class ServerWsBase extends ServerBase
    {
        // #region Constantes

        private static get STR_METODO_WELCOME(): string { return "WELCOME" };

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
            if ((<any>window)['WebSocket'] == null)
            {
                throw "Não foi encontrado suporte de WebSockets. Utilize um navegador mais moderno (Chrome, Firefox, Opera).";
            }

            if (this.objWebSocket == null)
            {
                return;
            }

            this.objWebSocket.onclose = ((arg: CloseEvent) => { this.processarOnCloseLocal(arg); });
            this.objWebSocket.onerror = ((arg: Event) => { this.processarOnErrorLocal(arg); });
            this.objWebSocket.onmessage = ((arg: MessageEvent) => { this.processarOnMessageLocal(arg); });
            this.objWebSocket.onopen = ((arg: Event) => { this.processarOnOpen(arg); });
        }

        private processarOnCloseLocal(arg: CloseEvent): void
        {
        }

        private processarOnErrorLocal(arg: Event): void
        {
        }

        protected processarOnMessage(objInterlocutor: Interlocutor): boolean
        {
            if (objInterlocutor == null)
            {
                return;
            }

            switch (objInterlocutor.strMetodo)
            {
                case ServerWsBase.STR_METODO_WELCOME:
                    Notificacao.notificar("O servidor de notificação enviou olá.", Notificacao_EnmTipo.INFO);
                    return true;
            }

            return false;
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

            if (Utils.getBooStrVazia(objInterlocutor.strMetodo))
            {
                return;
            }

            this.processarOnMessage(objInterlocutor);
        }

        protected processarOnOpen(arg: Event): void
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