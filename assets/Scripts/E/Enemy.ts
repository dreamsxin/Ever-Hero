import Mng from "../M/Mng";
import Mathf from "../M/Mathf";
import MngHero from "../M/MngHero";
import PlayerPrefs from "../P/PlayerPrefs";
import MngSound from "../M/MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property(cc.Sprite)
    public spr: cc.Sprite;
    @property(cc.Animation)
    public anim: cc.Animation;

    public index: number = 0;
    public hp: number = 3;
    public timeAttack: number = 3;
    public percentDrop: number = 50;
    public point: number;
    public pointEnemy: cc.Vec2;

    public isDrop: boolean;
    public isLoop: boolean;
    public isFire: boolean;
    public isLoopPath: boolean;

    public timeLoop: number;
    public delayStartFire: number;
    public speedBullet: number = 1;
    public pointEnd: cc.Vec2;

    private posTmp: cc.Vec2;
    private rotation: number;
    private dirX: number = 1;
    private dirY: number = 1;
    // private pointPre: cc.Vec2 = new cc.Vec2(0, 0);

    private isRotation: boolean = false;

    private Shoot() {
        MngSound.mng.PlaySound(Mathf.Random(6, 7));
        Mng.mng.pool.GetBulletEnemy(this.node.position, 0).Init(0, 0, this.speedBullet, 1);
    }
    public MoveBegin(path: cc.Vec2[], delay: number, time: number, loop: boolean = false) {
        this.node.active = true;
        this.spr.spriteFrame = Mng.mng.data.spEnemy[this.index];

        let state = this.anim.play();
        state.speed = Mathf.Random(0.5, 1);
        this.isRotation = true;
        // this.schedule(this.MathfRotation, 0.05);
        if (this.isFire) {
            if (!this.isLoop) {
                this.scheduleOnce(this.Shoot, this.delayStartFire);
            }
            else {
                this.scheduleOnce(() => {
                    this.schedule(this.Shoot, this.timeLoop);
                }, this.delayStartFire);
            }
        }
        if (!loop) {
            this.scheduleOnce(() => {
                let action = cc.catmullRomTo(time, path);
                this.node.runAction(action);
                this.scheduleOnce(this.EndMove, time);
            }, delay);
        }
        else {
            this.scheduleOnce(() => {
                let action = cc.catmullRomTo(time, path);
                this.node.runAction(action);
            }, delay);
            this.schedule(() => {
                this.scheduleOnce(() => {
                    let action = cc.catmullRomTo(time, path);
                    this.node.runAction(action);
                }, delay);
            }, time + delay);
        }
    }
    private EndMove() {
        // this.unschedule(this.MathfRotation);
        this.isRotation = false;
        this.posTmp = this.node.position;
        Mng.mng.logic.countEnemyTmp--;
        if (Mng.mng.logic.countEnemyTmp <= 0) {
            this.scheduleOnce(() => {
                Mng.mng.logic.ChangeMoveEnemy();
            }, 1);
        }
        // let action = cc.rotateTo(0.2, 180);
        // this.node.runAction(action);
    }
    // private MathfRotation() {
    //     if (this.pointPre != this.node.position) {
    //         if (this.pointPre.y > this.node.y) {
    //             if (this.pointPre.x < this.node.x) {
    //                 this.rotation = -Math.atan(Math.abs((this.node.x - this.pointPre.x) / (this.node.y - this.pointPre.y))) * 180 / Math.PI + 180;
    //             }
    //             else {
    //                 this.rotation = Math.atan(Math.abs((this.node.x - this.pointPre.x) / (this.node.y - this.pointPre.y))) * 180 / Math.PI + 180;
    //             }
    //         }
    //         else {
    //             if (this.pointPre.x > this.node.x) {
    //                 this.rotation = -Math.atan(Math.abs((this.node.x - this.pointPre.x) / (this.node.y - this.pointPre.y))) * 180 / Math.PI;
    //             }
    //             else {
    //                 this.rotation = Math.atan(Math.abs((this.node.x - this.pointPre.x) / (this.node.y - this.pointPre.y))) * 180 / Math.PI;
    //             }
    //         }
    //     }
    //     this.node.rotation = this.rotation;
    //     this.pointPre = this.node.position;
    // }
    public ChangeMove(index: number) {
        if (index == 2) {
            if (this.pointEnemy.x % 2 == 0)
                this.dirX = -1;
            else
                this.dirX = 1;
        }
        else if (index == 3) {
            if (this.pointEnemy.y % 2 == 0)
                this.dirX = -1;
            else
                this.dirX = 1;
        }
        else if (index == 4) {
            this.dirX = 1;
            this.dirY = 1;
        }
        else if (index == 5) {
            if (this.pointEnemy.y % 2 == 0) {
                this.dirX = -1;
                this.dirY = -1;
            }
            else {
                this.dirX = 1;
                this.dirY = 1;
            }
        }
        else if (index == 6) {
            if (this.pointEnemy.x % 2 == 0) {
                this.dirX = -1;
                this.dirY = 1;
            }
            else {
                this.dirX = 1;
                this.dirY = -1;
            }
        }
        else if (index == 7) {
            if (this.pointEnemy.x % 2 == 0 && this.pointEnemy.y % 2 == 0) {
                this.dirX = -1;
                this.dirY = -1;
            }
            else {
                this.dirX = 1;
                this.dirY = 1;
            }
        }
        this.Move(index);
        this.schedule(() => {
            this.Move(index);
        }, 3);
    }
    private Move(index) {
        if (index == 1)
            this.Move1();
        else if (index == 2)
            this.Move2();
        else if (index == 3)
            this.Move3();
        else if (index == 4)
            this.Move4();
        else if (index == 5)
            this.Move5();
        else if (index == 6)
            this.Move6();
        else if (index == 7)
            this.Move7();
    }
    private Move1() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 25, this.posTmp.y));
        this.node.runAction(action);
        this.dirX *= -1;
    }
    private Move2() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 25, this.posTmp.y));
        this.node.runAction(action);
        this.dirX *= -1;
    }
    private Move3() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 50, this.posTmp.y));
        this.node.runAction(action);
        this.dirX *= -1;
    }
    private Move4() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 50, this.posTmp.y + this.dirY * 50));
        this.node.runAction(action);
        if (this.dirX == 1 && this.dirY == 1)
            this.dirY *= -1;
        else if (this.dirX == 1 && this.dirY == -1)
            this.dirX *= -1;
        else if (this.dirX == -1 && this.dirY == -1)
            this.dirY *= -1;
        else if (this.dirX == -1 && this.dirY == 1)
            this.dirX *= -1;
    }
    private Move5() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 15, this.posTmp.y + this.dirY * 15));
        this.node.runAction(action);
        if (this.dirX == 1 && this.dirY == 1)
            this.dirY *= -1;
        else if (this.dirX == 1 && this.dirY == -1)
            this.dirX *= -1;
        else if (this.dirX == -1 && this.dirY == -1)
            this.dirY *= -1;
        else if (this.dirX == -1 && this.dirY == 1)
            this.dirX *= -1;
    }
    private Move6() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 15, this.posTmp.y + this.dirY * 15));
        this.node.runAction(action);
        if (this.dirX == 1 && this.dirY == 1)
            this.dirY *= -1;
        else if (this.dirX == 1 && this.dirY == -1)
            this.dirX *= -1;
        else if (this.dirX == -1 && this.dirY == -1)
            this.dirY *= -1;
        else if (this.dirX == -1 && this.dirY == 1)
            this.dirX *= -1;
    }
    private Move7() {
        let action = cc.moveTo(3, new cc.Vec2(this.posTmp.x + this.dirX * 15, this.posTmp.y + this.dirY * 15));
        this.node.runAction(action);
        if (this.dirX == 1 && this.dirY == 1)
            this.dirY *= -1;
        else if (this.dirX == 1 && this.dirY == -1)
            this.dirX *= -1;
        else if (this.dirX == -1 && this.dirY == -1)
            this.dirY *= -1;
        else if (this.dirX == -1 && this.dirY == 1)
            this.dirX *= -1;
    }
    onCollisionEnter(other) {
        if (other.node.group == "BulletPlayer") {
            if (this.hp > 0) {
                let damage = Mng.mng.pool.bulletPlayers.find(b => b.node == other.node).damage;
                this.hp -= damage;
                Mng.mng.ui.SetScore(damage);
                other.node.active = false;
                if (this.hp <= 0) {
                    Mng.mng.logic.countEnemy--;
                    let tmp = Mng.mng.pool.GetExEnemy(this.node.position);
                    tmp.Play();
                    MngSound.mng.PlaySound(3);
                    if (this.isRotation) {
                        Mng.mng.logic.countEnemyTmp--;
                    }
                    this.unscheduleAllCallbacks();
                    this.node.stopAllActions();
                    // if (Mathf.Random(0.0, 100) < percentDrop)
                    {
                        Mng.mng.logic.RandomItem(this.node.position);
                    }
                    if (Mng.mng.logic.countEnemy <= 0) {
                        Mng.mng.logic.GetWare();
                    }
                    Mng.mng.ui.enemyKill++;
                    this.node.active = false;
                }
            }
        }
        else if (other.node.group == "BulletPet") {
            if (other.tag == 0) {
                if (this.hp > 0) {
                    let damage = Number(other.node.name);
                    this.hp -= damage;
                    Mng.mng.ui.SetScore(damage);
                    other.node.active = false;
                    if (this.hp <= 0) {
                        Mng.mng.logic.countEnemy--;
                        let tmp = Mng.mng.pool.GetExEnemy(this.node.position);
                        tmp.Play();
                        MngSound.mng.PlaySound(3);
                        if (this.isRotation) {
                            Mng.mng.logic.countEnemyTmp--;
                        }
                        this.unscheduleAllCallbacks();
                        this.node.stopAllActions();
                        // if (Mathf.Random(0.0, 100) < percentDrop)
                        {
                            Mng.mng.logic.RandomItem(this.node.position);
                        }
                        if (Mng.mng.logic.countEnemy <= 0) {
                            Mng.mng.logic.GetWare();
                        }
                        Mng.mng.ui.enemyKill++;
                        this.node.active = false;
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
            let damage = 0.1 * MngHero.dataPet[3].power[PlayerPrefs.GetNumber("LevelUpgradePet" + 3)] + Mng.mng.logic.player.petUpgrade / 10;
            this.hp -= damage;
            Mng.mng.ui.SetScore(damage);
            if (this.hp <= 0) {
                Mng.mng.logic.countEnemy--;
                let tmp = Mng.mng.pool.GetExEnemy(this.node.position);
                tmp.Play();
                MngSound.mng.PlaySound(3);
                if (this.isRotation) {
                    Mng.mng.logic.countEnemyTmp--;
                }
                this.unscheduleAllCallbacks();
                this.node.stopAllActions();
                // if (Mathf.Random(0.0, 100) < percentDrop)
                {
                    Mng.mng.logic.RandomItem(this.node.position);
                }
                if (Mng.mng.logic.countEnemy <= 0) {
                    Mng.mng.logic.GetWare();
                }
                Mng.mng.ui.enemyKill++;
                this.node.active = false;
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
        }
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
    }
}
