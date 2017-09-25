// #region Reference

/// <reference path="OnDisposedListener.ts"/>
/// <reference path="Utils.ts"/>

// #endregion Reference

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private static _intObjetoIdStatic: number = 0;

        private static get intObjetoIdStatic(): number
        {
            return Objeto._intObjetoIdStatic;
        }

        private static set intObjetoIdStatic(intObjetoIdStatic: number)
        {
            Objeto._intObjetoIdStatic = intObjetoIdStatic;
        }

        private _intObjetoId: number;
        private _strClassNome: string;
        private _strDescricao: string;
        private _strNome: string;
        private _strNomeExibicao: string;
        private _strNomeSimplificado: string;

        public get intObjetoId(): number
        {
            if (this._intObjetoId != null)
            {
                return this._intObjetoId;
            }

            this._intObjetoId = Objeto.intObjetoIdStatic++;

            return this._intObjetoId;
        }

        public get strDescricao(): string
        {
            return this._strDescricao;
        }

        public set strDescricao(strDescricao: string)
        {
            this._strDescricao = strDescricao;
        }

        public get strNome(): string
        {
            return this._strNome;
        }

        public set strNome(strNome: string)
        {
            this._strNome = strNome;
        }

        public get strNomeExibicao(): string
        {
            if (this._strNomeExibicao != null)
            {
                return this._strNomeExibicao;
            }

            this._strNomeExibicao = this.strNome;

            return this._strNomeExibicao;
        }

        public set strNomeExibicao(strNomeExibicao: string)
        {
            this._strNomeExibicao = strNomeExibicao;
        }

        public get strNomeSimplificado(): string
        {
            if (this._strNomeSimplificado != null)
            {
                return this._strNomeSimplificado;
            }

            this._strNomeSimplificado = Utils.simplificar(this.strNome);

            return this._strNomeSimplificado;
        }

        public get strClassNome(): string
        {
            if (this._strClassNome != null)
            {
                return this._strClassNome;
            }

            this._strClassNome = this.constructor.name;

            return this._strClassNome;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        /**
         * Carrega os valores de um objeto com o mesmo prototipo desta classe
         * para esta instância.
         * @param obj Objeto com o mesmo prototipo deste.
         */
        public copiarDados(obj: any): void
        {
            for (var objPropriedade in obj)
            {
                (this as any)[objPropriedade] = obj[objPropriedade];
            }
        }

        public dispose(): void
        {
            this.dispararEvtOnDisposedListener();
        }

        public toJson(): string
        {
            return JSON.stringify(this, ((s, o) => this.toJsonValidar(s, o)));
        }

        private toJsonValidar(strPropriedade: string, objValor: any): any
        {
            if (objValor == null)
            {
                return null;
            }

            if (this == objValor)
            {
                return objValor;
            }

            if (Utils.getBooStrVazia(strPropriedade))
            {
                return null;
            }

            if (strPropriedade.toLocaleLowerCase().startsWith("_arrevt"))
            {
                return null;
            }

            if (strPropriedade.toLocaleLowerCase().startsWith("_arrfnc"))
            {
                return null;
            }

            if (strPropriedade.toLocaleLowerCase().startsWith("_fnc"))
            {
                return null;
            }

            return this.validarJson(strPropriedade) ? objValor : null;
        }

        protected validarJson(strPropriedade: string): boolean
        {
            return true;
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnDisposedListener

        private _arrEvtOnDisposedListener: Array<OnDisposedListener>;

        private get arrEvtOnDisposedListener(): Array<OnDisposedListener>
        {
            if (this._arrEvtOnDisposedListener != null)
            {
                return this._arrEvtOnDisposedListener;
            }

            this._arrEvtOnDisposedListener = new Array<OnDisposedListener>();

            return this._arrEvtOnDisposedListener;
        }

        public addEvtOnDisposedListener(evt: OnDisposedListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnDisposedListener.indexOf(evt) > -1)
            {
                return;
            }

            this.arrEvtOnDisposedListener.push(evt);
        }

        private dispararEvtOnDisposedListener(): void
        {
            if (this.arrEvtOnDisposedListener.length == 0)
            {
                return;
            }

            this.arrEvtOnDisposedListener.forEach(e => e.onDisposed(this));
        }

        public removerEvtOnDisposedListener(evt: OnDisposedListener): void
        {
            if (evt == null)
            {
                return;
            }

            if (this.arrEvtOnDisposedListener.indexOf(evt) == -1)
            {
                return;
            }

            this.arrEvtOnDisposedListener.splice(this.arrEvtOnDisposedListener.indexOf(evt), 1);
        }

        // #endregion Evento OnDisposedListener

        // #endregion Eventos
    }
}