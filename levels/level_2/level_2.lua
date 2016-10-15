local bedroom_data = require "levels/level_2/barbican__flat__bedroom"
local lounge_data = require "levels/level_2/barbican__flat__lounge"
local corridor_data = require "levels/level_2/barbican__corridor"
local bedroom_texts = require "levels/level_2/barbican__flat__bedroom__texts"
local lounge_texts = require "levels/level_2/barbican__flat__lounge__texts"
local corridor_texts = require "levels/level_2/barbican__corridor__texts"

local maps = {
    barbican__flat__bedroom = bedroom_data,
    barbican__flat__lounge = lounge_data,
    barbican__corridor = corridor_data
}

local texts = {
    barbican__flat__bedroom = bedroom_texts,
    barbican__flat__lounge = lounge_texts,
    barbican__corridor = corridor_texts
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

M.get_npcs = function()
    return {
        {
            id = "geoff",
            sprite = "player",
            x = 192,
            y = 192,
            width = 64,
            height = 64
        }
    }
end

M.get_texts = function()
    return texts[active_map_name]
end

return M
