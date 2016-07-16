module NetZ_Web
{
    export interface OnValorAlteradoListener
    {
        onValorAlterado(objSender: Object, arg: OnValorAlteradoArg): void;
    }
}