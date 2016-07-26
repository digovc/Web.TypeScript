﻿module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TagCard extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _divFechar: Div;
        private _jnlTag: JnlTag;

        private get divFechar(): Div
        {
            if (this._divFechar != null)
            {
                return this._divFechar;
            }

            this._divFechar = new Div(this.strId + "_divFechar");

            return this._divFechar;
        }

        private get jnlTag(): JnlTag
        {
            return this._jnlTag;
        }

        private set jnlTag(jnlTag: JnlTag)
        {
            if (this._jnlTag == jnlTag)
            {
                return;
            }

            this._jnlTag = jnlTag;

            this.atualizarJnlTag();
        }

        // #endregion Atributos

        // #region Construtores

        constructor(jnlTag: JnlTag)
        {
            super(null);

            this.jnlTag = jnlTag;
        }

        // #endregion Construtores

        // #region Métodos

        private apagar(): void
        {
            if (this.jnlTag == null)
            {
                return;
            }

            this.jnlTag.removerTagCard(this);
        }

        private atualizarJnlTag(): void
        {
            if (this.jnlTag == null)
            {
                return;
            }

            var strId = "_str_jnl_tag_id__int_index";

            strId = strId.replace("_str_jnl_tag_id", this.jnlTag.strId);
            strId = strId.replace("_int_index", String(this.jnlTag.arrTagCard.length));

            this.strId = strId;
        }

        private getStrTagNomeFormatada(): string
        {
            if (Utils.getBooStrVazia(this.strNome))
            {
                this.strNome = "jhow_eh_oh_maioral";
            }

            this.strNome = Utils.replaceAll(this.strNome, ";", null);

            this.strNome = this.strNome.toLowerCase();

            return this.strNome;
        }

        protected montarLayoutFixo(strLayoutFixo: string): string
        {
            if (Utils.getBooStrVazia(this.strNome))
            {
                return null;
            }

            strLayoutFixo = super.montarLayoutFixo(strLayoutFixo);

            strLayoutFixo = strLayoutFixo.replace("_str_div_fechar_id", this.divFechar.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_id", this.strId);
            strLayoutFixo = strLayoutFixo.replace("_str_tag_nome", this.getStrTagNomeFormatada());

            return strLayoutFixo;
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.divFechar.addEvtOnClickListener(this);
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
                    case this.divFechar:
                        this.apagar();
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