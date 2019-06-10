const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
  @property(cc.Sprite)
  public bar: cc.Sprite;
  @property(cc.Label)
  public textLoading: cc.Label;

  private static nameScene: string = "Home";

  private static sceneLoaded: string[] = new Array();
  onLoad() {

    this.LoadSplash(Loading.nameScene);
  }
  public LoadSplash(scene: string) {
    Loading.sceneLoaded[Loading.sceneLoaded.length] = scene;
    cc.loader.onProgress = (completedCount, totalCount, item) => {
      var percent = 0;
      if (totalCount > 0) {
        percent = completedCount / totalCount;
      }
      if (this.bar != null) {
        this.bar.fillRange = percent;
        this.textLoading.string = "LOADING..." + Math.round(percent * 100) + '%';
      }
    }
    cc.director.preloadScene(scene, (err) => {
      if (err) {
        return;
      }
      cc.director.loadScene(scene);
    });
  }
  public static Load(scene: string) {
    let index = this.sceneLoaded.findIndex(s => s == scene);
    if (index >= 0) {
      cc.director.loadScene(scene);
    }
    else {
      Loading.nameScene = scene;
      cc.director.loadScene("Loading");
    }
  }
}
