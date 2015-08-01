
class AppWeb {
    constructor(strNome: string) { }

    private _strNome: string;

    public get strNome(): string {
        return this._strNome;
    }

    public set strNome(strNome: string) {
        this._strNome = strNome;
    }
}

var a = new AppWeb("teste");

a.strNome = "Teste 2";