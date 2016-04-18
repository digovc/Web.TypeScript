/// <reference path="Utils.ts"/>

module NetZ_Web_TypeScript
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

        private _intObjetoId: number;
        private _strNome: string;
        private _strNomeExibicao: string;
        private static _intObjetoIdStatic: number;

        public get intObjetoId(): number
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._intObjetoId > 0)
                {
                    return this._intObjetoId;
                }

                this._intObjetoId = Objeto.intObjetoIdStatic;

                Objeto.intObjetoIdStatic++;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (!Utils.getBooStrVazia(this._strNomeExibicao))
                {
                    return this._strNomeExibicao;
                }

                this._strNomeExibicao = this.strNome;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strNomeExibicao;
        }

        public set strNomeExibicao(strNomeExibicao: string)
        {
            this._strNomeExibicao = strNomeExibicao;
        }

        private static get intObjetoIdStatic(): number
        {
            return Objeto._intObjetoIdStatic;
        }

        private static set intObjetoIdStatic(intObjetoIdStatic: number)
        {
            Objeto._intObjetoIdStatic = intObjetoIdStatic;
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
        public carregarDados(obj: any): void
        {
            for (var objPropriedade in obj)
            {
                (<any>this)[objPropriedade] = obj[objPropriedade];
            }
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}