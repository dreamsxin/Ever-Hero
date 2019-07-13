import PlayerPrefs from "../P/PlayerPrefs";
import MngSound from "../M/MngSound";
import MngLogic from "../M/MngLogic";
import Loading from "../L/Loading";
import MngHero from "../M/MngHero";
import MoreGame from "../../resources/MoreGame/Script/MoreGame";
import ElementLeader from "../E/ElementLeader";
import FbSdk from "../FbSkd/FbSdk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    @property(cc.Label)
    public coin: cc.Label;
    @property(cc.Animation)
    public animSetting: cc.Animation;
    @property(MoreGame)
    public moreGame: MoreGame;
    @property(cc.Node)
    public sound: cc.Node[] = new Array();
    @property(cc.Node)
    public music: cc.Node[] = new Array();
    @property(cc.Node)
    public buttonHome: cc.Node[] = new Array();
    @property(cc.Node)
    public tabHome: cc.Node[] = new Array();
    @property(cc.Animation)
    public warning: cc.Animation;
    @property(cc.Prefab)
    public elementLeader: cc.Prefab;

    public static mng: Home;
    public static mode: number = 0;

    onLoad() {
        Home.mng = this;
        // let s = 800;
        // let tmp = "800";
        // for (let i = 0; i < 19; i++) {
        //     s += Mathf.Random(0, 1000);
        //     tmp += "," + s;
        // }
        // console.log(tmp);
    }

    start() {
        if (PlayerPrefs.GetBool("Sound", true)) {
            this.sound[0].active = true;
            this.sound[1].active = false;
            MngSound.checkSound = true;
        }
        else {
            this.sound[0].active = false;
            this.sound[1].active = true;
            MngSound.checkSound = false;
        }

        if (PlayerPrefs.GetBool("Music", true)) {
            this.music[0].active = true;
            this.music[1].active = false;
            MngSound.mng.PlayMusic(0);
        }
        else {
            this.music[0].active = false;
            this.music[1].active = true;
        }
        // PlayerPrefs.SetNumber("Gold",3000);
        this.coin.string = PlayerPrefs.GetNumber("Gold").toString();
        if (MngLogic.infoPath == null) {
            cc.loader.loadRes("PathEnemy", (res, data) => {
                MngLogic.infoPath = data;
            });
        }
        if (MngHero.data == null) {
            cc.loader.loadRes("Hero", (err, info) => {
                MngHero.data = info;
                if (MngHero.dataPet == null) {
                    cc.loader.loadRes("Pet", (err, info) => {
                        MngHero.dataPet = info;
                        this.CheckWarningHero();
                    });
                }
                else
                    this.CheckWarningHero();
            });
        }
        else {
            if (MngHero.dataPet == null) {
                cc.loader.loadRes("Pet", (err, info) => {
                    MngHero.dataPet = info;
                    this.CheckWarningHero();
                });
            }
            else
                this.CheckWarningHero();
        }
        if (FbSdk.sdk.fbPlatform != "IOS") {
            this.buttonHome[4].parent.active = true;
        }
        else {
            for (let i = 0; i < 4; i++) {
                this.buttonHome[i].parent.setPositionX(180 * (i - 1.5));
                this.buttonHome[i].parent.setContentSize(175, 106.5);
            }
        }
    }

    public Sound() {
        if (MngSound.checkSound) {
            this.sound[0].active = false;
            this.sound[1].active = true;
            MngSound.checkSound = false;
            PlayerPrefs.SetBool("Sound", false);
        }
        else {
            this.sound[0].active = true;
            this.sound[1].active = false;
            MngSound.checkSound = true;
            MngSound.mng.PlaySound(0);
            PlayerPrefs.SetBool("Sound", true);
        }
    }
    public Music() {
        if (this.music[0].active) {
            this.music[0].active = false;
            this.music[1].active = true;
            MngSound.mng.PlaySound(0);
            cc.audioEngine.stop(MngSound.musicState);
            MngSound.musicState = null;
            PlayerPrefs.SetBool("Music", false);
        }
        else {
            this.music[0].active = true;
            this.music[1].active = false;
            MngSound.mng.PlaySound(0);
            PlayerPrefs.SetBool("Music", true);
            MngSound.mng.PlayMusic(0);
        }
    }
    private isSetting: boolean;
    public Setting() {
        MngSound.mng.PlaySound(0);
        if (!this.isSetting) {
            this.isSetting = true;
            this.animSetting.play("Show");
        }
        else {
            this.isSetting = false;
            this.animSetting.play("Hide");
        }
    }
    public SelectLevel() {
        MngSound.mng.PlaySound(0);
        if (this.buttonHome[2].opacity < 255) {
            this.buttonHome[2].opacity = 255;
            this.buttonHome[2].setScale(1.55);
            this.tabHome[2].active = true;

            for (let i = 0; i < 5; i++) {
                if (i == 2)
                    continue;
                else if (this.buttonHome[i].opacity == 255) {
                    this.buttonHome[i].opacity = 150;
                    this.buttonHome[i].setScale(1);
                    this.tabHome[i].active = false;
                }
            }
        }
    }
    public BossFight() {
        MngSound.mng.PlaySound(0);
        if (this.buttonHome[1].opacity < 255) {
            this.buttonHome[1].opacity = 255;
            this.buttonHome[1].setScale(1.55);
            this.tabHome[1].active = true;

            for (let i = 0; i < 5; i++) {
                if (i == 1)
                    continue;
                else if (this.buttonHome[i].opacity == 255) {
                    this.buttonHome[i].opacity = 150;
                    this.buttonHome[i].setScale(1);
                    this.tabHome[i].active = false;
                }
            }
            Home.mode = 1;
        }
    }
    public SelectHero() {
        MngSound.mng.PlaySound(0);
        if (this.buttonHome[0].opacity < 255) {
            this.buttonHome[0].opacity = 255;
            this.buttonHome[0].setScale(1.55);
            this.tabHome[0].active = true;

            for (let i = 0; i < 5; i++) {
                if (i == 0)
                    continue;
                else if (this.buttonHome[i].opacity == 255) {
                    this.buttonHome[i].opacity = 150;
                    this.buttonHome[i].setScale(1);
                    this.tabHome[i].active = false;
                }
            }
        }
    }
    public Endless() {
        MngSound.mng.PlaySound(0);
        if (this.buttonHome[3].opacity < 255) {
            this.buttonHome[3].opacity = 255;
            this.buttonHome[3].setScale(1.55);
            this.tabHome[3].active = true;

            for (let i = 0; i < 5; i++) {
                if (i == 3)
                    continue;
                else if (this.buttonHome[i].opacity == 255) {
                    this.buttonHome[i].opacity = 150;
                    this.buttonHome[i].setScale(1);
                    this.tabHome[i].active = false;
                }
            }
        }
        Home.mode = 2;
    }
    public MoreGame() {
        MngSound.mng.PlaySound(0);
        if (this.buttonHome[4].opacity < 255) {
            this.buttonHome[4].opacity = 255;
            this.buttonHome[4].setScale(1.55);
            this.moreGame.LoadMoreGame();
            for (let i = 0; i < 5; i++) {
                if (i == 4)
                    continue;
                else if (this.buttonHome[i].opacity == 255) {
                    this.buttonHome[i].opacity = 150;
                    this.buttonHome[i].setScale(1);
                    this.tabHome[i].active = false;
                }
            }
        }
    }
    public CheckWarningHero() {
        let isWarning = false;
        for (let i = 0; i < 4; i++) {
            if (i == 0 || PlayerPrefs.GetBool("Unlock" + i)) {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[i].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + i)])
                    isWarning = true;
            }
            else {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[i].price)
                    isWarning = true;
            }

            if (PlayerPrefs.GetBool("UnlockPet" + i)) {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[i].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + i)])
                    isWarning = true;
            }
            else {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[i].price)
                    isWarning = true;
            }
        }
        if (isWarning) {
            this.warning.node.active = true;
            this.warning.play();
        }
        else
            this.warning.node.active = false;
    }

    public GetElement(parent: cc.Node): ElementLeader {
        let tmp = cc.instantiate(this.elementLeader);
        parent.addChild(tmp);
        let enemy = tmp.getComponent(ElementLeader);
        return enemy;
    }
}
