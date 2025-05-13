var leftView;
var svg;
var x, y, newY, height;
var currentMaxY = 40000;
var currentY = 0;
var currentScrollTop = 0;
var margin;
var canvas;
var defectFrameList = [];
var defectImagesMap = {};
let totalDataHeight = 40000; // 初始資料總高度
// const VISIBLE_HEIGHT = 800; //  可視區域高度
var visibleRange = {
    fromY: 0,
    toY: 40000
};
let ctx; // Canvas context
var animationFrameId;

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
};

function drawCharts() {
    const container = leftView.node().getBoundingClientRect();
    const width = container.width;
    height = container.height;

    margin = {
        top: Math.floor(height * 0.05),
        right: Math.floor(width * 0.05),
        bottom: Math.floor(height * 0.05),
        left: Math.floor(width * 0.05)
    };

    canvas = document.createElement("canvas");
    canvas.id = "defect-canvas";
    canvas.width = width - margin.left - margin.right;
    canvas.height = height - margin.top - margin.bottom;
    canvas.style.position = "absolute";
    canvas.style.top = margin.top + "px";
    canvas.style.left = margin.left + "px";
    canvas.style.zIndex = "1";
    leftView.node().appendChild(canvas);
    ctx = canvas.getContext("2d");

    svg = leftView.append("svg")
        .attr("id", `chart_1`)
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0)
        .style("z-index", 0);

    x = d3.scaleLinear().domain([0, 8200]).range([margin.left, width - margin.right]);
    // y scale: Higher data Y means lower on screen. 0 is at the top of the data.
    y = d3.scaleLinear().domain([totalDataHeight, 0]).range([height - margin.bottom, margin.top]);
    newY = y;

    updateAxis(width, height, margin);
    updateZoom(40000); // Initial draw
    // 使用 Canvas 處理捲動
    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        console.log(currentScrollTop);

        const VISIBLE_HEIGHT = visibleRange.toY - visibleRange.fromY;
        // 捲動目標是 "真實的 Y 區間"
        const scrollStep = 2000; // 每次滾輪捲動 4000 px 高度
        currentScrollTop += event.deltaY > 0 ? scrollStep : -scrollStep;

        // 限制 scroll 範圍在資料範圍內
        const maxScrollTop = Math.max(0, totalDataHeight - VISIBLE_HEIGHT);
        currentScrollTop = Math.max(0, Math.min(currentScrollTop, maxScrollTop));

        // 調整 domain (上往下捲 = fromY 增加)
        visibleRange.fromY = currentScrollTop;
        visibleRange.toY = currentScrollTop + VISIBLE_HEIGHT;

        // 更新 Y 軸 domain
        y.domain([visibleRange.toY, visibleRange.fromY]);
        newY = y;

        updateAxis(leftView.node().offsetWidth, leftView.node().offsetHeight, margin);
        drawCanvasDefects();
        updateDefects();
    });
}

function updateZoom(newzoom) {
    const scale =  40000 / newzoom;
    console.log(scale);
    const transform = d3.zoomIdentity.scale(scale);
    newY = transform.rescaleY(y);

    const newDomain = newY.domain().map(d => Math.max(0, d));
    newY.domain(newDomain);

    svg.selectAll(".y-axis")
        .call(d3.axisLeft(newY).ticks(10));

    svg.selectAll(".defect-icon")
        .attr("y", d => newY(d.y));

    drawCanvasDefects();
}

function drawCanvasDefects() {
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#B6CDAF";

    defectFrameList.forEach(d => {
        const yTopScreen = newY(d.y);
        const yBottomScreen = newY(d.y + d.height);
        const rectScreenHeight = yBottomScreen - yTopScreen;

        ctx.fillRect(
            x(d.x) - margin.left,
            yTopScreen - margin.top,
            x(d.width) - x(0),
            rectScreenHeight
        );
    });
}


function drawBlackRectangle(width, frameHeight) {
    const startYForNewRect = currentY;

    if (currentY + frameHeight*10 > currentMaxY) {
        currentMaxY += frameHeight*1;
        visibleRange.fromY = currentMaxY - 40000;
        visibleRange.toY = currentMaxY;
        
        currentScrollTop = visibleRange.fromY;
        console.log(currentScrollTop);
        // 更新 Y 軸 domain 與縮放
        y.domain([visibleRange.toY, visibleRange.fromY]);
        newY = y;
    
        updateAxis(leftView.node().offsetWidth, leftView.node().offsetHeight, margin);
        drawCanvasDefects();
        updateDefects();
    }

    defectFrameList.push({
        id: `rect_${defectFrameList.length}`,
        x: 0,
        y: startYForNewRect,
        width: width,
        height: frameHeight
    });

    currentY = startYForNewRect + frameHeight;
    totalDataHeight = currentY; // Update totalDataHeight
}

function updateDefects() {
    drawCanvasDefects();

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
            popupGroup.append("text").attr("x", 10).attr("y", 20).text(`絕對X: ${d.x}`);
            popupGroup.append("text").attr("x", 10).attr("y", 40).text(`絕對Y: ${d.y}`);

            d3.select(this).property("__popup__", popupGroup);

            const [svgX, svgY] = d3.pointer(event, svg.node());
            popupGroup.attr("transform", `translate(${svgX + 10}, ${svgY - 25})`);


        })
        .on("mousemove", function (event, d) {
            const popupGroup = d3.select(this).property("__popup__");
            if (popupGroup) {
                const [svgX, svgY] = d3.pointer(event, svg.node());
                popupGroup.attr("transform", `translate(${svgX + 10}, ${svgY - 25})`);
            }
        })
        .on("mouseout", function (event, d) {
            const popupGroup = d3.select(this).property("__popup__");
            if (popupGroup) {
                popupGroup.remove();
                d3.select(this).property("__popup__", null);
            }
        })
        .style("cursor", "pointer");

    icons.exit().remove();

}


function updateAxis(width, height, margin) {
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();

    const tickCount = Math.max(Math.floor(height / 40), 5);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(newY).ticks(tickCount);


    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
}

document.addEventListener("DOMContentLoaded", () => {
    leftView = d3.select("#mapcontainer");
    drawCharts();
    document.getElementById('start-defect').addEventListener('click', startdected);
    document.getElementById('stop-defect').addEventListener('click', stopdected);
});


function bringIconsToFront() {
    const icons = svg.selectAll(".defect-icon");
    if (!icons.empty()) {
        icons.raise();
    }
}

let defectInterval;

function startdected() {
    if (defectInterval) return;

    defectInterval = setInterval(() => {
        const massage = JSON.parse(JSON.stringify(data));

        drawBlackRectangle(massage.w, massage.h);

        massage.defect_data.forEach(function (defect) {
            const defectId = defect.id + "_" + Date.now();
            defectImagesMap[defectId] = { ...defect, id: defectId };

            defectImagesMap[defectId].y = (currentY - massage.h) + defect.y;
        });

        updateDefects();

    }, 10);
}

function stopdected() {
    clearInterval(defectInterval);
    defectInterval = null;
}

function defectImgClick(btn) {
    console.log("Defect clicked:", d3.select(btn).data()[0]);
    d3.selectAll(".defect-icon").attr("fill", "red");
    d3.select(btn).attr("fill", "blue");
}
