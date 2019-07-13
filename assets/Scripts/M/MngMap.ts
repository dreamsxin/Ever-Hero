import LevelUI from "../L/LevelUI";
import PlayerPrefs from "../P/PlayerPrefs";
import FbSdk from "../FbSkd/FbSdk";
import AvataFriend from "../A/AvataFriend";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngMap extends cc.Component {
    @property(cc.Prefab)
    public levelUIPrefab: cc.Prefab;
    @property(cc.Prefab)
    public avataFriendPrefab: cc.Prefab;
    @property(cc.Node)
    public content: cc.Node;
    @property(cc.ScrollView)
    public scroll: cc.ScrollView;
    @property(cc.Sprite)
    public avata: cc.Sprite;
    @property(cc.Sprite)
    public bg: cc.Sprite[] = new Array();

    private listLevelUI: LevelUI[] = new Array();
    private countFriendInLevel: number[] = new Array();

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
            this.listLevelUI[i] = tmp.getComponent(LevelUI);
            this.listLevelUI[i].Init(i);
        }
        if (PlayerPrefs.GetNumber('LevelUnlock') > 4) {
            let position = this.content.parent.convertToWorldSpaceAR(new cc.Vec2(MngMap.data[PlayerPrefs.GetNumber('LevelUnlock')].x, MngMap.data[PlayerPrefs.GetNumber('LevelUnlock')].y));
            this.content.setPositionY(-(position.y - cc.director.getWinSize().height / 2));
        }
        let self = this;
        FbSdk.sdk.GetRankFriendLevel((entries) => {
            let count = new Array();
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].getPlayer().getID() != FbSdk.sdk.fbId) {
                    if (self.countFriendInLevel[Number(entries[i].getScore()) - 1] == null)
                        self.countFriendInLevel[Number(entries[i].getScore()) - 1] = 0;
                    self.countFriendInLevel[Number(entries[i].getScore()) - 1]++;
                    count[Number(entries[i].getScore()) - 1] = 0;
                }
            }
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].getPlayer().getID() != FbSdk.sdk.fbId) {
                    let tmp = cc.instantiate(self.avataFriendPrefab);
                    this.content.addChild(tmp);
                    tmp.setPosition(MngMap.data[Number(entries[i].getScore())].x, MngMap.data[Number(entries[i].getScore())].y);
                    if (tmp.x >= 248)
                        tmp.rotation = 180 + count[Number(entries[i].getScore()) - 1] * 45 - (self.countFriendInLevel[Number(entries[i].getScore()) - 1] - 1) * 22.5;
                    else
                        tmp.rotation = count[Number(entries[i].getScore()) - 1] * 45 - (self.countFriendInLevel[Number(entries[i].getScore()) - 1] - 1) * 22.5;
                    tmp.getComponent(AvataFriend).Init(entries[i].getPlayer().getPhoto());
                    count[Number(entries[i].getScore()) - 1]++;
                }
            }
            this.avata.node.parent.parent.parent = null;
            this.content.addChild(this.avata.node.parent.parent);
        });

        this.scroll.enabled = true;
        this.avata.node.parent.parent.parent = null;
        this.content.addChild(this.avata.node.parent.parent);
        this.avata.node.parent.parent.setPosition(MngMap.data[PlayerPrefs.GetNumber('LevelUnlock')].x, MngMap.data[PlayerPrefs.GetNumber('LevelUnlock')].y + 100);
        this.avata.node.parent.parent.active = true;
        if (FbSdk.sdk.fbAvatar != "")
            cc.loader.load(FbSdk.sdk.fbAvatar, (err, tex) => {
                this.avata.spriteFrame = new cc.SpriteFrame(tex);
            });
    }
}
