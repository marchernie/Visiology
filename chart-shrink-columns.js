// Уменьшаем ширину столбцов
if (w.series && Array.isArray(w.series)) {
    w.series.forEach(series => {
        series.barWidth = 16;
        series.barBorderRadius = 2;

        if (!series.itemStyle) series.itemStyle = {};
        series.itemStyle.borderWidth = 0;
        series.barGap = '30px';

        if (series.label) {
            series.label.show = true;
            series.label.textShadowBlur = 0;
        }
    });
}

ChartRender({
  general: w.general,
  xAxis: w.xAxis,
  yAxis: w.yAxis,
  series: w.series,
  legend: w.legend,
  tooltip: w.tooltip,
  grid: w.grid,
  dataZoom: w.dataZoom
});