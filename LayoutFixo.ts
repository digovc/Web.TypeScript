module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class LayoutFixo
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _strClassNome: string;
        private _strLayoutFixo: string;

        public get strClassNome(): string
        {
            return this._strClassNome;
        }

        public set strClassNome(strClassNome: string)
        {
            this._strClassNome = strClassNome;
        }

        public get strLayoutFixo(): string
        {
            return this._strLayoutFixo;
        }

        public set strLayoutFixo(strLayoutFixo: string)
        {
            this._strLayoutFixo = strLayoutFixo;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strClassNome: string, strLayoutFixo: string)
        {
            this.strClassNome = strClassNome;
            this.strLayoutFixo = strLayoutFixo;
        }

        // #endregion Construtores

        // #region Métodos
        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}