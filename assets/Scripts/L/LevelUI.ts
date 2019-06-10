import PlayerPrefs from "../P/PlayerPrefs";
import MngLogic from "../M/MngLogic";
import Loading from "./Loading";
import Home from "../H/Home";
import MngSound from "../M/MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelUI extends cc.Component {
    @property(cc.Label)
    public text: cc.Label;

    public index: number = 1;

    private isPlay: boolean;

    public Init(index: number) {

        this.index = index;
        this.text.string = (this.index + 1).toString();
        if (PlayerPrefs.GetNumber('LevelUnlock') >= this.index) {
            this.isPlay = true;
        }
        else {
            this.isPlay = false;
            this.node.color = cc.color(182, 179, 179, 255);
        }
    }

    public Play() {
        MngSound.mng.PlaySound(1);
        if (this.isPlay) {
            Home.mode = 0;
            MngLogic.indexLevel = this.index + 1;
            Loading.Load("Gameplay");
        }
    }
}
