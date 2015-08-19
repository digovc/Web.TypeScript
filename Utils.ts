﻿// #region Módulos externos
// #endregion Módulos externos

// #region Importações
// #endregion Importações

module NetZ.Web.TypeScript
{
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
        public static carregarImagem(strSrc: string, evtOnLoad = null): HTMLImageElement
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
            catch (e)
            {
                throw e;
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
        public static getBooStrVazia(str): boolean
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
            catch (e)
            {
                throw e;
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
            catch (e)
            {
                throw e;
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
            catch (e)
            {
                throw e;
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
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return str;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}