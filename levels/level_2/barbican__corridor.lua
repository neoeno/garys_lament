return {
  version = "1.1",
  luaversion = "5.1",
  tiledversion = "0.14.2",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 39,
  height = 3,
  tilewidth = 64,
  tileheight = 64,
  nextobjectid = 66,
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
      image = "barbican__corridor.png",
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
          id = 50,
          name = "",
          type = "Room",
          shape = "rectangle",
          x = 64,
          y = 64,
          width = 2368,
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
          id = 60,
          name = "",
          type = "",
          shape = "rectangle",
          x = 320,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "door_1"
          }
        },
        {
          id = 61,
          name = "",
          type = "",
          shape = "rectangle",
          x = 704,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "door_2"
          }
        },
        {
          id = 62,
          name = "",
          type = "",
          shape = "rectangle",
          x = 960,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "door_3"
          }
        },
        {
          id = 63,
          name = "",
          type = "",
          shape = "rectangle",
          x = 1344,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "door_4"
          }
        },
        {
          id = 64,
          name = "",
          type = "",
          shape = "rectangle",
          x = 1600,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "door_5"
          }
        },
        {
          id = 65,
          name = "",
          type = "",
          shape = "rectangle",
          x = 2240,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["text"] = "door_7"
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
      properties = {},
      objects = {
        {
          id = 56,
          name = "My flat",
          type = "",
          shape = "rectangle",
          x = 1984,
          y = 0,
          width = 64,
          height = 64,
          rotation = 0,
          visible = true,
          properties = {
            ["facing"] = "north",
            ["map"] = "barbican__flat__lounge",
            ["tx"] = "4",
            ["ty"] = "9"
          }
        }
      }
    }
  }
}
