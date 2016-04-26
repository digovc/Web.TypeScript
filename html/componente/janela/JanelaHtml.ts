/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../../pagina/PaginaHtml.ts"/>
/// <reference path="../botao/mini/BotaoFecharMini.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JanelaHtml extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booAtivo: boolean = true;
        private _divBtnFechar: Div;
        private _divInativa: Div;
        private _pag: PaginaHtml;

        public get booAtivo(): boolean
        {
            return this._booAtivo;
        }

        public set booAtivo(booAtivo: boolean)
        {
            if (this._booAtivo == booAtivo)
            {
                return;
            }

            this._booAtivo = booAtivo;

            this.atualizarBooAtivo();
        }

        private get divBtnFechar(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divBtnFechar != null)
                {
                    return this._divBtnFechar;
                }

                this._divBtnFechar = new BotaoFecharMini(this.strId + "_divBtnFechar");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divBtnFechar;
        }

        protected get pag(): PaginaHtml
        {
            return this._pag;
        }

        protected set pag(pag: PaginaHtml)
        {
            this._pag = pag;
        }

        private get divInativa(): Div
        {
            if (this._divInativa != null)
            {
                return this._divInativa;
            }

            this._divInativa = new Div(this.strId + "_divInativa");

            return this._divInativa;
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, pag: PaginaHtml)
        {
            super(strId);

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.pag = pag;
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

        // #endregion Construtores

        // #region Métodos

        private atualizarBooAtivo(): void
        {
            this.divInativa.jq.css("display", (!this.booAtivo) ? "block" : "none");
        }

        protected fechar(): void
        {
            this.dispose();
        }

        protected setEventos(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.divBtnFechar.addEvtOnClickListener(this);
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

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: any): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.divBtnFechar:
                        this.fechar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}