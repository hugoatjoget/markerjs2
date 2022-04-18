import {    TextMarker} from "../markers/text-marker/TextMarker";
import {  SvgHelper} from "../core/SvgHelper";
import { TextMarkerState } from '../markers/text-marker/TextMarkerState';
  
  export class DrawSignature extends TextMarker {
  
    strokeColor = 'transparent';
    strokeWidth = 0;
    strokeDasharray = '';
    border;
    //strokePanel;
    //strokeWidthPanel;
    bgRectangle;
    //colorPanel;
    //fontFamilyPanel;
    // title = "";
    // icon = "";
    public static typeName = 'DrawSignature';
    public static title = 'Draw Signature';
    public static icon = '<svg viewBox="0 0 24 24"><path d="M 12 9 C 11 7 11 12 7 14 L 5 15 L 5 18 C 12 12 12 11 13 14 C 14 18 16 19 19 17 L 19 9 C 18 14 17 17 15 15 Z M 2 4 V 21 H 22 V 4 H 2 M 20 19 H 4 V 6 H 20 V 17 Z" /></svg>';
    public text = 'Draw Signature';

    constructor(container, overlayContainer, settings) {
      super(container, overlayContainer, settings);
  
      this.strokeColor = 'purple';//settings.defaultColor;
      this.strokeWidth = settings.defaultStrokeWidth;
      //Leave default solid border style
      this.strokeDasharray = settings.defaultStrokeDasharray;
      this.setStrokeColor = this.setStrokeColor.bind(this);
      this.setStrokeWidth = this.setStrokeWidth.bind(this);
  
      // this.strokePanel = new ColorPickerPanel(
      //   'Border color',
      //   settings.defaultColorSet,
      //   this.strokeColor
      // );
      // this.strokePanel.onColorChanged = this.setStrokeColor;
  
      // this.strokeWidthPanel = new LineWidthPanel(
      //   'Border width',
      //   settings.defaultStrokeWidths,
      //   this.strokeWidth
      // );
      // this.strokeWidthPanel.onWidthChanged = this.setStrokeWidth;
    }

    /**
   * Returns current marker state that can be restored in the future.
   */
     public getState(): TextMarkerState {
      const result = super.getState();
      result.typeName = DrawSignature.typeName;
  
      return result;
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
      //return [this.colorPanel, this.strokePanel, this.strokeWidthPanel, this.fontFamilyPanel];
      return [];
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
  
  DrawSignature.typeName = "DrawSignature";
  DrawSignature.title = "Draw Signature";
  //Dummy icon. Simply borrowing the triangle shape icon.
  DrawSignature.icon = '<svg viewBox="0 0 24 24"><path d="M 12 9 C 11 7 11 12 7 14 L 5 15 L 5 18 C 12 12 12 11 13 14 C 14 18 16 19 19 17 L 19 9 C 18 14 17 17 15 15 Z M 2 4 V 21 H 22 V 4 H 2 M 20 19 H 4 V 6 H 20 V 17 Z" /></svg>';
  
  //`<svg viewBox="0 0 24 24"><path d="M12,2L1,21H23M12,6L19.53,19H4.47" /></svg>`;
