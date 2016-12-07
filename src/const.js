let OldFPS = 30;
let FPS = 60;

export default {
    OldFPS: OldFPS,
    FPS: FPS,

    Gravity: 3 * OldFPS / FPS,

    HImpulse: 2 * OldFPS / FPS,
    VImpulse: 2 * OldFPS / FPS,

    NormalThrust: 5 * OldFPS / FPS,
    MaxHVel: 16 * OldFPS / FPS,

    GliderWidth: 48,
    GliderHeight: 20,

    BallWidth: 32,
    BallHeight: 32,
    BallGravity: 3 * OldFPS / FPS / FPS,

    CopterWidth: 32,
    CopterHeight: 30,
    CopterHVel: 1 * OldFPS / FPS,
    CopterVVel: 2 * OldFPS / FPS,

    BalloonWidth: 24,
    BalloonHeight: 30,
    BalloonHVel: 0 * OldFPS / FPS,
    BalloonVVel: -2 * OldFPS / FPS,

    DripGravity: .5 * OldFPS / FPS,

    Ground: 310,
    Ceil: 8
};
