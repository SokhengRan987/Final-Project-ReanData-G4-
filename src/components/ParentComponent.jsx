const ParentComponent = () => {
    const [chartType, setChartType] = useState('pie');
    return <ChartToggle chartType={chartType} setChartType={setChartType} />;
  };