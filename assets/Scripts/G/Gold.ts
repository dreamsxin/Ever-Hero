import Mathf from "../M/Mathf";
import Mng from "../M/Mng";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Gold extends cc.Component {

    @property(sp.Skeleton)
    public anim: sp.Skeleton;
    @property(cc.RigidBody)
    public rb: cc.RigidBody;


    private check: boolean = false;

    public Init() {
        this.node.active = true;
        this.anim.setAnimation(0, "animation", true);
        this.rb.type = cc.RigidBodyType.Dynamic;
        this.rb.linearVelocity = new cc.Vec2(Mathf.Random(-200, 200), Mathf.Random(0, 400));
        let scale = Mathf.Random(0.4, 0.6000000001);
        this.node.setScale(scale, scale);
        this.check = false;
    }
    update(dt) {
        if (this.check)
            this.node.setPosition(cc.lerp(this.node.getPositionX(), Mng.mng.logic.player.node.getPositionX(), dt * 2), cc.lerp(this.node.getPositionY(), Mng.mng.logic.player.node.getPositionY(), dt * 5));
    }
    onCollisionEnter(other, self) {
        if (other.node.group == "Bottom") {
            this.node.active = false;
        }
        else if (other.node.group == "Magnet") {
            if (!this.check) {
                this.check = true;
                this.rb.type = cc.RigidBodyType.Static;
            }
        }
    }
}
