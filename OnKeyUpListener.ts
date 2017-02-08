module Web
{
    export interface OnKeyUpListener
    {
        onKeyUp(objSender: Object, arg: JQueryKeyEventObject): void;
    }
}