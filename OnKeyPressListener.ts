module Web
{
    export interface OnKeyPressListener
    {
        onKeyPress(objSender: Objeto, arg: JQueryKeyEventObject): void;
    }
}