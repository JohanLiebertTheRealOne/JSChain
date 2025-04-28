class Block {
    // Le constructeur pour initialiser les propriétés
    constructor(previous_hash = 0, propriete2 = 'Valeur par défaut') {
      this.previous_hash = previous_hash;  // Previous hash du bloc précédent
      this.propriete2 = propriete2;         // Propriété personnalisée pour l'exemple
      this.timestamp = new Date().toISOString();  // Timestamp (date et heure de création du bloc)
      this.hash = this.calculateHash();      // Hash du bloc (représentation unique)
    }
  
    // Méthode pour calculer le hash du bloc
    calculateHash() {
      // On crée un hash simple en combinant les propriétés importantes
      return `${this.previous_hash}${this.timestamp}${this.propriete2}`.split('').reduce((acc, char) => {
        acc = (acc << 5) - acc + char.charCodeAt(0);
        return acc & acc; // pour éviter les dépassements de mémoire
      }, 0);
    }
  
    // Méthode pour afficher les informations du bloc
    afficherInfo() {
      console.log(`Hash: ${this.hash}`);
      console.log(`Previous Hash: ${this.previous_hash}`);
      console.log(`Timestamp: ${this.timestamp}`);
      console.log(`Propriété 2: ${this.propriete2}`);
    }
  
    // Méthode pour lier un bloc au précédent (chaînage)
    static chainBlocks(previousBlock, currentPropriete2) {
      return new Block(previousBlock.hash, currentPropriete2);
    }
  }
  
bloc0 = new Block();
bloc0.afficherInfo();