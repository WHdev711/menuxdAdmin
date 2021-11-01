import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const colors = ["#922C88", "#FF006A", "#78ce90", "#b977ce", "#fac76e", "#de4d4d", "#862F2F", "#33862F", "#64F85D", "#BD3620", "#671307", "#670767", "#CF39CF", "#394ECF"];

export const getClicksGraph = (raw = []) => {
  const currentYear = new Date().getFullYear();
  const datasets = raw.map((r, index) => {
    const result = {};
    result.label = r.title ? r.title : "No name";
    const clicks = r.clicks.filter(c => new Date(c.created_at).getFullYear() >= currentYear);
    let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    clicks.forEach(d => {
      const month = new Date(d.created_at).getMonth();
      data[month] = data[month] + 1;
    });
    result.data = [...data];
    result.borderColor = colors[index];
    result.backgroundColor = "rgba(0, 0, 0, 0)";
    return result;
  });

  const options = {
    legend: {
      display: true,
      position: "right"
    }
  };

  return <Line options={options} data={{ labels: months, datasets }} />
};

export const getScoreGraph = (raw = []) => {
  const labels = []
  const result = {};
  result.label = "Score";
  result.borderColor = colors[0];
  result.backgroundColor = colors[0];

  result.data = raw.map(r => {
    labels.push(r.text);
    const total = r.rating.length;
    const score = r.rating.reduce((c, r) => c + r.score, 0);
    return (score / total);
  });

  const options = {
    legend: {
      display: false,
      position: "right"
    }
  };

  return <Bar options={options} data={{ labels, datasets: [result] }} />
};

export const getStayGraph = (raw = []) => {
  const currentYear = new Date().getFullYear();
  const result = {};
  result.label = "Permanencia";
  result.borderColor = colors[0];
  result.backgroundColor = "rgba(146, 44, 136, 0.3)";
  const stay = raw
    .filter(c => new Date(c.created_at).getFullYear() >= currentYear);
  result.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  result.data = result.data.map((r, index) => {
    const currentMonth = []
    stay.forEach(s => {
      if (new Date(s.created_at).getMonth() === index) {
        currentMonth.push((s.time) / 60000000000);
      }
    });

    const res = (currentMonth.reduce((c, a) => c + a, 0)) / currentMonth.length
    return res ? res : 0;
  });

  const options = {
    legend: {
      display: false,
      position: "right"
    }
  };

  return <Line options={options} data={{ labels: months, datasets: [result] }} />
};

export const getTopGraph = (raw = [], limit = 5, invert = false) => {
  let items = [];
  raw.forEach(i => {
    items = [...items, ...i.items];
  });
  let countItems = {}
  items.forEach(i => {
    countItems[i.dish_id] = countItems[i.dish_id] ? countItems[i.dish_id] + 1 : 1
  });

  let dishId = Object.keys(countItems)

  if (invert) {
    dishId.sort((a, b) => {
      const first = countItems[a];
      const second = countItems[b];
      return second - first;
    });
  } else {
    dishId.sort((a, b) => {
      const first = countItems[a];
      const second = countItems[b];
      return first - second;
    });
  }

  dishId = dishId.slice(0, limit);
  const labels = []
  const result = {};
  result.label = "Top";
  result.borderColor = colors[0];
  result.backgroundColor = colors[0];
  result.data = [];

  dishId.forEach(id => {
    const item = items.find(i => i.dish_id === Number(id));
    labels.push(item.dish.name ? item.dish.name : "No name");
    result.data.push(countItems[id]);
  });

  const options = {
    legend: {
      display: false,
      position: "right"
    }
  };

  return <Bar options={options} data={{ labels, datasets: [result] }} />
};

export const getOrdersGraph = (raw = [], isMonth = false) => {
  let orders = [];
  raw.forEach(i => {
    orders = [...orders, i];
  });
  const currentYear = new Date().getFullYear();
  let dataYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let dataMonth = [];
  let days = [];
  for (let i = 0; i < 31; i++) {
    dataMonth.push(0);
    days.push(i + 1);
  }

  const result = {};
  result.label = "Compras";
  orders = orders.filter(o => o.canceled);
  result.borderColor = colors[0];
  result.backgroundColor = "rgba(146, 44, 136, 0.3)";

  if (isMonth) {
    const currentMonth = new Date().getMonth();
    orders = orders.filter(o => new Date(o.created_at).getFullYear() >= currentYear).filter(o => new Date(o.created_at).getMonth() === currentMonth);
    orders.forEach(d => {
      const day = new Date(d.created_at).getDate() - 1;
      dataMonth[day] = dataMonth[day] + 1;
    });
    result.data = [...dataMonth];
  } else {
    orders = orders.filter(o => new Date(o.created_at).getFullYear() >= currentYear);
    orders.forEach(d => {
      const month = new Date(d.created_at).getMonth();
      dataYear[month] = dataYear[month] + 1;
    });
    result.data = [...dataYear];
  }

  const options = {
    legend: {
      display: false,
      position: "right"
    }
  };

  return <Line options={options} data={{ labels: isMonth ? days : months, datasets: [result] }} />
};
