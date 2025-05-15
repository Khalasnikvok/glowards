const cooldowns = new Map();

module.exports = {
  setCooldown(userId, commandName, cooldownTime) {
    const expirationTime = Date.now() + cooldownTime;
    cooldowns.set(`${userId}-${commandName}`, expirationTime);
  },

  getCooldown(userId, commandName) {
    return cooldowns.get(`${userId}-${commandName}`) || 0;
  },

  getCooldownLeft(userId, commandName) {
    const cooldownExpiration = cooldowns.get(`${userId}-${commandName}`);
    const currentTime = Date.now();
    const timeLeft = cooldownExpiration - currentTime;

    return Math.max(0, timeLeft);
  },

  onCooldown(userId, commandName) {
    return Date.now() < this.getCooldown(userId, commandName);
  },
};
