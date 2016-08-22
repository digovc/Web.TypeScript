﻿/// <reference path="../../../../OnClickListener.ts"/>
/// <reference path="../../botao/BotaoCircular.ts"/>

module NetZ_Web
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

        // #region Construtores

        constructor(jnlConsulta: JnlConsulta)
        {
            super(jnlConsulta.strId + "_btnFavorito");

            this.jnlConsulta = jnlConsulta;
        }

        // #endregion Construtores

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

            if (AppWeb.i.srvAjaxDb == null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.objData = this.jnlConsulta.tblWeb.strNome;
            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_TABELA_FAVORITO_ADD;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.favoritarSucesso(objInterlocutor); });

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
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
            if (AppWeb.i.srvAjaxDb == null)
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

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_TABELA_FAVORITO_VERIFICAR;
            objInterlocutor.objData = this.jnlConsulta.tblWeb.strNome;

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.verificarFavoritoSucesso(objInterlocutor); });

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
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
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
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
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}