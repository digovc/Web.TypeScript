module NetZ_Web_TypeScript
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
        // #endregion Constantes

        // #region Atributos
        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        /**
         * Carrega uma imagem no servidor e a retorna, podendo ser usada
         * na página.
         * @param strSrc Localização para a imagem no servidor.
         * @param evtOnLoad Evento que será disparado assim que a imagem
         * terminar de ser carregada.
         */
        public static carregarImagem(strSrc: string, evtOnLoad: any = null): HTMLImageElement
        {
            // #region Variáveis

            var img: HTMLImageElement;

            // #endregion Variáveis

            // #region Ações
            try
            {
                img = new Image();
                img.src = strSrc;
                img.onload = evtOnLoad;
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return img;
        }

        /**
         * Valida se um texto é igual a null ou vazio (""). Caso ele seja
         * retorna true.
         */
        public static getBooStrVazia(str: string): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (str == null)
                {
                    return true;
                }
                if (str == "")
                {
                    return true;
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return true;
        }

        /**
         * Verifica se o email contido em strEmail é válido. Retorna true
         * em caso afirmativo.
         */
        public static validarEmail(strEmail: string): boolean
        {
            // #region Variáveis

            var objRegExp: RegExp;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(strEmail))
                {
                    return false;
                }

                objRegExp = new RegExp("/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/");

                if (objRegExp.test(strEmail))
                {
                    return true;
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return false;
        }

        public static getStrTamanhoFixo(str: string, intTamanho: number, strComplemento: string = " ", booDireita: boolean = true): string
        {
            // #region Variáveis

            var i: number;

            // #endregion Variáveis

            // #region Ações
            try
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

                i = (intTamanho - str.length);

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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return str;
        }

        public static replaceAll(str: string, strAntigo: string, strNovo: string): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(str))
                {
                    return null;
                }

                while (str.indexOf(strAntigo) != -1)
                {
                    str = str.replace(strAntigo, strNovo);
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return str;
        }

        /**
         * Converte o valor de strValor para seu correspondente booleano (true ou false).
         * A string será transformada para minúsculo, logo "S" é o mesmo que "s".
         * @param strValor Texto que se deseja verificar o valor booleano.
         * @return True caso strValor contenha: 1, sim, s, true, t. E false em qualquer outra possibilidade.
         */
        public static strToBoo(strValor: string): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
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

                    default:
                        return false;
                }
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}