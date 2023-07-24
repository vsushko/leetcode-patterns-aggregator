/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BLIND_75_LIST } from "./store/blind-seventy-five";
import { NEETCODE_150_LIST } from "./store/neetcode-one-hundred-fifty";
import { SEAN_PRASHAD_170_LIST } from "./store/seanprashad";
import { LEETCODE_DATA_STRUCTURES_COURSES_LIST } from "./store/leetcode-data-structures-courses";
import { BARIK_LIST } from "./store/barik";
import { COMPANIES_LIST } from "./store/companies";

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

const getListByName = (listName) => {
  switch (listName) {
    case 'NEETCODE_150_LIST': return NEETCODE_150_LIST;
    case 'BLIND_75_LIST': return BLIND_75_LIST;
    case 'SEAN_PRASHAD_170_LIST': return SEAN_PRASHAD_170_LIST;
    case 'LEETCODE_DATA_STRUCTURES_COURSES_LIST': return LEETCODE_DATA_STRUCTURES_COURSES_LIST;
    case 'BARIK_LIST': return BARIK_LIST;
    case 'COMPANIES_LIST': return COMPANIES_LIST;
    default: return [...NEETCODE_150_LIST, ...BLIND_75_LIST, ...SEAN_PRASHAD_170_LIST, ...LEETCODE_DATA_STRUCTURES_COURSES_LIST, ...BARIK_LIST, ...COMPANIES_LIST];
  }
}

const renderList = (listName, pattern, difficulty) => {
  const list = getListByName(listName);

  return list.reduce((acc, curr) => {
    acc.push(
      ...list
        .filter(item => item === curr)
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    return acc;
  }, []).filter((obj, index) => list.findIndex((item) => item.name === obj.name) === index)
    .filter(obj => pattern === 'ALL' || obj.topic === pattern)
    .filter(obj => difficulty === 'ALL' || obj.difficulty === difficulty)
    .map((problem, idx) => (
      <tr>
        <th scope="row">{idx + 1}</th>
        <td className="text-start"><a className="navbar-brand" href={problem.link}>{problem.name}</a></td>
        <td>{!problem.patterns ? problem.patterns.join(', ') : problem.topic}</td>
        <td style={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</td>
      </tr>
    ));
}

const renderOptions = (pattern) => {
  const list = getListByName();
  let uniquePatterns = new Set();
  uniquePatterns.add("All");
  list.forEach(problem => uniquePatterns.add(problem.topic));

  let options = [...uniquePatterns].map((patternName, idx) => (
    <option key={idx} value={patternName}>{patternName}</option>
  )
  );
  return options;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      listName: 'ALL',
      currentPatternName: 'ALL',
      currentDifficulty: 'ALL'
    };

    this.onChange = this.onChangeList.bind(this);
    this.onChange = this.onChangePattern.bind(this);
    this.onChange = this.onChangeDifficulty.bind(this);
  }

  onChangeList(e) {
    this.setState({ listName: e.target.value });
  }

  onChangePattern(e) {
    this.setState({ currentPatternName: e.target.value });
  }

  onChangeDifficulty(e) {
    this.setState({ currentDifficulty: e.target.value });
  }

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
        <div className="container container-sm pt-3">
          <div className="d-flex justify-content-start">
            <form className="container-sm pt-3">
              <fieldset className="d-flex justify-content-start">
                <div className="container-sm">
                  <label for="listSelect" className="form-label">Select the list:</label>
                </div>
                <div className="container-sm">
                  <select className="form-select" value={this.state.listName} onChange={e => this.onChangeList(e)}>
                    <option value="BLIND_75_LIST">Blind 75</option>
                    <option value="NEETCODE_150_LIST">Neetcode 150</option>
                    <option value="SEAN_PRASHAD_170_LIST">Sean Prashad 170</option>
                    <option value="LEETCODE_DATA_STRUCTURES_COURSES_LIST">Leetcode DS courses</option>
                    <option value="BARIK_LIST">Barik course</option>
                    <option value="COMPANIES_LIST">Specific company list</option>
                    <option value="ALL">All</option>
                  </select>
                </div>
              </fieldset>
              <fieldset className="d-flex justify-content-start pt-3">
                <div className="container-sm">
                  <label for="listSelect" className="form-label">Select the pattern:</label>
                </div>
                <div className="container-sm">
                  <select className="form-select" value={this.state.currentPatternName} onChange={e => this.onChangePattern(e)}>
                    {renderOptions(this.state.currentPatternName)}
                  </select>
                </div>
              </fieldset>
              <fieldset className="d-flex justify-content-start pt-3">
                <div className="container-sm">
                  <label for="listSelect" className="form-label">Select the difficulty:</label>
                </div>
                <div className="container-sm">
                  <select className="form-select" value={this.state.currentDifficulty} onChange={e => this.onChangeDifficulty(e)}>
                    <option value="ALL">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="container container-sm pt-3 vh-100 overflow-auto">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="checkbox" style={{ width: "5%" }}>#</th>
                    <th scope="col" style={{ width: "50%" }}>Problem</th>
                    <th scope="col" style={{ width: "35%" }}>Pattern</th>
                    <th scope="col" style={{ width: "10%" }}>Difficulty</th>
                  </tr>
                </thead>
                <tbody> {renderList(this.state.listName, this.state.currentPatternName, this.state.currentDifficulty)}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;