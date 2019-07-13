import BulletPlayer from "../B/BulletPlayer";
import BulletEnemy from "../B/BulletEnemy";
import Enemy from "../E/Enemy";
import Effect from "../E/Effect";
import Item from "../I/Item";
import Gold from "../G/Gold";
import BulletPet from "../B/BulletPet";
import Enemy2 from "../E/Enemy2";
import Rocket from "../R/Rocket";
import LineRocket from "../L/LineRocket";
import Mng from "./Mng";
import WarningEnemy from "../W/WarningEnemy";
import ItemChange from "../I/ItemChange";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngPool extends cc.Component {

    @property(cc.Prefab)
    public bulletPlayerPrefab: cc.Prefab;
    @property(cc.Prefab)
    public bulletEnemyPrefab: cc.Prefab;
    @property(cc.Prefab)
    public bulletPetPrefab: cc.Prefab;
    @property(cc.Prefab)
    public enemyPrefab: cc.Prefab;
    @property(cc.Prefab)
    public enemy2Prefab: cc.Prefab;
    @property(cc.Prefab)
    public exEnemyPrefab: cc.Prefab;
    @property(cc.Prefab)
    public smokePrefab: cc.Prefab;
    @property(cc.Prefab)
    public itemPrefab: cc.Prefab;
    @property(cc.Prefab)
    public itemChangePrefab: cc.Prefab;
    @property(cc.Prefab)
    public goldPrefab: cc.Prefab;
    @property(cc.Prefab)
    public rocketPrefab: cc.Prefab;
    @property(cc.Prefab)
    public lineRocketPrefab: cc.Prefab;
    @property(cc.Prefab)
    public warningEnemyPrefab: cc.Prefab;

    @property(cc.Node)
    public bulletParent: cc.Node;
    @property(cc.Node)
    public enemyParent: cc.Node;
    @property(cc.Node)
    public effectParent: cc.Node;
    @property(cc.Node)
    public itemParent: cc.Node;


    public bulletPlayers: BulletPlayer[] = new Array();
    public bulletEnemys: BulletEnemy[] = new Array();
    public bulletPets: BulletPet[] = new Array();
    public enemys: Enemy[] = new Array();
    public enemy2s: Enemy2[] = new Array();
    public exEnemys: Effect[] = new Array();
    public items: Item[] = new Array();
    public itemChanges: ItemChange[] = new Array();
    public golds: Gold[] = new Array();
    public rockets: Rocket[] = new Array();
    public lineRockets: LineRocket[] = new Array();
    public warningEnemys: WarningEnemy[] = new Array();
    public smokes: cc.ParticleSystem[] = new Array();


    public GetBulletPlayer(point: cc.Vec2, angle: number): BulletPlayer {
        let index = this.bulletPlayers.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.bulletPlayers[index].node.setPosition(point);
            this.bulletPlayers[index].node.rotation = angle;
            return this.bulletPlayers[index];
        }
        else
            return this.RequestBulletPlayer(point, angle);
    }
    private RequestBulletPlayer(point: cc.Vec2, angle: number): BulletPlayer {
        let tmp = cc.instantiate(this.bulletPlayerPrefab);
        tmp.setPosition(point);
        tmp.rotation = angle;
        this.bulletParent.addChild(tmp);
        let bullet = tmp.getComponent(BulletPlayer);
        this.bulletPlayers[this.bulletPlayers.length] = bullet;
        return bullet;
    }

    public GetBulletEnemy(point: cc.Vec2, angle: number): BulletEnemy {
        let index = this.bulletEnemys.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.bulletEnemys[index].node.setPosition(point);
            this.bulletEnemys[index].node.rotation = angle;
            return this.bulletEnemys[index];
        }
        else
            return this.RequestBulletEnemy(point, angle);
    }
    private RequestBulletEnemy(point: cc.Vec2, angle: number): BulletEnemy {
        let tmp = cc.instantiate(this.bulletEnemyPrefab);
        tmp.setPosition(point);
        tmp.rotation = angle;
        this.bulletParent.addChild(tmp);
        let bullet = tmp.getComponent(BulletEnemy);
        this.bulletEnemys[this.bulletEnemys.length] = bullet;
        return bullet;
    }

    public GetBulletPet(point: cc.Vec2): BulletPet {
        let index = this.bulletPets.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.bulletPets[index].node.setPosition(point);
            return this.bulletPets[index];
        }
        else
            return this.RequestBulletPet(point);
    }
    private RequestBulletPet(point: cc.Vec2): BulletPet {
        let tmp = cc.instantiate(this.bulletPetPrefab);
        tmp.setPosition(point);
        this.bulletParent.addChild(tmp);
        let bullet = tmp.getComponent(BulletPet);
        this.bulletPets[this.bulletPets.length] = bullet;
        return bullet;
    }

    public GetEnemy(point: cc.Vec2): Enemy {
        let index = this.enemys.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.enemys[index].node.setPosition(point);
            return this.enemys[index];
        }
        else
            return this.RequestEnemy(point);
    }
    private RequestEnemy(point: cc.Vec2): Enemy {
        let tmp = cc.instantiate(this.enemyPrefab);
        tmp.setPosition(point);
        this.enemyParent.addChild(tmp);
        let enemy = tmp.getComponent(Enemy);
        this.enemys[this.enemys.length] = enemy;
        return enemy;
    }

    public GetEnemy2(): Enemy2 {
        Mng.mng.logic.countEnemy++;
        let index = this.enemy2s.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            return this.enemy2s[index];
        }
        else
            return this.RequestEnemy2();
    }
    private RequestEnemy2(): Enemy2 {
        let tmp = cc.instantiate(this.enemy2Prefab);
        this.enemyParent.addChild(tmp);
        let enemy = tmp.getComponent(Enemy2);
        this.enemy2s[this.enemy2s.length] = enemy;
        return enemy;
    }

    public GetExEnemy(point: cc.Vec2): Effect {
        let index = this.exEnemys.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.exEnemys[index].node.setPosition(point);
            return this.exEnemys[index];
        }
        else
            return this.RequestExEnemy(point);
    }
    private RequestExEnemy(point: cc.Vec2): Effect {
        let tmp = cc.instantiate(this.exEnemyPrefab);
        tmp.setPosition(point);
        this.effectParent.addChild(tmp);
        let effect = tmp.getComponent(Effect);
        this.exEnemys[this.exEnemys.length] = effect;
        return effect;
    }

    public GetItem(point: cc.Vec2): Item {
        let index = this.items.findIndex(e => !e.node.activeInHierarchy);
        if (index == -1)
            return this.RequestItem(point);
        else {
            this.items[index].node.setPosition(point);
            return this.items[index];
        }
    }

    private RequestItem(point: cc.Vec2): Item {
        let tmp = cc.instantiate(this.itemPrefab);
        this.itemParent.addChild(tmp);
        tmp.setPosition(point);
        let itemTmp = tmp.getComponent(Item);
        this.items[this.items.length] = itemTmp;
        return itemTmp;
    }

    public GetItemChange(point: cc.Vec2): ItemChange {
        let index = this.itemChanges.findIndex(e => !e.node.activeInHierarchy);
        if (index == -1)
            return this.RequestItemChange(point);
        else {
            this.itemChanges[index].node.setPosition(point);
            return this.itemChanges[index];
        }
    }

    private RequestItemChange(point: cc.Vec2): ItemChange {
        let tmp = cc.instantiate(this.itemChangePrefab);
        this.itemParent.addChild(tmp);
        tmp.setPosition(point);
        let itemTmp = tmp.getComponent(ItemChange);
        this.itemChanges[this.itemChanges.length] = itemTmp;
        return itemTmp;
    }

    public GetGold(point: cc.Vec2): Gold {
        let index = this.golds.findIndex(e => !e.node.activeInHierarchy);
        if (index == -1)
            return this.RequestGold(point);
        else {
            this.golds[index].node.setPosition(point);
            return this.golds[index];
        }
    }

    private RequestGold(point: cc.Vec2): Gold {
        let tmp = cc.instantiate(this.goldPrefab);
        this.itemParent.addChild(tmp);
        tmp.setPosition(point);
        let goldTmp = tmp.getComponent(Gold);
        this.golds[this.golds.length] = goldTmp;
        return goldTmp;
    }

    public GetRocket(): Rocket {
        let index = this.rockets.findIndex(e => !e.node.activeInHierarchy);
        if (index == -1)
            return this.RequestRocket();
        else {
            return this.rockets[index];
        }
    }
    private RequestRocket(): Rocket {
        let tmp = cc.instantiate(this.rocketPrefab);
        this.enemyParent.addChild(tmp);
        let goldTmp = tmp.getComponent(Rocket);
        this.rockets[this.rockets.length] = goldTmp;
        return goldTmp;
    }

    public GetLineRocket(): LineRocket {
        Mng.mng.logic.countEnemy++;
        let index = this.lineRockets.findIndex(e => !e.node.activeInHierarchy);
        if (index == -1)
            return this.RequestLineRocket();
        else {
            return this.lineRockets[index];
        }
    }
    private RequestLineRocket(): LineRocket {
        let tmp = cc.instantiate(this.lineRocketPrefab);
        this.enemyParent.addChild(tmp);
        let goldTmp = tmp.getComponent(LineRocket);
        this.lineRockets[this.lineRockets.length] = goldTmp;
        return goldTmp;
    }

    public GetWarningEnemy(point: cc.Vec2): WarningEnemy {
        let index = this.warningEnemys.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.warningEnemys[index].node.setPosition(point);
            return this.warningEnemys[index];
        }
        else
            return this.RequestWarningEnemy(point);
    }
    private RequestWarningEnemy(point: cc.Vec2): WarningEnemy {
        let tmp = cc.instantiate(this.warningEnemyPrefab);
        tmp.setPosition(point);
        this.enemyParent.addChild(tmp);
        let enemy = tmp.getComponent(WarningEnemy);
        this.warningEnemys[this.warningEnemys.length] = enemy;
        return enemy;
    }

    public GetSmoke(parent: cc.Node): cc.ParticleSystem {
        let index = this.smokes.findIndex(b => !b.node.activeInHierarchy);
        if (index >= 0) {
            this.smokes[index].node.parent = null;
            parent.addChild(this.smokes[index].node);
            return this.smokes[index];
        }
        else
            return this.RequestSmoke(parent);
    }
    private RequestSmoke(parent: cc.Node): cc.ParticleSystem {
        let tmp = cc.instantiate(this.smokePrefab);
        parent.addChild(tmp);
        let smoke = tmp.getComponent(cc.ParticleSystem);
        this.smokes[this.smokes.length] = smoke;
        return smoke;
    }
}
