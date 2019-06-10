import Mng from "../M/Mng";
import Mathf from "../M/Mathf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletPet extends cc.Component {

    @property(cc.Sprite)
    public spr: cc.Sprite[] = new Array();
    @property(cc.Collider)
    public col: cc.Collider[] = new Array();

    private speed: number = 1;
    public Shoot(damage: number, speed: number) {
        this.speed = speed;
        this.node.name = damage.toString();
        for (let i = 0; i < 2; i++) {
            this.spr[i].node.setPositionX(32.2 * (i == 0 ? -1 : 1));
        }
        this.node.rotation = Mathf.Random(0, 360);
        for (let i = 0; i < 2; i++) {
            if (!this.spr[i].node.active)
                this.spr[i].node.active = true;
        }

        this.node.active = true;
    }

    update(dt) {
        this.node.rotation = this.node.rotation + 2;
        this.node.setPosition(this.node.x, this.node.y + this.speed);
    }
    onCollisionExit(other) {
        if (other.node.group == "Top") {
            this.node.active = false;
        }
    }
}
