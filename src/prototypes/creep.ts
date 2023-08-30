/**
 * Creep prototypes
 */

Creep.prototype.hasState = function () {
  return this.memory.state !== undefined;
};

Creep.prototype.getState = function () {
  return this.memory.state;
};

Creep.prototype.setState = function (state: number) {
  this.memory.state = state;
};

Creep.prototype.getHomeroom = function () {
  return this.memory.homeroom;
};

Creep.prototype.isInHomeroom = function () {
  return this.memory.homeroom === this.room.name;
};

Creep.prototype.isEmpty = function () {
  if (this._isEmpty === undefined) {
    this._isEmpty = !this.store.getUsedCapacity();
  }
  return this._isEmpty;
};

Creep.prototype.isFull = function () {
  if (this._isFull === undefined) {
    this._isFull = !this.store.getFreeCapacity();
  }
  return this._isFull;
};

Creep.prototype.toString = function (htmlLink = true) {
  if (htmlLink) {
      var onClick = "";
      if (this.id)
          onClick +=
              `angular.element('body').injector().get('RoomViewPendingSelector').set('${this.id}');` +
              `angular.element($('body')).scope().$broadcast('roomObjectSelected', _.filter(angular.element(document.getElementsByClassName('room ng-scope')).scope().Room.objects, (o)=>o._id==='${this.id}')[0]);`;
      return `<a href="#!/room/${Game.shard.name}/${this.room.name}" onClick="${onClick}">[${this.name ? this.name : this.id}]</a>`;
  }
  return `[${this.name ? this.name : this.id}]`;
}
