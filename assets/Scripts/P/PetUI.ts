import PlayerPrefs from "./PlayerPrefs";
import MngHero from "../M/MngHero";
import MngSound from "../M/MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PetUI extends cc.Component {

    @property(cc.Node)
    public bg: cc.Node;
    @property(cc.Sprite)
    public avata: cc.Sprite;
    @property(cc.Sprite)
    public iconLeftRight: cc.Sprite;
    @property(cc.Animation)
    public warning: cc.Animation;
    @property(cc.Node)
    public select: cc.Node;


    public index: number = 0;

    onEnable() {
        if (PlayerPrefs.GetNumber("SelectPetLeft", -1) == this.index || PlayerPrefs.GetNumber("SelectPetRight", -1) == this.index) {
            this.iconLeftRight.node.active = true;

            if (PlayerPrefs.GetNumber("SelectPetLeft", -1) == this.index) {
                this.iconLeftRight.spriteFrame = MngHero.mng.spLeftRight[0];
            }
            if (PlayerPrefs.GetNumber("SelectPetRight", -1) == this.index) {
                this.iconLeftRight.spriteFrame = MngHero.mng.spLeftRight[1];
            }
        }
        else if (this.iconLeftRight.node.active)
            this.iconLeftRight.node.active = false;
        if (PlayerPrefs.GetBool("UnlockPet" + this.index)) {
            let indexSelect = PlayerPrefs.GetNumber("SelectPet" + (MngHero.mng.isPetLeft ? "Left" : "Right"), -1);
            if (indexSelect > -1) {
                if (indexSelect == this.index) {
                    this.Select();
                }

            }
            else {
                if (PlayerPrefs.GetNumber("SelectPet" + (!MngHero.mng.isPetLeft ? "Left" : "Right"), -1) != 0 && this.index == 0) {
                    this.Select();
                }
                else if (MngHero.mng.indexPet == -1 && PlayerPrefs.GetNumber("SelectPet" + (!MngHero.mng.isPetLeft ? "Left" : "Right"), -1) != 1 && this.index == 1) {
                    this.Select();
                }
            }

            if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.index].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + this.index)]) {
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
            if (PlayerPrefs.GetNumber("SelectPet" + (MngHero.mng.isPetLeft ? "Left" : "Right"), -1) == -1) {
                if (PlayerPrefs.GetNumber("SelectPet" + (!MngHero.mng.isPetLeft ? "Left" : "Right"), -1) != 0 && this.index == 0) {
                    this.Select();
                }
                else if (MngHero.mng.indexPet == -1 && PlayerPrefs.GetNumber("SelectPet" + (!MngHero.mng.isPetLeft ? "Left" : "Right"), -1) != 1 && this.index == 1) {
                    this.Select();
                }
            }
        }
    }
    public Select() {
        MngSound.mng.PlaySound(0);
        if (MngHero.mng.indexPet != this.index) {
            this.select.active = true;
            if (PlayerPrefs.GetBool("UnlockPet" + this.index)) {
                MngHero.mng.ShowPetUpgrade(this.index, true);
                if (PlayerPrefs.GetNumber("SelectPet" + (MngHero.mng.isPetLeft ? "Left" : "Right"), -1) == this.index) {
                    MngHero.mng.buttonSelectPet.opacity = 150;
                }
                else {
                    MngHero.mng.buttonSelectPet.opacity = 255;
                }
                MngHero.mng.buttonUpgradePet.active = true;
                MngHero.mng.buttonUnlockPet.active = false;
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.index].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + this.index)])
                    MngHero.mng.buttonUpgradePet.opacity = 255;
                else
                    MngHero.mng.buttonUpgradePet.opacity = 150;
            }
            else {
                MngHero.mng.ShowPetUnlock(this.index, true);
                MngHero.mng.buttonSelectPet.opacity = 150;
                MngHero.mng.buttonUpgradePet.active = false;
                MngHero.mng.buttonUnlockPet.active = true;
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.index].price)
                    MngHero.mng.buttonUnlockPet.opacity = 255;
                else
                    MngHero.mng.buttonUnlockPet.opacity = 150;
            }
        }
    }
}
