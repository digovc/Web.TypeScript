module Web
{
    export interface OnTableRowClickListener
    {
        onTableRowClick(objSender: Object, tagTableRow: TableRow): void;
    }
}