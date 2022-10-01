import { Error } from '../components/Error/Error';

export default function Custom500() {
  return (
    <Error
      errorCode={500}
      errorTitle="Palvelinvirhe"
      errorText="Palvelimelta tuli virheellinen vastaus"
    />
  );
}
