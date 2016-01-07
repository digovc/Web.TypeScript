module NetZ_Web_TypeScript
{
    export interface OnAjaxListener
    {
        onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, e: OnAjaxSucessoArg): void;

        onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, e: OnAjaxErroArg): void;

        onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void;
    }
}