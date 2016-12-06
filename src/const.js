let OriginalFramerate = 30;

export default {
    OriginalFramerate: OriginalFramerate,

    Gravity: 3 * OriginalFramerate,

    HImpulse: 2 * OriginalFramerate,
    VImpulse: 2 * OriginalFramerate,

    NormalThrust: 5 * OriginalFramerate,
    MaxHVel: 16 * OriginalFramerate,

    GliderWidth: 48,
    GliderHeight: 20,

    BallWidth: 32,
    BallHeight: 32,
    BallGravity: 3 * OriginalFramerate,

    CopterWidth: 32,
    CopterHeight: 30,
    CopterHVel: 1 * OriginalFramerate,
    CopterVVel: 2 * OriginalFramerate,

    BalloonWidth: 24,
    BalloonHeight: 30,
    BalloonHVel: 0 * OriginalFramerate,
    BalloonVVel: -2 * OriginalFramerate,

    DripGravity: .5 * OriginalFramerate,

    Ground: 310,
    Ceil: 8
};
