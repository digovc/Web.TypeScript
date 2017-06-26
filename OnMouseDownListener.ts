module Web
{
    export interface OnMouseDownListener
    {
        onMouseDown(tagSender: Tag, arg: JQueryMouseEventObject): void;
    }
}