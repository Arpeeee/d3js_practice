// const app = new Application();

// // Initialize the application
// await app.init({ background: '#1099bb', resizeTo: window });

// // Append the application canvas to the document body
// document.body.appendChild(app.canvas);

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("left-view");
    if (!container) {
        console.error("❌ 容器 #left-view 未找到！");
        return;
    }

    const app = new PIXI.Application({});
    

    let type = "WebGL"
    if(!PIXI.isWebGLSupported()){
        type = "canvas"
    }

    PIXI.sayHello(type)
    await app.init(
        {
            width: container.clientWidth - 2,
            height: container.clientHeight - 2, 
            backgroundColor: 0x000000, // 設定背景顏色
            backgroundAlpha: 0, // 設定背景透明
            resolution: 1,
            autoDensity: true,
            antialias: true
        }
    )

    container.appendChild(app.view);
    createScan(app)
    // container.appendChild(app.view); // 確保容器存在時才附加畫布
});


function createScan(app){
    // const scanContainer = new PIXI.Container();
    // scanContainer.x = 50;  // 預留空間放 Y 軸
    // scanContainer.y = 10;  // 預留空間放 X 軸
    // app.stage.addChild(scanContainer);
    const mapContainer = new PIXI.Container();
    app.stage.addChild(mapContainer);

    // 縮放比例
    const margin = {
        top: Math.floor(app.screen.height * 0.05),
        right: Math.floor(app.screen.width * 0.05),
        bottom: Math.floor(app.screen.height * 0.05),
        left: Math.floor(app.screen.width * 0.05)
    };
    
    const mapWidth = app.screen.width - margin.left - margin.right;
    const mapHeight = app.screen.height - margin.top - margin.bottom;

    const mapBackground = new PIXI.Graphics();
    mapBackground.beginFill(0xffffff);
    mapBackground.drawRect(margin.left, margin.top, mapWidth, mapHeight);
    mapBackground.endFill();
    mapContainer.addChild(mapBackground);

    // 新增的邊界線
    const extendedBorder = new PIXI.Graphics();
    extendedBorder.lineStyle(2, 0xff0000, 1); // 使用紅色邊界線
    extendedBorder.drawRect(0, 0, 8000, 40000);
    mapContainer.addChild(extendedBorder);
    const coordText = new PIXI.Text('', { fill: 'black' });
    coordText.x = 10;
    coordText.y = 10;
    app.stage.addChild(coordText);

    // 監聽 mousemove 事件
    mapContainer.interactive = true;
    mapContainer.on('mousemove', (event) => {
        const { x, y } = event.data.global;

        // 計算真實世界的座標
        const realX = ((x - margin.left) / mapWidth ) * 8000;
        const realY = ((y - margin.top) / mapHeight) * 40000;

        coordText.text = `Real X: ${realX.toFixed(2)}, Real Y: ${realY.toFixed(2)}`;
    });
    mapContainer.interactive = true;

    const zoom = d3.zoom()
    .scaleExtent([0.5, 3])
    .on("zoom", (event) => {
        const transform = event.transform;
        mapContainer.scale.set(transform.k);
        mapContainer.position.set(transform.x, transform.y);
    });

    // 把 PixiJS 當作 D3 容器，讓 D3 處理縮放
    const d3Container = d3.select(mapContainer);
    d3Container.call(zoom);

    // mapContainer.pivot.set(0, 0);
    // mapContainer.position.set(margin.left, margin.top);
    setTimeout(() => {
        appendRect(0, 0, app)
    }, 1000)
}


function appendRect(realx, realy, app){
    const rect = new PIXI.Graphics()
    rect.rect(realx, realy, 100, 100)
    rect.fill({color: 0x0000ff, alpha: 1})
    app.stage.addChild(rect)
}