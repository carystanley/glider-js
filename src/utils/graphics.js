export default class Graphics {
    constructor (ctx, spriteConfig) {
        this.ctx = ctx;
        this.spriteConfig = spriteConfig;
    }

    drawSprite(destX, destY, frame) {
        let frameConfig = this.spriteConfig[frame];
        let {x, y, w, h} = frameConfig.frame;
        let origin = frameConfig.origin;
        let sheet = frameConfig.sheet;

        this.ctx.drawImage(
            sheet,
            x, y, w, h,
            Math.round(destX - origin.x), Math.round(destY) - origin.y, w, h
        );
    };
}
