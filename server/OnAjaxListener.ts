module NetZ_Web_TypeScript
{
    export interface OnAjaxListener
    {
        onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxSucessoArg): void;

        onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxErroArg): void;

        onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void;
    }
}