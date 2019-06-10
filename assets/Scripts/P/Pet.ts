import Mng from "../M/Mng";
import PlayerPrefs from "../P/PlayerPrefs";
import Mathf from "../M/Mathf";
import MngHero from "../M/MngHero";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pet extends cc.Component {

    @property
    public isLeft: boolean = true;
    @property(cc.Sprite)
    public spr: cc.Sprite;
    @property(cc.Animation)
    public checkEnemy: cc.Animation;
    @property(cc.Collider)
    public col: cc.Collider;
    @property(cc.Node)
    public laser: cc.Node;

    private point: number;
    private damageUpgrade: number = 0;
    private speed: number[] = [8, 8];
    private timeAttack: number[] = [0.3, 0.3, 0.7, 4];
    private index: number;
    private targer: cc.Node;
    start() {
        this.index = PlayerPrefs.GetNumber("SelectPet" + (this.isLeft ? "Left" : "Right"));
        this.point = this.isLeft ? -120 : 120;
        this.damageUpgrade = MngHero.dataPet[this.index].power[PlayerPrefs.GetNumber("LevelUpgradePet" + this.index)];
        this.spr.spriteFrame = Mng.mng.data.pet[this.index];
        this.schedule(this.Shoot, this.timeAttack[this.index]);
    }

    update(dt) {
        this.node.position = new cc.Vec2(cc.lerp(this.node.x, Mng.mng.logic.player.node.x + this.point, dt * 15), cc.lerp(this.node.y, Mng.mng.logic.player.node.y - 30, dt * 15));
    }
    private Shoot() {
        if (this.index == 0) {
            this.Shoot1();
        }
        else if (this.index == 1) {
            this.Shoot2();
        }
        else if (this.index == 2) {
            this.Shoot3();
        }
        else if (this.index == 3) {
            this.Shoot4();
        }
    }
    private Shoot1() {
        let tmp = Mng.mng.pool.GetBulletPet(this.node.getPosition());
        tmp.Shoot(1 * this.damageUpgrade + Mng.mng.logic.player.petUpgrade, this.speed[0]);
    }
    private angle: number = 0;
    private Shoot2() {
        if (this.targer != null && this.targer.active) {
            this.MathfRotation();
        }
        else {
            this.targer = null;
            this.angle = 0;
            this.col.enabled = true;
            this.checkEnemy.play();
        }
        let tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, this.angle);
        tmp.Shoot(10, 0.6, 15, 1 * this.damageUpgrade + Mng.mng.logic.player.petUpgrade);
    }
    private Shoot3() {
        if (this.targer != null && this.targer.active) {
            let tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, Mathf.Random(0, 360));
            tmp.target = this.targer;
            tmp.Shoot(11, 1, 10, 1 * this.damageUpgrade + Mng.mng.logic.player.petUpgrade, true);
        }
        else {
            this.targer = null;
            this.col.enabled = true;
            this.checkEnemy.play();
        }

    }
    private Shoot4() {
        this.laser.active = true;
    }
    onCollisionEnter(other) {
        if (this.targer == null && other.node.group == "Enemy") {
            this.targer = other.node;
            this.col.enabled = false;
        }
    }
    private MathfRotation() {
        if (this.targer.position != this.node.position) {
            if (this.targer.y > this.node.y) {
                if (this.targer.x < this.node.x) {
                    this.angle = -Math.atan(Math.abs((this.node.x - this.targer.x) / (this.node.y - this.targer.y))) * 180 / Math.PI;
                }
                else {
                    this.angle = Math.atan(Math.abs((this.node.x - this.targer.x) / (this.node.y - this.targer.y))) * 180 / Math.PI;
                }
            }
            else {
                if (this.targer.x > this.node.x) {
                    this.angle = -Math.atan(Math.abs((this.node.x - this.targer.x) / (this.node.y - this.targer.y))) * 180 / Math.PI + 180;
                }
                else {
                    this.angle = Math.atan(Math.abs((this.node.x - this.targer.x) / (this.node.y - this.targer.y))) * 180 / Math.PI + 180;
                }
            }
        }
    }
}
