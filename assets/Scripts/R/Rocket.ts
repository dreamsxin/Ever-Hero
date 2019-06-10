import Mng from "../M/Mng";
import Mathf from "../M/Mathf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rocket extends cc.Component {
    @property(cc.Sprite)
    public spr: cc.Sprite;

    public Init(pointX) {
        this.node.active = true;
        this.node.setPosition(pointX, 824);
        this.spr.spriteFrame = Mng.mng.data.spRocket[Mathf.Random(0, 1)];
    }

    update(dt) {
        this.node.setPositionY(this.node.y - 20);
    }
    onCollisionExit(other) {
        if (other.node.group == "Bottom") {
            this.node.active = false;
        }
    }
    onDisable(){
        Mng.mng.logic.countEnemy--;
    }
}
