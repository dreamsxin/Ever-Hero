import Mathf from "../M/Mathf";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Background extends cc.Component {
    @property
    public speed: number = 1;
    @property(cc.Sprite)
    public bg: cc.Sprite[] = new Array();

    public static bgSp1: cc.SpriteFrame[] = [null, null, null, null, null, null, null, null, null];
    public static bgSp2: cc.SpriteFrame[] = [null, null, null, null, null, null, null, null, null];

    start() {
        let index1 = Background.bgSp1.findIndex(e => e != null);
        let index2 = Background.bgSp2.findIndex(e => e != null);
        if (index1 > -1 && index2 > -1) {
            let indexBg;
            do {
                indexBg = Mathf.Random(1, 9);
            } while (Background.bgSp1[indexBg] == null || Background.bgSp2[indexBg] == null);
            this.bg[0].spriteFrame = Background.bgSp1[indexBg];
            this.bg[1].spriteFrame = Background.bgSp2[indexBg];
        }

        if (Background.bgSp1.findIndex(e => e == null) > -1 || Background.bgSp2.findIndex(e => e == null) > -1) {
            let indexBg;
            do {
                indexBg = Mathf.Random(1, 9);
            } while (Background.bgSp1[indexBg] != null && Background.bgSp2[indexBg] != null);
            if (Background.bgSp1[indexBg] == null)
                cc.loader.loadRes("Bg/bg_" + indexBg + "_1", cc.SpriteFrame, (err, sp) => {
                    Background.bgSp1[indexBg] = sp;

                });
            if (Background.bgSp2[indexBg] == null)
                cc.loader.loadRes("Bg/bg_" + indexBg + "_2", cc.SpriteFrame, (err, sp) => {
                    Background.bgSp2[indexBg] = sp;
                });
        }

    }

    update() {
        for (let i = 0; i < 2; i++) {
            this.bg[i].node.setPositionY(this.bg[i].node.y - this.speed);
            if (this.bg[i].node.y <= -2136) {
                if (i == 0)
                    this.bg[i].node.setPositionY(this.bg[1].node.y + 1440 - this.speed);
                else
                    this.bg[i].node.setPositionY(this.bg[0].node.y + 1440 - this.speed);
            }
        }
    }
}
