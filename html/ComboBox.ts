module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class ComboBox extends Input
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public addOpcao(par: ParValorNome): void
        {
            if (par == null)
            {
                return;
            }

            if (par.objValor == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(par.strNome))
            {
                return;
            }

            var tagOption: any = document.createElement('option');

            tagOption.value = par.objValor;
            tagOption.innerHTML = par.strNome;

            this.jq.append(tagOption);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}