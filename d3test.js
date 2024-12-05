
var leftView;
var svg;
var x;
var y;
var currentMaxY;
var currentY = 0;
var margin;
var rectHeight = 0;
var domHeight = 0;
var totalHeight = 0;

function drawCharts() {
    const container = leftView.node().getBoundingClientRect();

    // 計算每個圖表的寬度和高度
    const width = container.width;
    domHeight = container.height;
    totalHeight += domHeight;
    margin = {
        top: Math.floor(domHeight * 0.05),
        right: Math.floor(width * 0.1),
        bottom: Math.floor(domHeight * 0.05),
        left: Math.floor(width * 0.1)
    };

    svg = leftView.append("svg")
        .attr("id", `chart_1`)
        .attr("width", width)
        .attr("height", domHeight);

    x = d3.scaleLinear()
        .domain([0, 8000])
        .range([margin.left, width - margin.right]);

    y = d3.scaleLinear()
        .domain([currentMaxY, 0])
        .range([domHeight - margin.bottom, margin.top]);

    updateAxis(width, domHeight, margin);
    console.log(`domHeight: ${domHeight}`);
}

// function drawBlackRectangle(width, height) {
//     const container = leftView.node().getBoundingClientRect();

//     // 計算每個圖表的寬度和高度
//     const conWidth = container.width;
//     const conHeight = svg.node().getBBox().height;

//     // 确保矩形不会重叠
//     if (currentY + height <= currentMaxY) {
//         let rect = svg.append("rect")
//             .attr("x", x(0))
//             .attr("y", y(currentY)) 
//             .attr("width", x(width) - x(0))
//             .attr("height", y(currentY) - y(currentY - height))
//             .attr("fill", "yellow")
//             .attr("stroke", "black")
//             .attr("stroke-width", 2);
//         if (rectHeight == 0) {
//             rectHeight = rect.node().getBBox().height;
//         }
//         currentY += height;
//     }

//     console.log(currentY);
//     if (currentY + height  == currentMaxY) {
//         currentMaxY += height ; // 增加更多的空间
//         svg.attr("height", conHeight + rectHeight ); // 调整高度
//         y.range([conHeight + rectHeight - margin.bottom, margin.top]); 
//         updateAxis(conWidth, conHeight + rectHeight , margin);
//     }
//     console.log(currentMaxY);
//     y.domain([currentMaxY, 0]);
// }
function drawBlackRectangle(width, height) {
    const container = leftView.node().getBoundingClientRect();
    const conWidth = container.width;
    // 檢查是否需要增加SVG高度
    if (currentY + height * 5 >= currentMaxY) {
        totalHeight += domHeight - margin.bottom - margin.top;
        currentMaxY += 20000;
        svg.attr("height", totalHeight);
        y.domain([currentMaxY, 0])
            .range([totalHeight - margin.bottom, margin.top]);
        updateAxis(conWidth, totalHeight, margin);
    }

    // 繪製新矩形
    let rect = svg.append("rect")
        .attr("x", x(0))
        .attr("y", y(currentY))
        .attr("width", x(width) - x(0))
        .attr("height", y(currentY) - y(currentY - height))
        .attr("fill", "yellow")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // 記錄第一個矩形的高度
    if (rectHeight == 0) {
        rectHeight = rect.node().getBBox().height;
    }
    console.log(`rectHeight: ${rectHeight}`);
    console.log(`currentY: ${currentY}`);
    // 更新當前y位置
    currentY += height;
}

function updateAxis(width, height, margin) {
    svg.selectAll(".axis").remove();

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const xAxisTop = d3.axisTop(x);
    const yAxisRight = d3.axisRight(y);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${margin.top})`)
        .call(xAxisTop);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(yAxisRight);
}

function initDraw() {
    currentMaxY = 20000;
    drawCharts();
}

document.addEventListener("DOMContentLoaded", () => {
    leftView = d3.select("#left-view");

    initDraw();
    // setTimeout(() => {
    //     drawBlackRectangle(svg, x, y);
    // }, 1000);
});