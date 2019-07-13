import Mathf from "./Mathf";
import Mng from "./Mng";
import MngLogic from "./MngLogic";
import Loading from "../L/Loading";
import PlayerPrefs from "../P/PlayerPrefs";
import Home from "../H/Home";
import MngSound from "./MngSound";
import FbSdk from "../FbSkd/FbSdk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngUI extends cc.Component {

    @property(cc.Label)
    public score: cc.Label;
    @property(cc.Label)
    public gold: cc.Label;
    @property(cc.Node)
    public victory: cc.Node;
    @property(cc.Label)
    public textTopVictory: cc.Label;
    @property(cc.Label)
    public scoreVictory: cc.Label;
    @property(cc.Label)
    public goldVictory: cc.Label;
    @property(cc.Node)
    public saveMe: cc.Node;
    @property(cc.Label)
    public scoreSaveMe: cc.Label;
    @property(cc.Label)
    public goldSaveMe: cc.Label;
    @property(cc.Node)
    public gameover: cc.Node;
    @property(cc.Label)
    public scoreGameover: cc.Label;
    @property(cc.Label)
    public goldGameover: cc.Label;
    @property(cc.Node)
    public pause: cc.Node;
    @property(cc.Label)
    public textWare: cc.Label;
    @property(cc.Animation)
    public textWareAnim: cc.Animation;
    @property(cc.Animation)
    public warningBoss: cc.Animation;
    @property(cc.Node)
    public pauseButton: cc.Node;

    private scoreVaule: number = 0;
    private goldVaule: number = 0;
    public enemyKill: number;

    public isWin: boolean;

    start() {
        if (Home.mode == 0 || Home.mode == 2)
            MngSound.mng.PlayMusic(Mathf.Random(1, 5));

        if (FbSdk.sdk.fbPlatform != "IOS" && FbSdk.sdk.fbPlatform != "ANDROID") {
            this.pauseButton.setPositionY(578);
            this.score.node.setPositionX(169);
        }
    }

    public SetScore(score: number) {
        this.scoreVaule += score;
        let s = "";
        let tmp = Mathf.Int(this.scoreVaule);
        let countZero = 9 - tmp.toString().length;
        for (let i = 0; i < countZero; i++)
            s += "0";
        s += tmp.toString();
        this.score.string = s;
    }
    public SetGold(gold: number) {
        this.goldVaule += gold;
        this.gold.string = this.goldVaule.toString().split(".")[0];
    }
    public Victory() {
        MngSound.mng.PlaySound(16);
        cc.director.pause();
        this.isWin = true;
        Mng.mng.logic.controlPlayer.active = false;
        this.victory.active = true;
        this.textTopVictory.string = "LEVEL " + MngLogic.indexLevel + "\nCOMPLETED";
        this.scoreVictory.string = this.scoreVaule.toString().split(".")[0];
        this.goldVictory.string = this.goldVaule.toString().split(".")[0];
        PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") + Number(this.goldVaule.toString().split(".")[0]));
        if (PlayerPrefs.GetNumber('LevelUnlock') < MngLogic.indexLevel) {
            PlayerPrefs.SetNumber('LevelUnlock', MngLogic.indexLevel);
        }
        this.scheduleOnce(() => {
            FbSdk.sdk.ShowInterstitial();
        }, 1);

        FbSdk.sdk.AddScoreLevel(MngLogic.indexLevel);
        FbSdk.sdk.LogEvent("UserLevel" + MngLogic.indexLevel);
    }
    public SaveMe() {
        cc.director.pause();
        this.saveMe.active = true;
        Mng.mng.logic.controlPlayer.active = false;
        this.scoreSaveMe.string = this.scoreVaule.toString().split(".")[0];
        this.goldSaveMe.string = this.goldVaule.toString().split(".")[0];
    }
    public Replay() {
        MngSound.mng.PlaySound(0);
        cc.director.resume();
        if (Home.mode == 2)
            MngLogic.indexLevel = 1;
        Loading.Load("Gameplay");
    }
    public WatchSaveMe() {
        MngSound.mng.PlaySound(0);
        FbSdk.sdk.ShowVideo(() => {
            cc.director.resume();
            this.saveMe.active = false;
            Mng.mng.logic.controlPlayer.active = true;
            Mng.mng.logic.player.InitBasic();
        });
    }
    public NoSaveMe() {
        MngSound.mng.PlaySound(0);
        this.saveMe.active = false;
        this.Gameover();
    }
    public Gameover() {
        MngSound.mng.PlaySound(15);
        this.gameover.active = true;
        this.scoreGameover.string = this.scoreVaule.toString().split(".")[0];
        this.goldGameover.string = this.goldVaule.toString().split(".")[0];
        PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") + Number(this.goldVaule.toString().split(".")[0]));
        this.scheduleOnce(() => {
            FbSdk.sdk.ShowInterstitial();
        }, 1);
        if (Home.mode == 1)
            FbSdk.sdk.AddScoreBoss(Number(this.scoreGameover.string));
        else if (Home.mode == 2)
            FbSdk.sdk.AddScoreEndless(Number(this.scoreGameover.string));
    }
    public NextLevel() {
        MngSound.mng.PlaySound(0);
        cc.director.resume();
        Loading.Load("Home");
    }
    public X2Gold(event, isGameover) {
        MngSound.mng.PlaySound(0);
        FbSdk.sdk.ShowVideo(() => {
            if (isGameover == 1) {
                this.goldGameover.string = (this.goldVaule * 2).toString();
            }
            else
                this.goldVictory.string = (this.goldVaule * 2).toString();
            PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") + this.goldVaule);
        });
    }
    public Pause() {
        MngSound.mng.PlaySound(0);
        cc.director.pause();
        this.pause.active = true;
    }
    public Resume() {
        MngSound.mng.PlaySound(0);
        cc.director.resume();
        this.pause.active = false;
    }
    public Map() {
        MngSound.mng.PlaySound(0);
        cc.director.resume();
        Loading.Load("Home");
    }
}
