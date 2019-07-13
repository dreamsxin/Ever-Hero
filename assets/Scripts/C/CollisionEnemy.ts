import Enemy2 from "../E/Enemy2";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollisionEnemy extends cc.Component {

    @property(Enemy2)
    public parent: Enemy2;

    onCollisionEnter(other) {
        this.parent.CollisionEnter(other);
    }
    onCollisionExit(other) {
        this.parent.CollisionExit(other);
    }
}
