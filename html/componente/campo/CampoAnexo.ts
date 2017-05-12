/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="CampoMedia.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoAnexo extends CampoMedia implements OnClickListener
    {
        // #region Constantes

        // #endregion Constantes

        // #region Atributos

        private _btnDownload: BotaoCircular;
        private _btnPesquisar: BotaoCircular;
        private _divArquivoNome: Div;
        private _divArquivoTamanho: Div;
        private _divIcone: Div;
        private _divProgressBar: ProgressBar;
        private _elmInput: HTMLInputElement;

        private get btnDownload(): BotaoCircular
        {
            if (this._btnDownload != null)
            {
                return this._btnDownload;
            }

            this._btnDownload = new BotaoCircular(this.strId + "_btnDownload");

            return this._btnDownload;
        }

        private get btnPesquisar(): BotaoCircular
        {
            if (this._btnPesquisar != null)
            {
                return this._btnPesquisar;
            }

            this._btnPesquisar = new BotaoCircular(this.strId + "_btnPesquisar");

            return this._btnPesquisar;
        }

        private get divArquivoNome(): Div
        {
            if (this._divArquivoNome != null)
            {
                return this._divArquivoNome;
            }

            this._divArquivoNome = new Div(this.strId + "_divArquivoNome");

            return this._divArquivoNome;
        }

        private get divArquivoTamanho(): Div
        {
            if (this._divArquivoTamanho != null)
            {
                return this._divArquivoTamanho;
            }

            this._divArquivoTamanho = new Div(this.strId + "_divArquivoTamanho");

            return this._divArquivoTamanho;
        }

        private get divIcone(): Div
        {
            if (this._divIcone != null)
            {
                return this._divIcone;
            }

            this._divIcone = new Div(this.strId + "_divIcone");

            return this._divIcone;
        }

        private get divProgressBar(): ProgressBar
        {
            if (this._divProgressBar != null)
            {
                return this._divProgressBar;
            }

            this._divProgressBar = new ProgressBar(this.strId + "_divProgressBar");

            return this._divProgressBar;
        }

        private get elmInput(): HTMLInputElement
        {
            if (this._elmInput != null)
            {
                return this._elmInput;
            }

            this._elmInput = <HTMLInputElement>document.getElementById(this.tagInput.strId);

            return this._elmInput;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        protected atualizarStrValor(): void
        {
            super.atualizarStrValor();

            this.limparCampos();

            if (this.elmInput == null)
            {
                return;
            }

            if (this.elmInput.files == null)
            {
                return;
            }

            if (this.elmInput.files.length < 1)
            {
                return;
            }

            this.enviarArquivo();

            this.atualizarStrValorDivArquivoNome(this.elmInput.files[0].name);
            this.atualizarStrValorDivArquivoTamanho(this.elmInput.files[0].size);
            this.atualizarStrValorDivIcone(this.elmInput.files[0].name);
        }

        private atualizarStrValorDivArquivoNome(strArquivoNome: string): void
        {
            this.divArquivoNome.strConteudo = null;

            if (Utils.getBooStrVazia(strArquivoNome))
            {
                return;
            }

            if (strArquivoNome.length < 5)
            {
                return;
            }

            this.divArquivoNome.strConteudo = strArquivoNome.substr(0, (strArquivoNome.length - 4));
        }

        private atualizarStrValorDivArquivoTamanho(intArquivoTamanho: number): void
        {
            this.divArquivoTamanho.strConteudo = null;

            if (intArquivoTamanho < 2)
            {
                return;
            }

            var strArquivoTamanho = "_tamanho_bytes bytes".replace("_tamanho_bytes", intArquivoTamanho.toString());

            this.divArquivoTamanho.strConteudo = strArquivoTamanho;
        }

        private atualizarStrValorDivIcone(strArquivoNome: string): void
        {
            this.divIcone.esconder();

            if (Utils.getBooStrVazia(strArquivoNome))
            {
                return;
            }

            if (strArquivoNome.length < 5)
            {
                return;
            }

            this.divIcone.strConteudo = strArquivoNome.toUpperCase().substr((strArquivoNome.length - 3), 3);

            this.divIcone.mostrar();
        }

        private download(): void
        {
            if (AppWebBase.i.srvHttp == null)
            {
                return;
            }

            if (this.frm == null)
            {
                return;
            }

            if (this.frm.jnlCadastro == null)
            {
                return;
            }

            if (this.intRegistroId < 1)
            {
                return;
            }

            if (this.frm.tblWeb == null)
            {
                return;
            }

            var url = "/_url_db_file_download?tbl_web_nome=_tbl_web_nome&registro_id=_registro_id";

            url = url.replace("_url_db_file_download", SrvHttpBase.URL_DATA_BASE_FILE_DOWNLOAD);
            url = url.replace("_tbl_web_nome", this.frm.tblWeb.strNome);
            url = url.replace("_registro_id", this.intRegistroId.toString());

            AppWebBase.i.srvHttp.download(url);
        }

        private enviarArquivo(): void
        {
            this.limparCampos();

            if (this.frm == null)
            {
                return;
            }

            if (this.frm.tblWeb == null)
            {
                return;
            }

            if (this.clnWeb == null)
            {
                return;
            }

            if (Utils.getBooStrVazia(this.clnWeb.strNome))
            {
                return;
            }

            if (AppWebBase.i.srvAjaxDb == null)
            {
                return;
            }

            this.divProgressBar.mostrar();

            this.enviarArquivoModificacao();
            this.enviarArquivoNome();
            this.enviarArquivoTamanho();

            this.frm.tblWeb.dttUpload = new Date();

            var frmData = new FormData();

            frmData.append("arq_nome", this.elmInput.files[0].name);
            frmData.append("cln_web_nome", this.clnWeb.strNome);
            frmData.append("dtt_upload", this.frm.tblWeb.dttUpload);
            frmData.append("tbl_web_nome", this.frm.tblWeb.strNome);

            frmData.append("arq_conteudo", this.elmInput.files[0]);

            var objInterlocutor = new Interlocutor();

            objInterlocutor.objData = frmData;

            objInterlocutor.addFncProgresso((arg: ProgressEvent) => { this.enviarArquivoProgresso(arg); });
            objInterlocutor.addFncSucesso((objInterlocutor: Interlocutor) => { this.enviarArquivoSucesso(objInterlocutor); });

            AppWebBase.i.srvAjaxDb.enviarArquivo(objInterlocutor);
        }

        private enviarArquivoModificacao(): void
        {
            var strClnWebArquivoModificacaoNome = this.getStrAttValor("cln_web_arquivo_modificacao_nome");

            if (Utils.getBooStrVazia(strClnWebArquivoModificacaoNome))
            {
                return;
            }

            this.frm.tblWeb.getClnWeb(strClnWebArquivoModificacaoNome).strValor = this.elmInput.files[0].lastModifiedDate;
        }

        private enviarArquivoNome(): void
        {
            var strClnWebArquivoNomeNome = this.getStrAttValor("cln_web_arquivo_nome_nome");

            if (Utils.getBooStrVazia(strClnWebArquivoNomeNome))
            {
                return;
            }

            this.frm.tblWeb.getClnWeb(strClnWebArquivoNomeNome).strValor = this.elmInput.files[0].name;
        }

        private enviarArquivoProgresso(arg: ProgressEvent): void
        {
            this.divProgressBar.intProgresso = arg.loaded;
            this.divProgressBar.intProgressoMaximo = arg.total;
        }

        private enviarArquivoSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor == null)
            {
                Notificacao.notificar("Erro ao enviar arquivo.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            if (objInterlocutor.objData == null)
            {
                Notificacao.notificar("Erro ao enviar arquivo.", Notificacao_EnmTipo.NEGATIVA);
                return;
            }

            this.divProgressBar.esconder();

            Notificacao.notificar(objInterlocutor.objData.toString());
        }

        private enviarArquivoTamanho(): void
        {
            var strClnWebArquivoTamanhoNome = this.getStrAttValor("cln_web_arquivo_tamanho_nome");

            if (Utils.getBooStrVazia(strClnWebArquivoTamanhoNome))
            {
                return;
            }

            this.frm.tblWeb.getClnWeb(strClnWebArquivoTamanhoNome).intValor = this.elmInput.files[0].size;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.btnDownload.iniciar();
            this.btnPesquisar.iniciar();

            this.btnDownload.booVisivel = (this.intRegistroId > 0);
            this.btnPesquisar.booVisivel = (this.intRegistroId < 1);
        }

        private limparCampos(): void
        {
            this.divArquivoNome.strConteudo = null;
            this.divArquivoTamanho.strConteudo = null;
            this.divIcone.strConteudo = null;
            this.divProgressBar.intProgresso = 0;

            this.divIcone.esconder();
            this.divProgressBar.esconder();
        }

        private pesquisar(): void
        {
            if (this.intRegistroId > 0)
            {
                return;
            }

            this.tagInput.jq.click();
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.btnDownload.addEvtOnClickListener(this);
            this.btnPesquisar.addEvtOnClickListener(this);
        }

        // #endregion Métodos

        // #region Eventos

        public onClick(objSender: Object, arg: JQueryEventObject): void
        {
            try
            {
                switch (objSender)
                {
                    case this.btnDownload:
                        this.download();
                        return;

                    case this.btnPesquisar:
                        this.pesquisar();
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