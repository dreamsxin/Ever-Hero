import FbSdk from "../../../Scripts/FbSkd/FbSdk";
import ElementMoreGame from "./ElementMoreGame";
import PlayerPrefs from "../../../Scripts/P/PlayerPrefs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreGame extends cc.Component {

    @property(cc.Prefab)
    public element: cc.Prefab;

    @property(cc.Node)
    public buttonMoreGame: cc.Node;
    @property(ElementMoreGame)
    public gameDirector: ElementMoreGame;

    public static moreGame: MoreGame;
    private static data;

    private splash: cc.Node;
    private tab: cc.Node;
    private fbLocale: string = "";

    start() {
        MoreGame.moreGame = this;
        this.splash = this.node.getChildByName("Splash");
        this.tab = this.splash.getChildByName("Tab");
        if (MoreGame.data == null) {
            cc.loader.loadRes("MoreGame/Info", (err, data) => {
                MoreGame.data = data;
            })
        }
    }

    public LoadMoreGame() {
        this.splash.active = true;
        if (MoreGame.data == null) {
            cc.loader.loadRes("MoreGame/Info", (err, data) => {
                MoreGame.data = data;
                this.Load();
            });
        }
        else
            this.Load();
    }
    private Load() {
        let index = MoreGame.data.findIndex(e => e.id == PlayerPrefs.idGame && e.lg != null);
        let count = 0;
        let local = 390;
        if (index == -1) {
            for (let i = 0; i < MoreGame.data.length; i++) {
                if (MoreGame.data[i].id != PlayerPrefs.idGame) {
                    if (MoreGame.data[i].lg != null) {
                        if (this.fbLocale == "fr" && MoreGame.data[i].lg == FbSdk.sdk.fbLocale) {
                            this.GetElement(new cc.Vec2(-256 + 169 * (count % 4), local)).Init(MoreGame.data[i].name, MoreGame.data[i].id);
                            count++;
                            if (count % 4 == 0)
                                local -= 203;;
                        }
                        else if (this.fbLocale == "es" && MoreGame.data[i].lg == FbSdk.sdk.fbLocale) {
                            this.GetElement(new cc.Vec2(-256 + 169 * (count % 4), local)).Init(MoreGame.data[i].name, MoreGame.data[i].id);
                            count++;
                            if (count % 4 == 0)
                                local -= 203;;
                        }
                        else if (MoreGame.data[i].lg == "en") {
                            this.GetElement(new cc.Vec2(-256 + 169 * (count % 4), local)).Init(MoreGame.data[i].name, MoreGame.data[i].id);
                            count++;
                            if (count % 4 == 0)
                                local -= 203;;
                        }
                    }
                    else {
                        this.GetElement(new cc.Vec2(-256 + 169 * (count % 4), local)).Init(MoreGame.data[i].name, MoreGame.data[i].id);
                        count++;
                        if (count % 4 == 0)
                            local -= 203;;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < MoreGame.data.length; i++) {
                if (MoreGame.data[i].lg == null && MoreGame.data[i].id != PlayerPrefs.idGame) {
                    this.GetElement(new cc.Vec2(-256 + 169 * (count % 4), local)).Init(MoreGame.data[i].name, MoreGame.data[i].id);
                    count++;
                    if (count % 4 == 0)
                        local -= 203;;
                }
            }
        }
    }
    private GetElement(point: cc.Vec2): ElementMoreGame {
        let tmp = cc.instantiate(this.element);
        this.tab.addChild(tmp);
        tmp.setPosition(point);
        return tmp.getComponent(ElementMoreGame);
    }
    public TurnMoreGame() {
        if (FbSdk.sdk.fbPlatform != "IOS") {
            if (MoreGame.data.findIndex(e => e.id == PlayerPrefs.idGame && e.lg != null) >= 0) {
                let index = MoreGame.data.findIndex(e => e.id != PlayerPrefs.idGame && e.lg != null && e.lg == this.fbLocale);
                if (index == -1) {
                    this.buttonMoreGame.active = true;
                }
                else {
                    this.gameDirector.Init(MoreGame.data[index].name, MoreGame.data[index].id);
                    this.gameDirector.node.active = true;
                }
            }
            else {
                this.buttonMoreGame.active = true;
            }
        }
    }
    public Back() {
        this.splash.active = false;
    }
}
