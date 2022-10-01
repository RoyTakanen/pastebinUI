import {
  Container,
  Divider,
  Grid,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Prism } from '@mantine/prism';
import { IconCalendar, IconEye, IconFileTypography, IconLock, IconLockOpen } from '@tabler/icons';
import { PasteValue } from '../../utils/types';
import { PasteCardVertical } from '../PasteCard/PasteCardVertical';

type Props = {
  paste?: PasteValue;
  latestPastes?: PasteValue[];
  loading?: boolean;
};

const defaultPaste: PasteValue = {
  id: '0',
  author: {
    avatar: '',
    name: '',
  },
  content: '',
  title: '',
  programmingLanguage: 'markup',
  meta: {
    views: 0,
    size: 0,
  },
  hidden: false,
  date: '2022-08-04T12:57:22.810Z',
};

const Paste = ({ paste = defaultPaste, loading = false, latestPastes = [] }: Props) => (
  <Container px={0}>
    {/* <LoadingOverlay visible={loading} overlayBlur={5} /> */}

    <Grid gutter="xl">
      <Grid.Col span={8}>
        <Skeleton visible={loading} animate height="35px">
          <Title order={2}>{paste.title}</Title>
        </Skeleton>
        <Space h="xl" />
        <Group position="apart" grow>
          <Tooltip label="Näyttökerrat">
            <Text
              size="sm"
              color="dimmed"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <IconEye /> {paste.meta.views}
            </Text>
          </Tooltip>
          <Tooltip label="Tiedoston koko">
            <Text
              size="sm"
              color="dimmed"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <IconFileTypography />
              {paste.meta.size} bytes
            </Text>
          </Tooltip>
          <Tooltip label="Luomispäivä">
            <Text
              size="sm"
              color="dimmed"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <IconCalendar />
              {new Date(paste.date).toLocaleDateString('fi-FI')}
            </Text>
          </Tooltip>
          <Tooltip label="Hidden">
            <Text
              size="sm"
              color="dimmed"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {paste.hidden ? <IconLock /> : <IconLockOpen />}
            </Text>
          </Tooltip>
        </Group>
        <Divider my="sm" />
        <Space h="xl" />
        <Skeleton visible={loading} animate>
          <Prism
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
          {latestPastes ? (
            latestPastes.map((latest) => (
              <PasteCardVertical
                language={latest.programmingLanguage}
                title={latest.title ? latest.title : 'Nimetön...'}
                date={new Date(latest.date).toLocaleDateString('fi-FI')}
                author={latest.author}
                id={latest.id}
                key={latest.id}
              />
            ))
          ) : (
            <Text>Tietoja ei löytynyt</Text>
          )}
        </Stack>
        <Skeleton width="100%" height="100%" animate />
      </Grid.Col>
    </Grid>
  </Container>
);

export default Paste;
