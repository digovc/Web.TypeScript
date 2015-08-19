// #region Módulos externos
// #endregion Módulos externos

// #region Importações
// #endregion Importações

module NetZ.Web.TypeScript
{
    // #region Enumerados
    // #endregion Enumerados

    export class Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private static _intObjetoIdStatic: number;

        private static get intObjetoIdStatic(): number
        {
            return Objeto._intObjetoIdStatic;
        }

        private static set intObjetoIdStatic(intObjetoIdStatic: number)
        {
            Objeto._intObjetoIdStatic = intObjetoIdStatic;
        }

        private _intObjetoId: number;

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
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this._intObjetoId;
        }

        private _strNome: string;

        public get strNome(): string
        {
            return this._strNome;
        }

        public set strNome(strNome: string)
        {
            this._strNome = strNome;
        }

        private _strNomeExibicao: string;

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
            catch (e)
            {
                throw e;
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

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}