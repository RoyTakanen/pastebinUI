import { HeaderMenu } from '../components/Header/HeaderMenu';
import { Error } from '../components/Error/Error';

export default function Custom500() {
  const links = [
    { link: '/', label: 'Koti - Luo liite' },
    { link: '/browse', label: 'Selaa liitteitä' },
    { link: '/info', label: 'Tietoa meistä' },
  ];

  return (
    <>
      {/* @ts-ignore */}
      <HeaderMenu links={links} />
      <Error
        errorCode={500}
        errorTitle='Palvelinvirhe'
        errorText='Palvelimelta tuli virheellinen vastaus'
      />
    </>
  );
}
