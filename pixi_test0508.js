const margin = { top: 30, bottom: 50, left: 60, right: 30 };
let mapdom = document.getElementById('mapcontainer');
// 模擬比例尺範圍
const xDomain = [0, 100];
const yDomain = [0, 500];

async function initPixi(){
    
    app = new PIXI.Application();
    await app.init({
        width: mapdom.clientWidth,
        height: mapdom.clientHeight,
        backgroundColor: 0xFFFFFF,
        antialias: true
    });
    let width = mapdom.clientWidth;
    let height = mapdom.clientHeight;
    console.log('PixiJS initialized');
    mapdom.appendChild(app.canvas);

    const world = new PIXI.Container();
    app.stage.addChild(world);

    const scaleX = createScale(xDomain[0], xDomain[1], margin.left, mapdom.clientWidth - margin.right);
    const scaleY = createScale(yDomain[0], yDomain[1], mapdom.clientHeight - margin.bottom, margin.top);
    // 畫座標軸線
    const axis = new PIXI.Graphics();
    axis.lineStyle(2, 0x000000);

    // y 軸線
    axis.moveTo(margin.left, margin.top);
    axis.lineTo(margin.left, height - margin.bottom);

    // x 軸線
    axis.moveTo(margin.left, height - margin.bottom);
    axis.lineTo(width - margin.right, height - margin.bottom);
    world.addChild(axis);

    // 畫刻度 & 文字
    const yTicks = 5;
    const xTicks = 10;

    for (let i = 0; i <= yTicks; i++) {
        const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
        const y = scaleY(value);
        const tick = new PIXI.Graphics();
        tick.lineStyle(1, 0x000000);
        tick.moveTo(margin.left - 5, y);
        tick.lineTo(margin.left + 5, y);
        world.addChild(tick);

        const label = new PIXI.Text(Math.round(value), { fontSize: 12, fill: 0x000000 });
        label.x = margin.left - 40;
        label.y = y - 8;
        world.addChild(label);
    }


    for (let i = 0; i <= xTicks; i++) {
        const value = xDomain[0] + (xDomain[1] - xDomain[0]) * (i / xTicks);
        const x = scaleX(value);
        const tick = new PIXI.Graphics();
        tick.lineStyle(1, 0x000000);
        tick.moveTo(x, height - margin.bottom - 5);
        tick.lineTo(x, height - margin.bottom + 5);
        world.addChild(tick);

        const label = new PIXI.Text(Math.round(value), { fontSize: 12, fill: 0x000000 });
        label.x = x - 10;
        label.y = height - margin.bottom + 8;
        world.addChild(label);
    }
}

function createScale(domainMin, domainMax, rangeMin, rangeMax) {
    return function (value) {
        const ratio = (value - domainMin) / (domainMax - domainMin);
        return rangeMin + ratio * (rangeMax - rangeMin);
    };
}
let count = 0;
function startdected() {
    setInterval(() => {
    }, 800);
}


window.onload = async function() {
    await initPixi();
}
// // 建立 Pixi 應用
// const app = new PIXI.Application();
// app.init({
//     width: width,
//     height: height,
//     backgroundColor: 0xFFFFFF,
//     antialias: true
// }).then(() => {
//     console.log('PixiJS initialized');
//     document.getElementById('mapcontainer').appendChild(app.canvas);
// });

// // 主繪製容器
// const world = new PIXI.Container();
// app.stage.addChild(world);

// // 自定比例函式（模仿 d3.scaleLinear）
// function createScale(domainMin, domainMax, rangeMin, rangeMax) {
//     return function (value) {
//         const ratio = (value - domainMin) / (domainMax - domainMin);
//         return rangeMin + ratio * (rangeMax - rangeMin);
//     };
// }

// const scaleX = createScale(xDomain[0], xDomain[1], margin.left, width - margin.right);
// const scaleY = createScale(yDomain[0], yDomain[1], height - margin.bottom, margin.top);

// // 畫座標軸線
// const axis = new PIXI.Graphics();
// axis.lineStyle(2, 0x000000);

// // y 軸線
// axis.moveTo(margin.left, margin.top);
// axis.lineTo(margin.left, height - margin.bottom);

// // x 軸線
// axis.moveTo(margin.left, height - margin.bottom);
// axis.lineTo(width - margin.right, height - margin.bottom);
// world.addChild(axis);

// // 畫刻度 & 文字
// const yTicks = 5;
// const xTicks = 10;

// for (let i = 0; i <= yTicks; i++) {
//     const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
//     const y = scaleY(value);
//     const tick = new PIXI.Graphics();
//     tick.lineStyle(1, 0x000000);
//     tick.moveTo(margin.left - 5, y);
//     tick.lineTo(margin.left + 5, y);
//     world.addChild(tick);

//     const label = new PIXI.Text(Math.round(value), { fontSize: 12, fill: 0x000000 });
//     label.x = margin.left - 40;
//     label.y = y - 8;
//     world.addChild(label);
// }

// for (let i = 0; i <= xTicks; i++) {
//     const value = xDomain[0] + (xDomain[1] - xDomain[0]) * (i / xTicks);
//     const x = scaleX(value);
//     const tick = new PIXI.Graphics();
//     tick.lineStyle(1, 0x000000);
//     tick.moveTo(x, height - margin.bottom - 5);
//     tick.lineTo(x, height - margin.bottom + 5);
//     world.addChild(tick);

//     const label = new PIXI.Text(Math.round(value), { fontSize: 12, fill: 0x000000 });
//     label.x = x - 10;
//     label.y = height - margin.bottom + 8;
//     world.addChild(label);
// }