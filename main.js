class Block {
  constructor(previous_hash = 0, propriete2 = 'Valeur par défaut', blockchain = null) {
      this.previous_hash = previous_hash;
      this.propriete2 = propriete2;
      this.timestamp = new Date().toISOString();
      this.hash = this.calculateHash();
      if (blockchain) {
          blockchain.addBlock(this);
      }
  }

  calculateHash() {
      return `${this.previous_hash}${this.timestamp}${this.propriete2}`
          .split('')
          .reduce((acc, char) => {
              acc = (acc << 5) - acc + char.charCodeAt(0);
              return acc & acc;
          }, 0);
  }

  /**
   * Retourne un objet contenant les informations du bloc
   */
  getInfo() {
      return {
          hash: this.hash,
          previous_hash: this.previous_hash,
          timestamp: this.timestamp,
          propriete2: this.propriete2
      };
  }

  /**
   * Crée et enregistre un nouveau bloc lié au bloc précédent
   * @param {Block} previousBlock 
   * @param {string} propriete2 
   * @param {Blockchain} blockchain 
   * @returns {Block}
   */
  static chainBlocks(previousBlock, propriete2, blockchain) {
      return new Block(previousBlock.hash, propriete2, blockchain);
  }
}

class Blockchain {
  constructor() {
      this.block_list = [];
      // Création du bloc genesis
      new Block(0, 'Genesis Block', this);
      this.genesis_block = this.block_list[0];
      this.last_block = this.genesis_block;
  }

  /**
   * Ajoute un bloc à la chaîne et met à jour last_block
   * @param {Block} block 
   */
  addBlock(block) {
      this.block_list.push(block);
      this.last_block = block;
  }

  /**
   * Retourne un tableau d'objets contenant les informations de chaque bloc
   * @returns {Object[]}
   */
  getChainInfo() {
      return this.block_list.map(block => block.getInfo());
  }
}

// Exemple d'utilisation :
const myChain = new Blockchain();
const bloc1 = new Block(myChain.last_block.hash, 'Premier bloc ajouté', myChain);
const bloc2 = Block.chainBlocks(myChain.last_block, 'Deuxième bloc ajouté', myChain);

// Récupération des infos sans affichage
const chainData = myChain.getChainInfo();
console.log(chainData);