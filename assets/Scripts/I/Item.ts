import Mng from "../M/Mng";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    @property(sp.Skeleton)
    public anim: sp.Skeleton;
    @property(cc.Collider)
    public col: cc.Collider;

    private check: boolean = false;

    public index: number;

    public Init(index: number) {
        this.col.tag = index;
        this.node.active = true;
        this.anim.skeletonData = Mng.mng.data.atlasItem[index];
        this.anim.setAnimation(0, "animation", true);
        this.check = false;
    }

    update(dt) {
        if (!this.check)
            this.node.setPositionY(this.node.position.y - dt * 300);
        else
            this.node.setPosition(cc.lerp(this.node.getPositionX(), Mng.mng.logic.player.node.getPositionX(), dt * 2), cc.lerp(this.node.getPositionY(), Mng.mng.logic.player.node.getPositionY(), dt * 5));
    }
    onCollisionEnter(other, self) {
        if (other.node.group == "Bottom") {
            this.node.active = false;
        }
        else if (other.node.group == "Magnet") {
            if (!this.check) {
                this.check = true;
            }
        }
    }
}
