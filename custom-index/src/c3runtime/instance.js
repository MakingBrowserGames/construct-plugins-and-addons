"use strict";
{
    C3.Plugins.StraniAnelli_CustomINDEX.Instance = class CustomINDEXInstance extends C3.SDKInstanceBase
    {
        constructor(inst, properties)
        {
            super(inst);


            if (properties)
            {}
        }

        Release()
        {
            super.Release();
        }

        SaveToJson()
        {
            return {
                // data to be saved for savegames
            };
        }

        LoadFromJson(o)
        {
            // load state for savegames
        }

        GetDebuggerProperties()
        {
            return [
            {
                title: "CustomINDEX",
                properties: [
                    //{name: ".current-animation",	value: this._currentAnimation.GetName(),	onedit: v => this.CallAction(Acts.SetAnim, v, 0) },
                ]
            }];
        }
    };
}