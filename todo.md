# Todo

## 1.1 Ideas

## 2.1 Performance
- On render draw, only redraw affected tiles, should speed up superImposedDrawing that takes a long render time.
  - Maybe runner should contain a array of "changes", and send both full board and changes to callback.

## 2.2 Renders
- Configuarable (only draw superImposed states)
- Multiple renders at the same time
- Pixel-based color render
- JSON output render (e.g for unity)
  
## 2.3 More rule options
- Restricting usage of same tile in vertical or horisontal
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

