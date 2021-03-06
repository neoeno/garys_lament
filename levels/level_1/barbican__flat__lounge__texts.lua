local Text = require "lib/text"

local M = {}

M.e = Text.make_simple_sequence_text({
    "e is reading the Wikipedia article on Scottish Argentines.",
    "e: 'Frequently, Scottish Argentines are wrongly referred to as English.' ugh aren’t we all, scottish argentines"
})

M.window_left = Text.make_simple_sequence_text({
    "Shakespeare tower looks grey and confronting.",
    "You see a window with four large pieces of paper stuck to the walls.",
    "You imagine they are interior design plans, for a renovation."
})

M.window_right = Text.make_simple_sequence_text({
    "You look up. Every floor has a little yellow light illuminating the stairwell.",
    "They go up for 20 or so floors.",
    "After that they are obscured by the building. It's getting dark."
})

M.desk = Text.make_simple_sequence_text({
    "at the start of the Grahek book he distinguishes two kinds of pain that we all know intuitively:",
    "that sharp, immediate pain you might feel if you step on a pin;",
    "and that duller pain you might feel if you have some sort of injury.",
    "and, he says, the 'point' of the first kind of pain is to tell you to get your hand away from that flame - to avoid injury.",
    "and the second kind of pain is to get you to protect it, keep it still, to promote healing.",
    "the first kind of pain makes you move",
    "the second kind of pain makes you still."
})

M.phone = Text.make_simple_sequence_text({
    "You recently changed your tinder to - Gender: Female - Looking for: Women.",
    "The quality of the profiles dramatically improved, but no one talks to you, still.",
    "Strangely, you feel more fearful than before.",
    "Oh! A new match!"
})

M.coffee = Text.make_simple_sequence_text({
    "Coffee's getting cold.",
    "Better drink up, you're late for work."
})

M.bookcase_top = Text.make_simple_sequence_text({
    "This book has a page marked...",
    "...it struck me mainly by its lack of naturalness, a sort of act against nature, and therefore artificial and absurd.",
    "Walking, sitting, lying down, going up or down, all the actions of the body now seemed to me to have a necessity of their own...",
    "...and therefore a naturalness, but copulation, on the contrary, seemed an extravagant exertion...",
    "...for which the human body was not made and to which it could not adapt itself without effort and fatigue."
})

M.bookcase_bottom = Text.make_simple_sequence_text({
    "You pick out a book at random.",
    "Companies are subject to capitalism, but within companies exist other sorts of societies.",
    "Authoritarian, fascist, socialist, even further capitalist societies develop inside.",
    "Living in the society confers certain benefits, just like the state. Universal basic income already exists in almost every company.",
    "However, unlike the state - our society has a complex and rigorous citizenship test, and exile is common."
})

return M
