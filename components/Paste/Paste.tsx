import {
  Avatar,
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
import {
  IconCalendar,
  IconCode,
  IconEye,
  IconFileTypography,
  IconLock,
  IconLockOpen,
} from '@tabler/icons';
import { convertBytesToHuman } from '../../utils/convertFileSize';
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
  <Container px={0} sx={{ maxWidth: '95vw' }}>
    <Grid gutter="xl">
      <Grid.Col md={8} xs={12}>
        <Skeleton visible={loading} animate sx={{ minHeight: '80px' }}>
          <Stack>
            <Title order={2}>{paste.title}</Title>
            <Group spacing="lg" noWrap>
              <Text color="dimmed" weight="bold">
                Lisännyt
              </Text>
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={paste.author.avatar} />
                <Text size="xs">{paste.author.name}</Text>
              </Group>
            </Group>
          </Stack>
        </Skeleton>
        <Space h="xl" />
        <Group position="apart">
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
              {convertBytesToHuman(paste.meta.size)}
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
          <Tooltip label="Tiedoston kieli">
            <Text
              size="sm"
              color="dimmed"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <IconCode />
              {paste.programmingLanguage || 'markup'}
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
            {paste.content || 'NO CONTENT'}
          </Prism>
        </Skeleton>
      </Grid.Col>
      <Grid.Col md={4} xs={12}>
        <Title order={3}>Uusimmat</Title>
        <Divider my="lg" />
        <Skeleton animate visible={loading}>
          <Stack>
            {latestPastes.length === 0 ? (
              <Text>Tietoja ei löytynyt</Text>
            ) : (
              latestPastes.map((latest) => (
                <PasteCardVertical
                  programmingLanguage={latest.programmingLanguage}
                  title={latest.title ? latest.title : 'Nimetön...'}
                  date={new Date(latest.date).toLocaleDateString('fi-FI')}
                  author={latest.author}
                  meta={latest.meta}
                  id={latest.id}
                  key={latest.id}
                />
              ))
            )}
          </Stack>
        </Skeleton>
      </Grid.Col>
    </Grid>
  </Container>
);

export default Paste;
