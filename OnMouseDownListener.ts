module Web
{
    export interface OnMouseDownListener
    {
        onMouseDown(objSender: Object, arg: JQueryMouseEventObject): void;
    }
}