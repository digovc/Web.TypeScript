module Web
{
    export interface OnMouseOverListener
    {
        onMouseOver(tagSender: Tag, arg: JQueryMouseEventObject): void;
    }
}