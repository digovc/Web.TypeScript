/// <reference path="../../../OnClickListener.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivFavoritoItem extends ComponenteHtml implements OnClickListener
    {
        // #region Constantes

        private static get SRC_IMAGEM_CARREGADO(): string { return "/res/media/png/btn_favorito_80x80.png" };
        private static get SRC_IMAGEM_VAZIO(): string { return "/res/media/png/btn_favorito_novo_80x80.png" };

        // #endregion Constantes

        // #region Atributos

        private _divFavorito: DivFavorito;
        private _divTitulo: Div;
        private _imgIcone: Imagem;
        private _objFavorito: FavoritoDominio;
        private _tblWeb: TabelaWeb;

        private get divFavorito(): DivFavorito
        {
            return this._divFavorito;
        }

        private set divFavorito(divFavorito: DivFavorito)
        {
            this._divFavorito = divFavorito;
        }

        private get divTitulo(): Div
        {
            if (this._divTitulo != null)
            {
                return this._divTitulo;
            }

            this._divTitulo = new Div(this.strId + "_divTitulo");

            return this._divTitulo;
        }

        private get imgIcone(): Imagem
        {
            if (this._imgIcone != null)
            {
                return this._imgIcone;
            }

            this._imgIcone = new Imagem(this.strId + "_imgIcone");

            return this._imgIcone;
        }

        public get objFavorito(): FavoritoDominio
        {
            return this._objFavorito;
        }

        public set objFavorito(objFavorito: FavoritoDominio)
        {
            if (this._objFavorito == objFavorito)
            {
                return;
            }

            this._objFavorito = objFavorito;

            this.setObjFavorito(this._objFavorito);
        }

        private get tblWeb(): TabelaWeb
        {
            if (this._tblWeb != null)
            {
                return this._tblWeb;
            }

            this._tblWeb = this.getTblWeb();

            return this._tblWeb;
        }

        // #endregion Atributos

        // #region Construtor

        constructor(strId: string, divFavorito: DivFavorito)
        {
            super(strId);

            this.divFavorito = divFavorito;
        }

        // #endregion Construtor

        // #region Métodos

        private abrirConsulta(): void
        {
            if (AppWebBase.i == null)
            {
                return;
            }

            if (AppWebBase.i.pag == null)
            {
                return;
            }

            if (!(AppWebBase.i.pag instanceof PagPrincipal))
            {
                return;
            }

            if (this.tblWeb == null)
            {
                return;
            }

            (AppWebBase.i.pag as PagPrincipal).abrirConsulta(this.tblWeb);

            this.imgIcone.anim.girar();
        }

        private getTblWeb(): TabelaWeb
        {
            if (this.objFavorito == null)
            {
                return null;
            }

            if (Utils.getBooStrVazia(this.objFavorito.strNome))
            {
                return null;
            }

            return new TabelaWeb(this.objFavorito.strNome);
        }

        protected setEventos(): void
        {
            super.setEventos();

            this.addEvtOnClickListener(this);
        }

        private setObjFavorito(objFavorito: FavoritoDominio): void
        {
            if (objFavorito == null)
            {
                this.divTitulo.strConteudo = null;
                this.imgIcone.jq.attr("src", DivFavoritoItem.SRC_IMAGEM_VAZIO);
                return;
            }

            this.divTitulo.strConteudo = objFavorito.strTitulo;
            this.imgIcone.jq.attr("src", DivFavoritoItem.SRC_IMAGEM_CARREGADO);
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
                        this.abrirConsulta();
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