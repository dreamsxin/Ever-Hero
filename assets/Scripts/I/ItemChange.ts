import Mng from "../M/Mng";
import Mathf from "../M/Mathf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemChange extends cc.Component {

    @property(sp.Skeleton)
    public anim: sp.Skeleton;
    @property(cc.Sprite)
    public icon: cc.Sprite;
    @property(cc.Collider)
    public col: cc.Collider;

    private check: boolean = false;

    public index: number;

    public Init() {
        do {
            this.index = Mathf.Random(0, 7);
        } while (this.index == Mng.mng.logic.player.index || this.index - 4 == Mng.mng.logic.player.pet[0].index || this.index - 4 == Mng.mng.logic.player.pet[1].index);

        this.col.tag = 6 + this.index;
        this.node.active = true;
        this.anim.setAnimation(0, "animation", true);
        this.icon.spriteFrame = Mng.mng.data.iconItemChange[this.index];
        this.icon.node.setContentSize(Mng.mng.data.sizeItemChange[this.index]);
        this.check = false;
    }

    update(dt) {
        // if (!this.check)
        this.node.setPositionY(this.node.position.y - dt * 300);
        // else
        //     this.node.setPosition(cc.lerp(this.node.getPositionX(), Mng.mng.logic.player.node.getPositionX(), dt * 2), cc.lerp(this.node.getPositionY(), Mng.mng.logic.player.node.getPositionY(), dt * 5));
    }
    onCollisionEnter(other, self) {
        if (other.node.group == "Bottom") {
            this.node.active = false;
        }
        // else if (other.node.group == "Magnet") {
        //     if (!this.check) {
        //         this.check = true;
        //     }
        // }
    }
}
