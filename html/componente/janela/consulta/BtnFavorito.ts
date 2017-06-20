/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../botao/BotaoCircular.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class BtnFavorito extends BotaoCircular implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _jnlConsulta: JnlConsulta;

        private get jnlConsulta(): JnlConsulta
        {
            return this._jnlConsulta;
        }

        private set jnlConsulta(jnlConsulta: JnlConsulta)
        {
            this._jnlConsulta = jnlConsulta;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(jnlConsulta: JnlConsulta)
        {
            super(jnlConsulta.strId + "_btnFavorito");

            this.jnlConsulta = jnlConsulta;
        }

        // #endregion Construtor

        // #region Métodos

        private favoritar(): void
        {
            if (this.jnlConsulta == null)
            {
                return;
            }

            if (this.jnlConsulta.tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.jnlConsulta.tblWeb.strNome))
            {
                return;
            }

            if (AppWebBase.i.srvAjaxDbe == null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.objData = this.jnlConsulta.tblWeb.strNome;
            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_TABELA_FAVORITO_ADD;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.favoritarSucesso(objInterlocutor); });

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private favoritarSucesso(objInterlocutor: Interlocutor): void
        {
            Notificacao.notificar("Marcado como favorito com sucesso.");

            this.marcarFavorito();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.verificarFavorito();
        }

        private marcarFavorito(): void
        {
            this.jq.attr("disabled", "true");
            this.jq.css("background-image", "url('/res/media/png/bnt_favorito_marcado_30x30.png')");
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        private verificarFavorito(): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                return;
            }

            if (this.jnlConsulta == null)
            {
                return;
            }

            if (this.jnlConsulta.tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.jnlConsulta.tblWeb.strNome))
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_TABELA_FAVORITO_VERIFICAR;
            objInterlocutor.objData = this.jnlConsulta.tblWeb.strNome;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.verificarFavoritoSucesso(objInterlocutor); });

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private verificarFavoritoSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor.objData == null)
            {
                return;
            }

            if (!Boolean(objInterlocutor.objData))
            {
                return;
            }

            this.marcarFavorito();
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this:
                        this.favoritar();
                        return;
                }
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
        }

        // #endregion Eventos
    }
}