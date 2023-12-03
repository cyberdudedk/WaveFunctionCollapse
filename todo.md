# Todo

## 2.1 Backtracking extended
- Implement grid
  - Reset in a x*x grid around the problem area, essentially removing any of those positions from the replay.
- Nice to have tracking paths on other implementations, linear, exponential, grid.
- Implement combination
  - Not entire sure what to implement here. But suggestions on the internet was to use a combination of these implementation to get best results.

- Speed/performance for backtracking can vary much depending on tileset/configuration, so in some cases backtracking is not good and very slow compared to reset. But in other cases, randomly resetting can also lead to extened solve time if there is a high chance of collision. Full backtracking will almost guaruantee a solve, however will take a long time. Linear is too slow in many cases, exponetial seems to be a good match, but it often leads to entire resets very quickly after a few backtracks. Grid is a suggestion from the internet, but it's very dimension and size depended. Combination could be some form of combination where x attempts of full, then x attempts of linear is attemptet, then after x amount of tries, go to exponential for x amount of times, until a grid backtrack might be more sufficient, and then do that x amount of times and then go full reset.
So lets say 20% of each, or maybe should take into account to reset attempts every time a new level is used.
E.g x amount of times each
full -> linear -> full -> exponential -> full -> linear -> full -> grid -> full -> linear -> full -> linear -> exponential -> full -> linear -> full -> reset (start over)
The problem is trying to get something that actually tries to solve the problem at hand, instead of giving up and resetting, but also not doing a full search as that is slow especially in cases where collisions are high, as there can be a good chance that the collision is due to early placements, but only seen near the end. So in many cases much faster to reset and try over, but also means many false failures due to randomness, backtracking defenitely helps with more successful solves.

## 2.2 Debug and json
- Debug show json object for tiles, sets, mappings
- Debug show progress, time, and retry/failed state
- Editor to live edit json objects

## 2.3 Data loaders (WFCTiles)
- E.g auto detecting tile edges (pixel detection), and assigning to socket. Configurable, e.g color closeness.
- Pixel-based WFC. Load in image, detect neighbors to pixels, and generate pieceMap with valid neighbors. Requires another render, that renders colors instead of images.
- These require new seperate config objects.