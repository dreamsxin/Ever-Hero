const { ccclass, property } = cc._decorator;

@ccclass
export default class Mathf extends cc.Component {

    public static Random(min, max): number {
        if (min.toString().lastIndexOf('.') != -1 || max.toString().lastIndexOf('.') != -1) {
            min = min * 1000;
            max = max * 1000;
            return (Math.floor(Math.random() * (max - min + 1)) + min) / 1000;
        }
        else {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    public static Distance(vector1, vector2): number {
        return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2));
    }

    public static Int(value) {
        return Number(value.toString().split(".")[0]);
    }
}
