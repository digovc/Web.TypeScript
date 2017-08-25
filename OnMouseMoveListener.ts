module Web
{
    export interface OnMouseMoveListener
    {
        onMouseMove(tagSender: Tag, arg: JQueryMouseEventObject): void;
    }
}