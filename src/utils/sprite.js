
export function animate(frame, fpf, totalFrames) {
    return Math.floor(frame/fpf) % totalFrames;
};

export function drawSprite(ctx, destX, destY, frame, spriteConfig) {
    let frameConfig = spriteConfig[frame];
    let {x, y, w, h} = frameConfig.frame;
    let origin = frameConfig.origin;
    let sheet = frameConfig.sheet;

    ctx.drawImage(
        sheet,
        x, y, w, h,
        Math.round(destX - origin.x), Math.round(destY) - origin.y, w, h
    );
};
