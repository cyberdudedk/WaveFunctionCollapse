import { WFCTiles } from './WFCTiles';
import { WFCRender } from "./WFCRender";
import { WFCTextRender } from "./WFCTextRender";
import { WFCRunner } from './WFCRunner';
import { WFCConfig } from './WFCConfig';

(<any>window).getWFCRender = function getWFCRender(canvasId: string) {
    return new WFCRender(canvasId);
};

(<any>window).getWFCTextRender = function getWFCTextRender(canvasId: string) {
    return new WFCTextRender(canvasId);
};

(<any>window).getWFC = function getWFC() {
    return new WFCTiles();
};

(<any>window).getWFCRunner = function getWFCRunner(config: WFCConfig, wfc: WFCTiles) {
    return new WFCRunner(config, wfc);
};