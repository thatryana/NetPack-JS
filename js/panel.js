/***
 * Panel class is used to create UI Panels
 ***/
var Panel = exports.Panel = function(name, I) {
	var I = I || {
		rect: new gamesjs.Rect([0,0], [SCREEN_W, SCREEN_H]),
		name: name
	};

	I.color = I.color;
	I.borderWidth = I.borderWidth;

	I.draw = function(context) {
		var context = context || ctx;
		draw.rect(context, this.color, this.rect, this.borderWidth);
	};

	I.center = function() {
		return { 
			x: this.rect.left + this.rect.width/2,
			y: this.rect.top + this.rect.height/2
		};
	};

	return I;
};