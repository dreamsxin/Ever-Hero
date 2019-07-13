import Mng from "../M/Mng";
import Mathf from "../M/Mathf";
import PlayerPrefs from "./PlayerPrefs";
import MngHero from "../M/MngHero";
import MngSound from "../M/MngSound";
import Pet from "./Pet";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    public body: cc.Node;
    @property(cc.Node)
    public wingPlayer1: cc.Node[] = new Array();
    @property(cc.Animation)
    public anim: cc.Animation;
    @property(sp.Skeleton)
    public wing: sp.Skeleton;
    @property(cc.Animation)
    public magnet: cc.Animation;
    @property(sp.Skeleton)
    public effectShield: sp.Skeleton;
    @property(cc.Sprite)
    public hpFill: cc.Sprite;

    @property(Pet)
    public pet: Pet[] = new Array();


    public index: number = 0;
    public countBullet: number = 1;


    public checkPow: boolean = false;
    public halfWidth: number;
    public halfHeight: number;

    public timeAttack: number[] = [0.2, 0.15, 0.1, 0.2];

    private distancePre: cc.Vec2;
    public countBulletTmp: number = 0;
    public damageUpgrade: number = 0;
    public petUpgrade: number = 0;
    public coinUpgrade: number = 0;
    public tmpCount: number;
    private isShield: boolean = false;
    private hp: number = 5;
    private hpTmp: number = 5;
    private isPetLeft: boolean = true;


    start() {

        this.InitBasic();
        this.InitControl();
        this.InitShoot();
    }
    public InitBasic() {
        this.index = PlayerPrefs.GetNumber("SelectPlayer");
        this.damageUpgrade = MngHero.data[this.index].power[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.coinUpgrade = MngHero.data[this.index].coin[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.petUpgrade = MngHero.data[this.index].pet[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.anim.play("Player" + (this.index + 1));
        this.hp = this.hpTmp = MngHero.data[this.index].hp[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.hpFill.fillRange = 1;
        for (let i = 0; i < this.pet.length; i++) {
            if (!this.pet[i].node.active) {
                if (this.pet[i].index == -1 && PlayerPrefs.GetNumber("SelectPet" + (i == 0 ? "Left" : "Right"), -1) >= 0) {
                    this.pet[i].Init();
                    this.isPetLeft = (i != 0);
                }
                else if (this.pet[i].index > -1)
                    this.pet[i].ChangePet();
            }
        }
        this.isShield = true;
        this.effectShield.node.active = true;
        this.effectShield.setAnimation(0, "animation", true);
        this.unschedule(this.UnShield);
        this.scheduleOnce(this.UnShield, 5);
    }
    private ChangeHero(index: number) {
        this.index = index;
        this.hpTmp = MngHero.data[this.index].hp[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.damageUpgrade = MngHero.data[this.index].power[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.coinUpgrade = MngHero.data[this.index].coin[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.petUpgrade = MngHero.data[this.index].pet[PlayerPrefs.GetNumber("LevelUpgrade" + this.index)];
        this.anim.play("Player" + (this.index + 1));
        this.hpFill.fillRange = this.hp / this.hpTmp;
    }
    private InitControl() {
        this.halfWidth = cc.director.getWinSize().width / 2;
        this.halfHeight = cc.director.getWinSize().height / 2;
        Mng.mng.logic.controlPlayer.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
        Mng.mng.logic.controlPlayer.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove, this);
    }
    private TouchStart(touch) {
        this.distancePre = new cc.Vec2(touch.getLocation().x - this.halfWidth - this.node.x, touch.getLocation().y - this.halfHeight - this.node.y);
    }

    private TouchMove(touch) {
        let tmp = new cc.Vec2((touch.getLocation().x - this.distancePre.x) - this.halfWidth, (touch.getLocation().y - this.distancePre.y) - this.halfHeight);
        if (tmp.x > -this.halfWidth && tmp.x < this.halfWidth && tmp.y > -this.halfHeight && tmp.y < this.halfHeight)
            this.node.setPosition(new cc.Vec2((touch.getLocation().x - this.distancePre.x) - this.halfWidth, (touch.getLocation().y - this.distancePre.y) - this.halfHeight));
    }
    private InitShoot() {
        this.unschedule(this.Shoot);
        this.schedule(this.Shoot, this.timeAttack[this.index]);
    }
    private Shoot() {
        if (this.index == 0)
            this.ShootPlayer1();
        else if (this.index == 1)
            this.ShootPlayer2();
        else if (this.index == 2)
            this.ShootPlayer3();
        else if (this.index == 3)
            this.ShootPlayer4();
    }
    private ShootPlayer1() {
        let tmp;
        if (this.countBullet == 1) {
            tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 2) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 15, this.node.y), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 15, this.node.y), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 3) {
            tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 4) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 5) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 15, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 15, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 6) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 15), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 7) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 10, this.node.y + 15), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 10, this.node.y + 15), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 10), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 8) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 15), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 10), 0);
            tmp.Shoot(1, 0.6, 15, 1.5);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 10), 0);
            tmp.Shoot(1, 0.6, 15, 1.5);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 9) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 15, this.node.y + 20), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 15, this.node.y + 20), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 15), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 10), 7);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 9);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 15), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 10), -7);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -9);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 10) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 25), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 20), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 20), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 15), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 10), 7);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 9);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 15), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 10), -7);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -9);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 11) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 25), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 20), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 20), 0);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 15), 2.5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 15), 5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 10), 7);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y), 9);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 15), -5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 15), -2.5);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 10), -7);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y), -9);
            tmp.Shoot(0, 0.6, 15, 1 * this.damageUpgrade);
        }
    }
    private ShootPlayer2() {
        let tmp;
        if (this.countBullet == 1) {
            tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, 0);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 2) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 8, this.node.y), 2);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 8, this.node.y), -2);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 3) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y - 10), 0);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 8, this.node.y), 5);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 8, this.node.y), -5);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 4) {
            tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, 0);
            tmp.Shoot(3, 2, 13, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 5) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 8, this.node.y), 2);
            tmp.Shoot(3, 2, 13, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 8, this.node.y), -2);
            tmp.Shoot(3, 2, 13, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 6) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y), 0);
            tmp.Shoot(2, 1.5, 10, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 0.1, this.node.y), 5);
            tmp.Shoot(3, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 0.1, this.node.y), -5);
            tmp.Shoot(3, 2, 15, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 7) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y - 10), 0);
            tmp.Shoot(3, 2, 13, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 8, this.node.y), 5);
            tmp.Shoot(3, 2, 13, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 8, this.node.y), -5);
            tmp.Shoot(3, 2, 13, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 8) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 8, this.node.y), 2);
            tmp.Shoot(4, 2.5, 13, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 8, this.node.y), -2);
            tmp.Shoot(4, 2.5, 13, 2 * this.damageUpgrade);
        }
        else if (this.countBullet == 9) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y), 0);
            tmp.Shoot(2, 1.5, 15, 1);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 8, this.node.y), 5);
            tmp.Shoot(4, 2.5, 12, 2);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 8, this.node.y), -5);
            tmp.Shoot(4, 2.5, 12, 2);
        }
        else if (this.countBullet == 10) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y), 0);
            tmp.Shoot(3, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 0.1, this.node.y), -5);
            tmp.Shoot(4, 2.5, 13, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 0.1, this.node.y), 5);
            tmp.Shoot(4, 2.5, 13, 2 * this.damageUpgrade);
        }
        else if (this.countBullet == 11) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 0.1, this.node.y), 2.5);
            tmp.Shoot(3, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 0.1, this.node.y), -2.5);
            tmp.Shoot(3, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 0.1, this.node.y), -7);
            tmp.Shoot(4, 2.5, 13, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 0.1, this.node.y), 7);
            tmp.Shoot(4, 2.5, 13, 2 * this.damageUpgrade);
        }
    }
    private ShootPlayer3() {
        let tmp;
        if (this.countBullet == 1) {
            tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 2) {
            tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, 0);
            tmp.Shoot(6, 2, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 3) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 4) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(6, 2, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(6, 2, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 5) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 6) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 25), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 7) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 8) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 25), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 25), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 9) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(5, 1.5, 15, 1 * this.damageUpgrade);
        }
        else if (this.countBullet == 10) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 11) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y + 30), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25, this.node.y + 25), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55, this.node.y), 0);
            tmp.Shoot(6, 2, 15, 1.5 * this.damageUpgrade);
        }
    }
    private ShootPlayer4() {
        let tmp;
        if (this.countBullet == 1) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 2) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 25 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 25 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 3) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 40 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 40 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 4) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 40 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 40 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 5) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 40 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 40 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
        }
        else if (this.countBullet == 6) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
        }
        else if (this.countBullet == 7) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(7, 1, 18, 1.5 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
        }
        else if (this.countBullet == 8) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
        }
        else if (this.countBullet == 9) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 20 + Mathf.Random(-5, 5), this.node.y + 25), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 3 * this.damageUpgrade);
            if (Mathf.Random(0, 100) < 20) {
                tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 2);
                tmp.Shoot(9, 2, 25, 3);
                tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), -2);
                tmp.Shoot(9, 2, 25, 3);
            }
        }
        else if (this.countBullet == 10) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 20 + Mathf.Random(-5, 5), this.node.y + 55), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 20 + Mathf.Random(-5, 5), this.node.y + 55), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            if (Mathf.Random(0, 100) < 20) {
                tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 2);
                tmp.Shoot(9, 3, 25, 4 * this.damageUpgrade);
                tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), -2);
                tmp.Shoot(9, 3, 25, 4 * this.damageUpgrade);
            }
        }
        else if (this.countBullet == 11) {
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 20 + Mathf.Random(-5, 5), this.node.y + 55), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 20 + Mathf.Random(-5, 5), this.node.y + 55), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x, this.node.y), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), 0);
            tmp.Shoot(8, 1, 18, 2 * this.damageUpgrade);
            if (Mathf.Random(0, 100) < 40) {
                tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x - 55 + Mathf.Random(-5, 5), this.node.y), 2);
                tmp.Shoot(9, 3, 25, 4 * this.damageUpgrade);
                tmp = Mng.mng.pool.GetBulletPlayer(new cc.Vec2(this.node.x + 55 + Mathf.Random(-5, 5), this.node.y), -2);
                tmp.Shoot(9, 3, 25, 4 * this.damageUpgrade);
            }
        }
    }

    private Pow() {
        this.checkPow = false;
        this.wing.node.active = false;
        this.countBullet = Math.min(this.tmpCount + this.countBulletTmp, 10);
        this.InitShoot();
    }
    private Magnet() {
        this.magnet.node.active = false;
    }
    private UnShield() {
        MngSound.mng.PlaySound(19);
        this.effectShield.node.active = false;
        this.isShield = false;
    }
    public PlayPow() {
        if (!this.checkPow)
            this.tmpCount = this.countBullet;
        this.checkPow = true;
        this.countBulletTmp = 0;
        this.wing.node.active = true;
        this.wing.setAnimation(0, "animation", true);
        this.countBullet = 10;
        this.InitShoot();
        this.unschedule(this.Pow);
        this.scheduleOnce(this.Pow, 10);
    }
    public PlayMagnet() {
        this.magnet.node.active = true;
        this.magnet.play();
        this.unschedule(this.Magnet);
        this.scheduleOnce(this.Magnet, 10);
    }
    public PlayUpgrade() {
        if (!this.checkPow) {
            if (this.countBullet < 10) {
                this.countBullet++;
                this.InitShoot();
            }
        }
        else {
            this.countBulletTmp++;
        }
    }
    public PlayShield() {
        this.isShield = true;
        this.effectShield.node.active = true;
        this.effectShield.setAnimation(0, "animation", true);
        this.unschedule(this.UnShield);
        this.scheduleOnce(this.UnShield, 10);
    }
    public PlayHp() {
        if (this.hp + 1 >= this.hpTmp)
            this.hp = this.hpTmp;
        else
            this.hp += 1;
        this.hpFill.fillRange = this.hp / this.hpTmp;
    }

    onCollisionEnter(other) {
        if (other.node.group == "Enemy") {
            Mng.mng.pool.GetExEnemy(other.node.position).Play();
            this.GetHit(0.5);
            MngSound.mng.PlaySound(5);
            Mng.mng.logic.countEnemy--;
            other.node.active = false;
            if (!Mng.mng.logic.isRealBattle)
                if (Mng.mng.logic.countEnemy <= 0) {
                    Mng.mng.logic.GetWare();
                }
        }
        else if (other.node.group == "BulletEnemy") {
            let tmp = Mng.mng.pool.bulletEnemys[Mng.mng.pool.bulletEnemys.findIndex(b => b.node == other.node)];
            other.node.active = false;
            this.GetHit(tmp.damage);
        }
        else if (other.node.group == "Item") {
            other.node.active = false;
            if (other.tag == 0) {//Upgrade
                MngSound.mng.PlaySound(4);
                if (!this.checkPow) {
                    if (this.countBullet < 10) {
                        this.countBullet++;
                        // this.speedBullet = this.speedBulletUpgrade + (this.countBullet - 1) * 0.05;
                        this.InitShoot();
                    }
                }
                else {
                    this.countBulletTmp++;
                }
            }
            else if (other.tag == 1) {//Hp
                MngSound.mng.PlaySound(2);
                this.PlayHp();
            }
            else if (other.tag == 2) {//Magnet
                MngSound.mng.PlaySound(2);
                this.magnet.node.active = true;
                this.magnet.play();
                this.unschedule(this.Magnet);
                this.scheduleOnce(this.Magnet, 10);
            }
            else if (other.tag == 3) {//Pow
                MngSound.mng.PlaySound(2);
                if (!this.checkPow) {
                    this.tmpCount = this.countBullet;
                    this.wing.skeletonData = Mng.mng.data.wing[Mathf.Random(0, Mng.mng.data.wing.length - 1)];
                }
                this.checkPow = true;
                this.countBulletTmp = 0;
                this.wing.node.active = true;
                this.wing.setAnimation(0, "animation", true);
                this.countBullet = 11;
                // this.speedBullet = this.speedBulletUpgrade * 1.5;
                this.InitShoot();
                this.unschedule(this.Pow);
                this.scheduleOnce(this.Pow, 7);
            }
            else if (other.tag == 4) {//Shield
                MngSound.mng.PlaySound(18);
                this.isShield = true
                this.effectShield.node.active = true;
                this.effectShield.setAnimation(0, "animation", true);
                this.unschedule(this.UnShield);
                this.scheduleOnce(this.UnShield, 5);
            }
            else if (other.tag == 5) {//Gold
                MngSound.mng.PlaySound(1);
                Mng.mng.ui.SetGold(this.coinUpgrade);
            }
            else if (other.tag > 5 && other.tag <= 9) {//ChangeHero
                MngSound.mng.PlaySound(4);
                this.ChangeHero(Number(other.tag) - 6);
                this.InitShoot();
            }
            else if (other.tag >= 10 && other.tag <= 13) {//ChangePet
                MngSound.mng.PlaySound(4);
                if (this.isPetLeft)
                    this.pet[0].ChangePet(Number(other.tag) - 10);
                else
                    this.pet[1].ChangePet(Number(other.tag) - 10);
                this.isPetLeft = !this.isPetLeft;
            }
        }
    }
    public GetHit(damage: number) {
        if (!this.effectShield.node.active && !Mng.mng.ui.isWin) {
            if (this.index == 0 || this.index == 2)
                MngSound.mng.PlaySound(23);
            else
                MngSound.mng.PlaySound(24);
            this.schedule(this.OpacityPlayer, 0.3);
            this.scheduleOnce(this.UnOpacityPlayer, 2);
            this.hp -= damage;
            this.hpFill.fillRange = this.hp / this.hpTmp;
            if (this.hp <= 0) {
                MngSound.mng.PlaySound(17);
                for (let i = 0; i < this.pet.length; i++) {
                    if (this.pet[i].node.active)
                        this.pet[i].node.active = false;
                }
                Mng.mng.ui.SaveMe();
            }
        }
    }
    private checkOpacity: boolean;
    private OpacityPlayer() {
        if (!this.checkOpacity) {
            this.body.opacity = 150;
            if (this.index == 0)
                for (let i = 0; i < 2; i++) {
                    this.wingPlayer1[i].opacity = 150;
                }
        }
        else {
            this.body.opacity = 255;
            if (this.index == 0)
                for (let i = 0; i < 2; i++) {
                    this.wingPlayer1[i].opacity = 255;
                }
        }
        this.checkOpacity = !this.checkOpacity;
    }
    private UnOpacityPlayer() {
        this.unschedule(this.OpacityPlayer);
        this.body.opacity = 255;
        if (this.index == 0)
            for (let i = 0; i < 2; i++) {
                this.wingPlayer1[i].opacity = 255;
            }
    }
}
