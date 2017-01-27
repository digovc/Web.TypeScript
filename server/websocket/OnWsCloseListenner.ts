module NetZ_Web
{
    export interface OnWsCloseListenner
    {
        onWsClose(srvWs: ServerWsBase, arg: CloseEvent): void;
    }
}