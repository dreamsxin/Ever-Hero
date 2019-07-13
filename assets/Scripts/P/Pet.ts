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
    private timeAttack: number[] = [0.3, 0.3, 0.3, 4];
    public index: number = -1;
    private target: cc.Node;

    start() {
        this.point = this.isLeft ? -120 : 120;
    }

    public Init() {
        this.index = PlayerPrefs.GetNumber("SelectPet" + (this.isLeft ? "Left" : "Right"));
        this.damageUpgrade = MngHero.dataPet[this.index].power[PlayerPrefs.GetNumber("LevelUpgradePet" + this.index)];
        this.spr.spriteFrame = Mng.mng.data.pet[this.index];
        this.node.active = true;
        this.unschedule(this.Shoot);
        this.schedule(this.Shoot, this.timeAttack[this.index]);
    }
    public ChangePet(index: number = this.index) {
        this.index = index;
        this.damageUpgrade = MngHero.dataPet[this.index].power[PlayerPrefs.GetNumber("LevelUpgradePet" + this.index)];
        this.spr.spriteFrame = Mng.mng.data.pet[this.index];
        this.node.active = true;
        this.unschedule(this.Shoot);
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
        if (this.target != null && this.target.active) {
            this.MathfRotation();
            let tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, this.angle);
            tmp.Shoot(10, 0.6, 15, 1 * this.damageUpgrade + Mng.mng.logic.player.petUpgrade);
        }
        this.target = null;
        this.angle = 0;
        this.col.enabled = true;
        this.checkEnemy.play();
    }
    private Shoot3() {
        let tmp = Mng.mng.pool.GetBulletPlayer(this.node.position, Mathf.Random(-5, 5.0));
        tmp.Shoot(11, 1, 10, 1 * this.damageUpgrade + Mng.mng.logic.player.petUpgrade);
    }
    private Shoot4() {
        this.laser.active = true;
    }
    onCollisionEnter(other) {
        if (this.target == null && other.node.group == "Enemy") {
            this.target = other.node;
            this.col.enabled = false;
        }
    }
    private MathfRotation() {
        if (this.target.name == "Enemy") {
            if (this.target.position != this.node.position) {
                if (this.target.y > this.node.y) {
                    if (this.target.x < this.node.x) {
                        this.angle = -Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI;
                    }
                    else {
                        this.angle = Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI;
                    }
                }
                else {
                    if (this.target.x > this.node.x) {
                        this.angle = -Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI + 180;
                    }
                    else {
                        this.angle = Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI + 180;
                    }
                }
            }
        }
        else {
            let position = this.target.parent.convertToWorldSpaceAR(this.target.position);
            let point = new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, position.y - Mng.mng.logic.player.halfHeight);
            if (point != this.node.position) {
                if (point.y > this.node.y) {
                    if (point.x < this.node.x) {
                        this.angle = -Math.atan(Math.abs((this.node.x - point.x) / (this.node.y - point.y))) * 180 / Math.PI;
                    }
                    else {
                        this.angle = Math.atan(Math.abs((this.node.x - point.x) / (this.node.y - point.y))) * 180 / Math.PI;
                    }
                }
                else {
                    if (point.x > this.node.x) {
                        this.angle = -Math.atan(Math.abs((this.node.x - point.x) / (this.node.y - point.y))) * 180 / Math.PI + 180;
                    }
                    else {
                        this.angle = Math.atan(Math.abs((this.node.x - point.x) / (this.node.y - point.y))) * 180 / Math.PI + 180;
                    }
                }
            }
        }
    }
}
