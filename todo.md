# Todo

## 1.1 Ideas

## Bugs
- Bugs now present when having preset tiles (minimum config):
Cannot convert undefined or null to object
    at WFCRunner.recalculateEntropyGroup
## 2.2 Renders
- JSON output render (e.g for unity)
  
## 2.3 More rule options
- Restricting usage of same tile in vertical or horisontal
 -- Maybe instead of vertical and horisontal, we can expand on the idea of "chunks".
 -- Allowing horizontal or vertical just be a "chunk". Current neighbor calculations can also just be a "chunk" calculation. So I can combine all these concepts into the same concept, different functions return different "chunks". All tiles can thus be part of several "chunks" that need to be evaluated. Code could be fairly simple, however scripting setup in config is the difficult part.
- Restricting usage of same tile within a "range", e.g 3x3 grid.
- Somehow defining a "grid"-size, that splits the board into "smaller" mini-boards/chunks
- With the above 3 rule options, it should be possible to create a sudoko tile-set, and have a simple random sudoku solver, including preassign tiles and backtracking on error we should have a fully functional sudoku solver.


## 2.4 Debug and json
- Debug show json object for tiles, sets, mappings
- Debug show progress, time, and retry/failed state
- Editor to live edit json objects

## 2.5 Data loaders (WFCTiles)
- E.g auto detecting tile edges (pixel detection), and assigning to socket. Configurable, e.g color closeness.
- Pixel-based WFC. Load in image, detect neighbors to pixels, and generate pieceMap with valid neighbors. Requires another render, that renders colors instead of images.
- These require new seperate config objects.

