module Web
{
    export interface OnDoubleClickListener
    {
        onDoubleClick(objSender: Object, arg: JQueryEventObject): void;
    }
}