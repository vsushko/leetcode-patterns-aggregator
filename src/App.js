/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BLIND_75_LIST } from "./store/blind-seventy-five";
import { NEETCODE_150_LIST } from "./store/neetcode-one-hundred-fifty";
import { SEAN_PRASHAD_170_LIST } from "./store/seanprashad";
import { LEETCODE_DATA_STRUCTURES_COURSES_LIST } from "./store/leetcode-data-structures-courses";
import { BARIK_LIST } from "./store/barik";
import { COMPANIES_LIST } from "./store/companies";

import './App.css';

const COMPLETED_STORAGE_KEY = 'completedProblems';

const loadCompleted = () => {
  try {
    const stored = sessionStorage.getItem(COMPLETED_STORAGE_KEY);
    return new Set(stored ? JSON.parse(stored) : []);
  } catch (e) {
    return new Set();
  }
}

const saveCompleted = (completed) => {
  try {
    sessionStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify([...completed]));
  } catch (e) {
    // storage is unavailable (private mode, quota) - keep the state in memory only
  }
}

const fallbackCopy = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    // copying is not supported by this browser
  }
  document.body.removeChild(textarea);
}

const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    return;
  }
  fallbackCopy(text);
}

const CLIPBOARD_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
  </svg>
);

const COPIED_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </svg>
);

const PREMIUM_BADGE = (
  <span className="badge premium-badge" title="This problem requires a LeetCode Premium subscription">
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
    Premium
  </span>
);

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

const getFilteredProblems = (listName, pattern, difficulty) => {
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
    .filter(obj => difficulty === 'ALL' || obj.difficulty === difficulty);
}

const renderList = (problems, completed, onToggle, copiedProblem, onCopy) => {
  return problems.map((problem, idx) => (
    <tr key={problem.name}>
      <th scope="row">{idx + 1}</th>
      <td className="text-start">
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center flex-wrap">
            <a className="navbar-brand problem-name" href={problem.link}>{problem.name}</a>
            {problem.premium ? PREMIUM_BADGE : null}
          </span>
          <button
            type="button"
            className={copiedProblem === problem.name ? "btn copy-button copied" : "btn copy-button"}
            title={copiedProblem === problem.name ? "Copied!" : "Copy the problem name"}
            aria-label={"Copy the name of the problem " + problem.name}
            onClick={() => onCopy(problem.name)}
          >
            {copiedProblem === problem.name ? COPIED_ICON : CLIPBOARD_ICON}
          </button>
        </div>
      </td>
      <td>{!problem.patterns ? problem.patterns.join(', ') : problem.topic}</td>
      <td style={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</td>
      <td>
        <input
          type="checkbox"
          checked={completed.has(problem.name)}
          onChange={() => onToggle(problem.name)}
        />
      </td>
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
      currentDifficulty: 'ALL',
      completed: loadCompleted(),
      copiedProblem: null
    };

    this.onChange = this.onChangeList.bind(this);
    this.onChange = this.onChangePattern.bind(this);
    this.onChange = this.onChangeDifficulty.bind(this);
    this.onToggleProblem = this.onToggleProblem.bind(this);
    this.onCopyProblemName = this.onCopyProblemName.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.copiedTimeout);
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

  onCopyProblemName(problemName) {
    copyToClipboard(problemName);
    clearTimeout(this.copiedTimeout);
    this.setState({ copiedProblem: problemName });
    this.copiedTimeout = setTimeout(() => this.setState({ copiedProblem: null }), 1500);
  }

  onToggleProblem(problemName) {
    this.setState(prevState => {
      const completed = new Set(prevState.completed);
      if (completed.has(problemName)) {
        completed.delete(problemName);
      } else {
        completed.add(problemName);
      }
      saveCompleted(completed);
      return { completed };
    });
  }

  onToggleAll(problems, allSelected) {
    this.setState(prevState => {
      const completed = new Set(prevState.completed);
      problems.forEach(problem => {
        if (allSelected) {
          completed.delete(problem.name);
        } else {
          completed.add(problem.name);
        }
      });
      saveCompleted(completed);
      return { completed };
    });
  }

  render() {
    const problems = getFilteredProblems(this.state.listName, this.state.currentPatternName, this.state.currentDifficulty);
    const selectedCount = problems.filter(problem => this.state.completed.has(problem.name)).length;
    const allSelected = problems.length > 0 && selectedCount === problems.length;
    const someSelected = selectedCount > 0 && !allSelected;

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
                    <th scope="col" style={{ width: "10%" }}>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <input
                          type="checkbox"
                          title="Select all the problems matching the current filters"
                          aria-label="Select all the problems matching the current filters"
                          disabled={problems.length === 0}
                          checked={allSelected}
                          ref={el => { if (el) { el.indeterminate = someSelected; } }}
                          onChange={() => this.onToggleAll(problems, allSelected)}
                        />
                        <span>Completed</span>
                      </div>
                      <small className="fw-normal text-muted">{selectedCount}/{problems.length}</small>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderList(problems, this.state.completed, this.onToggleProblem, this.state.copiedProblem, this.onCopyProblemName)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
