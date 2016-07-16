module NetZ_Web
{
    export interface OnRowClickListener
    {
        onRowClick(objSender: Object, tagGridRow: GridRow): void;
    }
}