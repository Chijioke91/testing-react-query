import { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (page = 1) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);

  if (!res.ok) {
    throw new Error('Unable to fetch data:Kindly ensure that you passed the right url');
  }

  return res.json();
};

export default function Planets() {
  const [page, setPage] = useState(1);

  const { data, status, error, isPreviousData } = useQuery(['planets', page], () => fetchPlanets(page), { keepPreviousData: true });

  switch (status) {
    case 'loading':
      return <div>Loading...</div>;

    case 'error':
      return (
        <div>
          <h2>{error.message}</h2>
        </div>
      );

    default:
      return (
        <>
          <h2>Planets</h2>

          <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.next}
          >
            Next Page
          </button>

          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </>
      );
  }
}
