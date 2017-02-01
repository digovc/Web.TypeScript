module Web
{
    export interface OnKeyPressListener
    {
        onKeyPress(objSender: Object, arg: JQueryKeyEventObject): void;
    }
}