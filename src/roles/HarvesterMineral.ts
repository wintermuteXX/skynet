/**
 * HarvesterMineral
 *
 * Harvests mineral from MineralSource
 */

import * as _Common from '../rolelib/common';

enum State {
  HarvestMineral = 1
}

export function run(creep: Creep) {
  if (!creep.hasState()) {
    creep.setState(State.HarvestMineral);
  }

  switch (creep.getState()) {
    case State.HarvestMineral:
      runHarvestMineral(creep);
      break;
    default:
      _Common.logCreepStateWarning(creep);
      creep.setState(State.HarvestMineral);
      break;
  }
}

function runHarvestMineral(creep: Creep) {

  const source = getTargetSource(creep);
  if (source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
}

function getTargetSource(creep: Creep) {
  if (!creep.memory.source && creep.memory.target) {
    creep.memory.source = creep.memory.target.split('-')[1] as Id<Source>;
  }
  if (!creep.memory.source) {
    return null;
  }
  return Game.getObjectById(creep.memory.source);
}
