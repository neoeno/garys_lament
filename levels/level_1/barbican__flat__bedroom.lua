return {
  version = "1.1",
  luaversion = "5.1",
  tiledversion = "0.14.2",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 8,
  height = 8,
  tilewidth = 16,
  tileheight = 16,
  nextobjectid = 70,
  properties = {},
  tilesets = {
    {
      name = "mytiles",
      firstgid = 1,
      tilewidth = 16,
      tileheight = 16,
      spacing = 0,
      margin = 0,
      image = "../../../../../../../Art/game/src/images/mytiles.png",
      imagewidth = 128,
      imageheight = 112,
      tileoffset = {
        x = 0,
        y = 0
      },
      properties = {},
      terrains = {},
      tilecount = 56,
      tiles = {}
    }
  },
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
          x = 16,
          y = 32,
          width = 96,
          height = 80,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 26,
          name = "Bed",
          type = "Furniture",
          shape = "rectangle",
          x = 64,
          y = 48,
          width = 48,
          height = 32,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 27,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 96,
          y = 80,
          width = 16,
          height = 16,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 28,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 96,
          y = 32,
          width = 16,
          height = 16,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 44,
          name = "",
          type = "Furniture",
          shape = "rectangle",
          x = 16,
          y = 32,
          width = 16,
          height = 32,
          rotation = 0,
          visible = true,
          properties = {}
        },
        {
          id = 59,
          name = "Player",
          type = "",
          shape = "rectangle",
          x = 80,
          y = 80,
          width = 16,
          height = 16,
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
          x = 64,
          y = 48,
          width = 48,
          height = 32,
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
          x = 96,
          y = 32,
          width = 16,
          height = 16,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "table_top"
          }
        },
        {
          id = 34,
          name = "Bedside Table 2",
          type = "",
          shape = "rectangle",
          x = 96,
          y = 80,
          width = 16,
          height = 16,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "table_bottom"
          }
        },
        {
          id = 38,
          name = "Bedroom window",
          type = "",
          shape = "rectangle",
          x = 16,
          y = 16,
          width = 96,
          height = 16,
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
          x = 16,
          y = 32,
          width = 16,
          height = 32,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "vanity"
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
        ["position"] = "6,0",
        ["walk"] = "true"
      },
      objects = {
        {
          id = 60,
          name = "To Lounge",
          type = "",
          shape = "rectangle",
          x = 0,
          y = 80,
          width = 16,
          height = 16,
          rotation = 0,
          visible = true,
          properties = {
            ["facing"] = "west",
            ["map"] = "barbican__flat__lounge",
            ["tx"] = "6",
            ["ty"] = "5"
          }
        }
      }
    }
  }
}
