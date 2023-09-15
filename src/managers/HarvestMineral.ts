import * as ProfileLib from '../lib/profile';
import * as OrderLib from '../lib/order';
import * as HarvesterMineral from '../roles/HarvesterMineral';
import { Order } from '../classes/Order';
import { Role } from '../enums/role';
import { Priority } from '../enums/priority';
import { CreepService } from '../services/Creep';
import { RoomService } from '../services/Room';
import { Manager } from './_Manager';

export class HarvestMineralManager extends Manager {
  private roomService: RoomService;
  private creepService: CreepService;

  readonly MEMORY_LASTRUN = 'lastRun';

  constructor(roomService: RoomService, creepService: CreepService) {
    super('HarvestMineralManager');
    this.roomService = roomService;
    this.creepService = creepService;
  }

  public run(pri: Priority) {
    if (pri === Priority.Low) {
      this.creepService.runCreeps(Role.HarvesterMineral, HarvesterMineral.run);

      const lastRun = this.getValue(this.MEMORY_LASTRUN);
      if (!lastRun || lastRun + 20 < Game.time) {
        const rooms = this.roomService.getNormalRooms();
        for (const room of rooms) {
          this.organizeMineralHarvesting(room);
        }
        this.setValue(this.MEMORY_LASTRUN, Game.time);
      }
    }
  }

  private organizeMineralHarvesting(room: Room) {
    const mineralSource = room.getMineralID();
    this.orderMineralHarvesters(room, mineralSource, room.name);
  }

  private orderMineralHarvesters(room: Room, mineralId: string, sourceRoom: string) {
    const spawn = room.getSpawn();
    if (!spawn) {
      return;
    }

    const sourceTarget = sourceRoom + '-' + mineralId;
    const active = this.creepService.getCreeps(Role.HarvesterMineral, sourceTarget, room.name).length;
    const ordered = OrderLib.getCreepsInQueue(room, Role.HarvesterMineral, sourceTarget);

    if (active + ordered === 0) {
      const order = new Order();
      const maxTier = ProfileLib.getMaxTierSimpleWorker(room.energyCapacityAvailable);
      order.body = ProfileLib.getSimpleWorkerBody(maxTier);
      if (room.name === sourceRoom) {
        order.priority = Priority.Important;
      } else {
        order.priority = Priority.Standard;
      }
      order.memory = {
        role: Role.HarvesterMineral,
        tier: maxTier,
        target: sourceTarget
      };
      OrderLib.orderCreep(room, order);
    }
  }
}
