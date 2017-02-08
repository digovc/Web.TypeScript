module Web
{
    export interface OnRowDoubleClickListener
    {
        onRowDoubleClick(objSender: Object, tagGridRow: GridRow): void;
    }
}