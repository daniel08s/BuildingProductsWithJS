// npm packages
import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// our packages
import {updateQuestion, deleteQuestion} from '../../store/actions';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  updateQuestion: payload => dispatch(updateQuestion(payload)),
  deleteQuestion: payload => dispatch(deleteQuestion(payload)),
});

export class Question extends React.Component {
  constructor() {
    super();

    this.state = {editing: false};

    this.answerInput = null;
    this.questionInput = null;
  }

  handleAnswerClick(e) {
    e.preventDefault();
    this.props.onAnswer({
      question: this.props.question,
      answer: this.answerInput.value,
    });
    this.answerInput.value = '';
    return false;
  }

  handleDeleteClick(e) {
    e.preventDefault();
    this.props.deleteQuestion(this.props.question);
    return false;
  }

  handleUpdateClick(e) {
    e.preventDefault();
    const newQuestion = _.omit(this.props.question, ['owner', 'answers']);
    newQuestion.text = this.questionInput.value;
    this.props.updateQuestion(newQuestion);
    this.setState({editing: !this.state.editing});
    return false;
  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing});
    return false;
  }

  render() {
    const {question, user} = this.props;
    const {editing} = this.state;

    return (
      <div className="panel panel-default text-left">
        <div className="panel-heading">
          {user.id === question.owner.id && (
            <span>
              <button type="submit" className="btn btn-link" id="deleteBtn" onClick={e => this.handleDeleteClick(e)}>
                <span className="glyphicon glyphicon-trash" style={{color: '#800000'}} />
              </button>
              {editing ? '' : (
                <button className="btn btn-link" id="editBtn" onClick={e => this.toggleEdit(e)}>
                  <span className="glyphicon glyphicon-pencil" style={{color: '#800000'}} />
                </button>
              )}
            </span>
          )}

          {editing ? (
            <span>
              <input
                type="text"
                id="questionText"
                defaultValue={question.text}
                ref={(i) => { this.questionInput = i; }}
              />
              <button className="btn btn-link" id="updateBtn" onClick={e => this.handleUpdateClick(e)}>
                <span className="glyphicon glyphicon-ok" style={{color: '#800000'}} />
              </button>
              <button className="btn btn-link" id="editBtn2" onClick={e => this.toggleEdit(e)}>
                <span className="glyphicon glyphicon-remove" style={{color: '#800000'}} />
              </button>
            </span>
          ) : question.text}

          <div className="pull-right">
            Created by: <Link to={`/profile/${question.owner.id}`}>{question.owner.login}</Link>
          </div>
        </div>
        <div className="panel-body">
          {question.answers.length > 0 ? (
            <ul className="list-group">
              {question.answers.map((answer, i) => (
                <li className="list-group-item" key={i}>{answer.answer}</li>
              ))}
            </ul>
          ) : 'No answers yet.'}
        </div>
        <div className="panel-footer">
          <form className="form-horizontal">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="answerInput"
                placeholder="Enter your answer..."
                ref={(i) => { this.answerInput = i; }}
              />
            </div>
            <button type="submit" id="answerBtn" className="btn btn-default" onClick={e => this.handleAnswerClick(e)}>
              Answer
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  question: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
