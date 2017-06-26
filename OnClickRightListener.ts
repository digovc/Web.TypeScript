module Web
{
    export interface OnClickRightListener
    {
        onClickRight(tagSender: Tag, arg: JQueryMouseEventObject): void;
    }
}