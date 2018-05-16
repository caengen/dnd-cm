import { Coord } from "@App/types";

export interface BresenhamsLineArgs {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface BresenhamsCircleArgs {
  x0: number;
  y0: number;
  r: number;
}

export class Bresenham {
  static plotLine = ({x0,y0,x1,y1}: BresenhamsLineArgs) => {
    let dots: Coord[] = [];
  
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
  
    // Not interested in origin
    //dots.push({x: x0, y: y0});
  
    while(!((x0 == x1) && (y0 == y1))) {
      let e2 = err << 1;
  
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
  
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
  
      dots.push({ x: x0, y: y0 });
    }
  
    return dots;
  }

  static plotCircle = ({x0, y0, r}: BresenhamsCircleArgs) => {
    let dots: Coord[] = [];
    let x = -r, y = 0, err = 2 - 2 * r; /* II. Quadrant */ 

    do {
        dots.push({x: x0 - x, y: y0 + y}); /*   I. Quadrant */
        dots.push({x: x0 - y, y: y0 - x}); /*  II. Quadrant */
        dots.push({x: x0 + x, y: y0 - y}); /* III. Quadrant */
        dots.push({x: x0 + y, y: y0 + x}); /*  IV. Quadrant */
        
        r = err;
        if (r <= y) {
          /* e_xy+e_y < 0 */
          err += ++y * 2 + 1;
        }
        if (r > x || err > y) {
          /* e_xy+e_x > 0 or no 2nd y-step */
          err += ++x * 2 + 1;
        }
    } while (x < 0);

    return dots;
  }

  /* Triangle
  *   C    B
  *   |   /
  *   |  /
  *   | /
  *   A
  */

  static plotTriangle = (pivot: Coord, point: Coord) => {
    let dots: Coord[] = [];
    const angle = -60 * Math.PI / 180;

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
    
    const ca = Bresenham.plotLine({x0: pivot.x, y0: pivot.y, x1: point.x, y1: point.y});
    const cb = Bresenham.plotLine({x0: pivot.x, y0: pivot.y, x1: rotatedX, y1: rotatedY});
    const ab = Bresenham.plotLine({x0: point.x, y0: point.y, x1: rotatedX, y1: rotatedY});

    return dots.concat(ca).concat(cb).concat(ab);
  }
}
