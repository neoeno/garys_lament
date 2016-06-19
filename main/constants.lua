local M = {}

M.ON_TINT = vmath.vector4(0.94, 0.91, 0.88, 1);
M.SHADE_TINT_3 = vmath.vector4((0.94/4)*3, (0.91/4)*3, (0.88/4)*3, 1);
M.SHADE_TINT_2 = vmath.vector4((0.94/4)*2, (0.91/4)*2, (0.88/4)*2, 1);
M.SHADE_TINT_1 = vmath.vector4((0.94/4), (0.91/4), (0.88/4), 1);
M.OFF_TINT = vmath.vector4(1, 1, 1, 0);

M.KEY_TO_MOVEMENT = {
    ["up"] = {0, -1},
    ["down"] = {0, 1},
    ["left"] = {-1, 0},
    ["right"] = {1, 0}}

M.ORIENTATION_TO_MOVEMENT = {
    north = {0, -1},
    south = {0, 1},
    west = {-1, 0},
    east = {1, 0}
}

M.HASHED_ACTION_TO_KEY = {
    [hash("key_up")] = "up",
    [hash("key_down")] = "down",
    [hash("key_left")] = "left",
    [hash("key_right")] = "right",
    [hash("key_space")] = "space",
    [hash("key_enter")] = "enter"
}
M.KEY_TYPES = {
    up = "movement",
    down = "movement",
    left = "movement",
    right = "movement",
    space = "engagement",
    enter = "engagement"
}

return M
