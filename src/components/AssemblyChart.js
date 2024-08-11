import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const AssemblyChart = ({ scores, partyColors }) => {
  const totalSeats = 577;

  const totalScore = Object.values(scores).reduce((sum, score) => sum + Math.abs(score), 0);

  let normalizedScores = Object.keys(scores).map(party => ({
    name: party,
    value: (Math.abs(scores[party]) / totalScore) * totalSeats,
    color: partyColors[party],
  }));

  let roundedSeats = normalizedScores.map(party => ({
    ...party,
    value: Math.round(party.value),
  }));

  let seatDifference = totalSeats - roundedSeats.reduce((acc, party) => acc + party.value, 0);

  if (seatDifference !== 0) {
    const sortedParties = normalizedScores
      .map((party, index) => ({
        index,
        remainder: party.value - Math.floor(party.value),
      }))
      .sort((a, b) => b.remainder - a.remainder);

    roundedSeats[sortedParties[0].index].value += seatDifference;
  }

  return (
    <PieChart width={900} height={275}>
      <Pie
        data={roundedSeats}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="100%"
        startAngle={180}
        endAngle={0}
        innerRadius={120}  // Increased innerRadius for a larger chart
        outerRadius={240}  // Increased outerRadius for a larger chart
        paddingAngle={0}
        label={({ name, value }) => `${name}: ${value} sièges`}
      >
        {roundedSeats.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default AssemblyChart;
