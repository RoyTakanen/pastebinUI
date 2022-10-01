import { Container, Space, Checkbox, TextInput, Button, Alert } from '@mantine/core';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import hljs from 'highlight.js';
import '@uiw/react-textarea-code-editor/dist.css';
import { IconSend, IconAlertCircle } from '@tabler/icons';
import useSWR from 'swr';

import { Welcome } from '../components/Welcome/Welcome';
import { HeaderMenu } from '../components/Header/HeaderMenu';
import { StatsGroup } from '../components/Stats/Stats';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default) as any,
  { ssr: false }
);

const MetricsComponent = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/metrics`, fetcher);

  if (error) {
    return <Alert icon={<IconAlertCircle size={16} />} title="Virhe!" color="red" variant="filled">
              Tilastojen lataus epäonnistui
           </Alert>;
  }
  if (!data) {
    // Modify the Component to show simple loader with loading property
    return <StatsGroup data={[
        {
          title: 'Katselukertaa yhteensä',
          stats: '0',
          description: 'Kaikki liitteiden keräämät katselukerrat yhteensä.',
        },
        {
          title: 'Julkista liitettä',
          stats: '0',
          description: 'Hakukoneissa ja listauksissa näkyvät liitteet.',
        },
        {
          title: 'Yksityistä liitettä',
          stats: '0',
          description: 'Yksityisten liitteiden määrä (haussa näkymättömät liitteet).',
        },
      ]}
    />;
  }

  return <StatsGroup data={[
    {
      title: 'Katselukertaa yhteensä',
      stats: new Intl.NumberFormat('en-US', { notation: 'compact', maximumSignificantDigits: 2 }).format(data.totalViews),
      description: 'Kaikki liitteiden keräämät katselukerrat yhteensä.',
    },
    {
      title: 'Julkista liitettä',
      stats: new Intl.NumberFormat('en-US', { notation: 'compact', maximumSignificantDigits: 2 }).format(data.pasteCount.public),
      description: 'Hakukoneissa ja listauksissa näkyvät liitteet.',
    },
    {
      title: 'Yksityistä liitettä',
      stats: new Intl.NumberFormat('en-US', { notation: 'compact', maximumSignificantDigits: 2 }).format(data.pasteCount.private),
      description: 'Yksityisten liitteiden määrä (haussa näkymättömät liitteet).',
    },
  ]}
  />;
};

export default function HomePage() {
  const links = [
    { link: '/', label: 'Koti - Luo liite' },
    { link: '/browse', label: 'Selaa liitteitä' },
    { link: '/info', label: 'Tietoa meistä' },
  ];

  const [pasteValue, onPasteChange] = useState('');
  const [titleValue, onTitleChange] = useState('');
  const [languageValue, onLanguageChange] = useState('js');
  const [privateValue, onPrivateChange] = useState(false);

  // This slows the typing if it is run on every keypress
  useEffect(() => {
    const delayLanguageDetect = setTimeout(() => {
      const highlightRes = hljs.highlightAuto(pasteValue);
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

    const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pastes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const content = await rawResponse.json();

    Router.push(`/p/${content.id}`);
  };

  return (
    <>
      {/* @ts-ignore */}
      <HeaderMenu links={links} />
      <Welcome />
      <Space h="xl" />
      <Container>
        <TextInput
          label="Liitteen nimi"
          placeholder="HTML ei käynnisty..."
          value={titleValue}
          onChange={(evn: any) => onTitleChange(evn.target.value)}
        />
        <Space h="xl" />
        <CodeEditor
          // @ts-ignore
          placeholder="Syötä lokitiedostosi / koodipätkäsi / äidinkielen esseesi tähän kenttään jakaaksesi sen muille..."
          language={languageValue}
          value={pasteValue}
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
          checked={privateValue}
          onChange={(event) => onPrivateChange(event.currentTarget.checked)}
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

        <MetricsComponent />
      </Container>
    </>
  );
}
