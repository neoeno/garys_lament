return {
  version = "1.1",
  luaversion = "5.1",
  tiledversion = "0.14.2",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 7,
  height = 6,
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
      image = "barbican__flat__bedroom.png",
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
          id = 25,
          name = "",
          type = "Room",
          shape = "rectangle",
          x = 64,
          y = 64,
          width = 384,
          height = 320,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 26,
          name = "Bed",
          type = "Furniture",
          shape = "rectangle",
          x = 256,
          y = 128,
          width = 192,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 27,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 384,
          y = 256,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 28,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 384,
          y = 64,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 44,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 64,
          y = 64,
          width = 64,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 59,
          name = "Player",
          type = "",
          shape = "rectangle",
          x = 320,
          y = 256,
          width = 64,
          height = 64,
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
          id = 29,
          name = "Bed",
          type = "",
          shape = "rectangle",
          x = 256,
          y = 128,
          width = 192,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "bed"
          }
        },
        {
          id = 33,
          name = "Bedside table",
          type = "",
          shape = "rectangle",
          x = 384,
          y = 64,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "table-top"
          }
        },
        {
          id = 34,
          name = "Bedside Table 2",
          type = "",
          shape = "rectangle",
          x = 384,
          y = 256,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "table-bottom"
          }
        },
        {
          id = 38,
          name = "Bedroom window",
          type = "",
          shape = "rectangle",
          x = 64,
          y = 0,
          width = 384,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "window"
          }
        },
        {
          id = 45,
          name = "Vanity",
          type = "",
          shape = "rectangle",
          x = 64,
          y = 64,
          width = 64,
          height = 128,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "vanity"
          }
        },
        {
          id = 61,
          name = "Mess",
          type = "",
          shape = "rectangle",
          x = 128,
          y = 128,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "mess"
          }
        },
        {
          id = 62,
          name = "Plaster",
          type = "",
          shape = "rectangle",
          x = 256,
          y = 256,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "plaster"
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
          id = 60,
          name = "To Lounge",
          type = "",
          shape = "rectangle",
          x = 0,
          y = 256,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["facing"] = "west",
            ["map"] = "barbican__flat__lounge",
            ["tx"] = "5",
            ["ty"] = "4"
          }
        }
      }
    }
  }
}
