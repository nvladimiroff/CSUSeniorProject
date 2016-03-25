var Questions = props => (
    <div className="container">
      <div className="question-block">
        <h1 className="question-header">{props.question}</h1>
      </div>
      <div className="answers">
        <div className="row">
          <div className="answer-block" id="answer-a">
            <span className="letter">A</span>
            <span className="answer">{props.answers.A}</span>
          </div>
          <div className="answer-block" id="answer-b">
            <span className="letter">B</span>
            <span className="answer">{props.answers.B}</span>
          </div>
        </div>
        <div className="row">
          <div className="answer-block" id="answer-c">
            <span className="letter">C</span>
            <span className="answer">{props.answers.C}</span>
          </div>
          <div className="answer-block" id="answer-d">
            <span className="letter">D</span>
            <span className="answer">{props.answers.D}</span>
          </div>
        </div>
      </div>
    </div>
);

ReactDOM.render(
  <Questions question="What is 1+1?" answers={{A: "4", B: "8", C: "√2", D: "2"}}/>,
  document.getElementById('content')
);
