import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeaderMenu } from '../components/Header/HeaderMenu';
import { StatsGroup } from '../components/Stats/Stats';

import { Container } from '@mantine/core';
import { useState } from 'react';

export default function HomePage() {
  const links = [
    { link: "/", label: "Koti" },
    { link: "string", label: "string" }
  ]

  let statsDefault = [
    {
      "title": "Katselukertaa yhteensä",
      "stats": 0,
      "description": "Kaikki liitteiden keräämät katselukerrat yhteensä."
    },
    {
      "title": "Julkista liitettä",
      "stats": 0,
      "description": "Hakukoneissa ja listauksissa näkyvät liitteet."
    },
    {
      "title": "Yksityistä liitettä",
      "stats": 0,
      "description": "Yksityisten liitteiden määrä (haussa näkymättömät liitteet)."
    }
  ];

  const [stats, setStats] = useState(statsDefault);

  if (stats[0].stats < 1)
    fetch("http://localhost:3001/metrics")
      .then(response => response.json())
      .then(data => {
        let newStats = structuredClone(stats);
        newStats[0].stats = data.totalViews
        newStats[1].stats = data.pasteCount.public
        newStats[2].stats = data.pasteCount.private
        setStats(newStats);
      });

  return (
    <>
      <HeaderMenu links={links} />
      <Welcome />
      <ColorSchemeToggle />
      <Container>
        <StatsGroup data={stats}/>
      </Container>
    </>
  );
}
