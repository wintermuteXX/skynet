/**
 * Room Position prototypes
 */

RoomPosition.prototype.countFreePositions = function () {
  let freeSpaceCount: number = 0;
  let terrain = new Room.Terrain(this.roomName);
  [this.x - 1, this.x, this.x + 1].forEach(x => {
    [this.y - 1, this.y, this.y + 1].forEach(y => {
      if (!(x == this.x && this.y == y)) {
        if (terrain.get(this.x, this.y) !== TERRAIN_MASK_WALL) freeSpaceCount++;
      }
    }, this);
  }, this);
  return freeSpaceCount;
};

RoomPosition.prototype.toString = function (htmlLink = true, id = undefined) {
  if (htmlLink) {
    var onClick = '';
    if (id)
      onClick +=
        `angular.element('body').injector().get('RoomViewPendingSelector').set('${id}');` +
        `angular.element($('body')).scope().$broadcast('roomObjectSelected', _.filter(angular.element(document.getElementsByClassName('room ng-scope')).scope().Room.objects, (o)=>o._id==='${id}')[0]);`;
    return `<a href="#!/room/${Game.shard.name}/${this.roomName}" onClick="${onClick}">[${this.roomName} ${this.x},${this.y}]</a>`;
  }
  return `[${this.roomName} ${this.x},${this.y}]`;
};
