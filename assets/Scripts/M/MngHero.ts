import PlayerUI from "../P/PlayerUI";
import PlayerPrefs from "../P/PlayerPrefs";
import Home from "../H/Home";
import PetUI from "../P/PetUI";
import MngSound from "./MngSound";
import FbSdk from "../FbSkd/FbSdk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngHero extends cc.Component {

    @property(cc.Prefab)
    public bgPrefab: cc.Prefab;
    @property(cc.Node)
    public bg: cc.Node;
    @property(cc.Sprite)
    public avataTabHero: cc.Sprite;
    @property(cc.Label)
    public nickname: cc.Label;
    @property(cc.Label)
    public levelUpgrade: cc.Label;
    @property(cc.Label)
    public powerUpgrade: cc.Label;
    @property(cc.Label)
    public coinUpgrade: cc.Label;
    @property(cc.Label)
    public powerPetUpgrade: cc.Label;
    @property(cc.Label)
    public sppedBulletUpgrade: cc.Label;
    @property(cc.Node)
    public tabHero: cc.Node;
    @property(cc.Sprite)
    public avataHero: cc.Sprite;
    @property(cc.Node)
    public tabPet: cc.Node;
    @property(cc.Sprite)
    public avataTabPet: cc.Sprite;
    @property(cc.Label)
    public nicknamePet: cc.Label;
    @property(cc.Label)
    public powerUpgradePet: cc.Label;
    @property(cc.Label)
    public levelUpgradePet: cc.Label;
    @property(cc.Sprite)
    public avataPetLeft: cc.Sprite;
    @property(cc.Sprite)
    public avataPetRight: cc.Sprite;
    @property(cc.Node)
    public avataPetGrayLeft: cc.Node;
    @property(cc.Node)
    public avataPetGrayRight: cc.Node;

    @property(cc.Node)
    public buttonSelect: cc.Node;
    @property(cc.Node)
    public buttonUpgrade: cc.Node;
    @property(cc.Node)
    public buttonUnlock: cc.Node;
    @property(cc.Label)
    public priceUpgrade: cc.Label;

    @property(cc.Node)
    public buttonSelectPet: cc.Node;
    @property(cc.Node)
    public buttonUpgradePet: cc.Node;
    @property(cc.Node)
    public buttonUnlockPet: cc.Node;
    @property(cc.Label)
    public priceUpgradePet: cc.Label;
    @property(cc.Label)
    public typePet: cc.Label;
    @property(cc.Animation)
    public warningHero: cc.Animation;
    @property(cc.Animation)
    public warningPetLeft: cc.Animation;
    @property(cc.Animation)
    public warningPetRight: cc.Animation;

    @property(cc.Sprite)
    public powerUpgradeFill: cc.Sprite[] = new Array();
    @property(cc.Sprite)
    public coinUpgradeFill: cc.Sprite[] = new Array();
    @property(cc.Sprite)
    public powerPetUpgradeFill: cc.Sprite[] = new Array();
    @property(cc.Sprite)
    public speedBulletUpgradeFill: cc.Sprite[] = new Array();
    @property(cc.Sprite)
    public powerUpgradeFillPet: cc.Sprite[] = new Array();
    @property(cc.Sprite)
    public levelUpgradeFillPet: cc.Sprite[] = new Array();
    @property(cc.SpriteFrame)
    public spLeftRight: cc.SpriteFrame[] = new Array();


    public isPetLeft: boolean;
    public playerUI: PlayerUI[] = new Array();
    public petUI: PetUI[] = new Array();


    public static data;
    public static dataPet;
    public static mng: MngHero;

    public indexPlayer: number = -1;
    public indexPet: number = -1;

    onLoad() {
        MngHero.mng = this;
        this.playerUI = this.tabHero.getComponentsInChildren(PlayerUI);
        this.petUI = this.tabPet.getComponentsInChildren(PetUI);
        if (MngHero.data == null) {
            cc.loader.loadRes("Hero", (err, info) => {
                MngHero.data = info;
                for (let i = 0; i < 4; i++) {
                    this.playerUI[i].index = i;
                    this.playerUI[i].node.active = true;
                }
                this.CheckWarningHeroStart();
            });
        }
        else {
            for (let i = 0; i < 4; i++) {
                this.playerUI[i].index = i;
                this.playerUI[i].node.active = true;
            }
            this.CheckWarningHeroStart();
        }
        if (MngHero.dataPet == null) {
            cc.loader.loadRes("Pet", (err, info) => {
                MngHero.dataPet = info;
                for (let i = 0; i < this.petUI.length; i++) {
                    this.petUI[i].index = i;
                    this.petUI[i].node.active = true;
                }
                this.CheckWarningPetStart();
            });
        }
        else {
            for (let i = 0; i < this.petUI.length; i++) {
                this.petUI[i].index = i;
                this.petUI[i].node.active = true;
            }
            this.CheckWarningPetStart();
        }
    }

    start() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                let tmp = cc.instantiate(this.bgPrefab);
                this.bg.addChild(tmp);
                let pointX = (2 * i + 1) * 54.42;
                let pointY = (2 * j + 1) * 54.42;
                tmp.setPosition(pointX, pointY);
                tmp = cc.instantiate(this.bgPrefab);
                this.bg.addChild(tmp);
                tmp.setPosition(-pointX, pointY);
                tmp = cc.instantiate(this.bgPrefab);
                this.bg.addChild(tmp);
                tmp.setPosition(pointX, -pointY);
                tmp = cc.instantiate(this.bgPrefab);
                this.bg.addChild(tmp);
                tmp.setPosition(-pointX, -pointY);
            }
        }
        let indexCurr = PlayerPrefs.GetNumber("SelectPlayer");
        this.avataHero.spriteFrame = this.playerUI[indexCurr].avata.spriteFrame;
        this.avataHero.node.setContentSize(this.playerUI[indexCurr].avata.node.getContentSize().width * 3, this.playerUI[indexCurr].avata.node.getContentSize().height * 3);
        this.avataHero.node.setPositionX(this.playerUI[indexCurr].avata.node.x * 1.875);

        let indexCurrLeft = PlayerPrefs.GetNumber("SelectPetLeft", -1);
        if (indexCurrLeft > -1) {
            this.avataPetGrayLeft.active = false;
            this.avataPetLeft.node.active = true;
            this.avataPetLeft.spriteFrame = this.petUI[indexCurrLeft].avata.spriteFrame;
            this.avataPetLeft.node.setContentSize(this.petUI[indexCurrLeft].avata.node.getContentSize().width * 1.22713130056005, this.petUI[indexCurrLeft].avata.node.getContentSize().height * 1.22713130056005);
            this.avataPetLeft.node.setPositionX(this.petUI[indexCurrLeft].avata.node.x * 1.22713130056005);
        }
        else {
            this.avataPetGrayLeft.active = true;
            this.avataPetLeft.node.active = false;
        }

        let indexCurrRight = PlayerPrefs.GetNumber("SelectPetRight", -1);
        if (indexCurrRight > -1) {
            this.avataPetGrayRight.active = false;
            this.avataPetRight.node.active = true;
            this.avataPetRight.spriteFrame = this.petUI[indexCurrRight].avata.spriteFrame;
            this.avataPetRight.node.setContentSize(this.petUI[indexCurrRight].avata.node.getContentSize().width * 1.22713130056005, this.petUI[indexCurrRight].avata.node.getContentSize().height * 1.22713130056005);
            this.avataPetRight.node.setPositionX(this.petUI[indexCurrRight].avata.node.x * 1.22713130056005);
        }
        else {
            this.avataPetGrayRight.active = true;
            this.avataPetRight.node.active = false;
        }
    }
    public TabHero() {
        MngSound.mng.PlaySound(0);
        this.tabHero.active = true;
        this.CheckWarningPlayer();
    }
    public ShowPlayerUpgrade(index: number, isClick: boolean = false) {
        if (isClick) {
            if (this.indexPlayer >= 0)
                this.playerUI[this.indexPlayer].select.active = false;
            this.indexPlayer = index;
        }

        this.avataTabHero.spriteFrame = this.playerUI[index].avata.spriteFrame;
        this.avataTabHero.node.setContentSize(this.playerUI[index].avata.node.getContentSize().width * 1.4, this.playerUI[index].avata.node.getContentSize().height * 1.4);
        this.avataTabHero.node.setPosition(this.playerUI[index].avata.node.x * 1.4, this.playerUI[index].avata.node.y * 1.4);
        this.nickname.string = MngHero.data[index].name;
        this.levelUpgrade.string = "LEVEL " + (PlayerPrefs.GetNumber("LevelUpgrade" + index) + 1) + "/" + MngHero.data[index].hp.length;
        this.powerUpgrade.string = "POWER " + (MngHero.data[index].power[PlayerPrefs.GetNumber("LevelUpgrade" + index)] * 100).toString().split(".")[0] + "->" + (MngHero.data[index].power[PlayerPrefs.GetNumber("LevelUpgrade" + index) + 1] * 100).toString().split(".")[0];
        this.coinUpgrade.string = "COINS " + (MngHero.data[index].coin[PlayerPrefs.GetNumber("LevelUpgrade" + index)] * 100).toString().split(".")[0] + "->" + (MngHero.data[index].coin[PlayerPrefs.GetNumber("LevelUpgrade" + index) + 1] * 100).toString().split(".")[0];
        this.powerPetUpgrade.string = "PET " + (MngHero.data[index].pet[PlayerPrefs.GetNumber("LevelUpgrade" + index)] * 100).toString().split(".")[0] + "->" + (MngHero.data[index].pet[PlayerPrefs.GetNumber("LevelUpgrade" + index) + 1] * 100).toString().split(".")[0];
        this.sppedBulletUpgrade.string = "HP " + MngHero.data[index].hp[PlayerPrefs.GetNumber("LevelUpgrade" + index)] + "->" + MngHero.data[index].hp[PlayerPrefs.GetNumber("LevelUpgrade" + index) + 1];
        for (let i = 0; i < 2; i++) {
            this.powerUpgradeFill[i].fillRange = MngHero.data[index].power[PlayerPrefs.GetNumber("LevelUpgrade" + index) + i] / MngHero.data[index].power[MngHero.data[index].power.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.coinUpgradeFill[i].fillRange = MngHero.data[index].coin[PlayerPrefs.GetNumber("LevelUpgrade" + index) + i] / MngHero.data[index].coin[MngHero.data[index].coin.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.powerPetUpgradeFill[i].fillRange = MngHero.data[index].pet[PlayerPrefs.GetNumber("LevelUpgrade" + index) + i] / MngHero.data[index].pet[MngHero.data[index].pet.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.speedBulletUpgradeFill[i].fillRange = MngHero.data[index].hp[PlayerPrefs.GetNumber("LevelUpgrade" + index) + i] / MngHero.data[index].hp[MngHero.data[index].hp.length - 1];
        }
        this.priceUpgrade.string = MngHero.data[index].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + index)].toString();
    }
    public ShowPlayerUnlock(index: number, isClick: boolean = false) {
        if (isClick) {
            if (this.indexPlayer >= 0)
                this.playerUI[this.indexPlayer].select.active = false;
            this.indexPlayer = index;
        }
        this.avataTabHero.spriteFrame = this.playerUI[index].avata.spriteFrame;
        this.avataTabHero.node.setContentSize(this.playerUI[index].avata.node.getContentSize().width * 1.4, this.playerUI[index].avata.node.getContentSize().height * 1.4);
        this.avataTabHero.node.setPosition(this.playerUI[index].avata.node.x * 1.4, this.playerUI[index].avata.node.y * 1.4);
        this.nickname.string = MngHero.data[index].name;
        this.levelUpgrade.string = "LEVEL " + (PlayerPrefs.GetNumber("LevelUpgrade" + index) + 1) + "/" + MngHero.data[index].hp.length;
        this.powerUpgrade.string = "POWER " + (MngHero.data[index].power[0] * 100).toString().split(".")[0];
        this.coinUpgrade.string = "COINS " + (MngHero.data[index].coin[0] * 100).toString().split(".")[0];
        this.powerPetUpgrade.string = "PET " + (MngHero.data[index].pet[0] * 100).toString().split(".")[0];
        this.sppedBulletUpgrade.string = "HP " + MngHero.data[index].hp[0];
        for (let i = 0; i < 2; i++) {
            this.powerUpgradeFill[i].fillRange = MngHero.data[index].power[0] / MngHero.data[index].power[MngHero.data[index].power.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.coinUpgradeFill[i].fillRange = MngHero.data[index].coin[0] / MngHero.data[index].coin[MngHero.data[index].coin.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.powerPetUpgradeFill[i].fillRange = MngHero.data[index].pet[0] / MngHero.data[index].pet[MngHero.data[index].pet.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.speedBulletUpgradeFill[i].fillRange = MngHero.data[index].hp[0] / MngHero.data[index].hp[MngHero.data[index].hp.length - 1];
        }
        this.priceUpgrade.string = MngHero.data[index].price.toString();
    }
    public Unlock() {
        MngSound.mng.PlaySound(0);
        if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.indexPlayer].price) {
            PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") - MngHero.data[this.indexPlayer].price);
            Home.mng.coin.string = PlayerPrefs.GetNumber("Gold").toString();
            PlayerPrefs.SetBool("Unlock" + this.indexPlayer, true);
            this.buttonSelect.opacity = 255;
            this.buttonUpgrade.active = true;
            this.buttonUnlock.active = false;
            this.ShowPlayerUpgrade(this.indexPlayer);
            this.playerUI[this.indexPlayer].bg.color = cc.hexToColor("#FFFFFF");
            this.playerUI[this.indexPlayer].avata.node.color = cc.hexToColor("#FFFFFF");
            this.CheckWarningPlayer();
            this.CheckWarningPet();
            Home.mng.CheckWarningHero();
            this.CheckWarningHeroStart();
            this.CheckWarningPetStart();
        }
    }
    public Select() {
        MngSound.mng.PlaySound(0);
        if (this.indexPlayer == 0 || PlayerPrefs.GetBool("Unlock" + this.indexPlayer)) {
            if (this.indexPlayer != PlayerPrefs.GetNumber("SelectPlayer")) {
                this.buttonSelect.opacity = 150;
                this.playerUI[PlayerPrefs.GetNumber("SelectPlayer")].check.active = false;
                this.playerUI[this.indexPlayer].check.active = true;
                PlayerPrefs.SetNumber("SelectPlayer", this.indexPlayer);
            }
        }
    }
    public Upgrade() {
        if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.indexPlayer].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + this.indexPlayer)]) {
            MngSound.mng.PlaySound(14);
            PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") - MngHero.data[this.indexPlayer].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + this.indexPlayer)]);
            Home.mng.coin.string = PlayerPrefs.GetNumber("Gold").toString();
            PlayerPrefs.SetNumber("LevelUpgrade" + this.indexPlayer, PlayerPrefs.GetNumber("LevelUpgrade" + this.indexPlayer) + 1);
            this.ShowPlayerUpgrade(this.indexPlayer);
            this.CheckWarningPlayer();
            this.CheckWarningPet();
            Home.mng.CheckWarningHero();
            this.CheckWarningHeroStart();
            this.CheckWarningPetStart();
        }
        else
            MngSound.mng.PlaySound(0);
    }
    private CheckWarningPlayer() {
        for (let i = 0; i < 4; i++) {
            if (i == 0 || PlayerPrefs.GetBool("Unlock" + i)) {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[i].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + i)]) {
                    this.playerUI[i].warning.node.active = true;
                    this.playerUI[i].warning.play();
                }
                else {
                    this.playerUI[i].warning.node.active = false;
                }
            }
            else {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[i].price) {
                    this.playerUI[i].warning.node.active = true;
                    this.playerUI[i].warning.play();
                } else {
                    this.playerUI[i].warning.node.active = false;
                }
            }
        }
    }
    public ExitTabHero() {
        MngSound.mng.PlaySound(0);
        this.tabHero.active = false;
        this.indexPlayer = -1;
        let indexCurr = PlayerPrefs.GetNumber("SelectPlayer");
        this.avataHero.spriteFrame = this.playerUI[indexCurr].avata.spriteFrame;
        this.avataHero.node.setContentSize(this.playerUI[indexCurr].avata.node.getContentSize().width * 3, this.playerUI[indexCurr].avata.node.getContentSize().height * 3);
        this.avataHero.node.setPositionX(this.playerUI[indexCurr].avata.node.x * 1.875);
    }
    public GetGoldAds(event, isHero) {
        MngSound.mng.PlaySound(0);
        FbSdk.sdk.ShowVideo(() => {
            PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") + 100);
            Home.mng.coin.string = PlayerPrefs.GetNumber("Gold").toString();
            this.CheckWarningPlayer();
            this.CheckWarningPet();
            Home.mng.CheckWarningHero();
            this.CheckWarningHeroStart();
            this.CheckWarningPetStart();
            if (isHero == "1")
                this.CheckActiceButtonPlayer();
            else
                this.CheckActiceButtonPet();
        })
    }

    public TabPet(event, isLeft) {
        MngSound.mng.PlaySound(0);
        this.isPetLeft = isLeft == "true";
        this.typePet.string = (this.isPetLeft ? "LEFT" : "RIGHT") + " PET";
        this.tabPet.active = true;
        this.CheckWarningPet();
    }
    public ShowPetUpgrade(index: number, isClick: boolean = false) {
        if (isClick) {
            if (this.indexPet >= 0)
                this.petUI[this.indexPet].select.active = false;
            this.indexPet = index;
        }

        this.avataTabPet.spriteFrame = this.petUI[index].avata.spriteFrame;
        this.avataTabPet.node.setContentSize(this.petUI[index].avata.node.getContentSize().width * 1.4, this.petUI[index].avata.node.getContentSize().height * 1.4);
        this.avataTabPet.node.setPosition(this.petUI[index].avata.node.x * 1.4, this.petUI[index].avata.node.y * 1.4);
        this.nicknamePet.string = MngHero.dataPet[index].name;
        this.levelUpgradePet.string = "LEVEL " + (PlayerPrefs.GetNumber("LevelUpgradePet" + index) + 1) + "->" + (PlayerPrefs.GetNumber("LevelUpgradePet" + index) + 2);
        this.powerUpgradePet.string = "POWER " + (MngHero.dataPet[index].power[PlayerPrefs.GetNumber("LevelUpgradePet" + index)] * 100).toString().split(".")[0] + "->" + (MngHero.dataPet[index].power[PlayerPrefs.GetNumber("LevelUpgradePet" + index) + 1] * 100).toString().split(".")[0];
        for (let i = 0; i < 2; i++) {
            this.powerUpgradeFillPet[i].fillRange = MngHero.dataPet[index].power[PlayerPrefs.GetNumber("LevelUpgradePet" + index) + i] / MngHero.dataPet[index].power[MngHero.dataPet[index].power.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.levelUpgradeFillPet[i].fillRange = (PlayerPrefs.GetNumber("LevelUpgradePet" + index) + i + 1) / MngHero.dataPet[index].power.length;
        }
        this.priceUpgradePet.string = MngHero.dataPet[index].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + index)].toString();
    }
    public ShowPetUnlock(index: number, isClick: boolean = false) {
        if (isClick) {
            if (this.indexPet >= 0)
                this.petUI[this.indexPet].select.active = false;
            this.indexPet = index;
        }
        this.avataTabPet.spriteFrame = this.petUI[index].avata.spriteFrame;
        this.avataTabPet.node.setContentSize(this.petUI[index].avata.node.getContentSize().width * 1.4, this.petUI[index].avata.node.getContentSize().height * 1.4);
        this.avataTabPet.node.setPosition(this.petUI[index].avata.node.x * 1.4, this.petUI[index].avata.node.y * 1.4);
        this.nicknamePet.string = MngHero.dataPet[index].name;
        this.levelUpgradePet.string = "LEVEL " + (PlayerPrefs.GetNumber("LevelUpgradePet" + index) + 1);
        this.powerUpgradePet.string = "POWER " + (MngHero.dataPet[index].power[0] * 100).toString().split(".")[0];
        for (let i = 0; i < 2; i++) {
            this.powerUpgradeFillPet[i].fillRange = MngHero.dataPet[index].power[0] / MngHero.dataPet[index].power[MngHero.dataPet[index].power.length - 1];
        }
        for (let i = 0; i < 2; i++) {
            this.levelUpgradeFillPet[i].fillRange = 1 / MngHero.dataPet[index].power.length;
        }
        this.priceUpgradePet.string = MngHero.dataPet[index].price.toString();
    }
    public UnlockPet() {
        MngSound.mng.PlaySound(0);
        if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.indexPet].price) {
            PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") - MngHero.dataPet[this.indexPet].price);
            Home.mng.coin.string = PlayerPrefs.GetNumber("Gold").toString();
            PlayerPrefs.SetBool("UnlockPet" + this.indexPet, true);
            this.buttonSelectPet.opacity = 255;
            this.buttonUpgradePet.active = true;
            this.buttonUnlockPet.active = false;
            this.ShowPetUpgrade(this.indexPet);
            this.petUI[this.indexPet].bg.color = cc.hexToColor("#FFFFFF");
            this.petUI[this.indexPet].avata.node.color = cc.hexToColor("#FFFFFF");
            this.CheckWarningPlayer();
            this.CheckWarningPet();
            Home.mng.CheckWarningHero();
            this.CheckWarningHeroStart();
            this.CheckWarningPetStart();
        }
    }
    public SelectPet() {
        MngSound.mng.PlaySound(0);
        if (PlayerPrefs.GetBool("UnlockPet" + this.indexPet)) {
            if (PlayerPrefs.GetNumber("SelectPet" + (this.isPetLeft ? "Left" : "Right"), -1) != this.indexPet) {
                this.buttonSelectPet.opacity = 150;
                if (this.isPetLeft) {
                    if (PlayerPrefs.GetNumber("SelectPetRight", -1) == this.indexPet) {
                        if (PlayerPrefs.GetNumber("SelectPetLeft", -1) > -1)
                            this.petUI[PlayerPrefs.GetNumber("SelectPetLeft")].iconLeftRight.spriteFrame = this.spLeftRight[1];
                        else
                            PlayerPrefs.SetNumber("SelectPetRight", -1);
                    }
                    else
                        if (PlayerPrefs.GetNumber("SelectPetLeft", -1) > -1) {
                            this.petUI[PlayerPrefs.GetNumber("SelectPetLeft")].iconLeftRight.node.active = false;
                        }
                    this.petUI[this.indexPet].iconLeftRight.spriteFrame = this.spLeftRight[0];
                    this.petUI[this.indexPet].iconLeftRight.node.active = true;
                    PlayerPrefs.SetNumber("SelectPetLeft", this.indexPet);
                }
                else {
                    if (PlayerPrefs.GetNumber("SelectPetLeft", -1) == this.indexPet) {
                        if (PlayerPrefs.GetNumber("SelectPetRight", -1) > -1)
                            this.petUI[PlayerPrefs.GetNumber("SelectPetRight")].iconLeftRight.spriteFrame = this.spLeftRight[0];
                        else
                            PlayerPrefs.SetNumber("SelectPetLeft", -1);
                    }
                    else
                        if (PlayerPrefs.GetNumber("SelectPetRight", -1) > -1) {
                            this.petUI[PlayerPrefs.GetNumber("SelectPetRight")].iconLeftRight.node.active = false;
                        }
                    this.petUI[this.indexPet].iconLeftRight.spriteFrame = this.spLeftRight[1];
                    this.petUI[this.indexPet].iconLeftRight.node.active = true;
                    PlayerPrefs.SetNumber("SelectPetRight", this.indexPet);
                }
            }
        }
    }
    public UpgradePet() {
        if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.indexPet].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + this.indexPet)]) {
            MngSound.mng.PlaySound(14);
            PlayerPrefs.SetNumber("Gold", PlayerPrefs.GetNumber("Gold") - MngHero.dataPet[this.indexPet].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + this.indexPet)]);
            Home.mng.coin.string = PlayerPrefs.GetNumber("Gold").toString();
            PlayerPrefs.SetNumber("LevelUpgradePet" + this.indexPet, PlayerPrefs.GetNumber("LevelUpgradePet" + this.indexPet) + 1);
            this.ShowPetUpgrade(this.indexPet);
            this.CheckWarningPlayer();
            this.CheckWarningPet();
            Home.mng.CheckWarningHero();
            this.CheckWarningHeroStart();
            this.CheckWarningPetStart();
        }
        else
            MngSound.mng.PlaySound(0);
    }
    private CheckWarningPet() {
        for (let i = 0; i < this.petUI.length; i++) {
            if (PlayerPrefs.GetBool("UnlockPet" + i)) {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[i].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + i)]) {
                    this.petUI[i].warning.node.active = true;
                    this.petUI[i].warning.play();
                }
                else {
                    this.petUI[i].warning.node.active = false;
                }
            }
            else {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[i].price) {
                    this.petUI[i].warning.node.active = true;
                    this.petUI[i].warning.play();
                } else {
                    this.petUI[i].warning.node.active = false;
                }
            }
        }
    }
    public ExitTabPet() {
        MngSound.mng.PlaySound(0);
        this.tabPet.active = false;
        this.petUI[this.indexPet].select.active = false;
        this.indexPet = -1;
        let indexCurrLeft = PlayerPrefs.GetNumber("SelectPetLeft", -1);
        if (indexCurrLeft > -1) {
            this.avataPetGrayLeft.active = false;
            this.avataPetLeft.node.active = true;
            this.avataPetLeft.spriteFrame = this.petUI[indexCurrLeft].avata.spriteFrame;
            this.avataPetLeft.node.setContentSize(this.petUI[indexCurrLeft].avata.node.getContentSize().width * 1.22713130056005, this.petUI[indexCurrLeft].avata.node.getContentSize().height * 1.22713130056005);
            this.avataPetLeft.node.setPositionX(this.petUI[indexCurrLeft].avata.node.x * 1.22713130056005);
        }
        else {
            this.avataPetGrayLeft.active = true;
            this.avataPetLeft.node.active = false;
        }

        let indexCurrRight = PlayerPrefs.GetNumber("SelectPetRight", -1);
        if (indexCurrRight > -1) {
            this.avataPetGrayRight.active = false;
            this.avataPetRight.node.active = true;
            this.avataPetRight.spriteFrame = this.petUI[indexCurrRight].avata.spriteFrame;
            this.avataPetRight.node.setContentSize(this.petUI[indexCurrRight].avata.node.getContentSize().width * 1.22713130056005, this.petUI[indexCurrRight].avata.node.getContentSize().height * 1.22713130056005);
            this.avataPetRight.node.setPositionX(this.petUI[indexCurrRight].avata.node.x * 1.22713130056005);
        }
        else {
            this.avataPetGrayRight.active = true;
            this.avataPetRight.node.active = false;
        }
    }
    private CheckWarningHeroStart() {
        let isWarning = false;
        for (let i = 0; i < 4; i++) {
            if (i == 0 || PlayerPrefs.GetBool("Unlock" + i)) {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[i].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + i)]) {
                    this.warningHero.node.active = true;
                    this.warningHero.play();
                    isWarning = true;
                }
            }
            else {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[i].price) {
                    this.warningHero.node.active = true;
                    this.warningHero.play();
                    isWarning = true;
                }
            }
        }
        if (!isWarning) {
            this.warningHero.node.active = false;
        }
    }
    private CheckWarningPetStart() {
        let isWarning = false;
        for (let i = 0; i < 4; i++) {
            if (PlayerPrefs.GetBool("UnlockPet" + i)) {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[i].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + i)]) {
                    this.warningPetLeft.node.active = true;
                    this.warningPetLeft.play();
                    this.warningPetRight.node.active = true;
                    this.warningPetRight.play();
                    isWarning = true;
                }
            }
            else {
                if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[i].price) {
                    this.warningPetLeft.node.active = true;
                    this.warningPetLeft.play();
                    this.warningPetRight.node.active = true;
                    this.warningPetRight.play();
                    isWarning = true;
                }
            }
        }
        if (!isWarning) {
            this.warningPetLeft.node.active = false;
            this.warningPetRight.node.active = false;
        }
    }
    private CheckActiceButtonPlayer() {
        if (this.indexPlayer == 0 || PlayerPrefs.GetBool("Unlock" + this.indexPlayer)) {
            if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.indexPlayer].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgrade" + this.indexPlayer)])
                MngHero.mng.buttonUpgrade.opacity = 255;
            else
                MngHero.mng.buttonUpgrade.opacity = 150;
        }
        else {
            if (PlayerPrefs.GetNumber("Gold") >= MngHero.data[this.indexPlayer].price)
                MngHero.mng.buttonUnlock.opacity = 255;
            else
                MngHero.mng.buttonUnlock.opacity = 150;
        }
    }
    private CheckActiceButtonPet() {
        if (PlayerPrefs.GetBool("UnlockPet" + this.indexPet)) {
            if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.indexPet].priceUpgrade[PlayerPrefs.GetNumber("LevelUpgradePet" + this.indexPet)])
                MngHero.mng.buttonUpgradePet.opacity = 255;
            else
                MngHero.mng.buttonUpgradePet.opacity = 150;
        }
        else {
            if (PlayerPrefs.GetNumber("Gold") >= MngHero.dataPet[this.indexPet].price)
                MngHero.mng.buttonUnlockPet.opacity = 255;
            else
                MngHero.mng.buttonUnlockPet.opacity = 150;
        }
    }
}
