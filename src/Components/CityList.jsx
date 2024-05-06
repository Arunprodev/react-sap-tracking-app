import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCitizes } from '../Context/CitizesContext';

function CityList() {
  const { citizes, isloading } = useCitizes();
  if (isloading) return <Spinner />;
  if (!citizes.length) {
    return (
      <Message
        message={
          'Run the API in your system by following the Readme file to laod the data from the API'
        }
      />
    );
  }
  return (
    <ul className={styles.cityList}>
      {citizes.map((el) => (
        <CityItem city={el} key={el.id} />
      ))}
    </ul>
  );
}

export default CityList;
