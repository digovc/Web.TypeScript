// #region Módulos externos
// #endregion Módulos externos

// #region Importações

import Objeto = NetZ.Web.TypeScript.Objeto;

// #endregion Importações

module NetZ.Web.TypeScript.html
{
    // #region Enumerados
    // #endregion Enumerados

    export class Tag extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booVisivel: boolean;
        private _fncKeyDown: any;
        private _fncKeyPress: any;
        private _fncKeyUp: any;
        private _fncOnChange: any;
        private _fncOnClick: any;
        private _jq: any;
        private _strEstrutura: string;
        private _strId: string;
        private _strPlaceholder: string;
        private _strTitle: string;

        public get booVisivel(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booVisivel = this.jq.is(":visible");
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this._booVisivel;
        }

        public set booVisivel(booVisivel: boolean)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._booVisivel = booVisivel;

                if (this._booVisivel)
                {
                    this.jq.fadeIn();
                    return;
                }

                this.jq.fadeOut();
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get fncKeyDown(): any
        {
            return this._fncKeyDown;
        }

        public set fncKeyDown(fncKeyDown: any)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._fncKeyDown = fncKeyDown;
                this.jq.keydown(this._fncKeyDown);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get fncKeyPress(): any
        {
            return this._fncKeyPress;
        }

        public set fncKeyPress(fncKeyPress: any)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._fncKeyPress = fncKeyPress;
                this.jq.keypress(this._fncKeyPress);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get fncKeyUp(): any
        {
            return this._fncKeyUp;
        }

        public set fncKeyUp(fncKeyUp: any)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._fncKeyUp = fncKeyUp;
                this.jq.keyup(this._fncKeyUp);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get fncOnChange(): any
        {
            return this._fncOnChange;
        }

        public set fncOnChange(fncOnChange: any)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._fncOnChange = fncOnChange;
                this.jq.change(this._fncOnChange);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get fncOnClick(): any
        {
            return this._fncOnClick;
        }

        public set fncOnClick(fncOnClick: any)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._fncOnClick = fncOnClick;
                this.jq.click(this._fncOnClick);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get jq(): any
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._jq = $("#" + this.strId);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this._jq;
        }

        public get strEstrutura(): string
        {
            return this._strEstrutura;
        }

        public set strEstrutura(strEstrutura: string)
        {
            this._strEstrutura = strEstrutura;
        }

        public get strId(): string
        {
            return this._strId;
        }

        public set strId(strId: string)
        {
            this._strId = strId;
        }

        public get strPlaceholder(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strPlaceholder = this.jq.attr("placeholder");
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strPlaceholder;
        }

        public set strPlaceholder(strPlaceholder: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strPlaceholder = strPlaceholder;
                this.jq.attr("placeholder", this._strPlaceholder);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public get strTitle(): string
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strTitle = this.jq.attr("title");
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this._strTitle;
        }

        public set strTitle(strTitle: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strTitle = strTitle;
                this.jq.attr("title", this._strTitle);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Atributos

        // #region Construtores

        constructor(strId: string)
        {
            super();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.strId = strId;
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Construtores

        // #region Métodos

        public addStrConteudo(strConteudo: string): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.append(strConteudo);
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public esconder(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.stop();
                this.booVisivel = false;
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        protected montarLayout(): void
        {
        }

        public mostrar()
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.stop();
                this.booVisivel = true;
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public toHtml(): string
        {
            var strHtmlResultado: string;

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.montarLayout();
            }
            catch (e)
            {
                throw e;
            }
            finally
            {
            }
            // #endregion Ações

            return this.strEstrutura;
        }

        // #endregion Métodos

        // #region Eventos
        // #endregion Eventos
    }
}