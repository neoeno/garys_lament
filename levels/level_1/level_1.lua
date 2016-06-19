local _ = require('vendor.moses')

local current_map = "barbican__flat__bedroom"
local bedroom_data = require "levels/level_1/barbican__flat__bedroom"
local lounge_data =  require "levels/level_1/barbican__flat__lounge"
local maps = {
    barbican__flat__bedroom = bedroom_data,
    barbican__flat__lounge = lounge_data
}

function get_objects_by_type(type)
    return _.select(
        _.findWhere(maps[current_map]["layers"], {name = "Objects"})["objects"],
        function (n, obj) return obj.type == type end
    )
end

function get_portals()
    return _.findWhere(maps[current_map]["layers"], {name = "Portals"})["objects"]
end

function is_portal_at(pos)
    return _.findWhere(get_portals(), tx_pos_to_px_pos(pos)) ~= nil
end

function portal_at(pos)
    return convert_tiled_portal(_.findWhere(get_portals(), tx_pos_to_px_pos(pos)))
end

function change_current_map(map)
    current_map = map
end

function get_current_map()
    return current_map
end

function tx_pos_to_px_pos(pos)
    return {
        x = pos.tx * 16,
        y = pos.ty * 16
    }
end

function convert_tiled_portal(portal)
    pprint()
    return {
        position = {
            tx = tonumber(portal.properties.tx),
            ty = tonumber(portal.properties.ty),
            orientation = portal.properties.facing,
        },
        map = portal.properties.map
    }
end

function position_is_walkable(sthn, pos)
    return (_.countf(get_objects_by_type("Room"), function(n, object)
        return object_covers(object, pos)
    end) > 0) and _.all(get_objects_by_type("Furniture"), function(n, object)
        return not object_covers(object, pos)
    end)
end

function object_covers(object, pos)
    local res = (
        ((pos.tx * 16) >= object.x) and
        ((pos.tx * 16) < (object.x + object.width)) and
        ((pos.ty * 16) >= object.y) and
        ((pos.ty * 16) < (object.y + object.height))
    )
    return res
end
