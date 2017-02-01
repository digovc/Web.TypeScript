module Web
{
    export interface OnTreeViewNodeClickListener
    {
        onTreeViewNodeClick(objSender: Object, tvn: TreeViewNode, arg: JQueryEventObject): void;
    }
}