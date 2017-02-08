module Web
{
    export interface OnMouseMoveListener
    {
        onMouseMove(objSender: Object, arg: JQueryMouseEventObject): void;
    }
}