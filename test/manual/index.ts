// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Activator, FrameMarker, MarkerArea, Style } from '../../src';
import { DisplayMode } from '../../src/core/Settings';
import { MarkerAreaState } from '../../src/MarkerAreaState';

export * from './../../src/index';

export class Experiments {
  private markerArea1: MarkerArea;
  private displayMode: DisplayMode = 'inline';
  private currentState: MarkerAreaState;

  private oddLaunch = true;

  constructor() {
    this.renderResult = this.renderResult.bind(this);
    //Activator.addKey('1234');
  }

  public openMarkerArea(target: HTMLImageElement): void {
    this.markerArea1 = new MarkerArea(target);
    Style.styleSheetRoot = document.head;

    this.markerArea1.addRenderEventListener(this.renderResult);
    //this.markerArea1.addCloseEventListener(() => alert('close'));
    this.markerArea1.addEventListener('beforeclose', (event) => {
      if (!confirm('close?')) {
        event.preventDefault();
      }
    });
    //this.markerArea1.addEventListener('show', () => document.body.style.backgroundColor = 'cyan');
    //this.markerArea1.addEventListener('restorestate', () => document.body.style.backgroundColor = 'magenta');
    this.markerArea1.addEventListener('markercreating', (event) => console.log(`creating: ${event.marker?.typeName}`));
    this.markerArea1.addEventListener('markercreate', (event) => console.log(`created: ${event.marker?.typeName}`));
    this.markerArea1.addEventListener('markerselect', (event) => console.log(`selected: ${event.marker?.typeName}`));
    this.markerArea1.addEventListener('markerdeselect', (event) => console.log(`deselected: ${event.marker?.typeName}`));
    this.markerArea1.addEventListener('markerdelete', (event) => console.log(`deleted: ${event.marker?.typeName}`));
    this.markerArea1.addEventListener('markerbeforedelete', (event) => {
      if (!confirm('delete?')) {
        event.preventDefault();
      }
    });

    // this.markerArea1.addEventListener('markercreate', event => event.markerArea.createNewMarker('FrameMarker'));


    this.markerArea1.settings.displayMode = this.displayMode;
    this.markerArea1.settings.popupMargin = 10;

    this.markerArea1.settings.defaultColorsFollowCurrentColors = true;

    this.markerArea1.targetRoot = document.getElementById('app');
    
    // this.markerArea1.settings.defaultStrokeWidth = 10;

    this.markerArea1.settings.newFreehandMarkerOnPointerUp = true;

    // this.markerArea1.uiStyleSettings.toolbarHeight = 40;
    // if (this.oddLaunch) {
    //   this.markerArea1.uiStyleSettings.toolbarColor = 'blue';
    // }
    // this.oddLaunch = !this.oddLaunch;

    // this.markerArea1.uiStyleSettings.zIndex = '5000';

    this.markerArea1.uiStyleSettings.selectButtonColor = 'lightblue';
    this.markerArea1.uiStyleSettings.deleteButtonColor = 'red';
    this.markerArea1.uiStyleSettings.okButtonColor = 'green';
    this.markerArea1.uiStyleSettings.closeButtonColor = 'yellow';
    
    // this.markerArea1.uiStyleSettings.undoButtonVisible = false;
    this.markerArea1.uiStyleSettings.redoButtonVisible = true;
    this.markerArea1.uiStyleSettings.notesButtonVisible = true;
    this.markerArea1.uiStyleSettings.zoomButtonVisible = true;
    this.markerArea1.uiStyleSettings.zoomOutButtonVisible = true;

    this.markerArea1.uiStyleSettings.clearButtonVisible = true;

    this.markerArea1.uiStyleSettings.logoPosition = 'right';

    // this.markerArea1.uiStyleSettings.toolbarBackgroundColor = '#FF0000';
    // this.markerArea1.uiStyleSettings.toolboxBackgroundColor = '#00FF00';

    // this.markerArea1.uiStyleSettings.toolbarStyleColorsClassName = 'toolbar';
    // this.markerArea1.uiStyleSettings.toolbarButtonStyleColorsClassName = 'toolbar-button';
    // this.markerArea1.uiStyleSettings.toolbarActiveButtonStyleColorsClassName = 'toolbar-active-button';

    // this.markerArea1.uiStyleSettings.toolboxButtonRowStyleColorsClassName = 'toolbox';
    // this.markerArea1.uiStyleSettings.toolboxButtonStyleColorsClassName = 'toolbox-button';
    // this.markerArea1.uiStyleSettings.toolboxActiveButtonStyleColorsClassName = 'toolbox-active-button';
    // this.markerArea1.uiStyleSettings.toolboxPanelRowStyleColorsClassName = 'toolbox-panel-row';

    // this.markerArea1.uiStyleSettings.notesAreaStyleClassName = 'notes-area';

    // this.markerArea1.availableMarkerTypes = ['CalloutMarker', ...this.markerArea1.BASIC_MARKER_TYPES];
    this.markerArea1.availableMarkerTypes = this.markerArea1.ALL_MARKER_TYPES;

    // this.markerArea1.renderWidth = 1000;
    // this.markerArea1.renderHeight = 400;
    // this.markerArea1.renderAtNaturalSize = true;
    // this.markerArea1.renderImageType = 'image/jpeg';
    // this.markerArea1.renderImageQuality = 0.2;
    // this.markerArea1.renderMarkersOnly = true;

    // this.markerArea1.renderTarget = <HTMLCanvasElement>document.getElementById('resultCanvas');

    this.markerArea1.show();
    if (this.currentState) {
      this.markerArea1.restoreState(this.currentState);
    }
  }

  private renderResult(dataUrl: string, state: MarkerAreaState) {
    (document.getElementById('resultImage1') as HTMLImageElement).src = dataUrl;
    this.currentState = JSON.parse(JSON.stringify(state));
    console.log(JSON.stringify(this.currentState));
  }

  public async render(resultTarget: HTMLImageElement): Promise<void> {
    resultTarget.src = await this.markerArea1.render();
    this.markerArea1.close();
  }

  public setDisplayMode(mode: DisplayMode): void {
    this.displayMode = mode;
  }

  public closeMarkerArea(): void {
    if (this.markerArea1) {
      this.markerArea1.close();
    }
  }

  public addFrameMarker(): void {
    if (this.markerArea1) {
      this.markerArea1.createNewMarker(FrameMarker);
    }
  }
  public deleteCurrentMarker(): void {
    if (this.markerArea1) {
      this.markerArea1.deleteSelectedMarker();
    }
  }
  public renderAndClose(): void {
    if (this.markerArea1) {
      this.markerArea1.startRenderAndClose();
    }
  }

  public renderState(): void {
    (document.getElementById('resultImage1') as HTMLImageElement).src = '';

    this.markerArea1 = new MarkerArea(document.getElementById('testImage1'));
    this.markerArea1.addEventListener('render', (event) => this.renderResult(event.dataUrl, event.state));
    this.markerArea1.renderState(this.currentState);
  }

  public openNoUI(target: HTMLImageElement): void {
    this.markerArea1 = new MarkerArea(target);
    this.markerArea1.addRenderEventListener(this.renderResult);
    this.markerArea1.settings.displayMode = this.displayMode;

    // this.markerArea1.uiStyleSettings.toolbarHeight = 0;
    this.markerArea1.uiStyleSettings.hideToolbar = true;
    this.markerArea1.uiStyleSettings.hideToolbox = true;

    this.markerArea1.show();
    if (this.currentState) {
      this.markerArea1.restoreState(this.currentState);
    }
  }

  public getState(): void {
    if (this.markerArea1) {
      this.currentState = this.markerArea1.getState(true);
      console.log(this.currentState);
    }
  }

  public restoreState(): void {
    if (this.markerArea1 && this.currentState) {
      this.markerArea1.restoreState(this.currentState);
    }
  }

}
