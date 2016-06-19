local machine = require('vendor.statemachine')

local state = machine.create({
    initial = "stopped",
    events = {
        -- Start animating a new section
        { name = "animate",  from = {"showing", "stopped"},   to = "animating" },
        -- Complete the animation naturally
        { name = "complete", from = "animating",              to = "showing" },
        -- Skip the rest of the animation
        { name = "skip",     from = "animating",              to = "showing" },
        -- Close the dialogue panel
        { name = "finish",   from = "showing",                to = "stopped" },
    },
    callbacks = {
        onbeforeanimate = function(a,b,c,d,msg) text = msg end,
        onstatechange =   function(a,b,c,d,e)
            print("T",a,b,c,d,e)
            msg.post("/dialog#gui", "text_machine_state_change", {event = b})
        end
    }
})

function text_machine()
    return state
end

function get_current_text()
    return text
end
