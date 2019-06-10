import LevelUI from "../L/LevelUI";
import PlayerPrefs from "../P/PlayerPrefs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngMap extends cc.Component {

    @property(cc.Prefab)
    public levelUIPrefab: cc.Prefab;
    @property(cc.Node)
    public content: cc.Node;
    @property(cc.ScrollView)
    public scroll: cc.ScrollView;
    @property(cc.Sprite)
    public bg: cc.Sprite[] = new Array();

    public static data;

    start() {
        // let tmp = this.node.getComponentsInChildren(LevelUI);
        // let s = "[";
        // for (let i = 0; i < tmp.length; i++) {
        //     s += "{ \"x\":" + tmp[i].node.x + ",\"y\":" + tmp[i].node.y + "},"
        // }
        // s += "]";
        // console.log(s);
        if (MngMap.data == null) {
            cc.loader.loadRes("LevelUI", (err, info) => {
                MngMap.data = info;
                this.Init();
            });
        }
        else
            this.Init();
        let self = this;
        for (let i = 0; i < this.bg.length; i++) {
            let tmp = i;
            cc.loader.loadRes("BgLevel/" + (tmp + 2), cc.SpriteFrame, (err, sp) => {
                self.bg[tmp].spriteFrame = sp;
            });
        }

    }
    private Init() {
        for (let i = 0; i < MngMap.data.length; i++) {
            let tmp = cc.instantiate(this.levelUIPrefab);
            this.content.addChild(tmp);
            tmp.setPosition(MngMap.data[i].x, MngMap.data[i].y);
            tmp.getComponent(LevelUI).Init(i);
        }
        if (PlayerPrefs.GetNumber('LevelUnlock') > 4) {
            let position = this.content.parent.convertToWorldSpaceAR(new cc.Vec2(MngMap.data[PlayerPrefs.GetNumber('LevelUnlock')].x, MngMap.data[PlayerPrefs.GetNumber('LevelUnlock')].y));
            this.content.setPositionY(-(position.y - cc.director.getWinSize().height / 2));
        }
        this.scroll.enabled = true;
    }
}
