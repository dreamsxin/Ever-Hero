const { ccclass, property } = cc._decorator;

@ccclass
export default class WarningEnemy extends cc.Component {

    @property(cc.Animation)
    public anim: cc.Animation;

    private target: cc.Node;

    public Init(target) {
        this.target = target;
        this.node.active = true;
        this.anim.play();
        // this.scheduleOnce(() => {
        //     this.node.active = false;
        // }, 1);
    }

    update(dt) {
        this.node.setPositionY(this.target.y);
    }
}
