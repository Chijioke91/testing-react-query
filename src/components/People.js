import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
  const res = await fetch(`http://swapi.dev/api/people`);
  if (!res.ok) {
    throw new Error('Error fetching people');
  }
  return res.json();
};

export default function People() {
  const { data, status } = useQuery('people', fetchPeople);

  switch (status) {
    case 'loading':
      return <div>Loading...</div>;

    case 'error':
      return <div>Error</div>;

    default:
      return (
        <>
          <h1>People</h1>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </>
      );
  }
}
