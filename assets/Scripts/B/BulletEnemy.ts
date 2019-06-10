import Mng from "../M/Mng";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletEnemy extends cc.Component {


    @property(cc.Sprite)
    public spr: cc.Sprite;

    public damage: number;


    private speed: number;
    private type: number = 0;

    public Init(type: number, indexSprite: number, speed: number, damage: number) {
        this.spr.spriteFrame = Mng.mng.data.spBulletEnemy[indexSprite];
        this.speed = speed * 2;
        this.damage = damage;
        this.type = type;
        this.node.active = true;
    }
    update(dt) {
        if (this.type == 0) {
            this.node.setPosition(this.node.x, this.node.y - this.speed);
        }
        else if (this.type == 1) {
            let tmp = this.node.rotation * Math.PI / 180;
            this.node.setPosition(this.node.getPositionX() + dt * this.speed * Math.sin(tmp), this.node.getPositionY() + dt * this.speed * Math.cos(tmp));
        }
        else if (this.type == 2) {
            let tmp = this.node.rotation * Math.PI / 180;
            this.node.setPosition(this.node.getPositionX() + dt * this.speed * Math.sin(tmp), this.node.getPositionY() + dt * this.speed * Math.cos(tmp));
            if (this.node.position.y > Mng.mng.logic.player.node.position.y) {
                tmp = Math.atan((this.node.position.x - Mng.mng.logic.player.node.position.x) / (this.node.position.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (tmp < 0)
                    tmp += 360;
                else if (tmp > 360)
                    tmp -= 360;
                this.node.rotation = cc.lerp(this.node.rotation, tmp, 0.02 * (this.speed / 200));
            }
        }
    }
    onCollisionExit(other) {
        if (other.node.group == "Bottom") {
            this.node.active = false;
        }
    }
}
