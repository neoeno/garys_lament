local Text = require "lib/text"

local M = {}

M.door_1 = Text.make_simple_sequence_text({
    "It's much colder down this end of the corridor. Air conditioning maybe."
})

M.door_2 = Text.make_simple_sequence_text({
    "Some years ago you heard a straight couple having sex. They were on the 2nd floor and you were on the street.",
    "They had left their window open. The evening was warm and quiet, but they were loud.",
    "Ever since, you sometimes imagine you hear them again. But it is always just the TV, or something."
})

M.door_3 = Text.make_simple_sequence_text({
    "The door knob is a few inches above where it should be. You can see the bare wood where the old handle was."
})

M.door_4 = Text.make_simple_sequence_text({
    "You will never be as beautiful as the people behind this door."
})

M.door_5 = Text.make_simple_sequence_text({
    "There is a newborn baby somewhere on this hall.",
    "You hear it crying more nights than not. It's loud, but it doesn't bother you.",
    "Sometimes it sounds awful, like you think something terrible could be happening to it. You consider calling the police.",
    "But it's probably just life.",
    "Why didn't you cry like that when your tooth was hurting so terribly? What changed?"
})

M.door_7 = Text.make_simple_sequence_text({
    "You know these people well.",
    "Very occasionally, around 8am, you will hear a door buzzer. It goes on for a long while.",
    "Sometimes you hear knocking and raised voices.",
    "You remember that your father calls your brother every day to make sure he gets up for work."
})

return M
