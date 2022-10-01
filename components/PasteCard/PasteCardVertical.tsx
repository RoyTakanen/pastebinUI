import { Anchor, Avatar, Card, createStyles, Group, Text } from '@mantine/core';
import { PasteValue } from '../../utils/types';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
/* eslint-disable no-param-reassign */

export function PasteCardVertical({
  programmingLanguage: language,
  title,
  date,
  author,
  id,
  meta: { size, views },
}: Omit<PasteValue, 'content' | 'hidden'>) {
  const { classes } = useStyles();

  const link = `/p/${id}`;

  let extrameta = <></>;
  if (size && views) {
    extrameta = (
      <>
        <Text size="xs" color="dimmed">
          •
        </Text>
        <Text size="xs" color="dimmed">
          {new Intl.NumberFormat('fi-FI').format(views || 0)} näyttökertaa
        </Text>
      </>
    );
  }

  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {language}
          </Text>
          <Anchor href={link} component="a">
            <Text className={classes.title} mt="xs" mb="md">
              {title}
            </Text>
          </Anchor>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} src={author.avatar} />
              <Text size="xs">{author.name}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {date}
            </Text>
            {extrameta}
          </Group>
        </div>
      </Group>
    </Card>
  );
}
