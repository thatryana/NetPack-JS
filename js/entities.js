var font = require("gamejs/font");

var GameObject = exports.GameObject = function(tileIndex, txt, color) {
	this.tileIndex = tileIndex || [0, 0];
	this.txt = txt || "";
	this.color = color || "";

	var fontString = (TILE_H * 2) + "px Courier";
	this.font = new font.Font(fontString);
	
	// Force refresh calc of rect
	this.moved = true;

	return this;
}

GameObject.prototype.draw = function() {
	ctx.blit(this.font.render(this.txt, this.color), this.rect);
};

GameObject.prototype.move = function(dRow, dCol) {
	var targetRow = this.tileIndex[ROW] + dRow;
	var targetCol = this.tileIndex[COL] + dCol;
	
	if (loadedLevel.getTile(this).warp) {
		if (this.tileIndex[COL] == 0 && dCol == -1) {
			gamejs.info('{' + this.txt + '} Warping left to right');
			this.tileIndex[COL] = TILE_COLS - 1;
			this.moved = true;
		} else if (this.tileIndex[COL] == TILE_COLS - 1 && dCol == 1) {
			gamejs.info('{' + this.txt + '} Warping right to left');
			this.tileIndex[COL] = 0;
			this.moved = true;
		}
	}

	if (targetCol >= 0 && targetCol < TILE_COLS && targetRow >= 0 && targetRow < TILE_ROWS) {
		var targetTile = loadedLevel.tiles[targetRow][targetCol];
		if (!targetTile.blocked) {
			this.tileIndex[ROW] = targetRow;
			this.tileIndex[COL] = targetCol;
			this.moved = true;
		}
	}

	if (this.moved) {
		gamejs.info('{' + this.txt + '} moved to [' + this.tileIndex[ROW] + ", " + this.tileIndex[COL] + "]");
	}
};

GameObject.prototype.updateRect = function() {
	if (this.moved) {
		var tileRect = loadedLevel.getRect(this);
		var left = tileRect.left + PLAYER_PADDING[0];
		var top = tileRect.top + PLAYER_PADDING[1];
		var width = tileRect.width - (PLAYER_PADDING[0] * 2);
		var height = tileRect.height - (PLAYER_PADDING[1] * 2);

		this.rect = new gamejs.Rect([left, top], [width, height]);
		this.moved = false;
	}
};

var Player = exports.Player = function(tileIndex, proto) {
	this.tileIndex = tileIndex;
	this.txt = "@";
	this.color = "yellow";

	return this;
};

Player.prototype = new GameObject();

Player.prototype.update = function() {
	var events = gamejs.event.get();
	var p = this;
	events.forEach(function(event) {
		if (event.type === gamejs.event.KEY_UP) {
			switch (event.key) {
				case gamejs.event.K_UP: case gamejs.event.K_k: case gamejs.event.K_w: {
					p.move(-1, 0);
					break;
				}
				case gamejs.event.K_RIGHT: case gamejs.event.K_l: case gamejs.event.K_d: {
					p.move(0, 1);
					break;
				}
				case gamejs.event.K_DOWN: case gamejs.event.K_j: case gamejs.event.K_s: {
					p.move(1, 0);
					break;
				}
				case gamejs.event.K_LEFT: case gamejs.event.K_h: case gamejs.event.K_a: {
					p.move(0, -1);
					break;
				}
			}
		}
	});

	this.updateRect();
};

var Ghost = exports.Ghost = function(tileIndex, txt) {
	this.tileIndex = tileIndex;
	this.txt = txt;

	this.color = "white";
	switch(txt) {
		case "B": {
			this.color = "red";
			break;
		}
		case "P": {
			this.color = "pink";
			break;
		}
		case "I": {
			this.color = "blue";
			break;
		}
		case "A": {
			this.color = "orange";
			break;
		}
	}

	return this;
};

Ghost.prototype = new GameObject();
Ghost.prototype.update = function() {
	// TODO: Ghost AI
	this.updateRect();
};

var Pellet = exports.Pellet = function(tileIndex, txt) {
	this.tileIndex = tileIndex;
	this.txt = txt;
	this.color = loadedLevel.pelletColor;
	this.isPowerPellet = txt == 'o';

	return this;
};

Pellet.prototype = new GameObject();
Pellet.prototype.draw = function() {
	var rad = this.isPowerPellet ? POWER_PELLET_RAD : PELLET_RAD;
	var width = this.isPowerPellet ? POWER_PELLET_W : PELLET_W;
	draw.circle(ctx, this.color, loadedLevel.getRect(this).center, rad, width);
}

