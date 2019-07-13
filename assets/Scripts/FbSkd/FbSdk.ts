import PlayerPrefs from "../P/PlayerPrefs";


const { ccclass, property } = cc._decorator;

@ccclass
export default class FbSdk extends cc.Component {
    public static sdk: FbSdk;

    private preloadedInterstitial = null;
    private preloadedRewardedVideo = null;

    public fbName: string = "";
    public fbId: string = "";
    public fbAvatar: string = "";
    public fbLocale: string = "";
    public fbPlatform: string = "";
    private fbSdkVersion: string = "";
    private base64: string = "";
    public entryPointData;
    public isPostLeaderboard: boolean = true;
    private isShow: boolean = false;


    private FBInstant;
    onLoad() {
        if (FbSdk.sdk == null) {
            cc.game.addPersistRootNode(this.node);
            this.FBInstant = this.node.addComponent("Jsfb").GetFbInstant();
            FbSdk.sdk = this;
            this.LoginGame();
            this.PreloadInterstitial();
            this.PreloadVideo();
            this.scheduleOnce(this.SubscribeBot, 60);
            this.scheduleOnce(this.CreateShortcutGame, 180);
            this.LoadBannerGame();
        }
        else if (FbSdk.sdk != this) {
            this.node.destroy()
        }
    }

    private PreloadInterstitial() {
        if (this.FBInstant != null) {
            this.preloadedInterstitial = null;
            let self = this;
            this.FBInstant.getInterstitialAdAsync(
                '588206904981553_588207674981476', // Your Ad Placement Id
            ).then((interstitial) => {
                // Load the Ad asynchronously
                self.preloadedInterstitial = interstitial;
                return self.preloadedInterstitial.loadAsync();
            }).then(() => {
                console.log('Interstitial preloaded');
                if (!this.isShow) {
                    this.isShow = true;
                    this.scheduleOnce(() => { self.ShowInterstitial() }, 1);
                }
            }).catch((err) => {
                console.error('Interstitial failed to preload: ' + err.message);
            });
        }
    }
    public ShowInterstitial(callback = null) {
        if (this.FBInstant != null) {
            let self = this;
            console.log("ShowInterstitial");
            this.preloadedInterstitial.showAsync()
                .then(() => {
                    self.PreloadInterstitial();
                    if (callback != null)
                        callback.apply();
                    console.log('Interstitial ad finished successfully');
                })
                .catch((e) => {
                    console.error(e.message);
                    if (self.preloadedInterstitial == null)
                        self.PreloadInterstitial();
                    if (self.preloadedRewardedVideo != null)
                        self.ShowVideoInterstitial(callback);
                });
        }
    }
    public ShowVideoInterstitial(callback = null) {
        if (this.FBInstant != null) {
            let self = this;
            this.preloadedRewardedVideo.showAsync()
                .then(() => {
                    if (callback != null)
                        callback();
                    self.PreloadVideo();
                })
                .catch((e) => {
                    console.error(e.message);
                    if (self.preloadedRewardedVideo == null)
                        self.PreloadVideo();
                });
        }
    }
    private PreloadVideo() {
        if (this.FBInstant != null) {
            let self = this;
            this.preloadedRewardedVideo = null;
            this.FBInstant.getRewardedVideoAsync(
                '588206904981553_588207801648130', // Your Ad Placement Id
            ).then((rewarded) => {
                // Load the Ad asynchronously
                self.preloadedRewardedVideo = rewarded;
                return self.preloadedRewardedVideo.loadAsync();
            }).then(() => {
                console.log('Rewarded video preloaded');
            }).catch((err) => {
                console.error('Rewarded video failed to preload: ' + err.message);
            });
        }
    }
    public ShowVideo(callback = null) {
        if (this.FBInstant != null) {
            let self = this;
            this.preloadedRewardedVideo.showAsync()
                .then(() => {
                    if (callback != null)
                        callback();
                    self.PreloadVideo();
                })
                .catch((e) => {
                    console.error(e.message);
                    if (self.preloadedRewardedVideo == null)
                        self.PreloadVideo();
                    if (self.preloadedInterstitial != null)
                        self.ShowInterstitialVideo(callback);
                });
        }
    }
    public ShowInterstitialVideo(callback = null) {
        if (this.FBInstant != null) {
            let self = this;
            console.log("ShowInterstitial");
            this.preloadedInterstitial.showAsync()
                .then(() => {
                    self.PreloadInterstitial();
                    if (callback != null)
                        callback.apply();
                    console.log('Interstitial ad finished successfully');
                })
                .catch((e) => {
                    console.error(e.message);
                    if (self.preloadedInterstitial == null)
                        self.PreloadInterstitial();
                });
        }
    }
    private LoginGame() {
        if (this.FBInstant != null) {
            this.fbName = this.FBInstant.player.getName().toString();
            this.fbId = this.FBInstant.player.getID().toString();
            this.fbAvatar = this.FBInstant.player.getPhoto();
            this.fbLocale = this.FBInstant.getLocale().toString();
            this.fbPlatform = this.FBInstant.getPlatform().toString();
            this.fbSdkVersion = this.FBInstant.getSDKVersion();
        }
    }
    public CreateShortcutGame() {
        if (this.FBInstant != null) {
            this.FBInstant.canCreateShortcutAsync()
                .then((canCreateShortcut) => {
                    if (canCreateShortcut) {
                        this.FBInstant.createShortcutAsync()
                            .then(() => {
                            })
                            .catch(() => {
                            });
                    }
                });
        }
    }
    private LoadBannerGame() {
        this.base64 = PlayerPrefs.GetString("banner");
        if (this.base64 == "") {
            this.GetBase64ByUrl("https://i.ibb.co/xzmYCrR/banner1200x627-fr.png", (base64) => {
                this.base64 = base64;
                PlayerPrefs.GetString("banner", this.base64);
            });
        }
    }
    public Share(callback = null) {
        if (this.FBInstant == null) return;
        // cc.loader.loadRes("SS/ss" + MngLogic.indexMap, (err, data) => {
        let base64ImgScreen = this.base64;
        let textMess = this.fbName + " need your help to pass the level " + ". Help " + this.fbName + " play!";
        let self = this;
        this.FBInstant.shareAsync({
            intent: 'SHARE',
            image: base64ImgScreen,
            text: textMess,
            data: {},
        }).then((result) => {
            console.log("Share   " + result);
            if (callback != null) {
                callback.apply();
            }
        });
        // });
    }
    public Reply() {
        let self = this;
        let ctaMess = 'Continue';
        let textMess = this.fbName + ' helped you pass the level ' + (self.entryPointData.level + 1) + ". Keep playing!";
        let datatmp = self.entryPointData.level;
        self.entryPointData = null;
        // cc.loader.loadRes("SS/ss" + (MngLogic.indexMap + 1), (err, data) => {
        let base64ImgScreen = this.base64;
        this.FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: ctaMess,
            image: base64ImgScreen,
            text: textMess,
            template: 'Game',
            data: { isRank: false, level: datatmp, isHelp: false, id: self.fbId },
            strategy: 'IMMEDIATE',
            notification: "PUSH",
        }).then(() => {

        });
        // });
    }
    public Challenge(callback = null) {
        let self = this;
        this.ChoosePlayer(() => {
            if (self.isPostLeaderboard) {
                let ctaMess = 'Fight';
                let textMess = "I challenge you to handle this puzzle!.";
                // cc.loader.loadRes("SS/ss" + (MngLogic.indexMap + 1), (err, data) => {
                let base64ImgScreen = self.base64;
                self.FBInstant.updateAsync({
                    action: 'CUSTOM',
                    cta: ctaMess,
                    image: base64ImgScreen,
                    text: textMess,
                    template: 'Game',
                    data: {},
                    strategy: 'IMMEDIATE',
                    notification: "PUSH",
                }).then(() => {
                    if (callback != null)
                        callback.apply();
                });
                // });
            }
        });
    }
    public ShareRank(nameRank: string, callback = null) {
        if (this.FBInstant == null) return;
        // cc.loader.loadRes("SS/ss" + (MngLogic.indexMap + 1), (err, data) => {
        let base64ImgScreen = this.base64;
        let textMess = "I got  \"" + nameRank + "\". Let's compete in the Leaderboard.";
        let self = this;
        this.FBInstant.shareAsync({
            intent: 'SHARE',
            image: base64ImgScreen,
            text: textMess,
            data: {},
        }).then((result) => {
            console.log("Share   " + result);
            if (callback != null) {
                callback.apply();
            }
        });
        // });
    }
    private ChoosePlayer(callback = null) {
        if (this.FBInstant != null) {
            this.FBInstant.context
                .chooseAsync({
                    minSize: 2,
                })
                .then(() => {
                    if (callback != null) {
                        callback.apply();
                    }
                });
        }
    }
    public AddScoreEndless(myScore: number, callback = null) {
        if (this.FBInstant == null) return;
        let self = this;
        this.FBInstant
            .getLeaderboardAsync('Endless2')
            .then((leaderboard) => {
                return leaderboard.setScoreAsync(myScore, '');
            })
            .then(() => {
                console.log('Score saved');
                if (callback != null)
                    callback.apply();
            })
            .catch(error => console.error(error));
    }
    public AddScoreBoss(myScore: number, callback = null) {
        if (this.FBInstant == null) return;
        let self = this;
        this.FBInstant
            .getLeaderboardAsync('FightBoss')
            .then((leaderboard) => {
                return leaderboard.setScoreAsync(myScore, '');
            })
            .then(() => {
                console.log('Score saved');
                if (callback != null)
                    callback.apply();
            })
            .catch(error => console.error(error));
    }
    public AddScoreLevel(myScore: number, callback = null) {
        if (this.FBInstant == null) return;
        let self = this;
        this.FBInstant
            .getLeaderboardAsync('Level')
            .then((leaderboard) => {
                return leaderboard.setScoreAsync(myScore, '');
            })
            .then(() => {
                console.log('Score saved');
                if (callback != null)
                    callback.apply();
            })
            .catch(error => console.error(error));
    }
    public GetRankFriendLevel(callback = null) {
        if (this.FBInstant == null) return;
        this.FBInstant.getLeaderboardAsync('Level')
            .then((leaderboard) => {
                return leaderboard.getConnectedPlayerEntriesAsync(100, 0);
            })
            .then((entries) => {
                if (callback != null)
                    callback(entries).apply();
            });
    }
    public GetRankWorldEndless(callback = null) {
        if (this.FBInstant == null) return;
        this.FBInstant
            .getLeaderboardAsync('Endless2')
            .then((leaderboard) => { return leaderboard.getEntriesAsync() })
            .then((entries) => {
                if (callback != null)
                    callback(entries).apply();
            }).catch(error => console.error(error));
    }
    public GetRankWorldBoss(callback = null) {
        if (this.FBInstant == null) return;
        this.FBInstant
            .getLeaderboardAsync('FightBoss')
            .then((leaderboard) => { return leaderboard.getEntriesAsync() })
            .then((entries) => {
                if (callback != null)
                    callback(entries).apply();
            }).catch(error => console.error(error));
    }
    public GetRankPlayerEndless(callback = null) {
        if (this.FBInstant == null) return;
        this.FBInstant.getLeaderboardAsync('Endless2')
            .then((leaderboard) => {
                return leaderboard.getPlayerEntryAsync();
            })
            .then((entry) => {
                if (callback != null)
                    callback(entry).apply();
            });
    }
    public GetRankPlayerBoss(callback = null) {
        if (this.FBInstant == null) return;
        this.FBInstant.getLeaderboardAsync('FightBoss')
            .then((leaderboard) => {
                return leaderboard.getPlayerEntryAsync();
            })
            .then((entry) => {
                if (callback != null)
                    callback(entry).apply();
            });
    }
    public PlayWithFriend(idPLayer, callback = null) {
        if (this.FBInstant == null) return;
        this.FBInstant.context
            .createAsync(idPLayer)
            .then(() => {
                if (callback != null)
                    callback().apply();
            });
    }
    public SwitchGame(idGame) {
        if (this.FBInstant == null) return;
        this.FBInstant.switchGameAsync(idGame).catch((e) => {
        });
    }
    public LogEvent(eventName, eventValue = null) {
        if (this.FBInstant == null) return;
        if (eventValue == null)
            this.FBInstant.logEvent(eventName, 1, { custom_property: eventName });
        else
            this.FBInstant.logEvent(eventName, eventValue, { custom_property: eventName });
    }
    private OnPause() {
        if (this.FBInstant == null) return;
        let self = this;
        this.FBInstant.onPause(() => {
            self.ShowInterstitial();
        });
    }
    private ToDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    public GetBase64ByUrl(url: string, callback) {
        this.ToDataURL(url, (dataUrl) => {
            callback(dataUrl);
        });
    }
    public SubscribeBot() {
        if (this.FBInstant == null) return;
        this.FBInstant.player.canSubscribeBotAsync().then(function (can_subscribe) {
            if (can_subscribe) {
                this.FBInstant.player.subscribeBotAsync().then(
                    // Player is subscribed to the bot
                ).catch(function (e) {
                    // Handle subscription failure
                });
            }
        });
    }
    private ShowInter2Minute() {
        this.ShowInterstitialVideo();
    }
}

