local M = {}

M.ON_TINT = vmath.vector4(0.94, 0.91, 0.88, 1);
M.SHADE_TINT_3 = vmath.vector4((0.94/4)*3, (0.91/4)*3, (0.88/4)*3, 1);
M.SHADE_TINT_2 = vmath.vector4((0.94/4)*2, (0.91/4)*2, (0.88/4)*2, 1);
M.SHADE_TINT_1 = vmath.vector4((0.94/4), (0.91/4), (0.88/4), 1);
M.OFF_TINT = vmath.vector4(1, 1, 1, 0);

return M
