// #region Reference

/// <reference path="JnlCadastro.ts"/>

// #endregion Reference

module Web
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

        // #region Construtor
        // #endregion Construtor

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

            this.tblWeb.getCln("str_tabela_nome").strValor = (<PagPrincipalBase>this.pag).jnlConsulta.viwAtual.strNome;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}