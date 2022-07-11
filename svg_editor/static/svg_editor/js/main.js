const svgns = "http://www.w3.org/2000/svg";
const SVGEditor = (function () {
    function SVGEditor(editorConfig) {
        this.objects = [];
        this.originalMousePosition = null;
        this.lastMousePosition = null;
        this.currentMousePosition = null;
        this.createdObject = null;
        // this.focusedObject = null;
        this.svg = SVGEditor.createSVG(editorConfig.dimension);
        this.attachEvents(this.svg);
        this.createMenu();
        // this.codeSection = document.createElement("pre");
        let editor = document.createElement("div");
        editor.classList.add("svg-editor");
        // editor.appendChild(menu);
        editor.appendChild(this.svg);
        // editor.appendChild(this.codeSection);
        editorConfig.element.appendChild(editor);
    }

    SVGEditor.createSVG = function (dimension) {
        let svg = document.createElementNS(svgns, "svg");
        svg.setAttribute("width", dimension.width);
        svg.setAttribute("height", dimension.height);
        return svg;
    };
    SVGEditor.prototype.attachEvents = function (svg) {
        svg.addEventListener("mousedown", this.onMouseDown.bind(this));
        svg.addEventListener("mousemove", this.onMouseMove.bind(this));
        svg.addEventListener("mouseup", this.onMouseUp.bind(this));
    };
    SVGEditor.prototype.createMenu = function () {
        this.menuSettings = {
            shape: "path",
            color: "black",
            fill: "none",
            size: 7
        };
    };
    SVGEditor.prototype.onMouseDown = function (event) {
        this.createdObject = document.createElementNS(svgns, this.menuSettings.shape);
        this.createdObject.setAttributeNS(null, "fill", this.menuSettings.fill);
        this.createdObject.setAttributeNS(null, "stroke", this.menuSettings.color);
        this.createdObject.setAttributeNS(null, "stroke-width", String(this.menuSettings.size));
        this.svg.appendChild(this.createdObject);
        this.originalMousePosition = this.lastMousePosition = this.currentMousePosition = {
            x: event.offsetX,
            y: event.offsetY
        };
        switch (this.menuSettings.shape) {
            case "path":
                let start = "M " + this.currentMousePosition.x + " " + this.currentMousePosition.y;
                this.createdObject.setAttributeNS(null, "d", start);
        }
    };
    SVGEditor.prototype.onMouseMove = function (event) {
        // Ignore if not in mouse event
        if (this.originalMousePosition === null)
            return;
        this.lastMousePosition = this.currentMousePosition;
        this.currentMousePosition = {x: event.offsetX, y: event.offsetY};
        this.updateCurrentObject();
    };
    SVGEditor.prototype.onMouseUp = function () {
        // If shape is nothing
        if (this.originalMousePosition.x !== this.currentMousePosition.x ||
            this.originalMousePosition.y !== this.currentMousePosition.y) {
            this.objects.push(this.createdObject);
            // this.focus(this.createdObject);
        } else if (this.menuSettings.shape !== "path") {
            this.svg.removeChild(this.createdObject);
        }
        this.originalMousePosition = this.lastMousePosition = this.currentMousePosition = null;
        this.createdObject = null;
    };
    SVGEditor.prototype.updateCurrentObject = function () {
        switch (this.menuSettings.shape) {
            case "path":
                let d = this.createdObject.getAttribute("d") + " l ";
                d += this.currentMousePosition.x - this.lastMousePosition.x;
                d += " ";
                d += this.currentMousePosition.y - this.lastMousePosition.y;
                this.createdObject.setAttributeNS(null, "d", d);
        }
    };
    return SVGEditor;
}());
document.addEventListener("DOMContentLoaded", function () {
    new SVGEditor({
        element: document.body,
        dimension: {
            width: "100%",
            height: "500px"
        }
    });
}, false);