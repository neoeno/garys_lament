local bedroom_data = require "levels/level_1/barbican__flat__bedroom"
local lounge_data =  require "levels/level_1/barbican__flat__lounge"
local bedroom_texts = require "levels/level_1/barbican__flat__bedroom__texts"
local lounge_texts = require "levels/level_1/barbican__flat__lounge__texts"

local maps = {
    barbican__flat__bedroom = bedroom_data,
    barbican__flat__lounge = lounge_data
}

local texts = {
    barbican__flat__bedroom = bedroom_texts,
    barbican__flat__lounge = lounge_texts
}

local active_map_name = "barbican__flat__bedroom"

local M = {}

M.change_map = function(map)
    active_map_name = map
end

M.get_map_layer_name = function(map)
    return active_map_name
end

M.get_map = function()
    return maps[active_map_name]
end

M.get_texts = function()
    return texts[active_map_name]
end

return M
