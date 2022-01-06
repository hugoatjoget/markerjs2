import {    TextMarker} from "../markers/text-marker/TextMarker";
import {  ColorPickerPanel} from "../ui/toolbox-panels/ColorPickerPanel";
import {  LineWidthPanel} from "../ui/toolbox-panels/LineWidthPanel";
import {  SvgHelper} from "../core/SvgHelper";
  
  export class BorderedTextBox extends TextMarker {
  
    strokeColor = 'transparent';
    strokeWidth = 0;
    strokeDasharray = '';
    border;
    strokePanel;
    strokeWidthPanel;
    bgRectangle;
    colorPanel;
    fontFamilyPanel;
    title = "";
    icon ="";

    constructor(container, overlayContainer, settings) {
      super(container, overlayContainer, settings);
  
      this.strokeColor = settings.defaultColor;
      this.strokeWidth = settings.defaultStrokeWidth;
      //Leave default solid border style
      this.strokeDasharray = settings.defaultStrokeDasharray;
      this.setStrokeColor = this.setStrokeColor.bind(this);
      this.setStrokeWidth = this.setStrokeWidth.bind(this);
  
      this.strokePanel = new ColorPickerPanel(
        'Border color',
        settings.defaultColorSet,
        this.strokeColor
      );
      this.strokePanel.onColorChanged = this.setStrokeColor;
  
      this.strokeWidthPanel = new LineWidthPanel(
        'Border width',
        settings.defaultStrokeWidths,
        this.strokeWidth
      );
      this.strokeWidthPanel.onWidthChanged = this.setStrokeWidth;
    }
  
    createBorder() {
      // console.log(this);
      if (this.bgRectangle) {
        SvgHelper.setAttributes(this.bgRectangle, [
          ['fill', 'transparent'],
          ['stroke', this.strokeColor],
          ['stroke-width', this.strokeWidth.toString()],
          ['stroke-dasharray', this.strokeDasharray],
          ['opacity', "1"]
        ]);
      }
    }
  
    setStrokeColor(color) {
      // console.log(this);
      if (this.bgRectangle) {
        SvgHelper.setAttributes(this.bgRectangle, [['stroke', color]]);
      }
      this.strokeColor = color;
    }
  
    setStrokeWidth(width) {
      // console.log(this);
      if (this.bgRectangle) {
        SvgHelper.setAttributes(this.bgRectangle, [['stroke-width', width]]);
      }
      this.strokeWidth = width;
    }
  
    get toolboxPanels() {
      return [this.colorPanel, this.strokePanel, this.strokeWidthPanel, this.fontFamilyPanel];
    }
  
    pointerDown(point, target) {
      if (this.state === 'new') {
        super.pointerDown(point, target);
      }
  
      if (this.state === 'creating') {
        this.createBorder();
      } else {
        super.pointerDown(point, target);
      }
    }
  
    restoreState(state) {
      super.restoreState(state);
      this.createBorder();
    }
  }
  
  BorderedTextBox.typeName = "BorderedTextbox";
  BorderedTextBox.title = "Bordered Textbox";
  //Dummy icon. Simply borrowing the triangle shape icon.
  BorderedTextBox.icon = `<svg viewBox="0 0 24 24"><path d="M 9.6 14 L 12 9.7 L 14.4 14 M 11 6 L 5.5 19 H 7.7 L 8.8 15.5 H 15 L 16.1 19 H 18.3 L 13 6 H 11 Z M 2 4 V 21 H 22 V 4 H 2 M 20 19 H 4 V 6 H 20 V 17 Z" /></svg>`;
  
  //`<svg viewBox="0 0 24 24"><path d="M12,2L1,21H23M12,6L19.53,19H4.47" /></svg>`;
