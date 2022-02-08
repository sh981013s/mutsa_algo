import { db } from '../firebase/firebaseConfig';
import { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useCollection = (c, _q) => {
  const [documents, setDocuments] = useState([]);

  const q = useRef(_q).current;

  const uid = _q[2];

  useEffect(() => {
    let ref = collection(db, c);

    if (q && uid) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      let string = '';
      let fireIdList = [];
      let final = [];

      if (snapshot.docs.length === 0) {
        console.log('empty');
        setDocuments([]);
        return { documents };
      }

      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      for (let i = 0; i <= results.length - 1; i++) {
        fireIdList.push(results[i].id);
        if (i !== results.length - 1) {
          string += `${results[i].title},`;
        } else {
          string += `${results[i].title}`;
        }
      }
      const url = `http://api.openweathermap.org/data/2.5/group?id=${string}&units=metric&appid=${key}`;

      axios.get(url).then(({ data }) => {
        data.list.forEach((single, idx) => {
          final.push({
            name: single.name,
            lat: single.coord.lat,
            lon: single.coord.lon,
            fireId: fireIdList[idx],
            temp: single.main.temp,
            temp_min: single.main.temp_min,
            temp_max: single.main.temp_max,
            weather: single.weather[0].main,
            weather_desc: single.weather[0].description,
          });
        });
        setDocuments(final);
      });
    });

    return () => unsub();
  }, [c, q]);

  return { documents };
};
