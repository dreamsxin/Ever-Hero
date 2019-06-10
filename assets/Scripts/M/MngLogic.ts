import Enemy from "../E/Enemy";
import Mng from "./Mng";
import Mathf from "./Mathf";
import Player from "../P/Player";
import Boss from "../B/Boss";
import Home from "../H/Home";
import MngSound from "./MngSound";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngLogic extends cc.Component {

    @property(cc.Node)
    public controlPlayer: cc.Node;
    @property(Player)
    public player: Player;
    @property(cc.Node)
    public boss;

    public countEnemyTmp: number = 0;
    public countEnemy: number = 0;
    public indexWare: number = 1;
    public hpEnemy: number;
    public isRealBattle: boolean = false;
    public isAttackBoss: boolean = false;


    public static indexLevel: number = 1;
    public static infoPath;

    public countWare: number[] = [3, 6, 7, 8, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    public isShoot: boolean[] = [false, false, false, true, true, true, true, true, true];
    public timeAttack: number[] = [-1, -1, -1, 3, 3, 3, 3, 3, 3];
    public speed: number[] = [120, 120, 120, 120, 120, 100, 100];

    private timeChangeMove: number;
    private isZen: boolean = true;
    private listEnemy: Enemy[] = new Array();
    private orderX: cc.Vec2[] = new Array();
    private orderY: cc.Vec2[] = new Array();
    private pointEnemyNew: cc.Vec2[] = [new cc.Vec2(0, -93), new cc.Vec2(0, 0), new cc.Vec2(0, 93), new cc.Vec2(124, 93), new cc.Vec2(-124, 93), new cc.Vec2(70, 0), new cc.Vec2(-70, 0)];


    start() {
        this.Ware();
    }
    public Ware() {
        if (Home.mode == 0 || Home.mode == 2) {
            if (this.indexWare <= this.countWare[MngLogic.indexLevel - 1] || Home.mode == 2) {
                if (Home.mode == 0)
                    Mng.mng.ui.textWare.string = "WARE " + this.indexWare + "/" + this.countWare[MngLogic.indexLevel - 1];
                else
                    Mng.mng.ui.textWare.string = "WARE " + MngLogic.indexLevel;
                Mng.mng.ui.textWare.node.active = true;
                Mng.mng.ui.textWareAnim.play();
                if (Home.mode == 2)
                    if (MngLogic.indexLevel % 4 == 0)
                        this.indexWare = Mathf.Random(this.countWare[MngLogic.indexLevel - 1] - 3, this.countWare[MngLogic.indexLevel - 1] - 1);
                    else
                        this.indexWare = Mathf.Random(this.countWare[MngLogic.indexLevel - 1] - 2, this.countWare[MngLogic.indexLevel - 1]);
                this.scheduleOnce(() => {
                    Mng.mng.ui.textWare.node.active = false;
                    let sp = null, st = null;
                    let callback = (sP, sT) => {
                        if (sP.length > 0 && sT.length > 0) {
                            this.isRealBattle = false;
                            let dataP = JSON.parse(sP);
                            let dataT = JSON.parse(sT);
                            this.countEnemyTmp = this.countEnemy = dataP.length;
                            this.timeChangeMove = 0;
                            this.orderX = new Array();
                            this.orderY = new Array();
                            this.listEnemy = new Array();
                            for (let i = 0; i < dataP.length; i++) {
                                let path = new Array();
                                for (let j = 0; j < dataP[i].path.length; j++) {
                                    path[j] = new cc.Vec2(dataP[i].path[j].x * 100, dataP[i].path[j].y * 100);
                                }
                                let tmp = Mng.mng.pool.GetEnemy(path[0]);
                                tmp.hp = dataT[i].Hp;
                                if (tmp.hp > this.hpEnemy)
                                    this.hpEnemy = tmp.hp;
                                tmp.index = dataT[i].typeEnemy;
                                tmp.point = dataT[i].point;
                                tmp.speedBullet = dataT[i].speedBullet;
                                tmp.isDrop = dataT[i].isDrop;
                                tmp.isLoop = dataT[i].isLoop
                                tmp.isFire = dataT[i].isFire;
                                tmp.timeLoop = dataT[i].timeLoop;
                                tmp.delayStartFire = dataT[i].delayStartFire;
                                tmp.speedBullet = dataT[i].speedBullet;
                                if (tmp.isDrop)
                                    tmp.percentDrop = dataT[i].percentDrop;
                                if (this.timeChangeMove < dataP[i].delayTimeStart + dataP[i].durationMove) {
                                    this.timeChangeMove = dataP[i].delayTimeStart + dataP[i].durationMove;
                                }
                                if (!dataP[i].loopPath) {
                                    if (this.orderX.findIndex(o => o.x <= path[path.length - 1].x + 5 && o.x >= path[path.length - 1].x - 5) == -1) {
                                        this.orderX[this.orderX.length] = path[path.length - 1];
                                    }
                                    if (this.orderY.findIndex(o => o.y <= path[path.length - 1].y + 5 && o.y >= path[path.length - 1].y - 5) == -1) {
                                        this.orderY[this.orderY.length] = path[path.length - 1];
                                    }
                                    tmp.pointEnd = path[path.length - 1];
                                    tmp.isLoopPath = false;
                                    tmp.MoveBegin(path, dataP[i].delayTimeStart, dataP[i].durationMove);
                                }
                                else {
                                    tmp.isLoopPath = true;
                                    tmp.MoveBegin(path, dataP[i].delayTimeStart, dataP[i].durationMove, true);
                                }
                                this.listEnemy[i] = tmp;
                            }
                            if (this.orderX.length > 0) {
                                let tmp;
                                for (let i = 0; i < this.orderX.length - 2; i++)
                                    for (let j = this.orderX.length - 1; j > i; j--)
                                        if (this.orderX[j].x < this.orderX[j - 1].x) {
                                            tmp = this.orderX[j];
                                            this.orderX[j] = this.orderX[j - 1];
                                            this.orderX[j - 1] = tmp;
                                        }
                                for (let i = 0; i < this.orderY.length - 2; i++)
                                    for (let j = this.orderY.length - 1; j > i; j--)
                                        if (this.orderY[j].y > this.orderY[j - 1].y) {
                                            tmp = this.orderY[j];
                                            this.orderY[j] = this.orderY[j - 1];
                                            this.orderY[j - 1] = tmp;
                                        }

                                for (let i = 0; i < this.listEnemy.length; i++) {
                                    this.listEnemy[i].pointEnemy = new cc.Vec2(this.orderX.findIndex(o => o.x <= this.listEnemy[i].pointEnd.x + 5 && o.x >= this.listEnemy[i].pointEnd.x - 5), this.orderY.findIndex(o => o.y <= this.listEnemy[i].pointEnd.y + 5 && o.y >= this.listEnemy[i].pointEnd.y - 5));
                                }
                            }
                        }
                        else {
                            if (MngLogic.indexLevel % 4 == 0 && this.indexWare == this.countWare[MngLogic.indexLevel - 1]) {
                                this.isAttackBoss = true;
                                this.boss = this.boss.getComponent(Boss);
                                this.boss.level = Number((MngLogic.indexLevel / 10).toString().split(".")[0]);
                                this.boss.hp = this.boss.hpTmp = JSON.parse(sT).Hp;
                                MngSound.mng.PlaySound(22);
                                Mng.mng.ui.warningBoss.node.active = true;
                                Mng.mng.ui.warningBoss.play();
                                this.scheduleOnce(() => {
                                    Mng.mng.ui.warningBoss.node.active = false;
                                    this.boss.node.active = true;
                                    MngSound.mng.PlayMusic(Mathf.Random(6, 7));
                                }, 4);
                            }
                            else {
                                this.hpEnemy = JSON.parse(sT).Hp;
                                this.countEnemy = 0;
                                this.isZen = true;
                                this.isRealBattle = true;
                                this.TurnRealBattle(1);
                                this.scheduleOnce(() => {
                                    this.isZen = false;
                                    this.unscheduleAllCallbacks();
                                    this.schedule(this.CheckEnd2, 0.5);
                                }, 30);
                            }
                        }
                        if (Home.mode == 0)
                            this.indexWare++;
                        else
                            MngLogic.indexLevel++;
                    };

                    cc.loader.loadRes("Data/Level" + MngLogic.indexLevel + "-" + this.indexWare + " p", (res, data) => {
                        sp = data;
                        if (st != null)
                            callback(sp, st);
                    });
                    cc.loader.loadRes("Data/Level" + MngLogic.indexLevel + "-" + this.indexWare, (res, data) => {
                        st = data;
                        if (sp != null)
                            callback(sp, st);
                    });
                }, 1.88);
            }
            else {
                Mng.mng.ui.Victory();
            }
        }
        else if (Home.mode == 1) {
            Mng.mng.ui.textWare.string = "WARE " + this.indexWare;
            Mng.mng.ui.textWare.node.active = true;
            Mng.mng.ui.textWareAnim.play();
            this.boss = this.boss.getComponent(Boss);
            if (this.isAttackBoss)
                this.boss.level += 0.3;
            else
                this.isAttackBoss = true;
            this.boss.hp = this.boss.hpTmp = (this.boss.level + 1) * 100;
            // this.boss.node.active = true
            this.indexWare++;
            MngSound.mng.PlaySound(22);
            Mng.mng.ui.warningBoss.node.active = true;
            Mng.mng.ui.warningBoss.play();
            this.scheduleOnce(() => {
                Mng.mng.ui.warningBoss.node.active = false;
                this.boss.node.active = true;
                MngSound.mng.PlayMusic(Mathf.Random(6, 7));
            }, 4);
        }
    }
    public ChangeMoveEnemy() {
        let index = Mathf.Random(1, 7);
        for (let i = 0; i < this.listEnemy.length; i++) {
            if (this.listEnemy[i].node.activeInHierarchy)
                this.listEnemy[i].ChangeMove(index);
        }
    }
    public RandomItem(point: cc.Vec2) {
        let random = Mathf.Random(0, 100.0);
        if (random < 5) {
            Mng.mng.pool.GetItem(point).Init(0);
        }
        else if (random < 7) {
            Mng.mng.pool.GetItem(point).Init(1);
        }
        else if (random < 10) {
            Mng.mng.pool.GetItem(point).Init(2);
        }
        else if (random < 12) {
            Mng.mng.pool.GetItem(point).Init(3);
        }
        else if (random < 14) {
            Mng.mng.pool.GetItem(point).Init(4);
        }
        else {
            Mng.mng.pool.GetGold(point).Init();
        }
    }
    public GetWare() {
        this.scheduleOnce(this.Ware, 2);
    }

    public TurnRealBattle(time: number = 0) {
        if (this.isZen) {
            this.scheduleOnce(() => {
                let index = Mathf.Random(0, 8);
                if (index == 0) {
                    let count = Mathf.Random(1, 5);
                    let pointX = new Array();
                    let pointXRandom;
                    for (let i = 0; i < count; i++) {
                        do {
                            pointXRandom = Mathf.Random(-296.0, 296);
                        } while (pointX.findIndex(p => Math.abs(pointXRandom - p) < 50) >= 0);
                        pointX[pointX.length] = pointXRandom;
                        Mng.mng.pool.GetEnemy2().Init(index, new cc.Vec2(pointXRandom, 839 + Mathf.Random(0, 100.0)));
                    }
                }
                else if (index == 1) {
                    let pointXRandom = Mathf.Random(-296.0, 296);
                    for (let i = 0; i < 5; i++) {
                        let tmp = Mng.mng.pool.GetEnemy2();
                        tmp.node.rotation = 0;
                        tmp.Init(index, new cc.Vec2(pointXRandom, 700 + i * 80));
                    }
                }
                else if (index == 2) {
                    let pointXRandom = Mathf.Random(-200.0, 200);
                    for (let i = 0; i < 7; i++) {
                        let tmp = Mng.mng.pool.GetEnemy2();
                        tmp.node.rotation = 0;
                        tmp.Init(index, new cc.Vec2(pointXRandom + this.pointEnemyNew[i].x, 700 + this.pointEnemyNew[i].y));
                    }
                }
                else if (index == 3) {
                    let count = Mathf.Random(1, 5);
                    let pointX = new Array();
                    let pointXRandom;
                    for (let i = 0; i < count; i++) {
                        do {
                            pointXRandom = Mathf.Random(-296.0, 296);
                        } while (pointX.findIndex(p => Math.abs(pointXRandom - p) < 50) >= 0);
                        pointX[pointX.length] = pointXRandom;
                        let tmp = Mng.mng.pool.GetEnemy2();
                        tmp.node.rotation = 0;
                        tmp.Init(index, new cc.Vec2(pointXRandom, 839));
                    }
                }
                else if (index == 4) {
                    let dir1 = Mathf.Random(0, 100) < 50;
                    let dir2 = Mathf.Random(0, 100) < 50;
                    let y = Mathf.Random(0, 662);
                    for (let i = 0; i < 5; i++) {
                        this.scheduleOnce(() => {
                            let tmp = Mng.mng.pool.GetEnemy2();
                            if (dir1) {
                                tmp.dirMoveSin = 1;
                                tmp.Init(index, new cc.Vec2(-487, y));
                            }
                            else {
                                tmp.dirMoveSin = -1;
                                tmp.Init(index, new cc.Vec2(487, y));
                            }

                            tmp = Mng.mng.pool.GetEnemy2();
                            if (dir2) {
                                tmp.dirMoveSin = 1;
                                tmp.Init(index, new cc.Vec2(-487, y - 100));
                            }
                            else {
                                tmp.dirMoveSin = -1;
                                tmp.Init(index, new cc.Vec2(487, y - 100));
                            }
                        }, 0.7 * i);
                    }
                }
                else if (index == 5) {
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
                else if (index == 7) {
                    let count = Mathf.Random(4, 6);
                    let indexTmp = Mathf.Random(7, 8);
                    let indexPath = Mathf.Random(0, MngLogic.infoPath.length - 1);
                    let path = new Array();
                    for (let i = 0; i < MngLogic.infoPath[indexPath].path.length; i++) {
                        path[i] = new cc.Vec2(MngLogic.infoPath[indexPath].path[i].x * 100, MngLogic.infoPath[indexPath].path[i].y * 100);
                    }
                    for (let i = 0; i < count; i++) {
                        this.scheduleOnce(() => {
                            let tmp = Mng.mng.pool.GetEnemy2();
                            tmp.InitPath(path, MngLogic.infoPath[indexPath].time);
                            tmp.Init(indexTmp);
                        }, 0.3 * i);
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
                this.TurnRealBattle(Mathf.Random(2.5, 3));
            }, time);
        }
    }
    private CheckEnd2() {
        if (!this.isZen) {
            if (this.countEnemy <= 0) {
                this.unscheduleAllCallbacks();
                this.GetWare();
            }
        }
    }
}
