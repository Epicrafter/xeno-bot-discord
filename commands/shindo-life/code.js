const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "code",
    category: "shindo-life",
    description: "Vous trouverez ici des code privées pour les differents lieux afin de pouvoir trouver les scrolls plus tranquillement.",
    usage: "code",
    run: async(client, message, args) => {

        let code = new MessageEmbed()
            .setColor("#6c5ce7")
            .setTitle("Code Serveur Privé")
            .setDescription(`Vous trouverez ici des code privées pour les differents lieux afin de pouvoir trouver les scrolls plus tranquillement.`)
            .addField("Pays du Feu ( Ember ):", "``lKirMo`` ``d5hkDa`` ``tlMhzg`` ``Dv_SVl`` ``Yj78LH`` ``BmoH25`` ``h2OBtk`` ``Z0MyHj`` ``ILRCEA`` ``M_57lc`` ``aYRP17``")
            .addField("Pays du Vent ( Dunes ):", "``HDnave`` ``plz1m3`` ``bbhIpu`` ``KMjEs4`` ``6Bm6SO`` ``8cR6yU`` ``kYrwjd`` ``NKO8BQ`` ``StiVl1``")
            .addField("Pays de la Terre ( Obelisk ):", "``5FWJCS`` ``jSrAp-`` ``KCxOuN`` ``r0nFD_`` ``2bgORM`` ``SMjbLr`` ``LgZ2gv``")
            .addField("Pays de la Foudre ( Nimbus ):", "``Qz7ZuR`` ``J2w02t`` ``4q8hm8`` ``ZqJB7C`` ``z37t3H`` ``HAoSvN`` ``-yH8Cp`` ``bN7Cn9``")
            .addField("Pays de l'Eau ( Haze ):", "``k7Tkde`` ``uoPsmg`` ``lyvU5w`` ``gOLfHQ`` ``cNy9Zc`` ``o2Va8G`` ``3irrXn`` ``kLhqal`` ``22zCrB``")
            .addField("Pays de la Pluie ( Storm ):", "``nMQhXu`` ``5Vj8XJ``")
            .addField("Terrain d'Entrainement ( Training ):", "``aPn9-P`` ``f5hKK-`` ``HpmPzS`` ``pHrVOS`` ``NmQxQn`` ``zimoh7`` ``SHtoD`` ``K4Tcbm`` ``ey7dnb`` ``7wmQtH`` ``fBY-T``")
            .addField("Foret de la Mort ( Forest of Embers ):", "``ORHx2C`` ``hAmRht`` ``C7GtXJ`` ``qQivW2`` ``naiX6y`` ``2ArhVA``")
            .addField("War:", "``eXQRl2`` ``hyqCsF``")

        message.channel.send(code)

    }
}