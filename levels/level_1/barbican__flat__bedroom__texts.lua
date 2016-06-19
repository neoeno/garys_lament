local Text = require "lib/text"

local M = {}

M.vanity = Text.make_simple_sequence_text({
    "You look into the mirror.",
    "You fix your hair."
})

M.window = Text.make_simple_sequence_text({
      "It's January, but the flowers are already blooming.",
      "You think some of the new shoots might be daffodils, but you've not lived here long enough to know for sure.",
      "You hope they will be OK. They shouldn't be out. The earth is changing."
})

M.table_top = Text.make_simple_sequence_text({
      "A phone charger. A book on Louis Theremin... ",
      "In the twenty or so pages you have read, Robert Moog tells the story of when he fixed Clara Rockmore's Theremin.",
      "She was the first to truly play Louis' instrument. Some say the instrument was made for her.",
      "But she lived in America, and when Theremin returned to Russia her instrument went unrepaired for years.",
      "After numerous attempts in which Rockmore insisted the instrument was still not right, Moog repaired the Theremin...",
      "She played Summertime with tears in her eyes...",
      "'I was afraid I would never be able to play my instrument again'"
})

M.table_bottom = Text.make_simple_sequence_text({
      "You have left your vibrator out."
})

M.bed = Text.make_simple_sequence_text({
      "You have been sleeping on four pillows so the blood doesn't flow into your head and make your wisdom tooth swell.",
      "You should change your sheets."
})

return M
