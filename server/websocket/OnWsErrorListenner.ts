module NetZ_Web
{
    export interface OnWsErrorListenner
    {
        onWsOpen(srvWs: ServerWsBase, arg: Event): void;
    }
}