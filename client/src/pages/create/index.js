// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

// our packages
import {createQuestion} from '../../store/actions';

// styles
import styles from '../../css/mystyle.css';

const mapStateToProps = state => ({
//  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  doCreateQuestion: payload => dispatch(createQuestion(payload)),
});

const Create = ({doCreateQuestion}) => {
  let questionText;
  let questionDate;

  const handleCreate = (e) => {
    e.preventDefault();

    const text = questionText.value;
    const expirationDate = moment(questionDate.value).toISOString();

    doCreateQuestion({text, expirationDate});

    return false;
  };

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
        </div>

        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Browse questions</Link>
          </li>
          <li>
            <a><b>Create new question</b></a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <form className={styles.formQuestion}>
          <div className="form-group">
            <p className="h4 mb-3 font-weight-normal">Please fill the form to create a new question</p>

            <label htmlFor="questionText" className="sr-only" />
            <textarea
              rows="5"
              type="text"
              id="questionText"
              className="form-control"
              placeholder="Question text"
              ref={(t) => { questionText = t; }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate" className="sr-only" />
            <input
              type="date"
              id="expirationDate"
              className="form-control"
              placeholder="Expiration Date"
              ref={(d) => { questionDate = d; }}
              required
            />
          </div>
          <p />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={handleCreate}
          >Create new question
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
