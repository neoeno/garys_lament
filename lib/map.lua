local _ = require('vendor.moses')

local M = {}

M.get_objects_by_type = function(map, type)
    return _.select(
        _.findWhere(map["layers"], {name = "Objects"})["objects"],
        function (n, obj) return obj.type == type end
    )
end

M.get_portals = function(map)
    return _.findWhere(map["layers"], {name = "Portals"})["objects"]
end

M.is_portal_at = function(map, pos)
    return _.findWhere(M.get_portals(map), M.tile_pos_to_px_pos(pos)) ~= nil
end

M.portal_at = function(map, pos)
    return M.convert_tiled_portal(_.findWhere(M.get_portals(map), M.tile_pos_to_px_pos(pos)))
end

M.tile_pos_to_px_pos = function(pos)
    return {
        x = pos.tx * 16,
        y = pos.ty * 16
    }
end

M.convert_tiled_portal = function(portal)
    return {
        position = {
            tx = tonumber(portal.properties.tx),
            ty = tonumber(portal.properties.ty),
            orientation = portal.properties.facing,
        },
        map = portal.properties.map
    }
end

M.position_is_walkable = function(map, pos)
    return (_.countf(M.get_objects_by_type(map, "Room"), function(n, object)
        return M.object_covers(object, pos)
    end) > 0) and _.all(M.get_objects_by_type(map, "Furniture"), function(n, object)
        return not M.object_covers(object, pos)
    end)
end

M.object_covers = function(object, pos)
    local px_pos = M.tile_pos_to_px_pos(pos)
    return (
        (px_pos.x >= object.x) and
        (px_pos.x < (object.x + object.width)) and
        (px_pos.y >= object.y) and
        (px_pos.y < (object.y + object.height))
    )
end

return M
