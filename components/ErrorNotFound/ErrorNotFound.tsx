import { createStyles, Title, Text, Container } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function ErrorNotFound() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Liitettä ei ole olemassa.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Valitettavasti tätä liitettä ei löydy palvelimiltamme. Se on saatettu poistaa tai sitä ei
        ole koskaan ollut.
      </Text>
      {/* <Group position="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group> */}
    </Container>
  );
}
