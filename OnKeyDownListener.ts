module Web
{
    export interface OnKeyDownListener
    {
        onKeyDown(objSender: Object, arg: JQueryKeyEventObject): void;
    }
}