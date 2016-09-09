/// <reference path="JnlCadastro.ts"/>

module NetZ_Web
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlFiltroCadastro extends JnlCadastro
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

            this.carregarDadosStrTabelaNome();
        }

        private carregarDadosStrTabelaNome(): void
        {
            if (this.pagPrincipal == null)
            {
                return;
            }

            if (this.pagPrincipal.jnlConsulta == null)
            {
                return;
            }

            if (this.pagPrincipal.jnlConsulta.viwAtual == null)
            {
                return;
            }

            this.tblWeb.getClnWeb("str_tabela_nome").strValor = (<PagPrincipal>this.pag).jnlConsulta.viwAtual.strNome;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }

    // #region Inicialização

    $(document).ready(() => { new JnlFiltroCadastro().iniciar(); });

    // #endregion Inicialização
}