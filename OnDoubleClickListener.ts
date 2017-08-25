module Web
{
    export interface OnDoubleClickListener
    {
        onDoubleClick(tagSender: Tag, arg: JQueryEventObject): void;
    }
}