import Cell from "./Cell.js";

class TriangleCell extends Cell{
    constructor(row, column) {
        super(row, column);
    }

    UpDown(){
        return this.column % 2 != 0;
    }

    UpRight()
    {
        return (this.row + this.column) % 2 == 0;
    }

    draw(ctx, cellWidth, cellHeight, canvas) {
        ctx.strokeStyle = "#fff"; // Zmienione z "#000" na "#fff" dla białych ścian
        ctx.lineWidth = 2;
        let width = cellWidth;
        let height = cellHeight;
        let halfHeight = cellHeight / 2;
        let cx, cy;
        let westX, midX, eastX;
        let apexY, baseY;

        cx = width + this.column * width + (canvas.width * 0.05 / 2)
        cy = this.row * height + halfHeight + (canvas.height * 0.05 / 2);

        westX = cx - width;
        midX = cx;
        eastX = cx + width;

        if(!this.UpRight()){
            apexY = cy - halfHeight;
            baseY = cy + halfHeight;
        }else{
            apexY = cy + halfHeight;
            baseY = cy - halfHeight;
        }

        if (!this.neighbours.has("West"))
        {
            ctx.beginPath();
            ctx.moveTo(westX, baseY);
            ctx.lineTo(midX, apexY);
            ctx.stroke();
        }
        if(!this.neighbours.has("East") || (this.neighbours.has("East") && !this.linked(this.neighbours.get("East")))){
            ctx.beginPath();
            ctx.moveTo(eastX, baseY);
            ctx.lineTo(midX, apexY);
            ctx.stroke();
        }
        let no_north = (!this.UpRight() && ! this.neighbours.has("South"));
        let not_linked = (this.UpRight() && !this.neighbours.has("Nort") || (this.neighbours.has("Nort") && !this.linked(this.neighbours.get("Nort"))));
        
        if (not_linked || no_north ) {
            ctx.beginPath();
            ctx.moveTo(eastX, baseY);
            ctx.lineTo(westX, baseY);
            ctx.stroke();
        }
    }

}
export default TriangleCell;