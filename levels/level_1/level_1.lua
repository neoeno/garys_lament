local current_map_name = "barbican__flat__bedroom"
local bedroom_data = require "levels/level_1/barbican__flat__bedroom"
local lounge_data =  require "levels/level_1/barbican__flat__lounge"
local maps = {
    barbican__flat__bedroom = bedroom_data,
    barbican__flat__lounge = lounge_data
}

function change_current_map(map)
    current_map_name = map
end

function get_current_map_name()
    return current_map_name
end

function get_current_map()
    return maps[current_map_name]
end
