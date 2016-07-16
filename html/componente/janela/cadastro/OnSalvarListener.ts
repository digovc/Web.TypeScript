module NetZ_Web
{
    export interface OnSalvarListener
    {
        onSalvar(objSender: Object, arg: OnSalvarArg): void;
    }
}