import Link from 'next/link';
import { createStyles, Card, Avatar, Text, Group, Anchor } from '@mantine/core';

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

interface PasteCardVerticalProps {
  language: string;
  title: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  id: string;
}

export function PasteCardVertical({
  language,
  title,
  date,
  author,
  id,
}: PasteCardVerticalProps) {
  const { classes } = useStyles();

  const link = "/p/" + id

  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {language}
          </Text>
          <Link href={link} passHref>
            <Anchor component="a">
              <Text className={classes.title} mt="xs" mb="md">
                {title}
              </Text>
            </Anchor>
          </Link>
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
          </Group>
        </div>
      </Group>
    </Card>
  );
}