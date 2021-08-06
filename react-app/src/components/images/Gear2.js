import gear2 from "../../source-images/gear-icon2.png";
import { useDispatch } from "react-redux";
import * as preferenceActions from '../../store/preferences'

export const Gear2 = () => {
  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(preferenceActions.switchSetting(e.target.parentElement.value))
  }
  return <img src={gear2} alt="settings" onClick={handleClick} />;
};

export default Gear2;
