import FamilyItem from '../familyItem/FamilyItem';
import classes from './FamilyDetailsList.module.css';

const FamilyDetailsList = (props) => {
  return (
    <ul className={classes.familyDetails}>
      {props.familyDetails.map((familyDetails) => (
        <FamilyItem key={familyDetails.id} text={familyDetails.text} />
      ))}
    </ul>
  );
};

export default FamilyDetailsList;
