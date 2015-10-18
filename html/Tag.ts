/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../Objeto.ts"/>

module NetZ.Web.TypeScript.html
{
    // #region Importações

    // #endregion Importações

    // #region Enumerados

    export enum EnmAnimacaoTipo
    {
        ABAIXO,
        ACIMA,
        DIREITA,
        ESQUERDA,
        FADE,
    }

    // #endregion Enumerados

    export class Tag extends Objeto
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _booVisivel: boolean;
        private _jq: any;
        private _onChange: Function;
        private _onClick: Function;
        private _onKeyDown: Function;
        private _onKeyPress: Function;
        private _onKeyUp: Function;
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
            catch (ex)
            {
                throw ex;
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

                this._booVisivel ? this.mostrar() : this.esconder();
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

        public get jq(): JQuery
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._jq != null)
                {
                    return this._jq;
                }

                this._jq = $("#" + this.strId);
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._jq;
        }

        public get onChange(): Function
        {
            return this._onChange;
        }

        public set onChange(fncOnChange: Function)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._onChange = fncOnChange;

                this.jq.change(this._onChange);
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

        public get onClick(): Function
        {
            return this._onClick;
        }

        public set onClick(fncOnClick: Function)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._onClick = fncOnClick;

                this.jq.click(this._onClick);
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

        public get onKeyDown(): Function
        {
            return this._onKeyDown;
        }

        public set onKeyDown(fncKeyDown: Function)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._onKeyDown = fncKeyDown;

                this.jq.keydown(this._onKeyDown);
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

        public get onKeyPress(): Function
        {
            return this._onKeyPress;
        }

        public set onKeyPress(fncKeyPress: Function)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._onKeyPress = fncKeyPress;

                this.jq.keypress(this._onKeyPress);
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

        public get onKeyUp(): Function
        {
            return this._onKeyUp;
        }

        public set onKeyUp(fncKeyUp: Function)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._onKeyUp = fncKeyUp;

                this.jq.keyup(this._onKeyUp);
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
            catch (ex)
            {
                throw ex;
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
            catch (ex)
            {
                throw ex;
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
            catch (ex)
            {
                throw ex;
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
            catch (ex)
            {
                throw ex;
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
            catch (ex)
            {
                throw ex;
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
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações
        }

        public esconder(enmAnimacaoTipo: EnmAnimacaoTipo = EnmAnimacaoTipo.FADE): void
        {
            // #region Variáveis

            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.stop();

                switch (enmAnimacaoTipo)
                {
                    case EnmAnimacaoTipo.ABAIXO:
                        this.jq.slideDown();
                        return;

                    case EnmAnimacaoTipo.ACIMA:
                        this.jq.slideUp();
                        return;

                    case EnmAnimacaoTipo.DIREITA:
                        this.jq.hide(); // TODO: Implementar.
                        return;

                    case EnmAnimacaoTipo.ESQUERDA:
                        this.jq.hide(); // TODO: Implementar.
                        return;

                    default:
                        this.jq.fadeOut();
                        return;
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

        public inicializar(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.montarLayout();
                this.setEventos();
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

        protected montarLayout(): void
        {
        }

        public mostrar(enmAnimacaoTipo: EnmAnimacaoTipo = EnmAnimacaoTipo.FADE)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.jq.stop();

                switch (enmAnimacaoTipo)
                {
                    case EnmAnimacaoTipo.ABAIXO:
                        this.jq.slideDown();
                        return;

                    case EnmAnimacaoTipo.ACIMA:
                        this.jq.slideUp();
                        return;

                    case EnmAnimacaoTipo.DIREITA:
                        this.jq.show(); // TODO: Implementar.
                        return;

                    case EnmAnimacaoTipo.ESQUERDA:
                        this.jq.show(); // TODO: Implementar.
                        return;

                    default:
                        this.jq.fadeIn();
                        return;
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

        public mostrarEsconder(enmAnimacaoTipo: EnmAnimacaoTipo = EnmAnimacaoTipo.FADE): void
        {
            (this.booVisivel) ? this.esconder(enmAnimacaoTipo) : this.mostrar(enmAnimacaoTipo);
        }

        protected setEventos(): void
        {
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
            catch (ex)
            {
                throw ex;
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