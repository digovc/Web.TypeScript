// #region Reference

/// <reference path="JnlCadastro.ts"/>

// #endregion Reference

module Web
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

        // #region Construtor
        // #endregion Construtor

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

            this.tblWeb.getCln("int_filtro_id").intValor = this.jnlCadastroPai.intRegistroId;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}