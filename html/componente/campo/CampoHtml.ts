/// <reference path="../../../erro/Erro.ts"/>
/// <reference path="../../../OnValorAlteradoListener.ts"/>
/// <reference path="../../../persistencia/ColunaWeb.ts"/>
/// <reference path="../../../Utils.ts"/>
/// <reference path="../../Div.ts"/>
/// <reference path="../../Input.ts"/>
/// <reference path="../ComponenteHtml.ts"/>

module NetZ_Web_TypeScript
{
    // #region Importações
    // #endregion Importações

    // #region Enumerados
    // #endregion Enumerados

    export class CampoHtml extends ComponenteHtml implements OnValorAlteradoListener
    {
        // #region Constantes
        // #endregion Constantes

        // #region Atributos

        private _cln: ColunaWeb;
        private _divTitulo: Div;
        private _strCritica: string;
        private _tagInput: Input;

        public get cln(): ColunaWeb
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._cln != null)
                {
                    return this._cln;
                }

                this._cln = this.getCln();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._cln;
        }

        private get divTitulo(): Div
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._divTitulo != null)
                {
                    return this._divTitulo;
                }

                this._divTitulo = new Div(this.strId + "_divTitulo");
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._divTitulo;
        }

        public get strCritica(): string
        {
            return this._strCritica;
        }

        public set strCritica(strCritica: string)
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this._strCritica = strCritica;

                this.atualizarStrCritica();
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

        public get tagInput(): Input
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this._tagInput != null)
                {
                    return this._tagInput;
                }

                this._tagInput = this.getTagInput();
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return this._tagInput;
        }

        // #endregion Atributos

        // #region Construtores
        // #endregion Construtores

        // #region Métodos

        private atualizarStrCritica(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                // TODO: Criar uma forma melhor para mostrar ao usuário que este campo está com crítica.
                this.strTitle = this.strCritica;
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

        private atualizarStrValor(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.atualizarStrValorCln();
                this.atualizarStrValorDivTitulo();
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

        private atualizarStrValorCln(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.cln == null)
                {
                    return;
                }

                this.cln.strValor = this.tagInput.strValor;
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

        private atualizarStrValorDivTitulo(): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                if (Utils.getBooStrVazia(this.tagInput.strValor))
                {
                    this.divTitulo.jq.animate({ opacity: 0 }, 200);
                    return;
                }

                this.divTitulo.jq.animate({ opacity: 1 }, 200);
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

        private getCln(): ColunaWeb
        {
            // #region Variáveis

            var clnResultado: ColunaWeb;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return null;
                }

                clnResultado = new ColunaWeb(this.jq.attr("cln_nome"));
            }
            catch (ex)
            {
                throw ex;
            }
            finally
            {
            }
            // #endregion Ações

            return clnResultado;
        }

        private getTagInput(): Input
        {
            // #region Variáveis

            var strInputId: string;

            // #endregion Variáveis

            // #region Ações
            try
            {
                if (this.jq == null)
                {
                    return null;
                }

                strInputId = this.jq.find("input")[0].id;

                if (Utils.getBooStrVazia(strInputId))
                {
                    return null;
                }

                return new Input(strInputId);
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

        protected inicializar(): void
        {
            super.inicializar();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.tagInput.iniciar();

                this.atualizarStrValor();
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

        protected setEventos(): void
        {
            super.setEventos();

            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.tagInput.addEvtOnValorAlteradoListener(this);
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

        public validarDados(): boolean
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
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

        // #endregion Métodos

        // #region Eventos

        public onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void
        {
            // #region Variáveis
            // #endregion Variáveis

            // #region Ações
            try
            {
                this.atualizarStrValor();
            }
            catch (ex)
            {
                new Erro("Erro desconhecido.", ex);
            }
            finally
            {
            }
            // #endregion Ações
        }

        // #endregion Eventos
    }
}