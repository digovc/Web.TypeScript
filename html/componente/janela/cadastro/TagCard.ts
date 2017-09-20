// #region Reference

/// <reference path="../../ComponenteHtmlBase.ts"/>

// #endregion Reference

// #region RequireJS

// #endregion RequireJS

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class TagCard extends ComponenteHtmlBase implements OnClickListener
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

            this.setJnlTag(this._jnlTag);
        }

        // #endregion Atributos

        // #region Construtor

        constructor(jnlTag: JnlTag)
        {
            super(null);

            this.jnlTag = jnlTag;
        }

        // #endregion Construtor

        // #region Métodos

        private apagar(): void
        {
            if (this.jnlTag == null)
            {
                return;
            }

            this.jnlTag.removerTagCard(this);
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

        private setJnlTag(jnlTag: JnlTag): void
        {
            if (jnlTag == null)
            {
                return;
            }

            var strId = "_str_jnl_tag_id__int_index";

            strId = strId.replace("_str_jnl_tag_id", jnlTag.strId);
            strId = strId.replace("_int_index", String(jnlTag.arrTagCard.length));

            this.strId = strId;
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Objeto, arg: JQueryEventObject): void
        {
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
                new Erro("Algo deu errado.", ex);
            }
        }

        // #endregion Eventos
    }
}