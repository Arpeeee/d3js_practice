
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
    // zoomY(svg, width, domHeight, margin);
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
        currentMaxY += 60000;
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
        .attr("fill", "#B6CDAF") 
        // .attr("stroke", "black")
        // .attr("stroke-width", 2);

    // 記錄第一個矩形的高度
    if (rectHeight == 0) {
        rectHeight = rect.node().getBBox().height;
    }
    // 更新當前y位置
    currentY += height;
}

function addIconAtIndex() {
    const xIndex = document.getElementById("x-input").value;
    const yIndex = document.getElementById("y-input").value;
    // 確保 index 不超過 currentMaxY
    if (yIndex <= currentMaxY) {
        svg.append("text")
            .attr("x", x(xIndex)) // 使用 domain 計算後的 x 位置
            .attr("y", y(yIndex)) // 使用 domain 計算後的 y 位置
            .attr("font-size", "6px") // 設置圖標大小
            .text("🔥") // 這裡使用 Font Awesome 的用戶圖標作為示例
            .on("mouseover", function() {
                d3.select(this).attr("fill", "red"); // 當滑鼠移過時改變顏色
                // 顯示 popup
                const popup = svg.append("rect")
                    .attr("width", "100px")
                    .attr("height", "50px")
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .style("font-size", "12px") // 設置字體大小
                    .style("font-family", "Arial, sans-serif") // 設置字體
                    .style("color", "black") // 設置字體顏色
                    .text(`X: ${xIndex}\nY: ${yIndex}`); // 這裡是 popup 的內容

                // 讓 popup 隨著滑鼠移動
                svg.on("mousemove", function(event) {
                    const [mouseX, mouseY] = d3.pointer(event);
                    popup.attr("x", mouseX + 5) // 偏移一點以避免重疊
                         .attr("y", mouseY - 5); // 偏移一點以避免重疊
                });

                d3.select(this).on("mouseout", function() {
                    d3.select(this).attr("fill", "black"); // 當滑鼠移開時恢復顏色
                    popup.remove(); // 移除 popup
                    svg.on("mousemove", null); // 移除 mousemove 事件
                });
            })
            .style("cursor", "pointer")
            .on("click", function() {
                alert("Icon clicked!"); // 當點擊時顯示提示訊息
            });
    }
}

function updateAxis(width, height, margin) {
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const xAxisTop = d3.axisTop(x);
    const yAxisRight = d3.axisRight(y);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .transition()
        .call(yAxis);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${margin.top})`)
        .call(xAxisTop);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${width - margin.right},0)`)
        .transition()
        .call(yAxisRight);
}

// function zoomY(svg, width, height, margin) {
//     const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];

//     svg.call(d3.zoom()
//         .scaleExtent([1, 8])
//         .translateExtent(extent)
//         .extent(extent)
//         .on("zoom", zoomedY));

//     // function zoomedY(event) {
//     //     y.range([height - margin.bottom, margin.top].map(d => event.transform.applyY(d)));
//     //     svg.selectAll(".y-axis").call(d3.axisLeft(y));
//     //     svg.selectAll(".y-axis-right").call(d3.axisRight(y));
//     //     svg.selectAll("rect")
//     //         .attr("y", function() { return y(d3.select(this).attr("y")); })
//     //         .attr("height", function() { return y(0) - y(d3.select(this).attr("height")); });
//     // }
// }

function initDraw() {
    currentMaxY = 60000;
    drawCharts();
}

document.addEventListener("DOMContentLoaded", () => {
    leftView = d3.select("#left-view");
    initDraw();
});