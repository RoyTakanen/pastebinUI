import { Container, Stack, Text, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { Error } from '../components/Error/Error';
import { PasteCardVertical } from '../components/PasteCard/PasteCardVertical';
import { getLatestPastes } from '../data/paste.api';
import { APIError } from '../utils/APIError';
import { PasteValue } from '../utils/types';

export default function Paste({
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

  return (
    <Container px={0}>
      <Title>Hae pasteja</Title>
      <Stack mt={40}>
        {data.map((latestPaste) => (
          <PasteCardVertical
            programmingLanguage={latestPaste.programmingLanguage}
            title={latestPaste.title ? latestPaste.title : 'Nimetön...'}
            date={new Date(latestPaste.date).toLocaleDateString('fi-FI')}
            id={latestPaste.id}
            key={latestPaste.id}
            meta={latestPaste.meta}
            author={latestPaste.author}
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
