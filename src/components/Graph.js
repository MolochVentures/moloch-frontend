import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';

export default class Graph extends Component {
    render() {
        const data = [
            {
              "id": "Value",
              "data": [
                {
                  "x": "Jan",
                  "y": 20
                },
                {
                  "x": "Feb",
                  "y": 70
                },
                {
                  "x": "Mar",
                  "y": 100
                },
                {
                  "x": "Apr",
                  "y": 60
                },
                {
                  "x": "Jun",
                  "y": 70
                },
                {
                  "x": "Jul",
                  "y": 120
                },
                {
                  "x": "Aug",
                  "y": 170
                },
                {
                  "x": "Sep",
                  "y": 70
                },
                {
                  "x": "Oct",
                  "y": 100
                },
                {
                  "x": "Nov",
                  "y": 170
                },
                {
                  "x": "Dec",
                  "y": 190
                }
              ]
            }
          ];

        return (
            <ResponsiveLine
                data={data}
                enableDots={false}
                enableGridX={false}
                margin={{
                    "top": 50,
                    "right": 30,
                    "bottom": 50,
                    "left": 60
                }}
                xScale={{
                    "type": "point"
                }}
                yScale={{
                    "type": "linear",
                    "min": "auto",
                    "max": "auto"
                }}
                colors={["#993366"]}
                lineWidth={3}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 0,
                    "tickPadding": 5,
                    "tickRotation": 0
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 0,
                    "tickPadding": 5,
                    "tickRotation": 0
                }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{
                    axis: {
                      ticks: {
                        text: {
                          fill: "rgba(255,255,255,0.5)"
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: 0.25
                      }
                    }
                  }}
            />
        );
    }
}