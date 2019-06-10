import Mng from "./Mng";
import PlayerPrefs from "../P/PlayerPrefs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MngSound extends cc.Component {
    @property(cc.AudioClip)
    public clipMusic: cc.AudioClip[] = new Array();
    @property(cc.AudioClip)
    public clip: cc.AudioClip[] = new Array();
    public static checkSound: boolean = false;
    public static checkMusic: boolean = false;
    public static musicState;
    public static mng: MngSound;
    private nameSound: string[] =
        ["BGM_MainMenu_00",
            "BGM_GamePlay_01",
            "BGM_GamePlay_02",
            "BGM_GamePlay_03",
            "BGM_GamePlay_04",
            "BGM_GamePlay_05",
            "BGM_Boss_00",
            "BGM_Boss_01"
        ];

    onLoad() {
        if (MngSound.mng == null) {
            cc.game.addPersistRootNode(this.node);
            MngSound.mng = this;
        }
        else if (MngSound.mng != this) {
            this.node.destroy();
        }
    }

    public PlaySound(index: number) {
        if (MngSound.checkSound) {
            return cc.audioEngine.play(this.clip[index].toString(), false, 1);
        }
    }
    public PlayMusic(index: number) {
        if (PlayerPrefs.GetBool("Music", true)) {
            if (MngSound.musicState != null)
                cc.audioEngine.stop(MngSound.musicState);
            if (MngSound.mng.clipMusic[index] == null)
                cc.loader.loadRes("Sound/" + this.nameSound[index], (err, clip) => {
                    MngSound.mng.clipMusic[index] = clip;
                    MngSound.musicState = cc.audioEngine.play(MngSound.mng.clipMusic[index].toString(), true, 1);
                });
            else
                MngSound.musicState = cc.audioEngine.play(MngSound.mng.clipMusic[index].toString(), true, 1);
        }
    }
}
