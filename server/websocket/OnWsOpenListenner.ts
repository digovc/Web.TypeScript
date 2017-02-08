module Web
{
    export interface OnWsOpenListenner
    {
        onWsOpen(srvWs: SrvWsBase, arg: Event): void;
    }
}