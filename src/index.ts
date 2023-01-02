import { WFCTiles } from './WFCTiles';
import { WFCRender } from "./WFCRender";

(<any>window).getWFCRender = function getWFCRender(canvasId: string) {
    return new WFCRender(canvasId);
};

(<any>window).getWFC = function getWFC() {
    return new WFCTiles();
};