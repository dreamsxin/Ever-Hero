cc.Class({
    extends: cc.Component,
    GetFbInstant() {
        if (typeof FBInstant !== 'undefined')
            return FBInstant;
        else
            return null;
    }
});
