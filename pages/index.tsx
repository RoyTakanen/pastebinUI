import { Welcome } from '../components/Welcome/Welcome';
import { HeaderMenu } from '../components/Header/HeaderMenu';
import { StatsGroup } from '../components/Stats/Stats';

import { Container, Space, Checkbox, TextInput, Button } from '@mantine/core';
import { useState, useMemo } from 'react';
import dynamic from "next/dynamic";
import hljs from 'highlight.js';
import "@uiw/react-textarea-code-editor/dist.css";
import { IconSend } from '@tabler/icons';

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

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

  const [pasteValue, onPasteChange] = useState('');
  const [languageValue, onLanguageChange] = useState('js');

  const updatePaste = (code: string) => {
    const highlightRes = hljs.highlightAuto(code);
    console.log(highlightRes.language)

    onPasteChange(code);
    onLanguageChange(highlightRes.language ? highlightRes.language : "js");
  };

  // const createPaste = () => {
  //   fetch("http://localhost:3001/metrics")
  //     .then(response => response.json())
  //     .then(data => {
  //       let newStats = structuredClone(stats);
  //       newStats[0].stats = data.totalViews
  //       newStats[1].stats = data.pasteCount.public
  //       newStats[2].stats = data.pasteCount.private
  //       setStats(newStats);
  //     });
  // }

  const randomNames = ["HTML ei käynnisty..."]
  const placeholderName = randomNames[Math.floor(Math.random()*randomNames.length)]

  return (
    <>
      <HeaderMenu links={links} />
      <Welcome />
      <Space h="xl" />
      <Container>
        <TextInput label="Liitteen nimi" placeholder={placeholderName}/>
        <Space h="xl" />
        <CodeEditor
          value={pasteValue} 
          language={languageValue}
          placeholder="Syötä lokitiedostosi / koodipätkäsi / äidinkielen esseesi tähän kenttään jakaaksesi sen muille..."
          onChange={(evn: any) => updatePaste(evn.target.value)}
          padding={15}
          minHeight={300}
          style={{
            fontSize: 12,
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
          }}
        />
        <Space h="xl" />
        <Checkbox label="Yksityinen" />
        <Space h="xl" />
        <Button leftIcon={<IconSend />} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Lähetä liite!</Button>
        <Space h="xl" />
        <StatsGroup data={stats}/>
      </Container>
    </>
  );
}
