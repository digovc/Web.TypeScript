module NetZ_Web_TypeScript
{
    export interface OnAjaxListener
    {
        onAjaxAntesEnviar(objSolicitacaoAjaxSender: SolicitacaoAjax): void;

        onAjaxErroListener(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxErroArg): void;

        onAjaxSucesso(objSolicitacaoAjaxSender: SolicitacaoAjax, arg: OnAjaxSucessoArg): void;
    }
}