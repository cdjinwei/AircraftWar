var config = {};
config.PlaneType = {
    HERO:0,
    ENERMY_NOR_1:1,
    ENERMY_BOSS_1:2
};
config.PlaneConfig = [];
config.PlaneConfig[1] = {
    prefabPath:'Prefab/hero',
    speed:500,
    blood:10,
};
config.PlaneConfig[2] = {
    prefabPath:'Prefab/enemy_1',
    speed:500,
    blood:1,
};
config.PlaneConfig[3] = {
    prefabPath:'Prefab/enemy_1',
    speed:500,
    blood:1,
};
// config.EnemyConfig = [];
// config.EnemyConfig[1] = {
//     speed:400,
// };
// config.EnemyConfig[2] = {
//     speed:700
// }
module.exports = config;
