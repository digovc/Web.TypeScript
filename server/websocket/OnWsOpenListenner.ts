module NetZ_Web
{
    export interface OnWsOpenListenner
    {
        onWsOpen(srvWs: ServerWsBase, arg: Event): void;
    }
}