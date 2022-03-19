import classes from './FamilyItem.module.css';

const FamilyItem = (props) => {
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
    </li>
  );
};

export default FamilyItem;
