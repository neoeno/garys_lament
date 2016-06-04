local player_xt
local player_yt
local player_ticks = {0, 0}
local player_orientation
local X_IDX = 1
local Y_IDX = 2

function set_player_position(xt, yt, orientation)
    print ("Setting initial position")
    player_xt = xt
    player_yt = yt
    player_orientation = orientation
end

function move_player(movement)
    player_xt = player_xt + movement[X_IDX]
    player_yt = player_yt + movement[Y_IDX]
    player_ticks = {movement[X_IDX] * 8, movement[Y_IDX] * 8}
    if movement[X_IDX] == 0 then 
        -- we're going north or south
        player_orientation = movement[Y_IDX] == 1 and "north" or "south"
    else
        -- we're going east or west
        player_orientation = movement[X_IDX] == 1 and "east" or "west"
    end
end

function progress_player_movement()
    if player_ticks[1] > 0 then
        player_ticks[1] = player_ticks[1] - 1 
    elseif player_ticks[1] < 0 then
        player_ticks[1] = player_ticks[1] + 1
    elseif player_ticks[2] > 0 then
        player_ticks[2] = player_ticks[2] - 1
    elseif player_ticks[2] < 0 then
        player_ticks[2] = player_ticks[2] + 1
    end 
end

function player_moving()
    return (player_ticks[1] ~= 0) or (player_ticks[2] ~= 0) 
end

function get_player_position()
    return {xt = player_xt, yt = player_yt, orientation = player_orientation, ticks = player_ticks}
end

function movement_from_name(hashed_key_name)
    return ({
        [hash("key_up")] = {0, 1},
        [hash("key_down")] = {0, -1},
        [hash("key_right")] = {1, 0},
        [hash("key_left")] = {-1, 0}
    })[hashed_key_name]
end

function position_after_movement(player_pos, movement)
    -- doesn't do orientation. we'll fix this upon extraction
    return {
        xt = player_pos.xt + movement[1],
        yt = player_pos.yt + movement[2]
    }
end