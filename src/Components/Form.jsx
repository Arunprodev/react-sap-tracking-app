// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './Form.module.css';
import Button from './Button';
import { useNavigate } from 'react-router';
import BackButton from './BackButton';
import { useURLLocation } from '../hooks/GetURLLoaction';
import Message from './Message';
import Spinner from './Spinner';
import { useCitizes } from '../Context/CitizesContext';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useURLLocation();
  const [err, setError] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isLoad, setLoad] = useState(false);
  const { addNewCity, isLoading } = useCitizes();
  const navigation = useNavigate();

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

  useEffect(
    function () {
      async function fetchURLdata() {
        try {
          setCityName('');
          setCountry('');
          setError('');
          setEmoji('');
          setLoad(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryName)
            throw new Error(
              'You have not point any country kindly click on the country for process more...'
            );
          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoad(false);
        }
      }
      fetchURLdata();
    },
    [lat, lng]
  );

  async function addCity(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      position: { lat, lng },
      notes,
    };

    await addNewCity(newCity);
    navigation('/app/citizes');
  }

  if (err) return <Message message={err} />;

  return (
    <>
      {isLoad ? (
        <Spinner />
      ) : (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            {/* <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            /> */}
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary" action={addCity}>
              Add
            </Button>
            <BackButton />
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
