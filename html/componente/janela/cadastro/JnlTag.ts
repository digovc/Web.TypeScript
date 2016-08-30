﻿/// <reference path="../../../../Keys.ts"/>
/// <reference path="TagCard.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class JnlTag extends JanelaHtml implements OnKeyDownListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrTagCard: Array<TagCard>;
        private _tagInputTag: Input;
        private _tblWeb: TabelaWeb;

        public get arrTagCard(): Array<TagCard>
        {
            if (this._arrTagCard != null)
            {
                return this._arrTagCard;
            }

            this._arrTagCard = new Array<TagCard>();

            return this._arrTagCard;
        }

        private get tagInputTag(): Input
        {
            if (this._tagInputTag != null)
            {
                return this._tagInputTag;
            }

            this._tagInputTag = new Input(this.strId + "_tagInputTag");

            return this._tagInputTag;
        }

        private get tblWeb(): TabelaWeb
        {
            return this._tblWeb;
        }

        private set tblWeb(tblWeb: TabelaWeb)
        {
            if (this._tblWeb == tblWeb)
            {
                return;
            }

            this._tblWeb = tblWeb;

            this.atualizarTblWeb();
        }

        // #endregion Atributos

        // #region Construtores

        constructor(pag: PaginaHtml, tblWeb: TabelaWeb)
        {
            super(null, pag);

            this.tblWeb = tblWeb;
        }

        // #endregion Construtores

        // #region Métodos

        private addStrTag(strTagNome: string): void
        {
            this.tagInputTag.strValor = null;

            if (!this.validarStrTag(strTagNome))
            {
                return;
            }

            var tagCard = new TagCard(this);

            tagCard.strNome = strTagNome;

            if (Utils.getBooStrVazia(tagCard.strLayoutFixo))
            {
                return;
            }

            this.addTagCard(tagCard);

            this.tagInputTag.jq.before(tagCard.strLayoutFixo);

            this.tagInputTag.receberFoco();

            tagCard.iniciar();
            tagCard.mostrar();
        }

        private addTagCard(tagCard: TagCard): void
        {
            if (tagCard == null)
            {
                return;
            }

            if (this.arrTagCard.indexOf(tagCard) > -1)
            {
                return;
            }

            this.arrTagCard.push(tagCard);
        }

        private atualizarTblWeb(): void
        {
            if (this.tblWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.tblWeb.strNome))
            {
                return;
            }

            if (this.tblWeb.clnWebIntId.intValor < 1)
            {
                return;
            }

            var strId = "jnlTag__tbl_nome__int_registro_id";

            strId = strId.replace("_tbl_nome", this.tblWeb.strNome);
            strId = strId.replace("_int_registro_id", String(this.tblWeb.clnWebIntId.intValor));

            this.strId = strId;
        }

        protected fechar(): void
        {
            this.salvar();

            super.fechar();
        }

        private getStrTagFormatada(): string
        {
            var strTagFormatada = Utils.STR_VAZIA;

            this.arrTagCard.forEach((tagCard) => { strTagFormatada = this.getStrTagFormatadaItem(strTagFormatada, tagCard); });

            return strTagFormatada;
        }

        private getStrTagFormatadaItem(strTagFormatada: string, tagCard: TagCard): string
        {
            if (tagCard == null)
            {
                return strTagFormatada;
            }

            if (Utils.getBooStrVazia(tagCard.strNome))
            {
                return strTagFormatada;
            }

            strTagFormatada += (tagCard.strNome + ";");

            return strTagFormatada;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.inicializarCssMain();

            this.inicializarTagInputTag();

            this.inicializarStrTag();
        }

        private inicializarCssMain(): void
        {
            if (AppWeb.i.srvHttp == null)
            {
                return;
            }

            AppWeb.i.srvHttp.atualizarCssMain();
        }

        private inicializarStrTag(): void
        {
            var strTag = this.getStrAttValor("str_tag");

            if (Utils.getBooStrVazia(strTag))
            {
                return;
            }

            var arrStrTag = strTag.split(";");

            arrStrTag.forEach((strTagItem) => { this.addStrTag(strTagItem); });
        }

        private inicializarTagInputTag(): void
        {
            this.tagInputTag.iniciar();

            this.tagInputTag.receberFoco();
        }

        private redimensionarTagInputTag(): void
        {
            var intTamanho = 25;

            if (!Utils.getBooStrVazia(this.tagInputTag.strValor))
            {
                intTamanho = (this.tagInputTag.strValor.length * 10);
            }

            this.tagInputTag.jq.css("width", intTamanho);
        }

        public removerTagCard(tagCard: TagCard): void
        {
            if (tagCard == null)
            {
                return;
            }

            if (this.arrTagCard.indexOf(tagCard) < 0)
            {
                return;
            }

            this.arrTagCard.splice(this.arrTagCard.indexOf(tagCard), 1);

            tagCard.dispose();

            this.tagInputTag.receberFoco();
        }

        private salvar(): void
        {
            if (AppWeb.i.srvAjaxDb == null)
            {
                throw ServerAjaxDb.STR_EXCEPTION_NULL;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            if (this.tblWeb.clnWebIntId.intValor < 1)
            {
                return;
            }

            var strTagFormatada = this.getStrTagFormatada();

            if (Utils.getBooStrVazia(strTagFormatada))
            {
                strTagFormatada = ColunaWeb.STR_VALOR_NULL;
            }

            if (strTagFormatada == this.getStrAttValor("str_tag"))
            {
                return;
            }

            var intRegistroId = this.tblWeb.clnWebIntId.intValor;

            this.tblWeb.limparDados();

            this.tblWeb.clnWebIntId.intValor = intRegistroId;
            this.tblWeb.getClnWeb(TabelaWeb.SQL_CLN_STR_TAG_NOME).strValor = strTagFormatada;

            var objInterlocutor = new Interlocutor();

            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.salvarSucesso(objInterlocutor); }); // TODO: Informar ao usuário.
            objInterlocutor.addJsn(this.tblWeb);

            objInterlocutor.strMetodo = ServerAjaxDb.STR_METODO_SALVAR;

            AppWeb.i.srvAjaxDb.enviar(objInterlocutor);
        }

        private salvarSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                return;
            }

            if (objInterlocutor.objData == null)
            {
                return;
            }

            var tblWeb = new TabelaWeb(null);

            tblWeb.copiarDados(JSON.parse(objInterlocutor.objData.toString()));

            if (Utils.getBooStrVazia(tblWeb.strCritica))
            {
                Notificacao.notificar("Tags salvas com sucesso.")
                return;
            }

            // TODO: Tratar eventuais problemas no salvamento das tags.
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.tagInputTag.addEvtOnKeyDownListener(this);
        }

        private tagInputTagOnKeyDown(arg: JQueryKeyEventObject): void
        {
            if (arg == null)
            {
                return;
            }

            this.redimensionarTagInputTag();

            switch (arg.keyCode)
            {
                case Keys.BACKSPACE:
                    this.tagInputTagOnKeyDownBackSpace();
                    return;

                case Keys.ENTER:
                    this.tagInputTagOnKeyDownEnter();
                    return;
            }
        }

        private tagInputTagOnKeyDownBackSpace(): void
        {
            if (!Utils.getBooStrVazia(this.tagInputTag.strValor))
            {
                return;
            }

            if (this.arrTagCard.length < 1)
            {
                return;
            }

            this.removerTagCard(this.arrTagCard[this.arrTagCard.length - 1]);
        }

        private tagInputTagOnKeyDownEnter(): void
        {
            if (Utils.getBooStrVazia(this.tagInputTag.strValor))
            {
                return;
            }

            this.addStrTag(this.tagInputTag.strValor);
        }

        private validarStrTag(strTagNome: string): boolean
        {
            if (Utils.getBooStrVazia(strTagNome))
            {
                return false;
            }

            if (!this.validarStrTagItem(strTagNome))
            {
                return false;
            }

            return true;
        }

        private validarStrTagItem(strTagNome: string): boolean
        {
            for (var i = 0; i < this.arrTagCard.length; i++)
            {
                var tagCard = this.arrTagCard[i];

                if (tagCard == null)
                {
                    continue;
                }

                if (Utils.getBooStrVazia(tagCard.strNome))
                {
                    continue;
                }

                if (tagCard.strNome.toLowerCase() != strTagNome.toLowerCase())
                {
                    continue;
                }

                return false;
            }

            return true;
        }

        // #endregion Métodos

        // #region Eventos

        public onKeyDown(objSender: Object, arg: JQueryKeyEventObject): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                switch (objSender)
                {
                    case this.tagInputTag:
                        this.tagInputTagOnKeyDown(arg);
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