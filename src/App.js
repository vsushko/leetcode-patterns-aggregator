/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BLIND_75_LIST } from "./store/blind-seventy-five";
import { NEETCODE_150_LIST } from "./store/neetcode-one-hundred-fifty";
import { SEAN_PRASHAD_170_LIST } from "./store/seanprashad";


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
    default: return BLIND_75_LIST;
  }
}

const renderList = (listName) => {
  return getListByName(listName).map((problem, idx) => (
    <tr>
      <th scope="row">{idx + 1}</th>
      <td className="text-start"><a className="navbar-brand" href={problem.link}>{problem.name}</a></td>
      <td>{!problem.patterns ? problem.patterns.join(', ') : problem.topic}</td>
      <td style={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</td>
    </tr>
  ));
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      listName: 'BLIND_75_LIST',
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
        <div className="container-sm pt-3">
          <div className="d-flex justify-content-start">
            <form className="container-sm pt-3">
              <fieldset>
                <select className="form-select"
                  value={this.state.listName}
                  onChange={this.onChange}>
                  <option value="BLIND_75_LIST">Blind 75</option>
                  <option value="NEETCODE_150_LIST">Neetcode 150</option>
                  <option value="SEAN_PRASHAD_170_LIST">Sean Prashad 170</option>
                </select>
              </fieldset>
            </form>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <table className="table table-sm table-bordered table-hover table-striped" style={{ maxWidth: "1%", whiteSpace: "nowrap" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Pattern</th>
                  <th scope="col">Difficulty</th>
                </tr>
              </thead>
              <tbody> {renderList(this.state.listName)}</tbody>
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