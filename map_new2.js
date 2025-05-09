var leftView;
var svg;
var x, y, newY;
var currentMaxY=40000;
var currentY = 0;
var margin;
var defectFrameList = [];
var defectImagesMap = {};
const DEFECT_HEIGHT = 40000;
let totalDataHeight = 0;
const VISIBLE_HEIGHT = 40000;
const visibleRange = {
    fromY: 0,
    toY: VISIBLE_HEIGHT
};
let ctx; // Canvas context
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
function drawCharts() {
    const container = leftView.node().getBoundingClientRect();
    const width = container.width;
    const height = container.height;

    margin = {
        top: Math.floor(height * 0.05),
        right: Math.floor(width * 0.05),
        bottom: Math.floor(height * 0.05),
        left: Math.floor(width * 0.05)
    };

    // 加入 Canvas 元素
    const canvas = document.createElement("canvas");
    canvas.id = "defect-canvas";
    canvas.width = width - margin.left - margin.right;
    canvas.height = height - margin.top - margin.bottom;
    canvas.style.position = "absolute";
    canvas.style.top = margin.top + "px";
    canvas.style.left = margin.left + "px";
    canvas.style.zIndex = "0"; // 在 SVG 底層
    leftView.node().appendChild(canvas);
    ctx = canvas.getContext("2d");

    // 加入 SVG 元素
    svg = leftView.append("svg")
        .attr("id", `chart_1`)
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0)
        .style("z-index", 1);

    x = d3.scaleLinear().domain([0, 8200]).range([margin.left, width - margin.right])
    y = d3.scaleLinear().domain([DEFECT_HEIGHT, 0]).range([height - margin.bottom, margin.top]);
    newY = y;

    svg.call(d3.zoom()
        .scaleExtent([1, 15])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", function (event) {
            const transform = event.transform;
            newY = transform.rescaleY(y);
            const newDomain = newY.domain().map(d => Math.max(0, d));
            newY.domain(newDomain);

            // 更新 Y 軸
            svg.selectAll(".y-axis")
                .call(d3.axisLeft(newY).ticks(10));

            // 更新 icon
            svg.selectAll(".defect-icon")
                .attr("y", d => newY(d.y));

            drawCanvasDefects(); // ⬅ Canvas 更新
        })
    );

    updateAxis(width, height, margin);
}

function drawCanvasDefects() {
    if (!ctx) return;

    ctx.clearRect(margin.left, margin.top, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#B6CDAF";

    defectFrameList.forEach(d => {
        const yTop = newY(d.y);
        const yBottom = newY(d.y + d.height);
        const rectHeight = yBottom - yTop;

        ctx.fillRect(x(d.x) - margin.left, yTop - margin.top, x(d.width) - x(d.x), rectHeight);
    });
}

function drawBlackRectangle(width, height) {
    const adjustedY = Math.min(currentY, currentMaxY - height);

    // 如需增加 maxY 高度
    defectFrameList.push({
        id: `rect_${defectFrameList.length}`,
        x: 0,
        y: adjustedY,
        width: width,
        height: height
    });

    currentY = adjustedY + height;
}

function updateDefects() {
    drawCanvasDefects(); // 🟩 canvas繪製背景

    const icons = svg.selectAll(".defect-icon")
        .data(Object.values(defectImagesMap), d => d.id);

    icons.attr("x", d => x(d.x))
        .attr("y", d => newY(d.y));

    icons.enter()
        .append("rect")
        .attr("class", "defect-icon")
        .attr("x", d => x(d.x))
        .attr("y", d => newY(d.y))
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "red")
        .attr("data-id", d => d.id)
        .on("click", function () {
            defectImgClick(this);
        })
        .on("mouseover", function (event, d) {
            const popupGroup = svg.append("g").attr("class", "popup_icon");

            popupGroup.append("rect")
                .attr("width", 150)
                .attr("height", 50)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", 2);

            popupGroup.append("text")
                .attr("x", 10)
                .attr("y", 20)
                .text(`絕對X: ${d.x}`);

            popupGroup.append("text")
                .attr("x", 10)
                .attr("y", 40)
                .text(`絕對Y: ${d.y}`);

            svg.on("mousemove", function (event) {
                const [mouseX, mouseY] = d3.pointer(event);
                popupGroup.attr("transform", `translate(${mouseX + 5}, ${mouseY - 5})`);
            });

            d3.select(this).on("mouseout", function () {
                popupGroup.remove();
                svg.on("mousemove", null);
            });
        })
        .style("cursor", "pointer");

    icons.exit().remove();

    // document.getElementById('total-defects').textContent = Object.keys(defectImagesMap).length;
}

function updateAxis(width, height, margin) {
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();

    const tickCount = Math.max(Math.floor(height / 40), 5);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(tickCount);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .transition()
        .call(yAxis);
    // 只繪製線
}

document.addEventListener("DOMContentLoaded", () => {
    // 初始化 D3 讓 SVG 可以使用在 DOM 上
    leftView = d3.select("#mapcontainer");
    drawCharts();
    document.getElementById('start-defect').addEventListener('click', startdected);
    document.getElementById('stop-defect').addEventListener('click', stopdected);
});

// 把 SVG 的 icon 提到最上層
function bringIconsToFront() {
    const icons = svg.selectAll(".defect-icon");
    if (!icons.empty()) {
        icons.raise();
    }
}

// 這裡是模擬 socket 接收資料
let defectInterval;

function startdected() {
    defectInterval = setInterval(() => {
        const massage = data;
        drawBlackRectangle(massage.w, massage.h);
        console.log(massage.defect_data);
        massage.defect_data.forEach(function (defect) {
            defectImagesMap[defect.id] = defect;
            // 更新這個缺陷的y座標從現在的currentY往回算再加回來
            defectImagesMap[defect.id].y = currentY - massage.h + defect.y;
            // appendDefectTable(defect);
        });
        updateDefects();
    }, 800);
}

function stopdected() {
    clearInterval(defectInterval);
}

function defectImgClick(btn){
    // 改顏色
    console.log(btn);
}
