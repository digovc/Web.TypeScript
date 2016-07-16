module NetZ_Web
{
    export interface OnClickListener
    {
        onClick(objSender: Object, arg: JQueryEventObject): void;
    }
}