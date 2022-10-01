import { Container, Title, Select, Checkbox, Stack, Group, Input } from '@mantine/core';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconX, IconArrowsSort, IconSearch } from '@tabler/icons';

import { HeaderMenu } from '../components/Header/HeaderMenu';
import { PasteCardVertical } from '../components/PasteCard/PasteCardVertical';

export default function Paste() {
  const links = [
    { link: '/', label: 'Koti - Luo liite' },
    { link: '/browse', label: 'Selaa liitteitä' },
    { link: '/info', label: 'Tietoa meistä' },
  ];

  const latestDefault = [
    {
      author: 'Tuntematon Sotilas',
      date: '2022-08-04T12:57:22.810Z',
      title: 'Python-esimerkki',
      language: 'python',
      id: 'XXXXXX',
      meta: {
        size: 1,
        views: 1,
      },
    },
  ];

  const [latest, setLatest] = useState(latestDefault);
  const [loadLatest, setLoadLatest] = useState(false);

  const fetchPastes = (sorting: string, inverted: boolean, searchTerm: string = '') => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pastes?sorting=${inverted ? '-' : ''}${sorting}&title=${searchTerm}`)
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
};

  if (!loadLatest) {
    fetchPastes('meta.views', true);
  }

  const author = {
    name: 'tuntematon',
    avatar:
      'https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
  };

  const [sorting, setSorting] = useState<string | null>(null);
  const [inverted, setInverted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPastes(sorting != null ? sorting : '', inverted, searchTerm);
  }, [sorting, inverted, searchTerm]);

  function BrowsePage() {
    return (
      <>
        <Container px={0}>
            <Title>Selaa liitteitä</Title>
            {/* This is rendered again when input changes (pls fix) */}
            <Input
              mt={30}
              icon={<IconSearch />}
              placeholder="Hae liitteitä"
              size="md"
              key="searchTerm"
              autoFocus
              value={searchTerm}
              onChange={(event: any) => setSearchTerm(event.currentTarget.value)}
            />
            <Group mb="xs">
            <Container size="sm" sx={{ flex: 1 }}>
                <Select
                  mt={20}
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  value={sorting}
                  onChange={setSorting}
                  label="Lajitteluperuste"
                  placeholder="Valitse yksi"
                  icon={<IconArrowsSort size={14} />}
                  defaultValue="meta.views"
                  data={[
                    { value: 'meta.views', label: 'Katselukerrat' },
                    { value: 'meta.size', label: 'Koko' },
                    { value: 'date', label: 'Päivämäärä' },
                ]}
                />

            </Container>
            <Container size="sm" pr={90} mt={40}>
                <Checkbox
                  label="Käänteinen"
                  checked={inverted}
                  onChange={(event) => setInverted(event.currentTarget.checked)}
                />
            </Container>
            </Group>
            <Stack mt={40}>
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
                      size={latestPaste.meta.size}
                      views={latestPaste.meta.views}
                    />
                    ))}
            </Stack>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* @ts-ignore */}
      <HeaderMenu links={links} />
      <BrowsePage />
    </>
  );
}
