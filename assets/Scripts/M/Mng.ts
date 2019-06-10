import MngLogic from "./MngLogic";
import MngData from "./MngData";
import MngPool from "./MngPool";
import MngUI from "./MngUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Mng extends cc.Component {

    @property(MngLogic)
    public logic: MngLogic;
    @property(MngUI)
    public ui: MngUI;
    @property(MngPool)
    public pool: MngPool;
    @property(MngData)
    public data: MngData;

    public static mng: Mng;


    onLoad() {
        Mng.mng = this;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }
}
