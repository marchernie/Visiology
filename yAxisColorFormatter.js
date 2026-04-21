// Функция получения цвета
function getColor(val) {
    if (val > 97) return '#00aa00';
    if (val > 95) return '#ff8800';
    return '#cc0000';
}

if (w.series && Array.isArray(w.series)) {
    w.series.forEach(function(series) {
        // Включаем показ меток
        series.label = {
            show: true,
            position: 'top',
            formatter: '{c}',
            fontSize: 12,
            fontWeight: 'bold'
        };

        // Проходим по каждому элементу данных
        if (series.data && Array.isArray(series.data)) {
            series.data = series.data.map(function(item) {
                // Нормализуем элемент он может быть числом или объектом
                let value;
                let originalItem = item;

                if (typeof item === 'number') {
                    value = item;
                    // Превращаем число в объект, чтобы добавить стили
                    originalItem = { value: item };
                } else if (typeof item === 'object' && item !== null) {
                    value = item.value;
                    // Если это массив [x, y], берем y
                    if (Array.isArray(value)) {
                        value = value[1];
                    }
                } else {
                    return item;
                }

                // Определяем цвет
                let color = getColor(Number(value));

                // Возвращаем объект с явным указанием цвета для label и item
                return {
                    ...originalItem,  // сохраняем исходные данные (x, name и т.д.)
                    itemStyle: {
                        color: color  // Цвет самой точки
                    },
                    label: {
                        show: true,
                        color: color  // Задаем цвет текста для точки
                    }
                };
            });
        }
        
        // Убеждаемся, что глобальный label не перезаписывает индивидуальные настройки
        // В некоторых версиях ECharts наличие глобального label.color ломает локальные
        delete series.label.color; 
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