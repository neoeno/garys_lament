local M = {}

M.make_simple_sequence_text = function (lines)
    return function ()
        return coroutine.create(function ()
            for n, line in pairs(lines) do
                coroutine.yield(line)
            end
        end)
    end
end

return M
