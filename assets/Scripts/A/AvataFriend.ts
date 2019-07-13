const { ccclass, property } = cc._decorator;

@ccclass
export default class AvataFriend extends cc.Component {

    @property(cc.Sprite)
    public avata: cc.Sprite = null;


    public Init(urlAvata: string) {
        this.avata.node.parent.rotation = -this.node.rotation;

        cc.loader.load(urlAvata, (err, tex) => {
            this.avata.spriteFrame = new cc.SpriteFrame(tex);
        })
    }
}
