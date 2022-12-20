import { Checkbox, Container, Group, Select, Stack, Text, Title } from '@mantine/core';
import { IconArrowsSort } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Error } from '../components/Error/Error';
import { PasteCardVertical } from '../components/PasteCard/PasteCardVertical';
import { getLatestPastes } from '../data/paste.api';
import { APIError } from '../utils/APIError';
import { PasteValue } from '../utils/types';

export default function Pastes({
  data,
  error,
}: {
  data: PasteValue[] | null;
  error: APIError | null;
}) {
  if (error) {
    return <Error errorCode={error.status} errorTitle={error.title} errorText={error.message} />;
  }

  if (!data) return <Text color="dimmed">Ei tietoa</Text>;

  const [sorting, setSorting] = useState<string | null>('meta.views');
  const [inverted, setInverted] = useState(false);

  const sortingAlgos = {
    'meta.views': (a: PasteValue, b: PasteValue) => b.meta.views - a.meta.views,
    'meta.size': (a: PasteValue, b: PasteValue) => b.meta.size - a.meta.size,
    date: (a: PasteValue, b: PasteValue) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  };

  const getSortingAlgo = (sort: string | null): 'meta.views' | 'meta.size' | 'date' => {
    switch (sort) {
      case 'meta.size':
        return 'meta.size';

      case 'date':
        return 'date';

      case 'meta.views':
      case null:
      default:
        return 'meta.views';
    }
  };

  let sortedData: PasteValue[] = [];

  if (inverted) {
    sortedData = [...data].sort(sortingAlgos[getSortingAlgo(sorting)]).reverse();
  } else {
    sortedData = [...data].sort(sortingAlgos[getSortingAlgo(sorting)]);
  }

  return (
    <Container px={0}>
      <Title>Selaa liitteitä</Title>
      <Group mb="xs">
        <Container size="sm" px={0} sx={{ flex: 1 }}>
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
        {sortedData.map((latestPaste) => (
          <PasteCardVertical
            programmingLanguage={
              latestPaste.programmingLanguage ? latestPaste.programmingLanguage : 'markup'
            }
            title={latestPaste.title ? latestPaste.title : 'Nimetön...'}
            date={new Date(latestPaste.date).toLocaleDateString('fi-FI')}
            author={latestPaste.author}
            id={latestPaste.id}
            meta={latestPaste.meta}
            key={latestPaste.id}
          />
        ))}
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await getLatestPastes();

  if (error) {
    return {
      props: {
        error,
        data: null,
      },
    };
  }

  return {
    props: {
      data,
      error: null,
    },
  };
};
