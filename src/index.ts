import { WFC } from './wfc';

export default WFC;

(<any>window).getWFC = function getWFC(canvasId: string) {
    return new WFC(canvasId);
}