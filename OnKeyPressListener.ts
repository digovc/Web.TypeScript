module NetZ_Web
{
    export interface OnKeyPressListener
    {
        onKeyPress(objSender: Object, arg: JQueryKeyEventObject): void;
    }
}