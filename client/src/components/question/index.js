// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// our packages
import {updateQuestion, deleteQuestion} from '../../store/actions';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  // updateQuestion: payload => dispatch(updateQuestion(payload)),
  deleteQuestion: payload => dispatch(deleteQuestion(payload)),
});

const Question = ({question, onAnswer, user, deleteQuestion}) => {
  let answerInput;

  const handleClick = (e) => {
    e.preventDefault();

    onAnswer({question, answer: answerInput.value});
    answerInput.value = '';

    return false;
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deleteQuestion(question);

    return false;
  };

  return (
    <div className="panel panel-default text-left">
      <div className="panel-heading">
        {user.id === question.owner.id ? (
          <button type="submit" className="btn btn-link" onClick={handleDelete}>
            <span className="glyphicon glyphicon-trash" style={{color: '#330000'}} />
          </button>
        ) : null}

        {question.text}

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
        <div className="panel-footer">
          <form className="form-horizontal">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="answerInput"
                placeholder="Enter your answer..."
                ref={(i) => { answerInput = i; }}
              />
            </div>
            <button type="submit" className="btn btn-default" onClick={handleClick}>
              Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
