local Text = require "lib/text"

local M = {}

M.window_left = Text.make_simple_sequence_text({
    "You watch a man in high-vis and a helmet near one of the farther off terraces.",
    "He is looking up and holding his head.",
    "Then he looks at the floor and picks something up, examines it, shows it to an interested passer-by.",
    "Lucky escape."
})

M.window_right = Text.make_simple_sequence_text({
    "There are no seagulls here.",
    "You're getting scared about dying young again."
})

M.desk = Text.make_simple_sequence_text({
    "Yesterday I rewarded myself using a smile and happy gesture for noticing that I was doing a string of low-priority tasks...",
    "...without doing the metacognition for putting the top priorities on top.",
    "Noticing a mistake is a good habit, which I’ve been training myself to reward, instead of just feeling bad."
})

M.phone = Text.make_simple_sequence_text({
    "You have started sending a gif to everyone you match with on tinder.",
    "You try to make the gifs relate to their profile. You're talking to quite a lot of people now. It's OK."
})

M.coffee = Text.make_simple_sequence_text({
    "There is an eyelash in your coffee."
})

M.bookcase_top = Text.make_simple_sequence_text({
    "This book has a page marked...",
    "...but such are the ties upon men, to wear the ties they are permitted to wear, without agreement.",
    "and this is perhaps where the will of politics fails, in the small places,",
    "undiscussed/undiscussable, that add up, to the tie rack of life."
})

M.bookcase_bottom = Text.make_simple_sequence_text({
    "You pick out a book at random...",
    "There is a virgin forest in each; a snowfield where even the print of birds' feet is unknown.",
    "Here we go alone, and like it better so.",
    "Always to have sympathy, always to be accompanied, always to be understood would be intolerable."
})

return M
