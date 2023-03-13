/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BLIND_75_LIST } from "./store/blind-seventy-five";
import { NEETCODE_150_LIST } from "./store/neetcode-one-hundred-fifty";
import { SEAN_PRASHAD_170_LIST } from "./store/seanprashad";
import { LEETCODE_DATA_STRUCTURES_COURSES_LIST } from "./store/leetcode-data-structures-courses";

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
    default: return [...NEETCODE_150_LIST, ...BLIND_75_LIST, ...SEAN_PRASHAD_170_LIST, ...LEETCODE_DATA_STRUCTURES_COURSES_LIST];
  }
}

const renderList = (listName) => {
  const list = getListByName(listName);

  return list.reduce((acc, curr) => {
    acc.push(
      ...list
        .filter(item => item === curr)
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    return acc;
  }, []).filter((obj, index) => list.findIndex((item) => item.name === obj.name) === index).map((problem, idx) => (
    <tr>
      <th scope="row">{idx + 1}</th>
      <td className="text-start"><a className="navbar-brand" href={problem.link}>{problem.name}</a></td>
      <td>{!problem.patterns ? problem.patterns.join(', ') : problem.topic}</td>
      <td style={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</td>
    </tr>
  ));
}

const renderOptions = (patternsList) => {
  const list = getListByName();
  console.log(list);
  return (<option value="ALL">All</option>);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      listName: 'BLIND_75_LIST',
      patternsList: ['ALL']
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ listName: e.target.value });
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
                  <select className="form-select" value={this.state.listName} onChange={this.onChange}>
                    <option value="BLIND_75_LIST">Blind 75</option>
                    <option value="NEETCODE_150_LIST">Neetcode 150</option>
                    <option value="SEAN_PRASHAD_170_LIST">Sean Prashad 170</option>
                    <option value="LEETCODE_DATA_STRUCTURES_COURSES_LIST">Leetcode DS courses</option>
                    <option value="ALL">All</option>
                  </select>
                </div>
              </fieldset>
              <fieldset className="d-flex justify-content-start pt-3">
                <div className="container-sm">
                  <label for="listSelect" className="form-label">Select the pattern:</label>
                </div>
                <div className="container-sm">
                  <select className="form-select" value={this.state.listName} onChange={this.onChange}>
                    {renderOptions(this.state.patternsList)}
                  </select>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="container container-sm pt-3">
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
                <tbody> {renderList(this.state.listName)}</tbody>
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