let app, cameraContainer, frameLayer, defectLayer, axisLayer;
let xScale, yScale;
const VISIBLE_HEIGHT = 40000;
let totalDataHeight = 0;
let defectInterval;
let defectImagesMap = {};
let defectFrameList = [];

const MARGIN_LEFT = 6;
const MARGIN_TOP = 4;
const VIEW_WIDTH = width - MARGIN_LEFT * 2;
const VIEW_HEIGHT = height - MARGIN_TOP * 2;
function createLinearScale(domain, range) {
    const [d0, d1] = domain;
    const [r0, r1] = range;
    const scale = x => r0 + ((x - d0) / (d1 - d0)) * (r1 - r0);
    scale.invert = y => d0 + ((y - r0) / (r1 - r0)) * (d1 - d0);
    scale.setDomain = (d) => { scale.domain = () => d; };
    scale.domain = () => [d0, d1];
    scale.range = () => [r0, r1];
    return scale;
}
const data = {
    "id": 194732,
    "job_id": 134,
    "batch": 1,
    "reel": 12,
    "camera_order": 2,
    "frame_index": 5,
    "defect_num": 6,
    "w": 8192,
    "h": 2000,
    "roi_x": 83,
    "roi_y": 0,
    "roi_w": 8109,
    "roi_h": 1950,
    "defect_data": [
        {
        "id": 619558,
        "index_id": 194732,
        "defect_name": "134_DSXLP86002523_12_5_box_0",
        "defect_path": "./img/JobID_134/StationID_8/Camera_DSXLP86002523/defect/134_DSXLP86002523_12_5_box_0.bmp",
        "x": 2687,
        "y": 1862,
        "w": 114,
        "h": 88,
        "defect_cols": 74,
        "defect_rows": 68,
        "defect_area": 688,
        "defect_aspect_ratio": 1.08824,
        "defect_above_avg_count": 0,
        "defect_above_avg_mean": 0,
        "defect_below_avg_count": 688,
        "defect_below_avg_mean": 38.8183,
        "defect_avg_gray": 38.8183
        },
        {
        "id": 619559,
        "index_id": 194732,
        "defect_name": "134_DSXLP86002523_12_5_box_1",
        "defect_path": "./img/JobID_134/StationID_8/Camera_DSXLP86002523/defect/134_DSXLP86002523_12_5_box_1.bmp",
        "x": 2567,
        "y": 1859,
        "w": 114,
        "h": 91,
        "defect_cols": 74,
        "defect_rows": 71,
        "defect_area": 622,
        "defect_aspect_ratio": 1.04225,
        "defect_above_avg_count": 0,
        "defect_above_avg_mean": 0,
        "defect_below_avg_count": 622,
        "defect_below_avg_mean": 37.717,
        "defect_avg_gray": 37.717
        },
        {
        "id": 619560,
        "index_id": 194732,
        "defect_name": "134_DSXLP86002523_12_5_box_2",
        "defect_path": "./img/JobID_134/StationID_8/Camera_DSXLP86002523/defect/134_DSXLP86002523_12_5_box_2.bmp",
        "x": 1925,
        "y": 1770,
        "w": 264,
        "h": 180,
        "defect_cols": 224,
        "defect_rows": 160,
        "defect_area": 27820,
        "defect_aspect_ratio": 1.4,
        "defect_above_avg_count": 0,
        "defect_above_avg_mean": 0,
        "defect_below_avg_count": 27820,
        "defect_below_avg_mean": 25.2039,
        "defect_avg_gray": 25.2039
        },
        {
        "id": 619561,
        "index_id": 194732,
        "defect_name": "134_DSXLP86002523_12_5_box_3",
        "defect_path": "./img/JobID_134/StationID_8/Camera_DSXLP86002523/defect/134_DSXLP86002523_12_5_box_3.bmp",
        "x": 3179,
        "y": 1736,
        "w": 265,
        "h": 214,
        "defect_cols": 225,
        "defect_rows": 194,
        "defect_area": 33839,
        "defect_aspect_ratio": 1.15979,
        "defect_above_avg_count": 0,
        "defect_above_avg_mean": 0,
        "defect_below_avg_count": 33839,
        "defect_below_avg_mean": 15.9982,
        "defect_avg_gray": 15.9982
        },
        {
        "id": 619562,
        "index_id": 194732,
        "defect_name": "134_DSXLP86002523_12_5_box_4",
        "defect_path": "./img/JobID_134/StationID_8/Camera_DSXLP86002523/defect/134_DSXLP86002523_12_5_box_4.bmp",
        "x": 4441,
        "y": 1733,
        "w": 263,
        "h": 217,
        "defect_cols": 223,
        "defect_rows": 197,
        "defect_area": 33090,
        "defect_aspect_ratio": 1.13198,
        "defect_above_avg_count": 10,
        "defect_above_avg_mean": 194.7,
        "defect_below_avg_count": 33080,
        "defect_below_avg_mean": 46.5671,
        "defect_avg_gray": 46.6119
        },
        {
        "id": 619563,
        "index_id": 194732,
        "defect_name": "134_DSXLP86002523_12_5_box_5",
        "defect_path": "./img/JobID_134/StationID_8/Camera_DSXLP86002523/defect/134_DSXLP86002523_12_5_box_5.bmp",
        "x": 3825,
        "y": 1733,
        "w": 265,
        "h": 217,
        "defect_cols": 225,
        "defect_rows": 197,
        "defect_area": 34372,
        "defect_aspect_ratio": 1.14213,
        "defect_above_avg_count": 0,
        "defect_above_avg_mean": 0,
        "defect_below_avg_count": 34372,
        "defect_below_avg_mean": 20.6679,
        "defect_avg_gray": 20.6679
        }
    ]
}
async function initPixiApp() {
    const container = document.getElementById("mapcontainer");
    const width = container.clientWidth;
    const height = container.clientHeight;

    app = new PIXI.Application();
    await app.init({
        width: width,
        height: height,
        backgroundColor: 0xffffff,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
    });
    container.appendChild(app.view);

    // 建立 camera + layers
    axisLayer = new PIXI.Container();
    cameraContainer = new PIXI.Container();
    frameLayer = new PIXI.Container();
    defectLayer = new PIXI.Container();

    cameraContainer.addChild(frameLayer);
    cameraContainer.addChild(defectLayer);
    app.stage.addChild(cameraContainer);

    // 初始化比例尺
    xScale = createLinearScale([0, 8200], [0, width]);
    yScale = createLinearScale([VISIBLE_HEIGHT, 0], [0, height]);

    // 滾輪 scroll Y
    container.addEventListener("wheel", (e) => {
        cameraContainer.y += e.deltaY;
    });
}

function drawBlackRectangle(width, height) {
    const y = totalDataHeight;

    const rect = new PIXI.Graphics();
    rect.beginFill(0xB6CDAF);
    rect.drawRect(xScale(0), yScale(y + height), xScale(width) - xScale(0), yScale(y) - yScale(y + height));
    rect.endFill();
    frameLayer.addChild(rect);

    defectFrameList.push({ x: 0, y, width, height });
    totalDataHeight += height;
}

function updateDefects() {
    defectLayer.removeChildren(); // 重新畫

    Object.values(defectImagesMap).forEach(d => {
        const icon = new PIXI.Graphics();
        icon.beginFill(0xFF0000);
        icon.drawRect(xScale(d.x), yScale(d.y), 10, 10);
        icon.endFill();
        icon.interactive = true;
        icon.buttonMode = true;
        icon.on("pointerdown", () => {
            console.log("click defect", d.id);
        });
        defectLayer.addChild(icon);
    });
}

function startdected() {
    defectInterval = setInterval(() => {
        const massage = data;
        drawBlackRectangle(massage.w, massage.h);

        massage.defect_data.forEach(defect => {
            defectImagesMap[defect.id] = {
                ...defect,
                y: totalDataHeight - massage.h + defect.y
            };
        });
        updateDefects();
    }, 800);
}

function stopdected() {
    clearInterval(defectInterval);
}


document.addEventListener("DOMContentLoaded", async () => {
    await initPixiApp();
    document.getElementById('start-defect').addEventListener('click', startdected);
    document.getElementById('stop-defect').addEventListener('click', stopdected);
})