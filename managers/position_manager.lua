local Space = require "lib/space"
local machine = require "vendor/statemachine"

local X_IDX = 1
local Y_IDX = 2

local player_pos

local player_state = machine.create({
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
        onstatechange = function(a,b,c,d,e)   print("P",a,b,c,d,e) end
    }
})

function move_player(movement)
    player_pos = Space.position_after_movement(player_pos, movement)
end

function clone_pos(pos)
    return {
        tx = pos.tx,
        ty = pos.ty,
        orientation = pos.orientation
    }
end

local M = {}

M.player_state = function()
    return player_state;
end

M.set_player_position = function(pos)
    player_pos = clone_pos(pos)
end

M.set_orientation = function(orientation)
    player_pos.orientation = orientation
end

M.get_player_position = function()
    return clone_pos(player_pos)
end

return M
