module Web
{
    export interface OnMouseLeaveListener
    {
        onMouseLeave(tagSender: Tag, arg: JQueryMouseEventObject): void;
    }
}