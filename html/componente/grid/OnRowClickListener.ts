module Web
{
    export interface OnRowClickListener
    {
        onRowClick(objSender: Object, tagGridRow: GridRow): void;
    }
}