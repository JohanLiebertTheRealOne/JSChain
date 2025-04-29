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

  afficherInfo() {
      console.log(`Hash: ${this.hash}`);
      console.log(`Previous Hash: ${this.previous_hash}`);
      console.log(`Timestamp: ${this.timestamp}`);
      console.log(`Propriété 2: ${this.propriete2}`);
  }

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

  addBlock(block) {
      this.block_list.push(block);
      this.last_block = block;
  }

  afficherChain() {
      this.block_list.forEach((b, idx) => {
          console.log(`--- Block ${idx} ---`);
          b.afficherInfo();
      });
  }
}

// Exemple d'utilisation
const myChain = new Blockchain();

// Ajout de nouveaux blocs
const bloc1 = new Block(myChain.last_block.hash, 'Premier bloc ajouté', myChain);
const bloc2 = Block.chainBlocks(myChain.last_block, 'Deuxième bloc ajouté', myChain);

// Affichage de la chaîne complète
myChain.afficherChain();
