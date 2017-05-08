module Web
{
    export interface OnWsErrorListenner
    {
        onWsError(srvWs: SrvWsBase, arg: Event): void;
    }
}