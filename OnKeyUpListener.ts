module Web
{
    export interface OnKeyUpListener
    {
        onKeyUp(objSender: Objeto, arg: JQueryKeyEventObject): void;
    }
}