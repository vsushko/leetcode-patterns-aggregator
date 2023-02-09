import React, { Component } from "react";
import { Link } from "react-router-dom";

import './App.css';

const problems =
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
  ];

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
            <table class="table table-sm table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Pattern</th>
                  <th scope="col">Difficulty</th>
                </tr>
              </thead>
              <tbody>{
                problems.map((problem, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td><a className="navbar-brand" href={problem.link}>{problem.name}</a></td>
                    <td>{problem.patterns.join(', ')}</td>
                    <td>{problem.difficulty}</td>
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