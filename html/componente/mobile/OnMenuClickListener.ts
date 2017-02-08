module Web
{
    export interface OnMenuClickListener
    {
        onMenuClick(objSender: Object, arg: JQueryEventObject): void;
    }
}