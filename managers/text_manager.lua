local machine = require('vendor.statemachine')

local state = machine.create({
    initial = "stopped",
    events = {
        { name = "animate",  from = {"showing", "stopped"},   to = "animating" },
        { name = "complete", from = "animating",              to = "showing" },
        { name = "skip",     from = "animating",              to = "showing" },
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
