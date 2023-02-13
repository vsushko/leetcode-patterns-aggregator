/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BLIND_75_LIST } from "./store/blind-seventy-five";
import { NEETCODE_150_LIST } from "./store/neetcode-one-hundred-fifty";


import './App.css';

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
        <div className="container-sm pt-3">
          <div className="d-flex justify-content-center">
            <table className="table table-sm table-bordered table-hover table-striped" style={{maxWidth: "1%", whiteSpace: "nowrap"}}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Pattern</th>
                  <th scope="col">Difficulty</th>
                </tr>
              </thead>
              <tbody>{
                NEETCODE_150_LIST.map((problem, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td className="text-start"><a className="navbar-brand" href={problem.link}>{problem.name}</a></td>
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