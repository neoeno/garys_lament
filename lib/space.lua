local C = require "main/constants"

local X_IDX = 1
local Y_IDX = 2

local M = {}

M.movement_orientation = function(movement)
    if movement[X_IDX] == 0 then
        -- we're going north or south
        return movement[Y_IDX] == 1 and "south" or "north"
    else
        -- we're going east or west
        return movement[X_IDX] == 1 and "east" or "west"
    end
end

M.position_after_movement = function(pos, movement)
    return {
        tx = pos.tx + movement[X_IDX],
        ty = pos.ty + movement[Y_IDX],
        orientation = pos.orientation
    }
end

M.position_facing = function(pos)
    local movement = C.ORIENTATION_TO_MOVEMENT[pos.orientation]
    return M.position_after_movement(pos, movement)
end

M.reverse_orientation = function(orientation)
    if orientation == 'north' then
        return 'south'
    elseif orientation == 'south' then
        return 'north'
    elseif orientation == 'east' then
        return 'west'
    elseif orientation == 'west' then
        return 'east'
    end
end

M.px_to_tx = function(px)
    return ((px + 32) / 64) - 1
end

M.py_to_ty = function(py)
    return (((py - 32) / 64) + 1)*-1
end

M.tx_to_px = function(tx)
    return ((tx + 1) * 64) - 32
end

M.ty_to_py = function(ty)
    return (((ty*-1) - 1) * 64) + 32
end

return M
