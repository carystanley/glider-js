
export function animate(frame, fpf, totalFrames) {
    return Math.floor(frame/fpf) % totalFrames;
};
