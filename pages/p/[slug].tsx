import { useRouter } from 'next/router';
import { Error } from '../../components/Error/Error';
import PasteComponent from '../../components/Paste/Paste';
import { useGetLatestPastes, useGetPaste } from '../../data/paste.api';

export default function Paste() {
  const router = useRouter();

  const { data: paste, error, isValidating } = useGetPaste(router.query.slug as string);
  const { data: latestPastes } = useGetLatestPastes();

  if (error) {
    return <Error errorCode={error.status} errorTitle={error.title} errorText={error.message} />;
  }

  return (
    <PasteComponent paste={paste} loading={isValidating && !paste} latestPastes={latestPastes} />
  );
}
