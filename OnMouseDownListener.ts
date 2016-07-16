module NetZ_Web
{
    export interface OnMouseDownListener
    {
        onMouseDown(objSender: Object, arg: JQueryMouseEventObject): void;
    }
}