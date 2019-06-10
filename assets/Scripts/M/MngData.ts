const { ccclass, property } = cc._decorator;

@ccclass
export default class MngData extends cc.Component {

    @property(cc.SpriteFrame)
    public spEnemy: cc.SpriteFrame[] = new Array();
    @property(cc.SpriteFrame)
    public spBulletPlayer: cc.SpriteFrame[] = new Array();
    @property(cc.SpriteFrame)
    public spBulletEnemy: cc.SpriteFrame[] = new Array();
    @property(sp.SkeletonData)
    public atlasItem: sp.SkeletonData[] = new Array();
    @property(cc.SpriteFrame)
    public pet: cc.SpriteFrame[] = new Array();
    @property(cc.SpriteFrame)
    public spEnemy2: cc.SpriteFrame[] = new Array();
    @property(cc.SpriteFrame)
    public spRocket: cc.SpriteFrame[] = new Array();
    @property(sp.SkeletonData)
    public wing: sp.SkeletonData[] = new Array();
    @property(cc.SpriteFrame)
    public spBoss: cc.SpriteFrame[] = new Array();
}
