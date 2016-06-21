return {
  version = "1.1",
  luaversion = "5.1",
  tiledversion = "0.14.2",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 8,
  height = 12,
  tilewidth = 64,
  tileheight = 64,
  nextobjectid = 61,
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
          x = 64,
          y = 128,
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
          x = 384,
          y = 128,
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
          x = 384,
          y = 448,
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
          x = 64,
          y = 448,
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
          x = 64,
          y = 128,
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
          id = 17,
          name = "e",
          type = "",
          shape = "rectangle",
          x = 64,
          y = 128,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "e"
          }
        },
        {
          id = 19,
          name = "Bookcase",
          type = "",
          shape = "rectangle",
          x = 384,
          y = 448,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "bookcase_top"
          }
        },
        {
          id = 22,
          name = "Phone",
          type = "",
          shape = "rectangle",
          x = 128,
          y = 448,
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
          x = 64,
          y = 64,
          width = 192,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "window_left"
          }
        },
        {
          id = 31,
          name = "Shakespeare House 2",
          type = "",
          shape = "rectangle",
          x = 256,
          y = 64,
          width = 192,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "window_right"
          }
        },
        {
          id = 36,
          name = "Coffee",
          type = "",
          shape = "rectangle",
          x = 192,
          y = 448,
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
          x = 384,
          y = 512,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "bookcase_bottom"
          }
        },
        {
          id = 42,
          name = "Desk Notebook",
          type = "",
          shape = "rectangle",
          x = 384,
          y = 128,
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
          x = 448,
          y = 320,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["facing"] = "east",
            ["map"] = "barbican__flat__bedroom",
            ["tx"] = "1",
            ["ty"] = "5"
          }
        }
      }
    }
  }
}
