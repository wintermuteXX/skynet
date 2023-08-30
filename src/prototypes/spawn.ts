/**
 * Spawn prototypes
 */

StructureSpawn.prototype.toString = function (htmlLink = true) {
  if (htmlLink) {
      var onClick = "";
      if (this.id)
          onClick +=
              `angular.element('body').injector().get('RoomViewPendingSelector').set('${this.id}');` +
              `angular.element($('body')).scope().$broadcast('roomObjectSelected', _.filter(angular.element(document.getElementsByClassName('room ng-scope')).scope().Room.objects, (o)=>o._id==='${this.id}')[0]);`;
      return `<a href="#!/room/${Game.shard.name}/${this.room.name}" onClick="${onClick}">[${this.name ? this.name : this.id}]</a>`;
  }
  return `[(${this.structureType}) #${this.id}]`;
}
