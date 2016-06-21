return {
  version = "1.1",
  luaversion = "5.1",
  tiledversion = "0.14.2",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 7,
  height = 11,
  tilewidth = 64,
  tileheight = 64,
  nextobjectid = 63,
  properties = {},
  tilesets = {},
  layers = {
    {
      type = "imagelayer",
      name = "Background",
      x = 0,
      y = 0,
      visible = true,
      opacity = 1,
      image = "barbican__flat__lounge.png",
      properties = {}
    },
    {
      type = "objectgroup",
      name = "Objects",
      visible = true,
      opacity = 1,
      offsetx = 0,
      offsety = 0,
      properties = {},
      objects = {
        {
          id = 6,
          name = "Flat",
          type = "Room",
          shape = "rectangle",
          x = 0,
          y = 64,
          width = 384,
          height = 576,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 7,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 320,
          y = 64,
          width = 64,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 9,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 320,
          y = 384,
          width = 64,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 11,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 0,
          y = 384,
          width = 192,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 12,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 0,
          y = 64,
          width = 64,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {}
        }
      }
    },
    {
      type = "objectgroup",
      name = "Talkers",
      visible = true,
      opacity = 1,
      offsetx = 0,
      offsety = 0,
      properties = {},
      objects = {
        {
          id = 19,
          name = "Bookcase",
          type = "",
          shape = "rectangle",
          x = 320,
          y = 384,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "bookcase-top"
          }
        },
        {
          id = 22,
          name = "Phone",
          type = "",
          shape = "rectangle",
          x = 128,
          y = 384,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "phone"
          }
        },
        {
          id = 30,
          name = "Shakespeare Tower",
          type = "",
          shape = "rectangle",
          x = 0,
          y = 0,
          width = 192,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "window-left"
          }
        },
        {
          id = 31,
          name = "Shakespeare House 2",
          type = "",
          shape = "rectangle",
          x = 192,
          y = 0,
          width = 192,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "window-right"
          }
        },
        {
          id = 36,
          name = "Coffee",
          type = "",
          shape = "rectangle",
          x = 0,
          y = 192,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "coffee"
          }
        },
        {
          id = 40,
          name = "Bookcase 2",
          type = "",
          shape = "rectangle",
          x = 320,
          y = 448,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "bookcase-bottom"
          }
        },
        {
          id = 42,
          name = "Desk Notebook",
          type = "",
          shape = "rectangle",
          x = 320,
          y = 64,
          width = 64,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "desk"
          }
        }
      }
    },
    {
      type = "objectgroup",
      name = "Portals",
      visible = true,
      opacity = 1,
      offsetx = 0,
      offsety = 0,
      properties = {
        ["facing"] = "south",
        ["map"] = "corridor",
        ["tx"] = "6",
        ["ty"] = "0",
        ["walk"] = "true"
      },
      objects = {
        {
          id = 59,
          name = "To Bedroom",
          type = "",
          shape = "rectangle",
          x = 384,
          y = 256,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["facing"] = "east",
            ["map"] = "barbican__flat__bedroom",
            ["tx"] = "1",
            ["ty"] = "4"
          }
        },
        {
          id = 60,
          name = "To Corridor",
          type = "",
          shape = "rectangle",
          x = 192,
          y = 640,
          width = 128,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["facing"] = "south",
            ["map"] = "barbican__corridor",
            ["tx"] = "31",
            ["ty"] = "0",
            ["walk"] = "true"
          }
        }
      }
    }
  }
}
