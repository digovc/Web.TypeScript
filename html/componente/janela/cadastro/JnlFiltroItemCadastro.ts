/// <reference path="JnlCadastro.ts"/>

module NetZ_Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlFiltroItemCadastro extends JnlCadastro
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected carregarDados(): void
        {
            super.carregarDados();

            this.carregarDadosIntFiltroId();
        }

        private carregarDadosIntFiltroId(): void
        {
            if (this.jnlCadastroPai == null)
            {
                return;
            }

            this.tblWeb.getClnWeb("int_filtro_id").intValor = this.jnlCadastroPai.intRegistroId;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }

    // #region Inicialização

    $(document).ready(() => { new JnlFiltroItemCadastro().iniciar(); });

    // #endregion Inicialização
}