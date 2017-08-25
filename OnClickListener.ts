module Web
{
    export interface OnClickListener
    {
        onClick(objSender: Objeto, arg: JQueryEventObject): void;
    }
}