module Web
{
    export interface OnMouseUpListener
    {
        onMouseUp(tagSender: Tag, arg: JQueryMouseEventObject): void;
    }
}