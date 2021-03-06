// Canvas' Screen Dimensions (Max w/h)
window.SCREEN_W = 600;
window.SCREEN_H = 600;
// Panel Border Widths
window.FRAME_W = 2;
// Vertical padding between Panels
window.V_PAD = 6;

window.FPS = 25;

// Set these two to an approximate size for the level area
// the actual size will be calculated using the TILE_W/TILE_H and
// TILE_COLS/TILE_ROWS
var lvl_width_px = 400;
var lvl_height_px = 400;
// Number of tiles per Col/Row
window.TILE_COLS = 23;
window.TILE_ROWS = 21;
// Calc a size (in px) that is evenly divisible by the number of
// tiles per row/col to avoid gaps in the grid.
window.TILE_W = Math.ceil(lvl_width_px / TILE_COLS);
window.TILE_H = Math.ceil(lvl_height_px / TILE_ROWS);

// TileIndex Indices
window.ROW = 0;
window.COL = 1;

// Level Panel Dimensions
window.LVL_W = TILE_W * TILE_COLS;
window.LVL_H = TILE_H * TILE_ROWS;

// Status Panel Dimensions
window.STATUS_H = 75;
window.STATUS_W = LVL_W;

// Message Panel Dimensions
window.MSG_H = SCREEN_H - STATUS_H - LVL_H - (V_PAD * 4);
window.MSG_W = LVL_W;
window.MSG_PADDING = 10;
window.MSG_LINES = 4;

// Pellet Info
window.PELLET_RAD = Math.ceil(TILE_W / 10);
window.PELLET_W = 0;
window.PELLET_VAL = 10;
window.POWER_PELLET_RAD = Math.ceil(TILE_W / 5);
window.POWER_PELLET_W = 3;
window.POWER_PELLET_VAL = 50;

window.PLAYER_PADDING = [2, 2];
window.PLAYER_MAX_HP = 10;

window.KILL_POINTS = 600;
window.LEVEL_UP_POINTS = 10000;
