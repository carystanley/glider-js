
export function loadImage(url, options) {
    options = options || {};
    var image = new Image();
    if (options.onload)
        image.on('load', options.onload);
    image.src = url;
    return image;
}

export function loadSprites(images, config) {
    var sprites = {};
    var meta = config.meta;
    var sheet = images[meta.image];
    Object.keys(config.frames).forEach(function(id) {
        var frame = config.frames[id];
        sprites[id] = {
            frame: frame.frame,
            origin: frame.origin,
            sheet: sheet
        };
    });
    return sprites;
}
