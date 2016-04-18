module NetZ_Web_TypeScript
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

        private _booClnStrTabelaNomeAdicionada: boolean;

        private get booClnStrTabelaNomeAdicionada(): boolean
        {
            return this._booClnStrTabelaNomeAdicionada;
        }

        private set booClnStrTabelaNomeAdicionada(booClnStrTabelaNomeAdicionada: boolean)
        {
            this._booClnStrTabelaNomeAdicionada = booClnStrTabelaNomeAdicionada;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        public salvar(): void
        {
            if (this.pag == null)
            {
                return;
            }

            if ((<PagPrincipal>this.pag).jnlConsulta == null)
            {
                return;
            }

            if ((<PagPrincipal>this.pag).jnlConsulta.tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia((<PagPrincipal>this.pag).jnlConsulta.tblWeb.strNome))
            {
                return;
            }

            this.salvarAddClnStrTabelaNome((<PagPrincipal>this.pag).jnlConsulta.tblWeb.strNome);

            super.salvar();
        }

        private salvarAddClnStrTabelaNome(strTabelaNome: string): void
        {
            if (this.booClnStrTabelaNomeAdicionada)
            {
                return;
            }

            if (Utils.getBooStrVazia(strTabelaNome))
            {
                return;
            }

            var clnStrTabelaNome: ColunaWeb = new ColunaWeb("str_tabela_nome");

            clnStrTabelaNome.strValor = strTabelaNome;

            this.tblWeb.addClnWeb(clnStrTabelaNome);

            this.booClnStrTabelaNomeAdicionada = true;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }

    // #region Inicialização

    $(document).ready(() => { new JnlFiltroCadastro("JnlFiltroCadastro", (<PagPrincipal>AppWeb.i.pag)).iniciar(); });

    // #endregion Inicialização
}