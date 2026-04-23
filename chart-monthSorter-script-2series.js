// Словарь сортировки для месяцев
const monthOrder = {
  'Янв': 1, 'Фев': 2, 'Март': 3, 'Апр': 4, 'Май': 5, 'Июн': 6,
  'Июл': 7, 'Авг': 8, 'Сен': 9, 'Окт': 10, 'Ноя': 11, 'Дек': 12
};

// Собираем данные вместе (учитываем обе серии)
let pairedData = w.xAxis.data.map((month, i) => ({
  month: month,
  value1: w.series[0].data[i], // столбики
  value2: w.series[1].data[i]  // график
}));

// Сортируем по месяцам
pairedData.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);

// Возвращаем обратно в массивы
w.xAxis.data = pairedData.map(d => d.month);
w.series[0].data = pairedData.map(d => d.value1);
w.series[1].data = pairedData.map(d => d.value2);

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