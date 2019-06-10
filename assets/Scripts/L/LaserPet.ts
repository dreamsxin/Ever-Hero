const { ccclass, property } = cc._decorator;

@ccclass
export default class LaserPet extends cc.Component {

    @property(cc.Animation)
    public anim: cc.Animation;

    onEnable() {
        this.anim.play();
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 3);
    }
}
