module Web
{
    export interface OnKeyDownListener
    {
        onKeyDown(objSender: Objeto, arg: JQueryKeyEventObject): void;
    }
}