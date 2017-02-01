module Web
{
    export interface OnClickListener
    {
        onClick(objSender: Object, arg: JQueryEventObject): void;
    }
}