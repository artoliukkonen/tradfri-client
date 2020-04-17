const BULBS = {};
BULBS.SOHVA = 65540;
BULBS.MAKKARI = 65537;
BULBS.PAX = 65542;
BULBS.TABLE = 65544;
BULBS.LAMP = 65543;

const PLUGS = {};
PLUGS.VITRIINI = 65538;
PLUGS.PORTAAT = 65539;

const floors = {
  'Alakerta': [
    BULBS.SOHVA,
    BULBS.TABLE,
    BULBS.LAMP,
    PLUGS.VITRIINI,
    PLUGS.PORTAAT,
  ],
  'Yläkerta': [
    BULBS.MAKKARI,
    BULBS.PAX,
  ],
};

const presets = [
  {
    name: 'Aamu',
    icon: 'morning',
    bulbs: [
      {
        id: BULBS.SOHVA,
        brightness: 5,
      },
      {
        id: BULBS.LAMP,
        brightness: 20
      },
      {
        id: BULBS.MAKKARI,
        brightness: 15
      },
    ]
  },
  {
    name: 'Ilta',
    icon: 'evening',
    bulbs: [
      {
        id: BULBS.SOHVA,
        brightness: 25,
      },
      {
        id: BULBS.LAMP,
        brightness: 40
      },
      {
        id: BULBS.TABLE,
        brightness: 40
      },
      {
        id: BULBS.MAKKARI,
        brightness: 15
      },
    ],
    plugs: [
      {
        id: PLUGS.VITRIINI,
        on: true,
      },
      {
        id: PLUGS.PORTAAT,
        on: true,
      }
    ],
  },
  {
    name: 'Yö',
    icon: 'night',
    bulbs: [
      ...Object.keys(BULBS).map(b => ({ id: BULBS[b], on: false }))
    ],
    plugs: [
      ...Object.keys(PLUGS).map(b => ({ id: PLUGS[b], on: false }))
    ]
  }
];

export { BULBS, PLUGS, floors, presets };