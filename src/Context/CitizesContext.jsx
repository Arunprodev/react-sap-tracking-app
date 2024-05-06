import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react';

const CitizesContext = createContext();
const Base_URL = 'http://localhost:9000';
let initial = {
  citizes: [],
  city: {},
  isLoading: false,
  errors: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'citizes/loaded':
      return { ...state, isLoading: false, citizes: action.payload };
      console.log('loaded');
    case 'city/loaded':
      return { ...state, isLoading: false, city: action.payload };
    case 'city/added':
      return {
        ...state,
        isLoading: false,
        citizes: [...state.citizes, action.payload],
      };
    case 'city/deleted':
      const result = state.citizes.filter((curr) => curr.id !== action.payload);
      return { ...state, isLoading: false, citizes: result };
    case 'citizesFetch/error':
      return { ...state, isLoading: false, errors: action.payload };
      console.error(state.errors);
    case 'cityFetch/error':
      return { ...state, isLoading: false, errors: action.payload };
      console.error(state.errors);
    case 'error/added':
      return { ...state, isLoading: false, errors: action.payload };
      console.error(state.errors);
    case 'error/deleted':
      return { ...state, isLoading: false, errors: action.payload };
      console.error(state.errors);
    default:
      throw new Error('Unknown actions');
  }
}
function CitizesProvider({ children }) {
  // const [citizes, setCitizes] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [city, setCity] = useState({});
  const [{ citizes, city, errors, isLoading }, dispatch] = useReducer(
    reducer,
    initial
  );

  useEffect(function () {
    async function featchCitizes() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'citizes/loaded', payload: data });
      } catch {
        dispatch({
          type: 'citizesFetch/error',
          payload: 'Error in fetching citizes data',
        });
      }
    }

    featchCitizes();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'citizesFetch/error',
        payload: 'Error in fetching city data',
      });
    }
  }, []);

  async function addNewCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${Base_URL}/cities`, {
        method: 'Post',
        body: JSON.stringify(newCity),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/added', payload: data });
    } catch (err) {
      dispatch({ type: 'error/added', payload: 'Error in adding city data' });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${Base_URL}/cities/${id}`, {
        method: 'Delete',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({ type: 'error/added', payload: 'Error in deleting city data' });
    }
  }

  return (
    <CitizesContext.Provider
      value={{ citizes, isLoading, getCity, city, addNewCity, deleteCity }}
    >
      {children}
    </CitizesContext.Provider>
  );
}

function useCitizes() {
  const value = useContext(CitizesContext);
  if (value === undefined)
    throw new Error('Try to access the context outside of its provider');
  return value;
}

export { CitizesProvider, useCitizes };
