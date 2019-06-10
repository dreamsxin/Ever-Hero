import Mng from "../M/Mng";
import Mathf from "../M/Mathf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletPlayer extends cc.Component {

    @property(cc.Sprite)
    public spr: cc.Sprite;

    public speed: number = 1;
    public damage: number = 1;
    public target: cc.Node;
    private tmpRotation: number;
    private index: number = -1;
    private isRocket: boolean = false;
    private dirRocket: number = 1;


    public Shoot(index: number, scale: number, speed: number, damage: number, isRocket: boolean = false) {
        if (index != this.index) {
            this.index = index;
            this.spr.spriteFrame = Mng.mng.data.spBulletPlayer[index];
            this.speed = speed;
            this.damage = damage;
            this.node.scale = scale;
            this.isRocket = isRocket;
        }
        else if (index == 0 || index == 1) {
            this.node.scale = scale;
        }
        if (isRocket)
            this.dirRocket = Mathf.Random(0, 100) > 50 ? 1 : -1;
        this.node.active = true;
    }
    update(dt) {
        if (!this.isRocket) {
            if (this.index == 0 || this.index == 1) {
                this.node.scale = this.node.scale + dt * 0.8;
            }
            this.tmpRotation = this.node.rotation * Math.PI / 180;
            this.node.setPosition(this.node.x + this.speed * Math.sin(this.tmpRotation), this.node.y + this.speed * Math.cos(this.tmpRotation));
        }
        else {
            let tmp = this.node.rotation * Math.PI / 180;
            this.node.setPosition(this.node.x + this.speed * Math.sin(tmp), this.node.y + this.speed * Math.cos(tmp));
            if (this.target.active) {
                tmp = this.MathfRotation() + this.dirRocket * 360;
                this.node.rotation = cc.lerp(this.node.rotation, tmp, 0.05);
            }

        }
    }
    onCollisionExit(other) {
        if (other.node.group == "Top" || other.node.group == "Bottom") {
            this.node.active = false;
        }
    }
    onDisable() {
        if (this.target != null)
            this.target = null;
    }
    private MathfRotation(): number {
        if (this.target.position != this.node.position) {
            if (this.target.y > this.node.y) {
                if (this.target.x < this.node.x) {
                    return -Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI;
                }
                else {
                    return Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI;
                }
            }
            else {
                if (this.target.x > this.node.x) {
                    return -Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI + 180;
                }
                else {
                    return Math.atan(Math.abs((this.node.x - this.target.x) / (this.node.y - this.target.y))) * 180 / Math.PI + 180;
                }
            }
        }
    }
}
