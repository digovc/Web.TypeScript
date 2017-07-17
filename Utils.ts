module Web
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    /**
     * Classe com funções que são de utilizada para toda a aplicação.
     * Todos os métodos devem ser acessadas diretamente através da classe
     * pois são todas estáticas.
     */
    export class Utils
    {
        // #region Constantes

        public static get STR_VAZIA(): string { return "" };

        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtor
        // #endregion Construtor

        // #region Métodos

        public static appendBuffer(arrBuffer1: ArrayBuffer, arrBuffer2: ArrayBuffer): ArrayBuffer
        {
            if (arrBuffer1 == null)
            {
                return null;
            }

            if (arrBuffer2 == null)
            {
                return null;
            }

            var arrUInt8 = new Uint8Array(arrBuffer1.byteLength + arrBuffer2.byteLength);

            arrUInt8.set(new Uint8Array(arrBuffer1), 0);
            arrUInt8.set(new Uint8Array(arrBuffer2), arrBuffer1.byteLength);

            return arrUInt8.buffer;
        }

        public static base64ToArrayBuffer(strBase64: string): ArrayBuffer
        {
            if (Utils.getBooStrVazia(strBase64))
            {
                return null;
            }

            var strBinary = window.atob(strBase64);

            var intLength = strBinary.length;

            var arrBte = new Uint8Array(intLength);

            for (var i = 0; i < intLength; i++)
            {
                arrBte[i] = strBinary.charCodeAt(i);
            }

            return arrBte.buffer;
        }

        /**
         * Carrega uma imagem no servidor e a retorna, podendo ser usada
         * na página.
         * @param strSrc Localização para a imagem no servidor.
         * @param evtOnLoad Evento que será disparado assim que a imagem
         * terminar de ser carregada.
         */
        public static carregarImagem(strSrc: string, fncOnLoad: ((o: HTMLImageElement) => void) = null): HTMLImageElement
        {
            var img = new Image();

            img.src = strSrc;

            if (fncOnLoad != null)
            {
                img.onload = (() => fncOnLoad(img));
            }

            return img;
        }

        /**
         * Converte o valor de strValor para seu correspondente booleano (true ou false).
         * A string será transformada para minúsculo, logo "S" é o mesmo que "s".
         * @param strValor Texto que se deseja verificar o valor booleano.
         * @return True caso strValor contenha: 1, sim, s, true, t. E false em qualquer outra possibilidade.
         */
        public static getBoo(strValor: string): boolean
        {
            if (Utils.getBooStrVazia(strValor))
            {
                return false;
            }

            switch (strValor.toLowerCase())
            {
                case "1":
                case "s":
                case "sim":
                case "t":
                case "true":
                    return true;
            }

            return false;
        }

        /**
         * Valida se um texto é igual a null ou vazio (""). Caso ele seja
         * retorna true.
         */
        public static getBooStrVazia(str: string): boolean
        {
            return ((str == null) || (str == Utils.STR_VAZIA));
        }

        public static getIntRandom(intMinimo: number, intMaximo: number): number
        {
            var intRandom = Math.random();

            var intDiff = (intMaximo - intMinimo);

            intDiff = (intDiff * intRandom);

            return Math.abs(Math.floor(intMinimo + intDiff));
        }

        public static getStrDttAmigavel(dtt: Date): string
        {
            if (dtt == null)
            {
                return null;
            }

            var dttTemp = new Date();

            dttTemp.setDate(dttTemp.getDate() + 2);

            var strResultado: string;

            if (dtt.toDateString() == dttTemp.toDateString())
            {
                strResultado = "Depois de amanhã às _str_time";
                return strResultado.replace("_str_time", dtt.toLocaleTimeString());
            }

            dttTemp.setDate(dttTemp.getDate() - 1);

            if (dtt.toDateString() == dttTemp.toDateString())
            {
                strResultado = "Amanhã às _str_time";
                return strResultado.replace("_str_time", dtt.toLocaleTimeString());
            }

            dttTemp.setDate(dttTemp.getDate() - 1);

            if (dtt.toDateString() == dttTemp.toDateString())
            {
                strResultado = "Hoje às _str_time";
                return strResultado.replace("_str_time", dtt.toLocaleTimeString());
            }

            dttTemp.setDate(dttTemp.getDate() - 1);

            if (dtt.toDateString() == dttTemp.toDateString())
            {
                strResultado = "Ontem às _str_time";
                return strResultado.replace("_str_time", dtt.toLocaleTimeString());
            }

            dttTemp.setDate(dttTemp.getDate() - 1);

            if (dtt.toDateString() == dttTemp.toDateString())
            {
                strResultado = "Ontem de ontem às _str_time";
                return strResultado.replace("_str_time", dtt.toLocaleTimeString());
            }

            return dtt.toLocaleString();
        }

        public static getStrTamanhoFixo(str: string, intTamanho: number, strComplemento: string = " ", booDireita: boolean = true): string
        {
            if (Utils.getBooStrVazia(str))
            {
                return null;
            }

            if (str.length > intTamanho)
            {
                str = str.substring(intTamanho, 0);
                return str;
            }

            var i = (intTamanho - str.length);

            while (true)
            {
                if (booDireita)
                {
                    str = str + strComplemento.substring(1, 0);
                } else
                {
                    str = strComplemento.substring(1, 0) + str;
                }

                if (str.length == intTamanho)
                {
                    return str;
                }
            }
        }

        public static getStrValorMonetario(fltValor: number): string
        {
            var strResultado = "R$ 0,00";

            if (fltValor == null)
            {
                return strResultado;
            }

            if (!$.isNumeric(fltValor))
            {
                return strResultado;
            }

            return ("R$ " + fltValor.toString().replace(".", ","));
        }

        public static replaceAll(str: string, strAntigo: string, strNovo: string): string
        {
            if (Utils.getBooStrVazia(str))
            {
                return null;
            }

            while (str.indexOf(strAntigo) > -1)
            {
                str = str.replace(strAntigo, strNovo);
            }

            return str;
        }

        public static simplificar(str: string): string
        {
            if (Utils.getBooStrVazia(str))
            {
                return null;
            }

            str = str.toLowerCase();
            str = str.trim();

            var arrStrAcentos = ["ç", "á", "é", "í", "ó", "ú", "ý", "à", "è", "ì", "ò", "ù", "ã", "õ", "ñ", "ä", "ë", "ï", "ö", "ü", "ÿ", "â", "ê", "î", "ô", "û"];
            var arrStrSemAcento = ["c", "a", "e", "i", "o", "u", "y", "a", "e", "i", "o", "u", "a", "o", "n", "a", "e", "i", "o", "u", "y", "a", "e", "i", "o", "u"];
            var arrStrCaracteresEspeciais = ["\\.", "\\", ",", "-", ":", "\\(", "\\)", "ª", "\\|", "\\\\", "°", "^\\s+", "\\s+$", "\\s+", ".", "(", ")", "/"];

            for (var i = 0; i < arrStrAcentos.length; i++)
            {
                str = Utils.replaceAll(str, arrStrAcentos[i], arrStrSemAcento[i]);
            }

            for (var i = 0; i < arrStrCaracteresEspeciais.length; i++)
            {
                str = Utils.replaceAll(str, arrStrCaracteresEspeciais[i], "");
            }

            if (Utils.getBooStrVazia(str))
            {
                return null;
            }

            return str.replace(" ", "_");
        }

        /**
         * Verifica se o email contido em strEmail é válido. Retorna true
         * em caso afirmativo.
         */
        public static validarEmail(strEmail: string): boolean
        {
            if (Utils.getBooStrVazia(strEmail))
            {
                return false;
            }

            var objRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (objRegExp.test(strEmail))
            {
                return true;
            }

            return false;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}