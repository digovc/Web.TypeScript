module Web
{
    export interface OnWsErrorListenner
    {
        onWsOpen(srvWs: SrvWsBase, arg: Event): void;
    }
}