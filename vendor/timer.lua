--- Module that can be used to get a callback when a certain amount of time has elapsed
--
-- @usage
-- local timer = require "timer"
-- function ini(self)
--      timer.seconds(2, function()
--          print("2 seconds have elapsed")
--      end)
-- end
--
-- function update(self, dt)
--      timer.update(dt)
-- end

local M = {}

local timers = {}

--- Get a callback when a certain number of seconds has elapsed
-- @param seconds The number of seconds to wait before invoking the callback
-- @param callback The function to call when the specified number of seconds has elapsed
function M.seconds(seconds, callback)
    table.insert(timers, { seconds = seconds, callback = callback })
end

--- Get a callback when a certain number of frames have elapsed
-- @param frames The number of frames to wait before invoking the callback
-- @param callback The function to call when the specified number of frames has elapsed
function M.frames(frames, callback)
    if frames == 0 then
        callback()
    else
        table.insert(timers, { frames = frames, callback = callback })
    end
end

--- Cancel all timers. Callbacks will NOT be invoked.
function M.cancel_all()
    timers = {}
end

--- Call this function once per frame to continuously check for completed timers
-- @param dt Time in seconds that has elapsed since the last call
function M.update(dt)
    for k,timer in pairs(timers) do
        if timer.frames then
            timer.frames = timer.frames - 1
            if timer.frames == 0 then
                timers[k] = nil
                timer.callback()
            end
        elseif timer.seconds then
            timer.seconds = timer.seconds - dt
            if timer.seconds <= 0 then
                timers[k] = nil
                timer.callback()
            end
        end
    end
end


return M