/// <reference path="../../../database/dominio/FavoritoDominio.ts"/>
/// <reference path="../ComponenteHtmlBase.ts"/>
/// <reference path="DivFavoritoItem.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class DivFavorito extends ComponenteHtmlBase
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _arrDivFavoritoItem: Array<DivFavoritoItem>;

        private get arrDivFavoritoItem(): Array<DivFavoritoItem>
        {
            if (this._arrDivFavoritoItem != null)
            {
                return this._arrDivFavoritoItem;
            }

            this._arrDivFavoritoItem = this.getArrDivFavoritoItem();

            return this._arrDivFavoritoItem;
        }

        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        private addFavorito(objFavorito: FavoritoDominio): void
        {
            if (objFavorito == null)
            {
                return;
            }

            for (var i = 0; i < this.arrDivFavoritoItem.length; i++)
            {
                var divFavoritoItem = this.arrDivFavoritoItem[i];

                if (divFavoritoItem == null)
                {
                    continue;
                }

                if (divFavoritoItem.objFavorito != null)
                {
                    continue;
                }

                divFavoritoItem.objFavorito = objFavorito;
                return;
            }
        }

        private getArrDivFavoritoItem(): Array<DivFavoritoItem>
        {
            if (this.jq == null)
            {
                return;
            }

            var arrElmDivFavoritoItem = this.jq.find("[clazz=_clazz_nome]".replace("_clazz_nome", DivFavoritoItem.name));

            if (arrElmDivFavoritoItem == null)
            {
                return;
            }

            var arrDivFavoritoItemResultado = new Array<DivFavoritoItem>();

            for (var i = 0; i < arrElmDivFavoritoItem.length; i++)
            {
                this.getArrDivFavoritoItem2(arrDivFavoritoItemResultado, arrElmDivFavoritoItem[i]);
            }

            return arrDivFavoritoItemResultado;
        }

        private getArrDivFavoritoItem2(arrDivFavoritoItem: Array<DivFavoritoItem>, elmDivFavoritoItem: HTMLElement): void
        {
            if (elmDivFavoritoItem == null)
            {
                return;
            }

            if (Utils.getBooStrVazia($(elmDivFavoritoItem).attr("clazz")))
            {
                return;
            }

            if (Utils.getBooStrVazia(elmDivFavoritoItem.id))
            {
                return;
            }

            var divFavoritoItem = new DivFavoritoItem(elmDivFavoritoItem.id, this);

            arrDivFavoritoItem.push(divFavoritoItem);

            divFavoritoItem.iniciar();
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.pesquisarFavorito();
        }

        private pesquisarFavorito(): void
        {
            if (AppWebBase.i.srvAjaxDbe == null)
            {
                return;
            }

            var objInterlocutor = new Interlocutor();

            objInterlocutor.strMetodo = SrvAjaxDbeBase.STR_METODO_TABELA_FAVORITO_PESQUISAR;

            objInterlocutor.addFncSucesso((o: Interlocutor) => this.pesquisarFavoritoSucesso(o));

            AppWebBase.i.srvAjaxDbe.enviar(objInterlocutor);
        }

        private pesquisarFavoritoSucesso(objInterlocutor: Interlocutor): void
        {
            if (objInterlocutor.objData == null)
            {
                return; // TODO: Limpar os itens.
            }

            var arrObjFavorito = new Array<FavoritoDominio>();

            (objInterlocutor.objData as Array<FavoritoDominio>).forEach(o => arrObjFavorito.push(new FavoritoDominio().copiarDados(o) as FavoritoDominio));

            arrObjFavorito.forEach(o => this.addFavorito(o));
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}