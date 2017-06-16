
export default class Graphics {
    constructor (canvas, spriteConfig) {
        this.spriteConfig = spriteConfig;

        this.canvas = canvas;

        this.width = canvas.width;
        this.height = canvas.height;

        this.displayContext = canvas.getContext('2d');
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = this.width;
        this.bufferCanvas.height = this.height;
        this.ctx = this.bufferCanvas.getContext('2d');
    }

    drawSprite(destX, destY, frame) {
        let frameConfig = this.spriteConfig[frame];
        let {x, y, w, h} = frameConfig.frame;
        let origin = frameConfig.origin;
        let sheet = frameConfig.sheet;

        this.ctx.drawImage(
            sheet,
            x, y, w, h,
            Math.round(destX - origin.x), Math.round(destY - origin.y), w, h
        );
    }

    clear() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    push() {
        this.displayContext.drawImage(this.bufferCanvas, 0, 0, this.width, this.height);
    }
}
