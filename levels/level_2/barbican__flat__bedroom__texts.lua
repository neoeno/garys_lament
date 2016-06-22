local Text = require "lib/text"

local M = {}

M.vanity = Text.make_simple_sequence_text({
    "You look into the mirror.",
    "There is a smudge of black grease on your chin from your new foil razor. Ugh.",
    "You clean it off. You hope it stops doing that soon."
})

M.window = Text.make_simple_sequence_text({
    "Still no flowers. The shoots are doing well though. They must have realised it's not time yet.",
    "They're just prepared. That's good.",
    "Maybe plants are smarter than we thought. They want to be out early to take advantage of the warmth we have made.",
    "Maybe this was their plan all along. Feed us until we ruin the planet and spread them to other worlds."
})

M.table_top = Text.make_simple_sequence_text({
    "The radio is playing some old radio programme about a barrister.",
    "One of the barristers is a woman. She is arguing against hiring another woman barrister.",
    "She says one is surely enough."
})

M.table_bottom = Text.make_simple_sequence_text({
    "This table is very dusty.",
    "You never sleep on this side so you never notice.",
    "Other people do though. Your flat is getting dirty."
})

M.bed = Text.make_simple_sequence_text({
    "We make beds very comfortable because we spend a long time there."
})

M.plaster = Text.make_simple_sequence_text({
    "There is a plaster stuck to the floor here. It has been there for weeks.",
    "Since Shan came to stay, you think. You remember them having some foot complaint. It must have come off.",
    "You leave it there for now. It's under control."
})

M.mess = Text.make_simple_sequence_text({
    "We're supposed to maintain our spaces; it's part of being alive. You're not a very good caretaker right now.",
    "This usually happens when you're depressed. Are you depressed?",
    "You could just put these clothes away. It would only take a minute.",
    "Why aren't you doing it? You don't know."
})


return M
