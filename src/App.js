/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BLIND_75_LIST } from "./store/blind-seventy-five";

import './App.css';

const seanprashadList =
  [
    {
      name: "Contains Duplicate",
      link: "https://leetcode.com/problems/contains-duplicate/",
      patterns: ["Arrays"],
      difficulty: "Easy"
    },
    {
      name: "Missing Number",
      link: "https://leetcode.com/problems/missing-number/",
      patterns: ["Arrays", "Bit Manipulation"],
      difficulty: "Easy"
    },
    {
      name: "Find All Numbers Disappeared in an Array",
      link: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
      patterns: ["Arrays"],
      difficulty: "Easy"
    },
  ];

const getDifficultyColor = (difficulty) => {
  if (difficulty === 'Easy') {
    return { color: "#00AF9B" }
  }
  if (difficulty === 'Medium') {
    return { color: "#FFB800" };
  }
  if (difficulty === 'Hard') {
    return { color: "#FF2D55" };
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <nav className="navbar navbar-light bg-light">
            <div className="ps-3">
              <a className="navbar-brand" href="#">Leetcode patterns aggregator</a>
            </div>
          </nav>
        </div>
        <div className="container-md pt-3">
          <div>
            <table className="table table-sm table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Pattern</th>
                  <th scope="col">Difficulty</th>
                </tr>
              </thead>
              <tbody>{
                BLIND_75_LIST.map((problem, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td><a className="navbar-brand" href={problem.link}>{problem.name}</a></td>
                    <td>{!problem.patterns ? problem.patterns.join(', ') : problem.topic}</td>
                    <td style={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;