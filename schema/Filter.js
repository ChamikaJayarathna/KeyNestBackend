import mongoose from "mongoose";

const FilterSchema = new new mongoose.Schema({
  outdoorFeatures: {
    swimmingPool: {
      type: Boolean,
      default: false,
    },
    balcony: {
      type: Boolean,
      default: false,
    },
    garage: {
      type: Boolean,
      default: false,
    },
    shed: {
      type: Boolean,
      default: false,
    },
    fullyFenced: {
      type: Boolean,
      default: false,
    },
    outdoorSpa: {
      type: Boolean,
      default: false,
    },
    tennisCourt: {
      type: Boolean,
      default: false,
    },
    outdoorArea: {
      type: Boolean,
      default: false,
    },
  },
  indoorFeatures: {
    dishwasher: {
      type: Boolean,
      default: false,
    },
    builtInRobes: {
      type: Boolean,
      default: false,
    },
    broadband: {
      type: Boolean,
      default: false,
    },
    floorboards: {
      type: Boolean,
      default: false,
    },
    study: {
      type: Boolean,
      default: false,
    },
    workshop: {
      type: Boolean,
      default: false,
    },
    alarmSystem: {
      type: Boolean,
      default: false,
    },
    gym: {
      type: Boolean,
      default: false,
    },
  },
  climateFeatures: {
    heating: {
      type: Boolean,
      default: false,
    },
    solarPanels: {
      type: Boolean,
      default: false,
    },
    fireplace: {
      type: Boolean,
      default: false,
    },
    waterTank: {
      type: Boolean,
      default: false,
    },
    airConditioning: {
      type: Boolean,
      default: false,
    },
    solarHotWater: {
      type: Boolean,
      default: false,
    },
  },
  accessibilityFeatures: {
    singleStorey: {
      type: Boolean,
      default: false,
    },
    stepFreeEntry: {
      type: Boolean,
      default: false,
    },
    wideDoorways: {
      type: Boolean,
      default: false,
    },
    rollInShower: {
      type: Boolean,
      default: false,
    },
    elevator: {
      type: Boolean,
      default: false,
    },
    bathroomGrabRails: {
      type: Boolean,
      default: false,
    },
    accessibleParking: {
      type: Boolean,
      default: false,
    },
  },
});

export default FilterSchema;
