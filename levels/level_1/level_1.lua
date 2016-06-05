local current_map = "bedroom"

local PORTALS = {
    bedroom = {
        ["0,2"] = { map = "lounge", position = {tx = 6, ty = 6, orientation = "west"} }
    },
    lounge = {
        ["7,6"] = { map = "bedroom", position = {tx = 1, ty = 2, orientation = "east"} }
    }
}

function is_portal_at(pos)
    return portal_at(pos) ~= nil
end

function portal_at(pos)
    print(current_map, pos.tx, pos.ty)
    return PORTALS[current_map] and PORTALS[current_map][pos.tx..","..pos.ty]
end

function change_current_map(map)
    current_map = map
end

function get_current_map()
    return current_map
end