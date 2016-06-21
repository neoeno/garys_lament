local _ = require "vendor/moses"
local C = require "main/constants"

local movement_input_state = {
    up = false,
    down = false,
    left = false,
    right = false
}

local has_engagement_intent = false

local active_direction_key = nil

function is_engagement_key(key)
    return C.KEY_TYPES[key] == "engagement"
end

function is_movement_key(key)
    return C.KEY_TYPES[key] == "movement"
end

local M = {}

M.accept_input = function(hashed_action_id, action)
    local key = C.HASHED_ACTION_TO_KEY[hashed_action_id]
    if is_movement_key(key) then
        if action.value == 1 then
            movement_input_state[key] = true
            active_direction_key = key
        else
            movement_input_state[key] = false
        end
    elseif is_engagement_key(key) then
        if action.pressed then
            has_engagement_intent = true
        elseif action.released then
            has_engagement_intent = false
        end
    end
end

M.has_movement_intent = function()
    return movement_input_state[active_direction_key] == true
end

M.pop_engagement_intent = function()
    if has_engagement_intent then
        has_engagement_intent = false
        return true
    end
end

M.get_movement_intent = function()
    return C.KEY_TO_MOVEMENT[active_direction_key]
end

return M
