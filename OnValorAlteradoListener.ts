module Web
{
    export interface OnValorAlteradoListener
    {
        onValorAlterado(objSender: Objeto, arg: OnValorAlteradoArg): void;
    }
}