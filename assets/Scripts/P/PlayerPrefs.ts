const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerPrefs extends cc.Component {

    public static idGame: string = "588206904981553";

    public static GetNumber(key: string, defaultValue: number = 0): number {
        if (cc.sys.localStorage.getItem(key + this.idGame) == null || isNaN(cc.sys.localStorage.getItem(cc.sys.localStorage.getItem(key + this.idGame)))) {
            cc.sys.localStorage.setItem(key + this.idGame, defaultValue);
            return defaultValue;
        }
        else
            return Number(cc.sys.localStorage.getItem(key + this.idGame));
    }

    public static SetNumber(key: string, value: number) {
        cc.sys.localStorage.setItem(key + this.idGame, value);
    }

    public static GetBool(key: string, defaultValue: boolean = false): boolean {
        if (cc.sys.localStorage.getItem(key + this.idGame) == null) {
            cc.sys.localStorage.setItem(key + this.idGame, defaultValue);
            return defaultValue;
        }
        else
            return cc.sys.localStorage.getItem(key + this.idGame) == "true";
    }

    public static SetBool(key: string, value: boolean) {
        cc.sys.localStorage.setItem(key + this.idGame, value);
    }

    public static GetString(key: string, defaultValue: string = ""): string {
        if (cc.sys.localStorage.getItem(key + this.idGame) == null) {
            cc.sys.localStorage.setItem(key + this.idGame, defaultValue);
            return defaultValue;
        }
        else
            return cc.sys.localStorage.getItem(key + this.idGame);
    }

    public static SetString(key: string, value: string) {
        cc.sys.localStorage.setItem(key + this.idGame, value);
    }
}
