const svg = document.getElementById("hilbert")




function hindex2xy(index, level) {
    const positions = [[0, 0], [0, 1], [1, 1], [1, 0]];

    let [x, y] = positions[getLast2(index)];
    index = drop2(index);

    let tmp;
    for (let n = 4; n <= level; n *= 2) {
        switch (getLast2(index)) {
            case 0 :
                tmp = x;
                x = y;
                y = tmp;
                break;
            case 1 :
                y += n / 2;
                break;
            case 2 :
                x += n / 2;
                y += n / 2;
                break;
            case 3 :
                tmp = y;
                y = n / 2 - 1 - x;
                x = n / 2 - 1 - tmp;
                x += n / 2;
                break;
        }
        index = drop2(index);
    }
    return [x, y];
}
const minX = -1;
const minY = -1;
const maxX = 1;
const maxY = 1;
function translateLevelCoordinates(x,y,level) {
    return [(x / level) * (maxX - minX) + minX,
        maxY - (y / level) * (maxY - minY) + minY];
}
function drawHilbert() {
    var inputLevel = document.getElementById("degree").value;
    const level = Math.pow(2, inputLevel);
    let cur;
    let points = `${minX},${maxY} `;
    for (let i = 0; i < level * level; i++) {
        cur = hindex2xy(i, level);
        const coords = translateLevelCoordinates(cur[0], cur[1],level);
        points = points.concat(`${coords[0]},${coords[1]} `);
    }
    svg.innerHTML = `<polyline points="${points}" style="fill:none;stroke:black;stroke-width:1" />`;
}
document.getElementById("button").addEventListener("click", drawHilbert);