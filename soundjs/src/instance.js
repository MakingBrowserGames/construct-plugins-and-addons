"use strict";

{
    const BEHAVIOR_CLASS = SDK.Behaviors.stranianelliSoundJS;

    BEHAVIOR_CLASS.Instance = class stranianelliSoundJSInstance extends SDK.IBehaviorInstanceBase {
        constructor(sdkBehType, behInst) {
            super(sdkBehType, behInst);
        }

        Release() {}

        OnCreate() {}

        OnPropertyChanged(id, value) {}

        LoadC2Property(name, valueString) {
            return false; // not handled
        }
    };
}
