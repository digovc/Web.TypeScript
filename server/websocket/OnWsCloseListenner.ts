module Web
{
    export interface OnWsCloseListenner
    {
        onWsClose(srvWs: SrvWsBase, arg: CloseEvent): void;
    }
}