/**
 * Every photo on the site goes through this map, so swapping a temporary photo for a
 * genuine Serviceberry photograph is a one-line change.
 *
 * `stock/` photos are free-licence Unsplash images used until Serviceberry supplies its own
 * (the workbook asks for genuine project photos before launch). Put company photos in
 * public/images/serviceberry/ and point the entries below at them.
 */
const s = (name: string) => `/images/stock/${name}.jpg`;
const sb = (name: string) => `/images/serviceberry/${name}.jpg`;

/**
 * Photos taken from the Serviceberry brochure (Sept 2025). They are small (300–1250px wide),
 * so use them in cards and panels, not full-screen. Ask Serviceberry for the originals.
 */
export const brochure = {
  crewPigging: sb("crew-pigging"),
  pigOnDeck: sb("pig-on-deck"),
  crewIntelligentPig: sb("crew-intelligent-pig"),
  rovSurvey: sb("rov-survey"),
  descalerBeforeAfter: sb("descaler-before-after"),
  scaledElbow: sb("scaled-elbow"),
  hdpeShop: sb("hdpe-pipes-shop"),
  hdpePipes: sb("hdpe-pipes"),
  plantDusk: sb("plant-dusk"),
  elecsysNetwork: sb("elecsys-network"),
  watchdogUnit: sb("watchdog-unit"),
  aerialPlant: sb("aerial-plant"),
  coverPipes: sb("cover-pipes"),
  plantTowers: sb("plant-towers"),
  qhseEngineer: sb("qhse-engineer"),
  valveWorkshop: sb("valve-workshop"),
  yellowPipeline: sb("yellow-pipeline"),
  waxBeaker: sb("wax-beaker"),
  pipework: sb("pipework"),
  valveHand: sb("valve-hand"),
  manifoldBlue: sb("manifold-blue"),
} as const;

export const img = {
  // hero + chapters
  hero: s("night-plant-4"),
  chapterClean: s("pipe-trees"),
  chapterInspect: s("rig-sunset"),
  chapterProtect: s("night-plant-1"),
  chapterSource: s("rig-supply"),
  photoBand: s("rig-group"),

  // services
  pigging: s("pipe-field"),
  commissioning: s("pipe-forest"),
  assetIntegrity: s("plant-pipes"),
  chemicals: s("drums-stack"),
  monitoring: s("control-screens"),
  procurement: s("tanks-blue"),
  valves: s("valves-red"),

  // people
  engTool: s("eng-tool"),
  engPhone: s("eng-phone"),
  engHardhat: s("engineer-hardhat"),
  engPortrait: s("engineer-gear"),
  workerPole: s("worker-pole"),
  workerHardhat: s("worker-hardhat2"),
  workerMono: s("worker-hardhat3"),
  workersStairs: s("workers-stairs"),
  grinding: s("grinding"),

  // detail shots
  valveGauge: s("valve-gauge"),
  valveActuator: s("valve-actuator"),
  valveSky: s("valve-sky"),
  valvesPipes: s("valves-pipes"),
  valvesRusty: s("valves-rusty"),
  weld: s("weld-2"),
  weldSparks: s("weld-1"),
  drumsDark: s("drums-dark"),
  machineWhite: s("machine-white"),
  factoryMachinery: s("factory-machinery"),
  pipeBlue: s("pipe-blue"),
  pipeGrass: s("pipe-grass"),
  pipeValley: s("pipe-valley"),
  pipeRed: s("pipe-red"),
  structureLadders: s("structure-ladders"),
  tanksSnow: s("tanks-snow"),
  blueprints: s("blueprints"),
  nightPlant2: s("night-plant-2"),
  nightPlant3: s("night-plant-3"),
  nightMoon: s("night-moon"),
  rigOcean: s("rig-ocean"),
  rigPlain: s("rig-plain"),
  vesselCrane: s("vessel-crane"),
  oilpump: s("oilpump-water"),
} as const;
