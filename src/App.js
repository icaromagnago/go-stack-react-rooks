import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // function handleAdd() {
  //   setTech([...tech, newTech]);
  //   setNewTech('');
  // }

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // vai ser executado uma unica vez. Pois [] de dependencias vazio
  // componentDidMount
  useEffect(() => {
    const storeTech = localStorage.getItem('tech');

    if (storeTech) {
      setTech(JSON.parse(storeTech));
    }

    return () => {}; // componentWillUnmount
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // será executado caso a variável tech mude
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Voce tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
