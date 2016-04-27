var NotStarted = props => (
  <div className="infopage">
    <h1>Waiting for the session to start.</h1>
  </div>
);

var Finished = props => (
  <div className="infopage">
    <h1>The test is finished!</h1>
  </div>
);

var Answer = props => (
  <div
    onClick={props.onClick}
    className={"answer-block " + (props.selected ? "answer-block-selected" : "")}
    id={"answer-" + props.letter}>
    <span className={"letter " + (props.selected ? "letter-selected" : "")}>{props.letter}</span>
    <span className="answer"> {props.answer}</span>
  </div>
);

var StudentApp = React.createClass({
  getInitialState: function() {
    return {
      started: false,
      finished: false,
      questionNum: 0,
      selectedAnswer: 'X',
      questions: [{question: "Loading...", answers: ["*", "*", "*", "*"]}],
      session_id: 'X'
    };
  },

  transformData: function(input) {
    var output = [];
    input.forEach(element => {
      var x = {};
      x.question = element.name;
      x.answers = element.Answers.map(y => y.name);
      output.push(x);
    });

    return output;
  },

  loadSetFromServer: function() {
    $.ajax({
      url: "/questions/question_set/" + this.props.params.id,
      dataType: 'json',
      type: 'GET',
      success: data => {
        this.setState({questions: this.transformData(data)});
      }.bind(this),
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  },

  loadInfoFromServer: function(success) {
    $.ajax({
      url: "/sessions/questionset/" + this.props.params.id,
      dataType: 'json',
      type: 'GET',
      success: success,
    });
  },

  componentWillMount: function() {
    this.loadSetFromServer();
    this.loadInfoFromServer( data => {
      this.setState({ started: data.is_active });
      if(this.state.started) {
        // What we get from the server is 2 off for some reason.
        this.setState({ questionNum: data.current_question_id-2 });
      }}.bind(this)
    );
  },

  componentDidMount: function() {
    setInterval(() => {
      this.loadInfoFromServer(data => {
        this.setState({ started: data.is_active });
        if(this.state.started) {
          if((data.current_question_id-2) !== this.state.questionNum) {
            // The professor went to a new question, so send the answer.
            this.sendAnswer();
            this.unselect();
          }
          this.setState({ questionNum: data.current_question_id-2 });
        }
      }.bind(this));
    }, 1000);
  },

  sendAnswer: function() {
    $.ajax({
      url: "/student/answer/" + this.props.params.id,
      dataType: 'json',
      type: 'POST',
      data: { questionNum: this.state.questionNum, answer: this.state.selectedAnswer },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  },

  unselect: function() {
    this.setState({ selectedAnswer: 'X' });
  },

  respond: function(answer) {
    this.setState({ selectedAnswer: answer });
  },

  render: function() {
    if(this.state.finished) {
      return (
        <Finished/>
      );
    } else if (!this.state.started) {
      return (
        <NotStarted/>
      );
    } else {
      return (
        <div className="container">
          <QuestionBlock
            respond={this.respond}
            selectedAnswer={this.state.selectedAnswer}
            question={this.state.questions[this.state.questionNum].question}
            answers={this.state.questions[this.state.questionNum].answers}
          />
        </div>
      );
    }
  },
});

var QuestionBlock = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="question-block">
          <h1 className="question-header">{this.props.question}</h1>
        </div>
        <div className="answers">
          <div className="row">
            <Answer
              onClick={this.click("A").bind(this)}
              selected={this.props.selectedAnswer == "A"}
              letter="A"
              answer={this.props.answers[0]}/>
            <Answer
              onClick={this.click("B").bind(this)}
              selected={this.props.selectedAnswer == "B"}
              letter="B"
              answer={this.props.answers[1]}/>
          </div>
          <div className="row">
            <Answer
              onClick={this.click("C").bind(this)}
              selected={this.props.selectedAnswer == "C"}
              letter="C"
              answer={this.props.answers[2]}/>
            <Answer
              onClick={this.click("D").bind(this)}
              selected={this.props.selectedAnswer == "D"}
              letter="D"
              answer={this.props.answers[3]}/>
          </div>
        </div>
      </div>
    );
  },

  click: function(letter) {
    return function() {
      this.props.respond(letter);
    };
  }
});

ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.browserHistory}>
    <ReactRouter.Route path="/student/:id" component={StudentApp}/>
  </ReactRouter.Router>,
  document.getElementById('content')
);

