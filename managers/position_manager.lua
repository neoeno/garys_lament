local machine = require('vendor.statemachine')
local C = require('main/constants')
local _ = require('vendor.moses')

local player_tx
local player_ty
local player_orientation
local X_IDX = 1
local Y_IDX = 2

local _state = machine.create({
    initial = "standing",
    events = {
        { name = "walk",      from = "standing",              to = "walking" },
        { name = "halt",      from = "walking",               to = "standing" },
        { name = "engage",    from = "standing",              to = "engaging" },
        { name = "engage",    from = "engaging",              to = "engaging" },
        { name = "disengage", from = "engaging",              to = "standing" },
        { name = "teleport",  from = "standing",              to = "teleporting" },
        { name = "appear",    from = "teleporting",           to = "standing" }
    },
    callbacks = {
        onbeforewalk =  function(a,b,c,d,msg) move_player(msg) end,
        onstatechange = function(a,b,c,d,e)   print(a,b,c,d,e) end
    }
})

function state()
    return _state;
end

function set_player_position(tx, ty, orientation)
    player_tx = tx
    player_ty = ty
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
        return movement[Y_IDX] == 1 and "south" or "north"
    else
        -- we're going east or west
        return movement[X_IDX] == 1 and "east" or "west"
    end
end

function get_player_position()
    return {tx = player_tx, ty = player_ty, orientation = player_orientation}
end

function position_after_movement(player_pos, movement)
    return {
        tx = player_pos.tx + movement[1],
        ty = player_pos.ty + movement[2]
    }
end

function position_facing(player_pos)
    local movement = C.ORIENTATION_TO_MOVEMENT[player_pos.orientation]
    return position_after_movement(player_pos, movement)
end

function px_to_tx(px)
    return ((px + 32) / 64) - 1
end

function py_to_ty(py)
    return (((py - 32) / 64) + 1)*-1
end

function tx_to_px(tx)
    return ((tx + 1) * 64) - 32
end

function ty_to_py(ty)
    return (((ty*-1) - 1) * 64) + 32
end
