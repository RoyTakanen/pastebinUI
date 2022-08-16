import { Container, Space, Checkbox, TextInput, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import hljs from 'highlight.js';
import '@uiw/react-textarea-code-editor/dist.css';
import { IconSend } from '@tabler/icons';

import { Welcome } from '../components/Welcome/Welcome';
import { HeaderMenu } from '../components/Header/HeaderMenu';
import { StatsGroup } from '../components/Stats/Stats';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function HomePage() {
  const links = [
    { link: '/', label: 'Koti' },
    { link: 'string', label: 'string' },
  ];

  const statsDefault = [
    {
      title: 'Katselukertaa yhteensä',
      stats: 0,
      description: 'Kaikki liitteiden keräämät katselukerrat yhteensä.',
    },
    {
      title: 'Julkista liitettä',
      stats: 0,
      description: 'Hakukoneissa ja listauksissa näkyvät liitteet.',
    },
    {
      title: 'Yksityistä liitettä',
      stats: 0,
      description: 'Yksityisten liitteiden määrä (haussa näkymättömät liitteet).',
    },
  ];

  const [stats, setStats] = useState(statsDefault);
  if (stats[0].stats < 1) {
    fetch('http://localhost:3001/metrics')
      .then((response) => response.json())
      .then((data) => {
        const newStats = structuredClone(stats);
        newStats[0].stats = data.totalViews;
        newStats[1].stats = data.pasteCount.public;
        newStats[2].stats = data.pasteCount.private;
        setStats(newStats);
      });
  }

  const [pasteValue, onPasteChange] = useState('');
  const [titleValue, onTitleChange] = useState('');
  const [languageValue, onLanguageChange] = useState('js');
  const [privateValue, onPrivateChange] = useState(false);

  // This slows the typing if it is run on every keypress
  useEffect(() => {
    const delayLanguageDetect = setTimeout(() => {
      const highlightRes = hljs.highlightAuto(pasteValue);
      console.log(highlightRes.language);
      onLanguageChange(highlightRes.language ? highlightRes.language : 'html');
    }, 1000);

    return () => clearTimeout(delayLanguageDetect);
  }, [pasteValue]);

  const createPaste = async () => {
    const data = {
      paste: pasteValue,
      title: titleValue,
      language: languageValue,
      private: privateValue,
    };

    const rawResponse = await fetch('http://localhost:3001/pastes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const content = await rawResponse.json();

    Router.push(`/p/${content.id}`);

    console.log(content);
  };

  const randomNames = ['HTML ei käynnisty...'];
  const placeholderName = randomNames[Math.floor(Math.random() * randomNames.length)];

  return (
    <>
      <HeaderMenu links={links} />
      <Welcome />
      <Space h="xl" />
      <Container>
        <TextInput
          label="Liitteen nimi"
          placeholder={placeholderName}
          value={titleValue}
          onChange={(evn: any) => onTitleChange(evn.target.value)}
        />
        <Space h="xl" />
        <CodeEditor
          value={pasteValue}
          language={languageValue}
          placeholder="Syötä lokitiedostosi / koodipätkäsi / äidinkielen esseesi tähän kenttään jakaaksesi sen muille..."
          onChange={(evn: any) => onPasteChange(evn.target.value)}
          padding={15}
          minHeight={300}
          style={{
            fontSize: 12,
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        <Space h="xl" />
        <Checkbox
          label="Yksityinen"
          value={privateValue}
          onClick={(event) => onPrivateChange(event.currentTarget.checked)}
        />
        <Space h="xl" />
        <Button
          onClick={createPaste}
          leftIcon={<IconSend />}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
        >
          Lähetä liite!
        </Button>
        <Space h="xl" />
        <StatsGroup data={stats} />
      </Container>
    </>
  );
}
