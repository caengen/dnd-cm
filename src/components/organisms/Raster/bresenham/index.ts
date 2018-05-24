import { Coord } from "@App/types";

interface TrianglePlot {
  points: Coord[];
  distance: number;
}

export class Bresenham {
  static plotLine = (origin: Coord, target: Coord) => {
    let dots: Coord[] = [];
  
    let dx = Math.abs(target.x - origin.x);
    let dy = Math.abs(target.y - origin.y);
    let sx = (origin.x < target.x) ? 1 : -1;
    let sy = (origin.y < target.y) ? 1 : -1;
    let err = dx - dy;
  
    // Not interested in origin
    //dots.push({x: x0, y: y0});
  
    while(!((origin.x == target.x) && (origin.y == target.y))) {
      let e2 = err << 1;
  
      if (e2 > -dy) {
        err -= dy;
        origin.x += sx;
      }
  
      if (e2 < dx) {
        err += dx;
        origin.y += sy;
      }
  
      dots.push({ x: origin.x, y: origin.y });
    }
  
    return dots;
  }

  static plotCircle = (origin: Coord, r: number) => {
    let dots: Coord[] = [];
    let x = -r, y = 0, err = 2 - 2 * r; /* II. Quadrant */ 

    do {
        dots.push({x: origin.x - x, y: origin.y + y}); /*   I. Quadrant */
        dots.push({x: origin.x - y, y: origin.y - x}); /*  II. Quadrant */
        dots.push({x: origin.x + x, y: origin.y - y}); /* III. Quadrant */
        dots.push({x: origin.x + y, y: origin.y + x}); /*  IV. Quadrant */
        
        r = err;
        if (r <= y) {
          err += ++y * 2 + 1;
        }
        if (r > x || err > y) {
          err += ++x * 2 + 1;
        }
    } while (x < 0);

    return dots;
  }

  /**
   * A cone’s width at a given point along its length is equal to that point’s
   * distance from the point of origin.
   */
  static plotTriangle = (pivot: Coord, point: Coord): TrianglePlot => {
    let dots: Coord[] = [];
    const angle = -45 * Math.PI / 180;

    const sin = Math.sin(angle), cos = Math.cos(angle);

    // translate so pivot point is the origin
    const transX = point.x - pivot.x;
    const transY = point.y - pivot.y;

    // rotated point translated
    const newTransX = transX * cos - transY * sin;
    const newTransY = transX * sin + transY * cos;

    // translate back
    const rotatedX = Math.floor(newTransX + pivot.x);
    const rotatedY = Math.floor(newTransY + pivot.y);
    
    const pivotToPoint = Bresenham.plotLine({x: pivot.x, y: pivot.y}, {x: point.x, y: point.y});
    const pivotToNew = Bresenham.plotLine({x: pivot.x, y: pivot.y}, {x: rotatedX, y: rotatedY});
    const newToPoint = Bresenham.plotLine({x: point.x, y: point.y}, {x: rotatedX, y: rotatedY});

    return {
      points: dots.concat(pivotToPoint).concat(pivotToNew).concat(newToPoint),
      distance: pivotToPoint.length * 5
    };
  }
}
