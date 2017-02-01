module Web
{
    export interface OnValorAlteradoListener
    {
        onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void;
    }
}