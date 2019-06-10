import MngLogic from "../M/MngLogic";
import Mng from "../M/Mng";
import Mathf from "../M/Mathf";
import MngSound from "../M/MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy2 extends cc.Component {

    @property(cc.Sprite)
    public spr: cc.Sprite;
    @property(cc.Sprite)
    public hpFill: cc.Sprite;
    @property(cc.Animation)
    public anim: cc.Animation;

    public path: cc.Vec2[] = new Array();
    public timeMove: number = 3;
    public dirMoveSin: number = 1;

    private speed: number = 100;
    private hp: number = 100;
    private index: number = 0;
    private timeAttack: number;
    private hpTmp: number = 100;
    private dir: number;
    private isDie: boolean;


    public Init(index: number, point: cc.Vec2 = this.path[0]) {
        this.isDie = false;
        this.index = index;
        if (!Mng.mng.logic.isAttackBoss)
            this.hpTmp = this.hp = Mng.mng.logic.hpEnemy + Mng.mng.logic.player.countBullet / 2;
        else
            this.hpTmp = this.hp = Mng.mng.logic.boss.level * 3;;
        this.speed = Mng.mng.logic.speed[index];
        if (Mng.mng.logic.isShoot[index]) {
            this.timeAttack = Mng.mng.logic.timeAttack[index];
            if (index == 3 || index == 7)
                this.Shoot1();
            else if (index == 4 || index == 8)
                this.Shoot2();
            else if (index == 5)
                this.Shoot3();
            else if (index == 6)
                this.Shoot4();
        }
        this.node.setPosition(point);
        if (this.hpFill.node.parent.active) {
            this.hpFill.node.parent.active = false;
            this.hpFill.fillRange = 1;
        }
        if (this.index == 0 || this.index == 1 || this.index == 2 || this.index == 3 || this.index == 4) {
            this.spr.node.rotation = 0;
            this.node.rotation = 0;
            this.spr.node.setPosition(0, 0);
            this.spr.node.active = true;
            this.node.active = true;
        }
        else if (this.index == 5 || this.index == 6) {
            this.dir = (Mathf.Random(-1.0, 1) > 0) ? 1 : -1;
            this.spr.node.setPosition(Mathf.Random(-120, 120), Mathf.Random(-120, 120));
            this.spr.node.active = true;
            this.node.active = true;
            this.schedule(() => {
                let action = cc.moveTo(Mathf.Random(2.0, 3), new cc.Vec2(Mathf.Random(-Mng.mng.logic.player.halfWidth + 50, Mng.mng.logic.player.halfWidth - 50), Mathf.Random(100, Mng.mng.logic.player.halfHeight - 200)));
                this.node.runAction(action);
            }, Mathf.Random(3.0, 4));
        }
        else if (this.index == 7 || this.index == 8) {
            this.node.rotation = 0;
            this.spr.node.rotation = 0;
            this.spr.node.setPosition(0, 0);
            this.spr.node.active = true;
            this.node.active = true;
            let action = cc.catmullRomTo(this.timeMove, this.path);
            this.node.runAction(action);
            this.scheduleOnce(() => {
                Mng.mng.logic.countEnemy--;
                this.unscheduleAllCallbacks();
                this.node.stopAllActions();
                this.node.active = false;
            }, this.timeMove);
        }
        this.spr.spriteFrame = Mng.mng.data.spEnemy2[index];
        let state = this.anim.play();
        state.speed = Mathf.Random(0.5, 1);
    }
    public InitPath(path: cc.Vec2[], time: number) {
        this.path = new Array();
        this.path = path;
        this.timeMove = time;
    }
    update(dt) {
        if (this.index <= 3) {
            let tmp = (this.node.rotation + 180) * Math.PI / 180;
            this.node.setPosition(this.node.getPositionX() + dt * this.speed * Math.sin(tmp), this.node.getPositionY() + dt * this.speed * Math.cos(tmp));
        }
        else if (this.index == 4) {
            this.node.setPosition(this.node.position.x + 0.02 * this.speed * this.dirMoveSin, this.node.position.y + Math.sin(this.node.position.x * Math.PI / 180) * 6);
        }
        else if (this.index == 5 || this.index == 6) {
            this.node.rotation = this.node.rotation + 0.02 * this.dir * this.speed;
            this.spr.node.rotation = -this.node.rotation;
        }
    }


    private Shoot1() {
        this.scheduleOnce(() => {
            if (Mathf.Random(0, 100) < 60) {
                MngSound.mng.PlaySound(Mathf.Random(6, 7));
                Mng.mng.pool.GetBulletEnemy(this.node.position, 0).Init(0, 1, 6, 1);
            }
            this.schedule(() => {
                if (Mathf.Random(0, 100) < 60) {
                    MngSound.mng.PlaySound(Mathf.Random(6, 7));
                    Mng.mng.pool.GetBulletEnemy(this.node.position, 0).Init(0, 1, 6, 1);
                }
            }, this.timeAttack);
        }, Mathf.Random(0.1, 1));
    }
    private Shoot2() {
        this.scheduleOnce(() => {
            if (Mathf.Random(0, 100) < 60) {
                MngSound.mng.PlaySound(Mathf.Random(6, 7));
                Mng.mng.pool.GetBulletEnemy(this.node.position, 0).Init(0, 2, 6, 1);
            }
            this.schedule(() => {
                if (Mathf.Random(0, 100) < 60) {
                    MngSound.mng.PlaySound(Mathf.Random(6, 7));
                    Mng.mng.pool.GetBulletEnemy(this.node.position, 0).Init(0, 2, 6, 1);
                }
            }, this.timeAttack);
        }, Mathf.Random(0.1, 1));
    }
    private Shoot3() {
        this.scheduleOnce(() => {
            let position = this.node.convertToWorldSpaceAR(this.spr.node.position);
            let rotation;
            let tmpPosition = new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, (position.y - Mng.mng.logic.player.halfHeight));
            if (tmpPosition.y > Mng.mng.logic.player.node.position.y)
                rotation = Math.atan((tmpPosition.x - Mng.mng.logic.player.node.position.x) / (tmpPosition.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
            else
                rotation = Math.atan((position.x - Mng.mng.logic.player.node.position.x) / (position.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, position.y - Mng.mng.logic.player.halfHeight), rotation).Init(1, 3, 400, 1);
            MngSound.mng.PlaySound(Mathf.Random(6, 7));
            this.scheduleOnce(() => {
                MngSound.mng.PlaySound(Mathf.Random(6, 7));
                position = this.node.convertToWorldSpaceAR(this.spr.node.position);
                rotation = rotation + Mathf.Random(-10, 10);
                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, position.y - Mng.mng.logic.player.halfHeight), rotation).Init(1, 3, 400, 1);
            }, 0.2);
            this.schedule(() => {
                let position = this.node.convertToWorldSpaceAR(this.spr.node.position);
                let rotation;
                let tmpPosition = new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, (position.y - Mng.mng.logic.player.halfHeight));
                if (tmpPosition.y > Mng.mng.logic.player.node.position.y)
                    rotation = Math.atan((tmpPosition.x - Mng.mng.logic.player.node.position.x) / (tmpPosition.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI + 180;
                else
                    rotation = Math.atan((position.x - Mng.mng.logic.player.node.position.x) / (position.y - Mng.mng.logic.player.node.position.y)) * 180 / Math.PI;
                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, position.y - Mng.mng.logic.player.halfHeight), rotation).Init(1, 3, 400, 1);
                MngSound.mng.PlaySound(Mathf.Random(6, 7));
                this.scheduleOnce(() => {
                    MngSound.mng.PlaySound(Mathf.Random(6, 7));
                    position = this.node.convertToWorldSpaceAR(this.spr.node.position);
                    rotation = rotation + Mathf.Random(-10, 10);
                    Mng.mng.pool.GetBulletEnemy(new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, position.y - Mng.mng.logic.player.halfHeight), rotation).Init(1, 3, 400, 1);
                }, 0.2);
            }, this.timeAttack);
        }, Mathf.Random(0.1, 0.5));
    }
    private Shoot4() {
        this.scheduleOnce(() => {
            let position = this.node.convertToWorldSpaceAR(this.spr.node.position);
            Mng.mng.pool.GetBulletEnemy(new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, (position.y - Mng.mng.logic.player.halfHeight)), 180 + Mathf.Random(-10, 10)).Init(2, 4, 400, 1);
            MngSound.mng.PlaySound(Mathf.Random(6, 7));
            this.schedule(() => {
                MngSound.mng.PlaySound(Mathf.Random(6, 7));
                let position = this.node.convertToWorldSpaceAR(this.spr.node.position);
                Mng.mng.pool.GetBulletEnemy(new cc.Vec2(position.x - Mng.mng.logic.player.halfWidth, (position.y - Mng.mng.logic.player.halfHeight)), 180 + Mathf.Random(-10, 10)).Init(2, 4, 400, 1);
            }, this.timeAttack);
        }, Mathf.Random(0.1, 0.5));
    }
    public Collision(other) {
        if (other.node.group == "BulletPlayer") {
            if (!this.isDie) {
                let tmp = Mng.mng.pool.bulletPlayers[Mng.mng.pool.bulletPlayers.findIndex(b => b.node == other.node)];
                this.hp -= tmp.damage;
                Mng.mng.ui.SetScore(tmp.damage);
                other.node.active = false;
                if (!this.hpFill.node.parent.active)
                    this.hpFill.node.parent.active = true;
                this.hpFill.fillRange = this.hp / this.hpTmp;
                if (this.hp <= 0) {
                    this.isDie = true;
                    Mng.mng.logic.countEnemy--;
                    MngSound.mng.PlaySound(3);
                    Mng.mng.pool.GetExEnemy(other.node.getPosition()).Play();
                    Mng.mng.logic.RandomItem(other.node.getPosition());
                    this.unscheduleAllCallbacks();
                    this.node.stopAllActions();
                    this.node.active = false;
                }
            }
        }
        else if (other.node.group == "BulletPet") {
            if (other.tag == 0) {
                if (this.hp > 0) {
                    let damage = 1;
                    this.hp -= damage;
                    Mng.mng.ui.SetScore(damage);
                    if (!this.hpFill.node.parent.active)
                        this.hpFill.node.parent.active = true;
                    this.hpFill.fillRange = this.hp / this.hpTmp;
                    other.node.active = false;
                    if (this.hp <= 0) {
                        let tmp = Mng.mng.pool.GetExEnemy(this.node.position);
                        tmp.Play();
                        MngSound.mng.PlaySound(3);
                        this.unscheduleAllCallbacks();
                        this.node.stopAllActions();
                        // if (Mathf.Random(0.0, 100) < percentDrop)
                        {
                            Mng.mng.logic.RandomItem(this.node.position);
                        }
                        Mng.mng.logic.countEnemy--;
                        this.node.active = false;
                    }
                }
            }
            else if (other.tag == 2 && !this.isHitLaser) {
                this.isHitLaser = true;
                this.schedule(this.HitLaser, 0.1);
            }
        }
        else if (other.node.group == "Bottom") {
            Mng.mng.logic.countEnemy--;
            this.node.active = false;
        }
        else if (other.node.group == "Left" || other.node.group == "Right") {
            if (this.index == 4) {
                Mng.mng.logic.countEnemy--;
                this.node.active = false;
            }

        }
    }
    private isHitLaser: boolean = false;
    private HitLaser() {
        if (this.hp > 0) {
            let damage = 0.1 + Mng.mng.logic.player.petUpgrade / 10;
            this.hp -= damage;
            Mng.mng.ui.SetScore(damage);
            if (!this.hpFill.node.parent.active)
                this.hpFill.node.parent.active = true;
            this.hpFill.fillRange = this.hp / this.hpTmp;
            if (this.hp <= 0) {
                let tmp = Mng.mng.pool.GetExEnemy(this.node.position);
                tmp.Play();
                MngSound.mng.PlaySound(3);
                this.unscheduleAllCallbacks();
                this.node.stopAllActions();
                // if (Mathf.Random(0.0, 100) < percentDrop)
                {
                    Mng.mng.logic.RandomItem(this.node.position);
                }
                Mng.mng.logic.countEnemy--;
                this.node.active = false;
            }
        }
    }
}
