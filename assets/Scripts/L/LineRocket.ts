import Mng from "../M/Mng";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LineRocket extends cc.Component {

    @property(cc.Animation)
    public anim: cc.Animation;
    public Init(pointX) {
        this.node.setPosition(pointX, 0);
        this.node.active = true;
        this.anim.play();
        this.scheduleOnce(() => {
            this.node.active = false;
            Mng.mng.pool.GetRocket().Init(pointX);
        }, 1);
    }
}
