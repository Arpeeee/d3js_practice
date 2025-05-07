var leftView;
var svg;
var x;
var newY;
var currentMaxY;
var currentY = 0;
var margin;
var rectHeight = 0;
var domHeight = 0;
var totalHeight = 0;
var defectImagesMap = {};
const DEFECT_HEIGHT = 40000;
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
        .domain([0, 8200])
        .range([margin.left, width - margin.right]);

    y = d3.scaleLinear()
        .domain([currentMaxY, 0])
        .range([domHeight - margin.bottom, margin.top]);

    newY == null ? newY = y : null;
    svg.call(d3.zoom()
        .scaleExtent([1, 10])
        .translateExtent([[0, 0], [width, domHeight]])
        .on("zoom", function(event) {
            const transform = event.transform;
            newY = transform.rescaleY(y);

            svg.selectAll(".y-axis")
                .call(d3.axisLeft(newY).ticks(10).tickFormat(d => Math.max(0, d)));

            svg.selectAll(".defect-rect")
                .attr("y", function() {
                    const originalY = d3.select(this).attr("data-original-y");
                    return newY(Math.max(0, originalY));
                })
                .attr("height", function() {
                    const originalHeight = d3.select(this).attr("data-original-height");
                    return newY(Math.max(0, originalHeight)) - newY(0);
                })

            svg.selectAll(".defect-icon")
                .attr("y", function() {
                    const originalY = d3.select(this).attr("data-original-y");
                    return newY(Math.max(0, originalY));
                })
                
        }));

    updateAxis(width, domHeight, margin);
    // zoomY(svg, width, domHeight, margin);
}

function drawBlackRectangle(width, height) {
    const container = leftView.node().getBoundingClientRect();
    const conWidth = container.width;
    // 檢查是否需要增加SVG高度
    if (currentY + height * 10 >= currentMaxY) {
        currentMaxY += height * 10;
        y.domain([currentMaxY, 0]);
        newY = y;
        svg.selectAll(".y-axis")
            .call(d3.axisLeft(newY).ticks(10).tickFormat(d => Math.max(0, d)));
    }

    // 繪製新矩形
    let rect = svg.append("rect")
        .attr("x", x(0))
        .attr("y", newY(currentY))
        .attr("width", x(width) - x(0))
        .attr("height", newY(height) - newY(0))
        .attr("fill", "#B6CDAF")
        .attr("class", "defect-rect")
        .attr("data-original-y", currentY)
        .attr("data-original-height", height)
    // .attr("stroke", "black")
    // .attr("stroke-width", 2);

    // 記錄第一個矩形的高度
    // if (rectHeight == 0) {
    //     rectHeight = rect.node().getBBox().height;
    // }
    // 更新當前y位置
    currentY += height;
}
let defect_id = 0;
function addIconAtIndex() {
    defect_id++;
    const xIndex = d3.select("#x-input").node().value;
    const yIndex = d3.select("#y-input").node().value;
    // 確保 index 不超過 currentMaxY
    if (yIndex <= currentMaxY) {
        svg.append("rect")
            .attr("x", x(xIndex)) // 使用 domain 計算後的 x 位置
            .attr("y", newY(yIndex)) // 使用 domain 計算後的 y 位置
            .attr("width", 10)
            .attr("height", 10)
            .attr("class", "defect-icon")
            .attr("border-radius", '10vw')
            .attr("id", `${defect_id}_icon`)
            .attr("data-id", defect_id)
            .attr("data-original-y", yIndex)
            .attr("fill", "red")
            .on("mouseover", function () {
                // 顯示 popup
                const popupGroup = svg.append("g")
                    .attr("class", "popup_icon");
                // 添加矩形背景
                popupGroup.append("rect")
                    .attr("width", "100px")
                    .attr("height", "50px")
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2);

                // 添加文字（作為獨立元素）
                popupGroup.append("text")
                    .attr("x", 10)
                    .attr("y", 20)
                    .text(`X: ${xIndex}`);

                popupGroup.append("text")
                    .attr("x", 10)
                    .attr("y", 40)  // 第二行的y位置增加
                    .text(`Y: ${yIndex}`);

                // 讓 popup 隨著滑鼠移動
                svg.on("mousemove", function (event) {
                    const [mouseX, mouseY] = d3.pointer(event);
                    popupGroup.attr("transform", `translate(${mouseX + 5}, ${mouseY - 5})`);
                });

                d3.select(this).on("mouseout", function () {
                    popupGroup.remove();
                    svg.on("mousemove", null);
                });
            })
            .style("cursor", "pointer")
            .on("click", function () {
                defectImgClick(this);
            })
    }
}

function updateAxis(width, height, margin) {
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();

    const tickCount = Math.max(Math.floor(height / 40), 5); // Adjust tick density based on height
    console.log(tickCount);
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y).ticks(tickCount);
    const xAxisTop = d3.axisTop(x)
    const yAxisRight = d3.axisRight(y).ticks(tickCount);

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

// add a zoom function

function bringIconsToFront() {
    const icons = svg.selectAll(".defect-icon");
    if (!icons.empty()) {
        icons.raise();
    }
}

function zoomed(event) {
    const container = leftView.node().getBoundingClientRect();
    const width = container.width;
    const domHeight = container.height;
    const tickCount = Math.max(Math.floor(domHeight / 40), 5); // Adjust tick density based on height

    // 更新y軸和內容的縮放比例，比例不變
    const newY = event.transform.rescaleY(y);

    // 限制y軸的最小值為0
    const clampedY = d3.scaleLinear()
        .domain([Math.max(0, currentMaxY), 0])
        .range([totalHeight - margin.bottom, margin.top]);

    // 更新左側和右側的y軸，確保0在最上面
    svg.selectAll(".y-axis")
        .filter((d, i, nodes) => d3.select(nodes[i]).attr("transform").includes(margin.left))
        .call(d3.axisLeft(clampedY).ticks(tickCount).tickFormat(d => Math.max(0, d)));
    
    svg.selectAll(".y-axis")
        .filter((d, i, nodes) => d3.select(nodes[i]).attr("transform").includes(width - margin.right))
        .call(d3.axisRight(clampedY).ticks(tickCount).tickFormat(d => Math.max(0, d)));

    // 更新所有需要縮放的矩形，確保0在最上面
    svg.selectAll("rect")
        .attr("y", function() {
            const originalY = d3.select(this).attr("data-original-y");
            return clampedY(Math.max(0, originalY));
        })
        .attr("height", function() {
            const originalHeight = d3.select(this).attr("data-original-height");
            return clampedY(Math.max(0, originalHeight)) - clampedY(0);
        });

    // 更新所有需要縮放的圖標，確保0在最上面
    svg.selectAll(".defect-icon")
        .attr("y", function() {
            const originalY = d3.select(this).attr("data-original-y");
            return clampedY(Math.max(0, originalY));
        })
        .attr("height", function() {
            const originalHeight = d3.select(this).attr("data-original-height");
            return clampedY(Math.max(0, originalHeight)) - clampedY(0);
        });

    setTimeout(() => {
        bringIconsToFront();
    }, 200);

    // 更新其他內容，保持比例不變
    // svg.selectAll(".content")
    //     .attr("y", d => clampedY(Math.max(0, d.y)))
    //     .attr("height", d => clampedY(Math.max(0, d.y + d.height)) - clampedY(Math.max(0, d.y)));
}

function initDraw() {
    currentMaxY = DEFECT_HEIGHT;
    drawCharts();
}

document.addEventListener("DOMContentLoaded", () => {
    leftView = d3.select("#left-view");
    initDraw();
});

