"use strict";

{
    const PLUGIN_CLASS = SDK.Plugins.StraniAnelli_DragAndDropFiles;

    PLUGIN_CLASS.Instance = class StraniAnelli_DragAndDropFiles_Instance extends SDK.IWorldInstanceBase
    {
        constructor(sdkType, inst)
        {
            super(sdkType, inst);

            // Lazy-created IWebGLText object for button text
            this._webglText = null;
        }

        Release()
        {
            // Release the WebGL text if it was created
            if (this._webglText)
            {
                this._webglText.Release();
                this._webglText = null;
            }
        }

        OnCreate()
        {
            // Default to top-left origin
            this._inst.SetOrigin(0, 0);
        }

        OnPlacedInLayout()
        {
            // Set default size
            this._inst.SetSize(300, 300);
        }

        // Most of the code relating to drawing the button text is based on the editorTextPlugin template.
        // See that plugin template for more text rendering demonstration code.
        _UpdateWebGLText(iRenderer, iLayoutView)
        {
            if (!this._webglText) // lazy-create
            {
                const fontsize = parseInt(this._inst.GetPropertyValue("font-size"), 10);
                this._webglText = iRenderer.CreateWebGLText();
                this._webglText.SetFontSize(fontsize);
                this._webglText.SetTextureUpdateCallback(() => iLayoutView.Refresh());
                this._webglText.SetHorizontalAlignment("center");
                this._webglText.SetVerticalAlignment("center");
            }

            const textZoom = iLayoutView.GetZoomFactor();
            this._webglText.SetSize(this._inst.GetWidth(), this._inst.GetHeight(), textZoom);

            this._webglText.SetText(this._inst.GetPropertyValue("control-text"));
        }

        // Render a button label on a grey background for the editor as a placeholder.
        // Note the pixel-snapping path for text rendering is omitted for brevity. See the editorTextPlugin
        // template for a full text rendering implementation.
        Draw(iRenderer, iDrawParams)
        {
            const iLayoutView = iDrawParams.GetLayoutView();
            this._UpdateWebGLText(iRenderer, iLayoutView);

            this._inst.ApplyBlendMode(iRenderer);
            iRenderer.SetColorFillMode();

            const quad = this._inst.GetQuad();

            // Draw grey fill and black outline for button background
            iRenderer.SetColorRgba(0.99, 0.99, 0.99, 1);
            iRenderer.Quad(quad);

            iRenderer.SetColorRgba(0.1, 0.1, 0.1, 1);
            iRenderer.LineQuad(quad);

            // Draw button text on top
            const texture = this._webglText.GetTexture();
            if (!texture) return; // not yet loaded WebGLText - just ignore and skip rendering text, it'll appear momentarily

            iRenderer.SetTextureFillMode();
            iRenderer.SetTexture(texture);
            iRenderer.ResetColor();
            iRenderer.Quad3(quad, this._webglText.GetTexRect());
        }

        OnPropertyChanged(id, value)
        {}

        LoadC2Property(name, valueString)
        {
            return false; // not handled
        }
    };
}