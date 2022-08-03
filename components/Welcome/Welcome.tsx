import { Title, Text, Anchor } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Liiteroskis -{' '}
        <Text inherit variant="gradient" component="span">
          Pastebin.fi
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        Tämä on avoimen lähdekoodin liiteroskis. Lähdekoodi löytyy{' '}
        <Anchor href="https://github.com/pastebin-fi/" size="lg">
          täältä
        </Anchor>
        .
      </Text>
    </>
  );
}
