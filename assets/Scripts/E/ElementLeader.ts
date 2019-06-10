const { ccclass, property } = cc._decorator;

@ccclass
export default class ElementLeader extends cc.Component {
    @property(cc.Label)
    public rank: cc.Label;
    @property(cc.Label)
    public nickName: cc.Label;
    @property(cc.Label)
    public score: cc.Label;
    @property(cc.Sprite)
    public avata: cc.Sprite;
    @property(cc.Sprite)
    public rankImg: cc.Sprite;
    @property(cc.SpriteFrame)
    public rankSp: cc.SpriteFrame[] = new Array();;


    public Init(rank: string, nickName: string, score: string, url: string) {
        this.rank.string = rank;
        if (nickName.length > 10) {
            this.nickName.string = nickName.substring(0, 10) + "...";
        }
        else {
            this.nickName.string = nickName;
        }
        this.score.string = score;
        let seft = this;
        cc.loader.load(url, (err, tex) => {
            seft.avata.spriteFrame = new cc.SpriteFrame(tex);
        });
        if (Number(rank) < 2) {
            this.rankImg.node.active = true;
            this.rankImg.spriteFrame = this.rankSp[Number(rank) - 1];
        }
        else
            this.rankImg.node.active = false;
        this.node.active = true;
    }
}
