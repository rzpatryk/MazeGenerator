import RecursiveBacktracker from './RecursiveBacktracker.js';
import PrimAlgorithm from './PrimAlgorithm.js';
import KruskalAlgorithm from './KruskalAlgorithm.js';
import EllerAlgorithm from './EllerAlgorithm.js';
import BinaryTreeAlgorithm from './BinaryTreeAlgorithm.js';
import SidewinderAlgorithm from './SidewinderAlgorithm.js';
import WilsonAlgorithm from './WilsonAlgorithm.js';
import AldousBroderAlgorithm from './AldousBroderAlgorithm.js';
import HuntAndKillAlgorithm from './HuntAndKillAlgorithm.js';
import RecursiveDivisionAlgorithm from './RecursiveDivisionAlgorithm.js';

export default class MazeAlgorithms {
  static generate(grid, algorithm) {
    switch(algorithm) {
      case 'recursiveBacktracker':
        return RecursiveBacktracker.generate(grid);
      case 'prim':
        return PrimAlgorithm.generate(grid);
      case 'kruskal':
        return KruskalAlgorithm.generate(grid);
      case 'eller':
        return EllerAlgorithm.generate(grid);
      case 'binaryTree':
        return BinaryTreeAlgorithm.generate(grid);
      case 'sidewinder':
        return SidewinderAlgorithm.generate(grid);
      case 'wilsons':
        return WilsonAlgorithm.generate(grid);
      case 'aldousBroder':
        return AldousBroderAlgorithm.generate(grid);
      case 'huntAndKill':
        return HuntAndKillAlgorithm.generate(grid);
      case 'recursiveDivision':
        return RecursiveDivisionAlgorithm.generate(grid);
      case 'random':
        return this.generateRandom(grid);
      default:
        return RecursiveBacktracker.generate(grid);
    }
  }

  static generateRandom(grid) {
    const algorithms = [
      'recursiveBacktracker', 'prim', 'kruskal', 'eller', 
      'binaryTree', 'sidewinder', 'wilsons', 'aldousBroder', 
      'huntAndKill', 'recursiveDivision'
    ];
    const randomAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    return this.generate(grid, randomAlgorithm);
  }
}