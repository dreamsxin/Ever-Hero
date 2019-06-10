import Mathf from "../M/Mathf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Effect extends cc.Component {

    @property
    public timeLife: number = 0;
    @property(cc.Animation)
    public anim: cc.Animation;

    Play() {
        this.node.rotation = Mathf.Random(0, 360);
        this.node.active = true;
        if (Mathf.Random(0, 100) < 60) {
            this.anim.play("ExEnemy1");
            this.timeLife = 0.88;
        }
        else {
            this.anim.play("ExEnemy2");
            this.timeLife = 1;
        }
        this.scheduleOnce(() => {
            this.node.active = false;
        }, this.timeLife);
    }
}
