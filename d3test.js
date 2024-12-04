function drawCharts() {
    const leftView = d3.select("#left-view");
    const container = leftView.node().getBoundingClientRect();

    // 計算每個圖表的寬度和高度
    const width = container.width;
    const height = container.width;
    const margin = {
        top: Math.floor(height * 0.05),
        right: Math.floor(width * 0.05),
        bottom: Math.floor(height * 0.05),
        left: Math.floor(width * 0.05)
    };

    const svg = leftView.append("svg")
        .attr("id", `chart_1`)
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleLinear()
        .domain([0, 10])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, 10])
        .range([height - margin.bottom, margin.top]);

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

document.addEventListener("DOMContentLoaded", drawCharts);