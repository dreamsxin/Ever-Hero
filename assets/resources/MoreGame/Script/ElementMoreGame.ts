import FbSdk from "../../../Scripts/FbSkd/FbSdk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ElementMoreGame extends cc.Component {

    @property(cc.Label)
    public nameGame: cc.Label;
    @property(cc.Sprite)
    public iconGame: cc.Sprite;

    private idGame: string;

    public Init(nameGame: string, idGame: string) {
        this.nameGame.string = nameGame;
        this.idGame = idGame;
        let self = this;
        cc.loader.loadRes("MoreGame/Icon/" + nameGame, cc.SpriteFrame, (err, sprite) => {
            self.iconGame.spriteFrame = sprite;
        });
    }
    public Swicth() {
        FbSdk.sdk.SwitchGame(this.idGame);
    }
}
