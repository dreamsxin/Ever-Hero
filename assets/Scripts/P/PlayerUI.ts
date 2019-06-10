import PlayerPrefs from "./PlayerPrefs";
import MngHero from "../M/MngHero";
import MngSound from "../M/MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerUI extends cc.Component {

    @property(cc.Node)
    public bg: cc.Node;
    @property(cc.Sprite)
    public avata: cc.Sprite;
    @property(cc.Node)
    public select: cc.Node;
    @property(cc.Animation)
    public warning: cc.Animation;
    @property(cc.Node)
    public check: cc.Node;


    public index: number = 0;

    onEnable() {
        if (this.index == 0 || PlayerPrefs.GetBool("Unlock" + this.index)) {
            if (PlayerPrefs.GetNumber("SelectPlayer") == this.index) {
                this.Select();
                this.check.active = true;
            }
            if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.index].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)]) {
                this.warning.node.active = true;
                this.warning.play();
            }
        }
        else {
            this.bg.color = cc.hexToColor("#8A8A8A");
            this.avata.node.color = cc.hexToColor("#8A8A8A");
            if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.index].price) {
                this.warning.node.active = true;
                this.warning.play();
            }
        }
    }
    public Select() {
        MngSound.mng.PlaySound(0);
        if (MngHero.mng.indexPlayer != this.index) {
            this.select.active = true;
            if (this.index == 0 || PlayerPrefs.GetBool("Unlock" + this.index)) {
                MngHero.mng.ShowPlayerUpgrade(this.index, true);
                if (PlayerPrefs.GetNumber("SelectPlayer") == this.index) {
                    MngHero.mng.buttonSelect.opacity = 150;
                }
                else {
                    MngHero.mng.buttonSelect.opacity = 255;
                }
                MngHero.mng.buttonUpgrade.active = true;
                MngHero.mng.buttonUnlock.active = false;
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.index].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)])
                    MngHero.mng.buttonUpgrade.opacity = 255;
                else
                    MngHero.mng.buttonUpgrade.opacity = 150;
            }
            else {
                MngHero.mng.ShowPlayerUnlock(this.index, true);
                MngHero.mng.buttonSelect.opacity = 150;
                MngHero.mng.buttonUpgrade.active = false;
                MngHero.mng.buttonUnlock.active = true;
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.index].price)
                    MngHero.mng.buttonUnlock.opacity = 255;
                else
                    MngHero.mng.buttonUnlock.opacity = 150;
            }
        }
    }
}
