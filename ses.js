const Discord = require('discord.js');
const tokens = [
    
    "NzkyNDIwMzQ0NzMxNjY0Mzg1.X-dc9A.OXE6CWcO14Hv0YinMq4BEpDhvWg"
    // TOKEN2
    // TOKEN3
    // TOKEN4
    // TOKEN5
];
const chnls = [

    "806977195641667679"
    // KANAL2ID
    // KANAL3ID
    // KANAL4ID
    // KANAL5ID
];
for (let index = 0; index < 5; index++) { // 5 yerine token sayısını girin
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        const yetkilirol = cur.guild.roles.cache.get("806977534750752818"); // ROLIN yerine yetkili rolünün id'sini yazın.
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if ((cur.member.roles.highest.rawPosition < yetkilirol.rawPosition) && (cur.channel.members.size < 3)) {
                ses = await concon.play('./hg.mp3');
            } else if (cur.member.roles.highest.rawPosition > yetkilirol.rawPosition) {
                ses = await concon.play('./yetkili.mp3');
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
}
