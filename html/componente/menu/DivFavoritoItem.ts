/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivFavoritoItem extends ComponenteHtml
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

            this.atualizarObjFavorito();
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string, divFavorito: DivFavorito)
        {
            super(strId);

            this.divFavorito = divFavorito;
        }

        // #endregion Construtores

        // #region Métodos

        private atualizarObjFavorito(): void
        {
            if (this.objFavorito == null)
            {
                this.divTitulo.strConteudo = null;
                this.imgIcone.jq.attr("src", DivFavoritoItem.SRC_IMAGEM_VAZIO);
                return;
            }

            this.divTitulo.strConteudo = this.objFavorito.strTitulo;
            this.imgIcone.jq.attr("src", DivFavoritoItem.SRC_IMAGEM_CARREGADO);
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}