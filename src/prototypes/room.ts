/**
 * Room prototypes
 */

Room.prototype.getMySpawns = function () {
  if (this._mySpawns === undefined) {
    this._mySpawns = this.find(FIND_MY_SPAWNS);
  }
  return this._mySpawns;
};

Room.prototype.getSpawn = function () {
  if (!this._firstSpawn) {
    this._firstSpawn = this.getMySpawns()?.[0];
  }
  return this._firstSpawn;
};

Room.prototype.getSources = function () {
  if (!this._sources) {
    this._sources = this.find(FIND_SOURCES);
  }
  return this._sources;
};

Room.prototype.getMineral = function () {
  if (this._mineral === undefined) {
    this._mineral = this.find(FIND_MINERALS)?.[0];
  }
  return this._mineral;
};

Room.prototype.countFreePositions = function(rp: RoomPosition) {
	let freeSpaceCount: number = 0;
  let terrain = new Room.Terrain(rp.roomName);
	[rp.x - 1, rp.x, rp.x + 1].forEach((x) => {
		[rp.y - 1, rp.y, rp.y + 1].forEach((y) => {
			if (!(x == rp.x && rp.y == y)) {
				if (terrain.get(rp.x, rp.y) !== TERRAIN_MASK_WALL) freeSpaceCount++;
			}
		}, rp);
	}, rp);
	return freeSpaceCount;
};

Room.prototype.toString = function (htmlLink = true) {
	if (htmlLink) {
		return `<a href="#!/room/${Game.shard.name}/${this.name}">[${this.name}]</a>`;
	}
	return `[(${this.name}) #${this.name}]`;
};
