import { Container, Stack, Text, Title } from '@mantine/core';
import { Error } from '../components/Error/Error';
import { PasteCardVertical } from '../components/PasteCard/PasteCardVertical';
import { useGetLatestPastes } from '../data/paste.api';

export default function Paste() {
  const { data: latest, error } = useGetLatestPastes();

  if (error) {
    return <Error errorCode={error.status} errorTitle={error.title} errorText={error.message} />;
  }

  if (!latest) return <Text color="dimmed">Ei tietoa</Text>;

  return (
    <Container px={0}>
      <Title>Hae pasteja</Title>
      <Stack mt={40}>
        {latest.map((latestPaste) => (
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
