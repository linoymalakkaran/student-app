import FamilyItem from "../familyItem/FamilyItem";
import classes from "./FamilyDetailsList.module.css";

const FamilyDetailsList = (props) => {
  return (
    <ul className={classes.familyDetails}>
      {props.familyDetails.map((familyDetails) => (
        <FamilyItem key={familyDetails.ID} familyDetails={familyDetails} />
      ))}
    </ul>
  );
};

export default FamilyDetailsList;
