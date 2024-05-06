import styles from './countryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCitizes } from '../Context/CitizesContext';

function CountryList() {
  const { citizes, isloading } = useCitizes();
  console.log(citizes.length);
  if (isloading) return <Spinner />;

  if (!citizes.length) {
    return <Message message={'Add some city by clicking on the map'} />;
  }

  const countries = citizes.reduce((arr, curr) => {
    if (arr.map((el) => el.country).includes(curr.country)) {
      return arr;
    } else {
      return [...arr, { country: curr.country, emoji: curr.emoji }];
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((el) => (
        <CountryItem country={el} key={el.country} />
      ))}
    </ul>
  );
}

export default CountryList;
