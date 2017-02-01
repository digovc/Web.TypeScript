/// <reference path="CampoMedia.ts"/>

module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoMapa extends CampoMedia
    {
        // #region Constantes

        private static get SRC_GOOGLE_MAPS_API(): string { return "https://maps.googleapis.com/maps/api/js" };

        // #endregion Constantes

        // #region Atributos

        private _map: google.maps.Map;
        private _mapOption: google.maps.MapOptions;
        private _mrk: google.maps.Marker;
        private _mrkOption: google.maps.MarkerOptions;

        private get map(): google.maps.Map
        {
            return this._map;
        }

        private set map(map: google.maps.Map)
        {
            this._map = map;
        }

        private get mapOption(): google.maps.MapOptions
        {
            if (this._mapOption != null)
            {
                return this._mapOption;
            }

            this._mapOption = this.getMapOption();

            return this._mapOption;
        }

        private get mrk(): google.maps.Marker
        {
            return this._mrk;
        }

        private set mrk(mrk: google.maps.Marker)
        {
            this._mrk = mrk;
        }

        private get mrkOption(): google.maps.MarkerOptions
        {
            if (this._mrkOption != null)
            {
                return this._mrkOption;
            }

            this._mrkOption = this.getMrkOption();

            return this._mrkOption;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private carregarGMapsApi(): void
        {
            if (AppWebBase.i == null)
            {
                return;
            }

            if (AppWebBase.i.pag == null)
            {
                return;
            }

            if (!AppWebBase.i.pag.validarJsCarregado(CampoMapa.SRC_GOOGLE_MAPS_API))
            {
                AppWebBase.i.pag.addJs(CampoMapa.SRC_GOOGLE_MAPS_API, (() => { this.inicializarMap(); }));
            }
            else
            {
                this.inicializarMap();
            }
        }

        private getMapOption(): google.maps.MapOptions
        {
            var mapOptionTemp: google.maps.MapOptions = {
                center: new google.maps.LatLng(-20.364374145605524, -40.65814501647947),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 12,
            };

            return mapOptionTemp;
        }

        private getMrkOption(): google.maps.MarkerOptions
        {
            var mrkOptionResultado: google.maps.MarkerOptions = {
                animation: google.maps.Animation.DROP,
                draggable: true,
                map: this.map,
                position: this.map.getCenter(),
                title: "Domingos Martins",
            };

            return mrkOptionResultado;
        }

        protected inicializar(): void
        {
            super.inicializar();

            this.carregarGMapsApi();
        }

        private inicializarMap(): void
        {
            if (this.divContent.jq == null)
            {
                return;
            }

            this.map = new google.maps.Map(document.getElementById(this.divContent.strId), this.mapOption);

            this.inicializarMrk();
        }

        private inicializarMrk(): void
        {
            if (this.map == null)
            {
                return;
            }

            this.mrk = new google.maps.Marker(this.mrkOption);

            this.mrk.addListener("dragend", (() => { this.processarMrkDragend(); }))

            this.inicializarMrkPosition();
        }

        private inicializarMrkPosition(): void
        {
            if (Utils.getBooStrVazia(this.tagInput.strValor))
            {
                return;
            }

            var strValor = this.tagInput.strValor;

            strValor = strValor.replace("(", Utils.STR_VAZIA);
            strValor = strValor.replace(")", Utils.STR_VAZIA);

            var decLat = Number(strValor.split(",")[0]);
            var decLng = Number(strValor.split(",")[1]);

            this.mrk.setPosition(new google.maps.LatLng(decLat, decLng));

            this.map.panTo(this.mrk.getPosition());
        }

        private processarMrkDragend(): void
        {
            if (this.map == null)
            {
                return;
            }

            if (this.map.getCenter().toString() == this.mrk.getPosition().toString())
            {
                return;
            }

            this.map.panTo(this.mrk.getPosition());

            var strValorFormatado = this.mrk.getPosition().toString();

            this.tagInput.strValor = strValorFormatado;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}