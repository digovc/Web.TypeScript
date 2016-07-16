﻿/// <reference path="OnDisposedListener.ts"/>
/// <reference path="Utils.ts"/>

module NetZ_Web
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
        private _strNome: string;
        private _strNomeExibicao: string;

        public get intObjetoId(): number
        {
            if (this._intObjetoId > 0)
            {
                return this._intObjetoId;
            }

            this._intObjetoId = Objeto.intObjetoIdStatic;

            Objeto.intObjetoIdStatic++;

            return this._intObjetoId;
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
            if (!Utils.getBooStrVazia(this._strNomeExibicao))
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

        protected get strClassNome(): string
        {
            if (this._strClassNome != null)
            {
                return this._strClassNome;
            }

            this._strClassNome = this.getStrClassNome();

            return this._strClassNome;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

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
                (<any>this)[objPropriedade] = obj[objPropriedade];
            }
        }

        public dispose(): void
        {
            this.limparMemoria();

            this.dispararEvtOnDisposedListener();
        }

        private getStrClassNome(): string
        {
            return this.constructor.toString().match(/\w+/g)[1];
        }

        protected limparMemoria(): void
        {
        }

        // #endregion Métodos

        // #region Eventos

        // #region Evento OnDisposedListener

        private _arrEvtOnDisposedListener: Array<OnDisposedListener>;

        private get arrEvtOnDisposedListener(): Array<OnDisposedListener>
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._arrEvtOnDisposedListener != null)
                {
                    return this._arrEvtOnDisposedListener;
                }

                this._arrEvtOnDisposedListener = new Array<OnDisposedListener>();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._arrEvtOnDisposedListener;
        }

        public addEvtOnDisposedListener(evtOnDisposedListener: OnDisposedListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnDisposedListener == null)
                {
                    return;
                }

                if (this.arrEvtOnDisposedListener.indexOf(evtOnDisposedListener) > -1)
                {
                    return;
                }

                this.arrEvtOnDisposedListener.push(evtOnDisposedListener);
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

        private dispararEvtOnDisposedListener(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.arrEvtOnDisposedListener.length == 0)
                {
                    return;
                }

                this.arrEvtOnDisposedListener.forEach((evt) => { evt.onDisposed(this); });
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

        public removerEvtOnDisposedListener(evtOnDisposedListener: OnDisposedListener): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (evtOnDisposedListener == null)
                {
                    return;
                }

                if (this.arrEvtOnDisposedListener.indexOf(evtOnDisposedListener) == -1)
                {
                    return;
                }

                this.arrEvtOnDisposedListener.splice(this.arrEvtOnDisposedListener.indexOf(evtOnDisposedListener), 1);
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

        // #endregion Evento OnDisposedListener

        // #endregion Eventos
    }
}