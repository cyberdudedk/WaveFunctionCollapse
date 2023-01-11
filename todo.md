# Todo

# 1.1 Ideas
- Starting position
  - Topleft, toppcenter, topright, centerleft, centercenter/mid, centerright, bottomleft, bottomcenter, bottomright, random lowestentry.
- Debug show json object for tiles, sets, mappings
- Debug show progress, time, and retry/failed state
- Events for when retrying, failed states.
- Editor to live edit json objects
- On render draw, only redraw affected tiles, should speed up superImposedDrawing that takes a long render time.
  - Maybe runner should contain a array of "changes", and send both full board and changes to callback.
- Speed up calculating if fully finished/should stop by using a counter instead (counter == width*height). So we don't need to loop all tiles
- Speed up entropyGroups by caching the groups, and update whenever a validpiece or tile is set. So we don't need to loop all tiles
- Multiple renders
  - e.g one for generated, one for superImposed states), ability to assign multiple renders, with config for rendering.
- Ability to preassign tiles, during run
  - Extend this with UseMouse so mouse can select a tile (left click = cycle, right click continue), or mouseover hover and keyboard number to set tile, to be calculated usage during run.
- Extend size and continue run => ever expanding.

- Data loaders (WFCTiles)
  - E.g auto detecting tile edges (pixel detection), and assigning to socket. Configurable, e.g color closeness.
  - Pixel-based WFC. Load in image, detect neighbors to pixels, and generate pieceMap with valid neighbors. Requires another render, that renders colors instead of images.
  - These require new seperate config objects.

- Renders
  - Pixel-based color render
  - JSON output render (e.g for unity)


- More rule options
  - Restricting usage of same tile in vertical or horisontal
  - Restricting usage of same tile within a "range", e.g 3x3 grid.
  - Somehow defining a "grid"-size, that splits the board into "smaller" mini-boards/chunks
  - With the above 3 rule options, it should be possible to create a sudoko tile-set, and have a simple random sudoku solver, including preassign tiles and backtracking on error we should have a fully functional sudoku solver.