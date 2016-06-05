local m = require "vendor.moses"

local KEY_TO_MOVEMENT = {
    ["up"] = {0, 1},
    ["down"] = {0, -1},
    ["left"] = {-1, 0},
    ["right"] = {1, 0}}

local HASHED_ACTION_TO_KEY = {
        [hash("key_up")] = "up",
        [hash("key_down")] = "down",
        [hash("key_left")] = "left",
        [hash("key_right")] = "right"}

local input_state = {
    ["up"] = false,
    ["down"] = false,
    ["left"] = false,
    ["right"] = false
}

local active_direction_key = nil

function accept_input(hashed_action_id, action)
    local key = HASHED_ACTION_TO_KEY[hashed_action_id]
    if action.value == 1 then
        input_state[key] = true
        active_direction_key = key
    else
        input_state[key] = false
    end
end

function has_movement_intent()
    return m.any(m.values(input_state), m.identity)
end

function get_movement_intent()
    return KEY_TO_MOVEMENT[active_direction_key]
end