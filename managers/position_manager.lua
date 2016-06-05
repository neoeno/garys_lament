local player_tx
local player_ty
local player_orientation
local X_IDX = 1
local Y_IDX = 2
local moving = false;

function set_player_position(xt, yt, orientation)
    print ("Setting initial position")
    player_tx = xt
    player_ty = yt
    player_orientation = orientation
end

function move_player(movement)
    player_tx = player_tx + movement[X_IDX]
    player_ty = player_ty + movement[Y_IDX]
end

function set_orientation(orientation)
    player_orientation = orientation
end

function movement_orientation(movement)
    if movement[X_IDX] == 0 then 
        -- we're going north or south
        return movement[Y_IDX] == 1 and "north" or "south"
    else
        -- we're going east or west
        return movement[X_IDX] == 1 and "east" or "west"
    end
end

function set_moving_flag(bool)
    moving = bool
end

function is_moving()
    return moving
end

function get_player_position()
    return {tx = player_tx, ty = player_ty, orientation = player_orientation}
end

function movement_from_name(hashed_key_name)
    return ({
        [hash("key_up")] = {0, 1},
        [hash("key_down")] = {0, -1},
        [hash("key_right")] = {1, 0},
        [hash("key_left")] = {-1, 0}
    })[hashed_key_name]
end

function position_after_movement(player_pos, movement)
    -- doesn't do orientation. we'll fix this upon extraction
    return {
        tx = player_pos.tx + movement[1],
        ty = player_pos.ty + movement[2]
    }
end

function px_to_tx(px)
    return ((px + 32) / 64)
end

function py_to_ty(py)
    return ((py - 32) / 64) + 1
end

function tx_to_px(tx)
    return (tx * 64) - 32
end

function ty_to_py(ty)
    return ((ty - 1) * 64) + 32
end