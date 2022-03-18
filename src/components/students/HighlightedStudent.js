import classes from './HighlightedStudent.module.css';

const HighlightedStudent = (props) => {
  return (
    <figure className={classes.student}>
      <p>{props.firstName}</p>
      <figcaption>{props.lastName}</figcaption>
    </figure>
  );
};

export default HighlightedStudent;
