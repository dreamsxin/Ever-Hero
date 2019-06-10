import FbSdk from "../FbSkd/FbSdk";
import Home from "../H/Home";
import MngLogic from "./MngLogic";
import Loading from "../L/Loading";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngEndless extends cc.Component {

    @property(cc.Node)
    public content: cc.Node;

    start() {
        let isInTop = false;
        let indexRankPlayer = -1;
        FbSdk.sdk.GetRankWorldBoss((entries) => {
            this.content.setContentSize(100, 20 + 160 * entries.length);
            for (let i = 0; i < entries.length; i++) {
                let tmp = Home.mng.GetElement(this.content);
                tmp.node.position = new cc.Vec2(0, -90 - 160 * i);
                tmp.Init((i + 1).toString(), entries[i].getPlayer().getName(), entries[i].getScore(), entries[i].getPlayer().getPhoto());
                if (entries[i].getPlayer().getID() == FbSdk.sdk.fbId) {
                    indexRankPlayer = i;
                    isInTop = true;
                }
            }
            if (!isInTop) {
                indexRankPlayer = Math.min(100, entries.length);
                this.content.setContentSize(100, 20 + 160 * (indexRankPlayer + 1));
                FbSdk.sdk.GetRankPlayerBoss((entry) => {
                    let tmp = Home.mng.GetElement(this.content);
                    tmp.node.position = new cc.Vec2(0, -90 - 160 * indexRankPlayer);
                    tmp.Init(indexRankPlayer.toString(), entry.getPlayer().getName(), entry.getScore(), entry.getPlayer().getPhoto());
                });
            }
            if (indexRankPlayer > 3)
                this.scheduleOnce(() => {
                    let position = this.content.parent.convertToWorldSpaceAR(new cc.Vec2(0, -90 - 160 * indexRankPlayer));
                    let action = cc.moveTo(2, new cc.Vec2(0, -(position.y - cc.director.getWinSize().height / 2)));
                    this.content.runAction(action);
                }, 1);
        });
    }
    public Fight() {
        Loading.Load("Gameplay");
    }
}
