import { Error } from '../components/Error/Error';
import { HeaderMenu } from '../components/Header/HeaderMenu';

export default function Custom500() {
  const links = [
    { link: '/', label: 'Koti - Luo liite' },
    { link: '/browse', label: 'Selaa liitteitä' },
    { link: '/info', label: 'Tietoa meistä' },
  ];

  return (
    <>
      <HeaderMenu links={links} />
      <Error
        errorCode={404}
        errorTitle="Sivua ei ole olemassa"
        errorText="Sivu on joko poistettu tai se ei ole koskaan ollut olemassa. Tarkasta osoite uudestaan tai siirry etusivulle."
      />
    </>
  );
}
