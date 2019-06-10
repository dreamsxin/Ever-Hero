import Mng from "../M/Mng";
import Mathf from "../M/Mathf";
import Home from "../H/Home";
import MngSound from "../M/MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Boss extends cc.Component {

    @property(cc.Sprite)
    public spr: cc.Sprite;
    @property(cc.Sprite)
    public hpFill: cc.Sprite;

    public index: number = 0;
    public level: number = 0;
    ;
    public hp: number = 500;
    public hpTmp: number = 500;
    private isDie: boolean = false;

    onEnable() {
        this.index = Mathf.Random(0, 5);
        this.unscheduleAllCallbacks();
        this.hpFill.fillRange = 1;
        this.isDie = false;
        this.spr.spriteFrame = Mng.mng.data.spBoss[this.index];
        this.node.setPosition(0, 830);
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        let move = cc.moveTo(2, new cc.Vec2(0, 247));
        this.node.runAction(move);
        this.schedule(() => {
            let action = cc.moveTo(Mathf.Random(2.00001, 3), new cc.Vec2(Mathf.Random(-Mng.mng.logic.player.halfWidth + 150, Mng.mng.logic.player.halfWidth - 150), Mathf.Random(200, Mng.mng.logic.player.halfHeight)));
            this.node.runAction(action);
        }, Mathf.Random(2.00001, 4));
        this.TurnRealBattle(Mathf.Random(1.5, 3));
        this.Shoot();
    }
    private Shoot() {
        if (this.index == 0)
            this.Shoot1();
        else if (this.index == 1)
            this.Shoot2();
        else if (this.index == 2)
            this.Shoot3();
        else if (this.index == 3)
            this.Shoot4();
        else if (this.index == 4)
            this.Shoot5();
        else if (this.index == 5)
            this.Shoot6();
    }

    private Shoot1() {
        this.schedule(() => {
            if (Mng.mng.logic.player.node.x <= this.node.x + 100 && Mng.mng.logic.player.node.x >= this.node.x - 100) {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    // Đạn dải thẳng 2 hàng
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 0).Init(0, 7, 6, 1);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 0).Init(0, 7, 6, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    if (random < 500) {
                        random = Mathf.Random(0, 1000);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            this.scheduleOnce(() => {
                                MngSound.mng.PlaySound(20);
                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);

                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                            }, i * 0.2);
                        }
                    }
                    else {
                        random = Mathf.Random(0, 1000);
                        MngSound.mng.PlaySound(20);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 5, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 5, 400, 1);
                        }
                    }
                }
            }
            else {
                let random = Mathf.Random(0, 1000);
                let angle;
                if (this.node.y > Mng.mng.logic.player.node.position.y)
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                else
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (random < 500) {
                    random = Mathf.Random(0, 1000);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    MngSound.mng.PlaySound(20);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);

                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 5, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 5, 400, 1);
                    }
                }
            }
        }, 4 - this.level * 0.1);
        this.scheduleOnce(() => {
            this.schedule(() => {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    for (let i = 0; i < Mathf.Random(2, Math.min(2 + this.level, 5)); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            let point = new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110);
                            let rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            let tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 6, 400, 1);
                            point = new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110);
                            rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 6, 400, 1);;
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
                else {
                    for (let i = 0; i < 2; i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110), 0).Init(2, 8, 400, 1)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110), 0).Init(2, 8, 400, 1)
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
            }, 4 - this.level * 0.1);
        }, 2);
    }
    private Shoot2() {
        this.schedule(() => {
            if (Mng.mng.logic.player.node.x <= this.node.x + 100 && Mng.mng.logic.player.node.x >= this.node.x - 100) {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    // Đạn dải thẳng 2 hàng
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 0).Init(0, 11, 6, 1);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 0).Init(0, 11, 6, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    if (random < 500) {
                        random = Mathf.Random(0, 1000);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            this.scheduleOnce(() => {
                                MngSound.mng.PlaySound(20);
                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);

                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                            }, i * 0.2);
                        }
                    }
                    else {
                        random = Mathf.Random(0, 1000);
                        MngSound.mng.PlaySound(20);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 9, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 9, 400, 1);
                        }
                    }
                }
            }
            else {
                let random = Mathf.Random(0, 1000);
                let angle;
                if (this.node.y > Mng.mng.logic.player.node.position.y)
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                else
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (random < 500) {
                    random = Mathf.Random(0, 1000);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    MngSound.mng.PlaySound(20);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);

                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 9, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 9, 400, 1);
                    }
                }
            }
        }, 4 - this.level * 0.1);
        this.scheduleOnce(() => {
            this.schedule(() => {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    for (let i = 0; i < Mathf.Random(2, Math.min(2 + this.level, 5)); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            let point = new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110);
                            let rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            let tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 10, 400, 1);
                            point = new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110);
                            rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 10, 400, 1);;
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
                else {
                    for (let i = 0; i < 2; i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110), 0).Init(2, 12, 400, 1)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110), 0).Init(2, 12, 400, 1)
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
            }, 4 - this.level * 0.1);
        }, 2);
    }
    private Shoot3() {
        this.schedule(() => {
            if (Mng.mng.logic.player.node.x <= this.node.x + 100 && Mng.mng.logic.player.node.x >= this.node.x - 100) {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    // Đạn dải thẳng 2 hàng
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 0).Init(0, 15, 6, 1);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 0).Init(0, 15, 6, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    if (random < 500) {
                        random = Mathf.Random(0, 1000);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            this.scheduleOnce(() => {
                                MngSound.mng.PlaySound(20);
                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);

                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                            }, i * 0.2);
                        }
                    }
                    else {
                        random = Mathf.Random(0, 1000);
                        MngSound.mng.PlaySound(20);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 13, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 13, 400, 1);
                        }
                    }
                }
            }
            else {
                let random = Mathf.Random(0, 1000);
                let angle;
                if (this.node.y > Mng.mng.logic.player.node.position.y)
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                else
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (random < 500) {
                    random = Mathf.Random(0, 1000);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    MngSound.mng.PlaySound(20);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);

                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 13, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 13, 400, 1);
                    }
                }
            }
        }, 4 - this.level * 0.1);
        this.scheduleOnce(() => {
            this.schedule(() => {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    for (let i = 0; i < Mathf.Random(2, Math.min(2 + this.level, 5)); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            let point = new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110);
                            let rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            let tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 14, 400, 1);
                            point = new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110);
                            rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 14, 400, 1);;
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
                else {
                    for (let i = 0; i < 2; i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110), 0).Init(2, 16, 400, 1)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110), 0).Init(2, 16, 400, 1)
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
            }, 4 - this.level * 0.1);
        }, 2);
    }
    private Shoot4() {
        this.schedule(() => {
            if (Mng.mng.logic.player.node.x <= this.node.x + 100 && Mng.mng.logic.player.node.x >= this.node.x - 100) {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    // Đạn dải thẳng 2 hàng
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 0).Init(0, 19, 6, 1);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 0).Init(0, 19, 6, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    if (random < 500) {
                        random = Mathf.Random(0, 1000);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            this.scheduleOnce(() => {
                                MngSound.mng.PlaySound(20);
                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);

                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                            }, i * 0.2);
                        }
                    }
                    else {
                        random = Mathf.Random(0, 1000);
                        MngSound.mng.PlaySound(20);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 17, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 17, 400, 1);
                        }
                    }
                }
            }
            else {
                let random = Mathf.Random(0, 1000);
                let angle;
                if (this.node.y > Mng.mng.logic.player.node.position.y)
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                else
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (random < 500) {
                    random = Mathf.Random(0, 1000);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    MngSound.mng.PlaySound(20);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);

                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 17, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 17, 400, 1);
                    }
                }
            }
        }, 4 - this.level * 0.1);
        this.scheduleOnce(() => {
            this.schedule(() => {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    for (let i = 0; i < Mathf.Random(2, Math.min(2 + this.level, 5)); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            let point = new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110);
                            let rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            let tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 18, 400, 1);
                            point = new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110);
                            rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 18, 400, 1);;
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
                else {
                    for (let i = 0; i < 2; i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110), 0).Init(2, 20, 400, 1)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110), 0).Init(2, 20, 400, 1)
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
            }, 4 - this.level * 0.1);
        }, 2);
    }
    private Shoot5() {
        this.schedule(() => {
            if (Mng.mng.logic.player.node.x <= this.node.x + 100 && Mng.mng.logic.player.node.x >= this.node.x - 100) {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    // Đạn dải thẳng 2 hàng
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 0).Init(0, 23, 6, 1);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 0).Init(0, 23, 6, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    if (random < 500) {
                        random = Mathf.Random(0, 1000);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            this.scheduleOnce(() => {
                                MngSound.mng.PlaySound(20);
                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);

                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                            }, i * 0.2);
                        }
                    }
                    else {
                        random = Mathf.Random(0, 1000);
                        MngSound.mng.PlaySound(20);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 21, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 21, 400, 1);
                        }
                    }
                }
            }
            else {
                let random = Mathf.Random(0, 1000);
                let angle;
                if (this.node.y > Mng.mng.logic.player.node.position.y)
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                else
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (random < 500) {
                    random = Mathf.Random(0, 1000);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    MngSound.mng.PlaySound(20);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);

                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 21, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 21, 400, 1);
                    }
                }
            }
        }, 4 - this.level * 0.1);
        this.scheduleOnce(() => {
            this.schedule(() => {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    for (let i = 0; i < Mathf.Random(2, Math.min(2 + this.level, 5)); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            let point = new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110);
                            let rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            let tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 22, 400, 1);
                            point = new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110);
                            rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 22, 400, 1);;
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
                else {
                    for (let i = 0; i < 2; i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110), 0).Init(2, 24, 400, 1)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110), 0).Init(2, 24, 400, 1)
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
            }, 4 - this.level * 0.1);
        }, 2);
    }
    private Shoot6() {
        this.schedule(() => {
            if (Mng.mng.logic.player.node.x <= this.node.x + 100 && Mng.mng.logic.player.node.x >= this.node.x - 100) {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    // Đạn dải thẳng 2 hàng
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 0).Init(0, 27, 6, 1);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 0).Init(0, 27, 6, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    if (random < 500) {
                        random = Mathf.Random(0, 1000);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            this.scheduleOnce(() => {
                                MngSound.mng.PlaySound(20);
                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);

                                if (random < 250)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                                else if (random < 500)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);
                                else if (random < 750)
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);
                                else
                                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                            }, i * 0.2);
                        }
                    }
                    else {
                        random = Mathf.Random(0, 1000);
                        MngSound.mng.PlaySound(20);
                        for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), -(5 * i + 180)).Init(1, 25, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), 5 * i + 180).Init(1, 25, 400, 1);
                        }
                    }
                }
            }
            else {
                let random = Mathf.Random(0, 1000);
                let angle;
                if (this.node.y > Mng.mng.logic.player.node.position.y)
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                else
                    angle = Math.atan((this.node.x - Mng.mng.logic.player.node.position.x) / (this.node.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                if (random < 500) {
                    random = Mathf.Random(0, 1000);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);

                            if (random < 250)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                            else if (random < 500)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);
                            else if (random < 750)
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);
                            else
                                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                        }, i * 0.2);
                    }
                }
                else {
                    random = Mathf.Random(0, 1000);
                    MngSound.mng.PlaySound(20);
                    for (let i = 0; i < Math.min(3 + this.level, 8); i++) {
                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);

                        if (random < 250)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                        else if (random < 500)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);
                        else if (random < 750)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + -(5 * i + 180)).Init(1, 25, 400, 1);
                        else
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 56.5, this.node.position.y - 107.4), angle + 5 * i + 180).Init(1, 25, 400, 1);
                    }
                }
            }
        }, 4 - this.level * 0.1);
        this.scheduleOnce(() => {
            this.schedule(() => {
                let random = Mathf.Random(0, 1000);
                if (random < 500) {
                    for (let i = 0; i < Mathf.Random(2, Math.min(2 + this.level, 5)); i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            let point = new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110);
                            let rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            let tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 26, 400, 1);
                            point = new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110);
                            rotation = Math.atan((point.x - Mng.mng.logic.player.node.position.x) / (point.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                            tmp = Mng.mng.pool.GetBulletEnemy(point, rotation);
                            tmp.Init(1, 26, 400, 1);;
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
                else {
                    for (let i = 0; i < 2; i++) {
                        this.scheduleOnce(() => {
                            MngSound.mng.PlaySound(20);
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x + 169.6, this.node.position.y - 110), 0).Init(2, 28, 400, 1)
                            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(this.node.position.x - 169.6, this.node.position.y - 110), 0).Init(2, 28, 400, 1)
                        }, i * Mathf.Random(0.1, 0.5));
                    }
                }
            }, 4 - this.level * 0.1);
        }, 2);
    }
    onCollisionEnter(other) {
        if (other.node.group == "BulletPlayer" && !this.isDie) {
            let tmp = Mng.mng.pool.bulletPlayers[Mng.mng.pool.bulletPlayers.findIndex(b => b.node == other.node)];
            this.hp -= tmp.damage;
            Mng.mng.ui.SetScore(tmp.damage);
            other.node.active = false;
            if (!this.hpFill.node.parent.active)
                this.hpFill.node.parent.active = true;
            this.hpFill.fillRange = this.hp / this.hpTmp;
            if (Home.mode == 1 && Mathf.Random(0, 100) < 10)
                Mng.mng.logic.RandomItem(other.node.getPosition());
            if (Mathf.Random(0, 100) < 30) {
                MngSound.mng.PlaySound(3);
                Mng.mng.pool.GetExEnemy(other.node.position).Play();
            }

            if (this.hp <= 0) {
                MngSound.mng.PlaySound(21);
                Mng.mng.ui.SetScore(500 + Mathf.Random(1, 100));
                let countGold = Mathf.Random(50 + 50 * this.level, 100 + 50 * this.level);
                for (let i = 0; i < countGold; i++) {
                    this.scheduleOnce(() => {
                        Mng.mng.pool.GetGold(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Init();
                    }, Mathf.Random(0, 2.000001));
                }
                this.isDie = true;
                this.scheduleOnce(() => {
                    this.node.active = false;
                }, 0.5);
                for (let i = 0; i < 20; i++) {
                    this.scheduleOnce(() => {
                        Mng.mng.pool.GetExEnemy(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Play();
                    }, Mathf.Random(0, 2.000001));
                }
                if (Home.mode == 0)
                    Mng.mng.ui.Victory();
                else if (Home.mode == 1)
                    Mng.mng.logic.GetWare();
            }
        }
        else if (other.node.group == "BulletPet") {
            if (other.tag == 0) {
                if (this.hp > 0) {
                    let damage = 1;
                    this.hp -= damage;
                    Mng.mng.ui.SetScore(damage);
                    other.node.active = false;
                    if (!this.hpFill.node.parent.active)
                        this.hpFill.node.parent.active = true;
                    this.hpFill.fillRange = this.hp / this.hpTmp;
                    if (Mathf.Random(0, 100) < 30)
                        Mng.mng.pool.GetExEnemy(other.node.parent.position).Play();
                    if (this.hp <= 0) {
                        MngSound.mng.PlaySound(21);
                        Mng.mng.ui.SetScore(500 + Mathf.Random(1, 100));
                        let countGold = Mathf.Random(50 + 50 * this.level, 100 + 50 * this.level);
                        for (let i = 0; i < countGold; i++) {
                            this.scheduleOnce(() => {
                                Mng.mng.pool.GetGold(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Init();
                            }, Mathf.Random(0, 2.000001));
                        }
                        this.isDie = true;
                        this.scheduleOnce(() => {
                            this.node.active = false;
                        }, 0.5);
                        for (let i = 0; i < 20; i++) {
                            this.scheduleOnce(() => {
                                Mng.mng.pool.GetExEnemy(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Play();
                            }, Mathf.Random(0, 2.000001));
                        }
                        if (Home.mode == 0)
                            Mng.mng.ui.Victory();
                        else if (Home.mode == 1)
                            Mng.mng.logic.GetWare();
                    }
                }
            }
            else if (other.tag == 2 && !this.isHitLaser) {
                this.isHitLaser = true;
                this.schedule(this.HitLaser, 0.1);
            }
        }
    }
    private isHitLaser: boolean = false;
    private HitLaser() {
        if (this.hp > 0) {
            let damage = 0.1;
            this.hp -= damage;
            Mng.mng.ui.SetScore(damage);
            if (Mathf.Random(0, 100) < 5)
                Mng.mng.pool.GetExEnemy(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Play();
            if (this.hp <= 0) {
                MngSound.mng.PlaySound(21);
                Mng.mng.ui.SetScore(500 + Mathf.Random(1, 100));
                this.unscheduleAllCallbacks();
                this.node.stopAllActions();
                let countGold = Mathf.Random(50 + 50 * this.level, 100 + 50 * this.level);
                for (let i = 0; i < countGold; i++) {
                    this.scheduleOnce(() => {
                        Mng.mng.pool.GetGold(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Init();
                    }, Mathf.Random(0, 2.000001));
                }
                this.isDie = true;
                this.scheduleOnce(() => {
                    this.node.active = false;
                }, 0.5);
                for (let i = 0; i < 20; i++) {
                    this.scheduleOnce(() => {
                        Mng.mng.pool.GetExEnemy(new cc.Vec2(this.node.getPositionX() + Mathf.Random(-50, 50), this.node.getPositionY() + Mathf.Random(-50, 50))).Play();
                    }, Mathf.Random(0, 2.000001));
                }
                if (Home.mode == 0)
                    Mng.mng.ui.Victory();
                else if (Home.mode == 1)
                    Mng.mng.logic.GetWare();
            }
        }
    }
    onCollisionExit(other) {
        if (other.node.group == "BulletPet") {
            if (other.tag == 2 && this.isHitLaser) {
                this.isHitLaser = false;
                this.unschedule(this.HitLaser);
            }
        }
    }
    onDisable() {
        if (this.isHitLaser) {
            this.isHitLaser = false;
            this.unschedule(this.HitLaser);
            this.unscheduleAllCallbacks();
            this.node.stopAllActions();
        }
    }
    private indexEnemy: number[] = [5, 6, 8];
    public TurnRealBattle(time: number = 0) {
        if (Mng.mng.logic.player.node.active) {
            this.scheduleOnce(() => {
                let index = this.indexEnemy[Mathf.Random(0, 2)];
                if (index == 5) {
                    let count = Mathf.Random(1, 2);
                    for (let i = 0; i < count; i++) {
                        Mng.mng.pool.GetEnemy2().Init(index, new cc.Vec2(Mathf.Random(-296.0, 296), 633 + Mathf.Random(0, 50.0)));
                    }
                }
                else if (index == 6) {
                    let count = Mathf.Random(1, 2);
                    for (let i = 0; i < count; i++) {
                        Mng.mng.pool.GetEnemy2().Init(index, new cc.Vec2(Mathf.Random(-296.0, 296), 633 + Mathf.Random(0, 50.0)));
                    }
                }
                else if (index == 8) {
                    let count = Mathf.Random(1, 4);
                    let pointX = new Array();
                    let indexRandom;
                    for (let i = 0; i < count; i++) {
                        do {
                            indexRandom = Mathf.Random(-4, 4);
                        } while (pointX.findIndex(p => p == indexRandom) >= 0);
                        pointX[pointX.length] = indexRandom;
                        Mng.mng.pool.GetLineRocket().Init(indexRandom * 70);
                    }
                }
                this.TurnRealBattle(Mathf.Random(4.50000001, 8));
            }, time);
        }
    }
}
