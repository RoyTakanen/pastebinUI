import { Container, Title, Skeleton, Space, Divider, Grid, Text, Stack } from '@mantine/core';
import { useState } from 'react';
import { Prism } from '@mantine/prism';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { IconX, IconEye, IconEyeOff, IconFileDigit, IconCalendar, IconCode } from '@tabler/icons';

import { HeaderMenu } from '../../components/Header/HeaderMenu';
import { PasteCardVertical } from '../../components/PasteCard/PasteCardVertical';
import { ErrorNotFound } from '../../components/ErrorNotFound/ErrorNotFound';

export default function Paste() {
  const router = useRouter();
  const links = [
    { link: '/', label: 'Koti - Luo liite' },
    { link: '/info', label: 'Tietoa meistä' },
    { link: '/new', label: 'Uusimmat' },
    { link: '/pop', label: 'Suosituimmat' },
  ];

  const pasteDefault = {
    content: 'Ladataan...\n\n\n\n\n\nKestää hetken...',
    title: 'Ladataan...',
    meta: {
      views: 0,
    },
  };

  const latestDefault = [
    {
      author: 'Tuntematon Sotilas',
      date: '2022-08-04T12:57:22.810Z',
      title: 'Python-esimerkki',
      language: 'python',
      id: 'XXXXXX',
    },
  ];

  const [paste, setPaste] = useState(pasteDefault);
  const [latest, setLatest] = useState(latestDefault);
  const [loadPaste, setLoadPaste] = useState(false);
  const [loadLatest, setLoadLatest] = useState(false);
  const [pasteFound, setPasteFound] = useState(false);
  if (!loadPaste) {
    fetch(`http://localhost:3001/pastes/${router.query.slug}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadPaste(true); // This has to be here to avoid double fetch
        if (data.error) {
          showNotification({
            color: 'red',
            message: data.error,
            disallowClose: true,
            icon: <IconX size={20} />,
          });
        } else {
          let newPaste = structuredClone(paste);
          newPaste = data;
          // @ts-ignore
          newPaste.programmingLanguage = newPaste.programmingLanguage
            // @ts-ignore
            ? newPaste.programmingLanguage
            : 'tsx';
          // @ts-ignore
          newPaste.programmingLanguage =
            // @ts-ignore
            newPaste.programmingLanguage === 'csharp' ? 'c' : newPaste.programmingLanguage;
          setPaste(newPaste);
          setPasteFound(true);
        }
      });
  }
  if (!loadLatest) {
    fetch('http://localhost:3001/pastes?sorting=-date')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          showNotification({
            color: 'red',
            message: data.error,
            disallowClose: true,
            icon: <IconX size={20} />,
          });
        } else {
          let newLatest = structuredClone(latest);
          newLatest = data;
          setLatest(newLatest);
          setLoadLatest(true);
        }
      });
  }

  const author = {
    name: 'tuntematon',
    avatar:
      'https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
  };

  function PastePage() {
    return (
      <>
        <Container px={0}>
          <Grid gutter="xl">
            <Grid.Col span={8}>
              <Skeleton visible={!loadPaste}>
                <Title order={2}>{paste.title}</Title>
              </Skeleton>
              <Space h="xl" />
              <Text size="sm" color="dimmed" sx={{ display: 'flex', gap: 8 }}>
                {/* @ts-ignore */}
                {paste.hidden === true ? <IconEyeOff /> : <IconEye />}
                {paste.meta.views} <IconFileDigit /> {paste.meta.size} tavua <IconCalendar />{' '}
                {/* @ts-ignore */}
                {new Date(paste.date).toLocaleDateString('fi-FI')} <IconCode />{' '}
                {/* @ts-ignore */}
                {paste.programmingLanguage}
              </Text>
              <Divider my="sm" />
              <Space h="xl" />
              <Skeleton visible={!loadPaste}>
                <Prism
                  {/* @ts-ignore */}
                  language={paste.programmingLanguage}
                  copiedLabel="Kopioitu!"
                  copyLabel="Kopioi"
                  radius="sm"
                  withLineNumbers
                >
                  {paste.content}
                </Prism>
              </Skeleton>
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={3}>Uusimmat:</Title>
              <Space h="xl" />
              <Stack>
                {latest.map((latestPaste) => (
                  <PasteCardVertical
                    language={
                      /* @ts-ignore */
                      latestPaste.programmingLanguage ? latestPaste.programmingLanguage : 'teksti'
                    }
                    title={latestPaste.title ? latestPaste.title : 'Nimetön...'}
                    date={new Date(latestPaste.date).toLocaleDateString('fi-FI')}
                    author={author}
                    id={latestPaste.id}
                  />
                ))}
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </>
    );
  }

  function Page() {
    if (pasteFound) return <PastePage />;
    return <ErrorNotFound />;
  }

  return (
    <>
      {/* @ts-ignore */}
      <HeaderMenu links={links} />
      <Page />
    </>
  );
}