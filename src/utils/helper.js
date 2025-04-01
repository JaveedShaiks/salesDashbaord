
export const formatMonthYear = (dateString) => {
    const date = new Date(dateString); 
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  };

export const parseDate = (dateString) => {
    const [month, day, year] = dateString.split("/"); 
    return new Date(year, month - 1, day); 
  };

  
export const processSalesData = (data) => {
    const filteredData = data.filter((d) => d.Status !== "Cancelled");
  
    return {
      daily: Object.values(
        filteredData.reduce((acc, d) => {
          const date = d.Date;
          if (!acc[date])
            acc[date] = { date, sales: 0, transactions: 0, revenue: 0 };
          acc[date].sales += d.Amount || 0;
          acc[date].transactions += 1;
          acc[date].revenue += d.Amount || 0;
          acc[date].aov = acc[date].sales / acc[date].transactions;
          return acc;
        }, {})
      ),
  
      monthly: Object.values(
        filteredData.reduce((acc, d) => {
          const month = d.Date.substring(0, 9);
          if (!acc[month])
            acc[month] = { month, sales: 0, transactions: 0, revenue: 0 };
          acc[month].sales += d.Amount || 0;
          acc[month].transactions += 1;
          acc[month].revenue += d.Amount || 0;
          acc[month].aov = acc[month].sales / acc[month].transactions;
          return acc;
        }, {})
      ),
    };
  };