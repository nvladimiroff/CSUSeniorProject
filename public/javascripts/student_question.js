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
      locked: false,
      question: "Loading...",
      answers: [Array(4).fill({name:"*", id:-1})],
      selectedAnswer: 'X'
    };
  },

  loadSetFromServer: function() {
    $.ajax({
      url: "/questions/getcurrent/" + this.props.params.id,
      dataType: 'json',
      type: 'GET',
      success: data => {
        if(! _.isEqual(data[0], this.state.question)) {
          this.unselect();
          this.unlock();
          this.setState({question: data[0]});
        }
      }.bind(this),
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
    $.ajax({
     url: "/answer/getanswers/" + this.props.params.id,
     dataType: 'json',
     type: 'GET',
     success: data => {
       this.setState({answers: data});
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
    }.bind(this));
  },

  componentDidMount: function() {
    setInterval(() => {
      this.loadSetFromServer();
      this.loadInfoFromServer(data => {
        if(data === null && this.state.started) {
          this.setState({ finished: true });
        } else if(data !== null) {
          this.setState({ started: data.is_active });
        }
      }.bind(this));
    }, 1000);
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
            id={this.props.params.id}
            respond={this.respond}
            locked={this.state.locked}
            selectedAnswer={this.state.selectedAnswer}
            question={this.state.question}
            answers={this.state.answers}
          />
        </div>
      );
    }
  },

  respond: function(letter) {
    this.setState({ selectedAnswer: letter });
    this.setState({ locked: true });
  },

  unselect: function() {
    this.setState({ selectedAnswer: 'X' });
  },

  unlock: function() {
    this.setState({ locked: false });
  }
});

var QuestionBlock = React.createClass({
  render: function() {
    let letters = ["A", "B", "C", "D"];
    let answers = []
    for(var i=0; i < this.props.answers.length; i++) {
      answers.push(
       <Answer
         onClick={this.click(letters[i]).bind(this)}
         selected={this.props.selectedAnswer == letters[i]}
         letter={letters[i]}
         answer={this.props.answers[i].name}/>
      );
    }

    return (
      <div className="container">
        <div className="question-block">
          <h1 className="question-header">{this.props.question.name}</h1>
        </div>
        <div className="answers">
          <div className="row">
            {answers[0] ? answers[0] : ""}
            {answers[1] ? answers[1] : ""}
          </div>
          <div className="row">
            {answers[2] ? answers[2] : ""}
            {answers[3] ? answers[3] : ""}
          </div>
        </div>
      </div>
    );
  },

  click: function(letter) {
    return function() {
      if(!this.props.locked) {
        let answerId = this.props.answers[letter.charCodeAt(0)-65]
        this.setState({notAnswered: false});

        $.ajax({
          url: "/student/answer/" + this.props.id,
          dataType: 'json',
          type: 'POST',
          data: { answer: answerId.id },
          error: (xhr, status, err) => {
            console.log(err);
          }
        });
        this.props.respond(letter);
      }
    }
  },
});

ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.browserHistory}>
    <ReactRouter.Route path="/student/:id" component={StudentApp}/>
  </ReactRouter.Router>,
  document.getElementById('content')
);

